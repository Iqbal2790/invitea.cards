import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
export async function POST(request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json({ error: "order_id is required" }, { status: 400 });
    }

    // 1. Ambil data order dari Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, templates(*)')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Hindari double payment jika status sudah dibayar/sukses
    if (order.status_payment === 'success' || order.status_payment === 'settlement') {
      return NextResponse.json({ error: "Order ini sudah dibayar" }, { status: 400 });
    }

    // 2. Siapkan payload Midtrans
    const template = order.templates;
    const harga = template?.harga || template?.price || 0;
    
    // Pastikan harga minimal Rp 1 untuk Midtrans
    if (harga <= 0) {
      return NextResponse.json({ error: "Harga tidak valid untuk diproses" }, { status: 400 });
    }

    const dataContent = order.data_content || {};
    const namaPemesan = dataContent.pria_panggilan || "Customer";
    
    // Buat Transaction ID unik (Midtrans tidak boleh memproses ID transaksi yang sama jika gagal sebelumnya, 
    // jadi tambahkan timestamp agar selalu unik jika di-retry, atau cukup order_id jika kita yakin belum pernah disubmit)
    // Untuk amannya, kita pakai order_id + timestamp singkat.
    const transactionId = `${order_id}-${Date.now().toString().slice(-5)}`;

    const payload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: harga,
      },
      item_details: [
        {
          id: template.id,
          price: harga,
          quantity: 1,
          name: `Template ${template.name}`
        }
      ],
      customer_details: {
        first_name: namaPemesan,
        email: order.email || "customer@example.com",
      }
    };

    // 3. Panggil API Midtrans Snap
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const authHeader = Buffer.from(serverKey + ':').toString('base64');

    const midtransRes = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${authHeader}`
      },
      body: JSON.stringify(payload)
    });

    const midtransData = await midtransRes.json();

    if (!midtransRes.ok) {
      console.error("Midtrans Error:", midtransData);
      return NextResponse.json({ error: "Gagal memproses pembayaran ke Midtrans" }, { status: 500 });
    }

    // Berhasil mendapatkan token
    return NextResponse.json({ 
      token: midtransData.token, 
      redirect_url: midtransData.redirect_url 
    }, { status: 200 });

  } catch (error) {
    console.error("Midtrans API Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
