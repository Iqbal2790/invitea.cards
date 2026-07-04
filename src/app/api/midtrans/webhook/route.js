import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOrderSuccessEmail } from "@/lib/resend";

export async function POST(request) {
  try {
    const payload = await request.json();
    
    // 1. Verifikasi Signature Key Midtrans (Keamanan)
    const { 
      order_id, 
      status_code, 
      gross_amount, 
      signature_key, 
      transaction_status,
      fraud_status
    } = payload;
    
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    
    const hashData = order_id + status_code + gross_amount + serverKey;
    const expectedSignature = crypto.createHash("sha512").update(hashData).digest("hex");
    
    if (signature_key !== expectedSignature) {
      console.error("Invalid Midtrans Signature!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // 2. Tentukan Status Akhir Pesanan
    let finalStatus = "pending";
    if (transaction_status === "capture") {
      if (fraud_status === "challenge") finalStatus = "pending";
      else if (fraud_status === "accept") finalStatus = "paid";
    } else if (transaction_status === "settlement") {
      finalStatus = "paid";
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      finalStatus = "failed";
    }

    // 3. Update Database (Tabel Orders)
    const { data: orderData, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ 
        status_payment: finalStatus,
        midtrans_id: payload.transaction_id
      })
      .eq("id", order_id)
      .select("*, templates(nama, kategori)") // Join dengan templates untuk dapat nama template
      .single();

    if (updateError) {
      console.error("Gagal update order:", updateError);
      return NextResponse.json({ error: "Gagal update order" }, { status: 500 });
    }

    // 4. Jika Pembayaran BERHASIL (Lunas), Buat Undangan & Kirim Email!
    if (finalStatus === "paid") {
      
      // Cek apakah undangan sudah pernah dibuat untuk order ini (Mencegah duplicate event webhook)
      const { data: existingInv } = await supabaseAdmin
        .from("invitations")
        .select("id")
        .eq("order_id", order_id)
        .single();
        
      if (!existingInv) {
        // Generate Token & Slug
        const magicToken = crypto.randomBytes(16).toString("hex");
        // Simple slug generator (contoh: udg-c3f9)
        const randomSuffix = crypto.randomBytes(2).toString("hex");
        const slug = `udg-${order_id.split("-")[0]}-${randomSuffix}`;
        
        // Masa aktif 1 tahun dari sekarang
        const expiredDate = new Date();
        expiredDate.setFullYear(expiredDate.getFullYear() + 1);

        // Insert ke tabel invitations
        const { error: invError } = await supabaseAdmin
          .from("invitations")
          .insert({
            order_id: order_id,
            slug: slug,
            magic_token: magicToken,
            data_content: {}, // Akan diisi user di dashboard nanti
            expired_at: expiredDate.toISOString()
          });

        if (invError) {
          console.error("Gagal membuat undangan:", invError);
        } else {
          // Kirim Email via Resend
          await sendOrderSuccessEmail({
            email: orderData.email,
            templateName: orderData.templates?.nama || "Template Premium",
            magicToken: magicToken,
            slug: slug
          });
        }
      }
    }

    // Wajib kembalikan HTTP 200 OK agar Midtrans tidak melakukan retry berulang-ulang
    return NextResponse.json({ success: true, message: "Webhook processed" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
