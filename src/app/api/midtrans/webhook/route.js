import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Kita butuh Service Role Key untuk update tabel yang diproteksi RLS (jika ada)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      status_code,
      gross_amount
    } = payload;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // 1. Verifikasi Signature
    // Signature dari Midtrans = SHA512(order_id + status_code + gross_amount + serverKey)
    const rawString = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const hashedString = crypto.createHash('sha512').update(rawString).digest('hex');

    if (hashedString !== signature_key) {
      console.warn("Invalid Midtrans Signature:", order_id);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Ekstrak Order ID Asli
    // Di fase 5.2, kita format order_id = [UUID]-[timestamp]. 
    // Jadi kita ambil semua bagian sebelum strip (-) terakhir.
    const actualOrderId = order_id.substring(0, order_id.lastIndexOf('-'));
    if (!actualOrderId) {
      return NextResponse.json({ error: "Invalid order_id format" }, { status: 400 });
    }

    // 3. Tentukan Status Akhir
    let finalStatus = null;

    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        finalStatus = 'pending';
      } else if (fraud_status === 'accept') {
        finalStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      finalStatus = 'success';
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      finalStatus = 'failed';
    } else if (transaction_status === 'pending') {
      finalStatus = 'pending';
    }

    // 4. Update Database
    if (finalStatus) {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status_payment: finalStatus })
        .eq('id', actualOrderId);

      if (updateError) {
        console.error("Gagal update order status di Supabase:", updateError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log(`Order ${actualOrderId} updated to ${finalStatus}`);

      // TODO (Fase 6): Jika finalStatus === 'success', panggil API /api/invitations untuk generate URL undangan live.
    }

    // 5. Berikan respons OK agar Midtrans tidak retry webhook ini terus menerus
    return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
    
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
