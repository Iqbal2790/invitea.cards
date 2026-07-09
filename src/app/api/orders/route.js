import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { snap } from "@/lib/midtrans";

export async function POST(request) {
  try {
    const { email, template_id, data_content } = await request.json();

    if (!email || !template_id) {
      return NextResponse.json({ error: "Email dan Template ID wajib diisi" }, { status: 400 });
    }

    // 1. Cek ketersediaan dan harga template di database
    const { data: template, error: templateError } = await supabaseAdmin
      .from("templates")
      .select("id, nama, harga")
      .eq("id", template_id)
      .single();

    if (templateError || !template) {
      console.error("Template tidak ditemukan:", templateError);
      return NextResponse.json(
        { error: "Template tidak ditemukan di database. Pastikan ID valid atau Database sudah diisi (seed)." }, 
        { status: 404 }
      );
    }

    // 2. Buat rekam jejak pesanan (Order) di Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: email,
        template_id: template.id,
        status_payment: "pending",
        data_content: data_content || {}
      })
      .select("id")
      .single();

    if (orderError) {
      console.error("Supabase Order Insert Error:", orderError);
      return NextResponse.json({ error: "Gagal menyimpan data pesanan" }, { status: 500 });
    }

    const orderId = order.id;

    const origin = new URL(request.url).origin;
    
    // 3. Meminta Snap Token ke Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId, // Menggunakan UUID dari Supabase sebagai Order ID Midtrans
        gross_amount: template.harga
      },
      customer_details: {
        email: email
      },
      item_details: [{
        id: template.id,
        price: template.harga,
        quantity: 1,
        name: template.nama.substring(0, 50)
      }],
      expiry: {
        duration: 5,
        unit: "minute"
      },
      callbacks: {
        finish: `${origin}/status/${orderId}`,
        error: `${origin}/status/${orderId}`,
        pending: `${origin}/status/${orderId}`
      }
    };

    const snapTransaction = await snap.createTransaction(parameter);

    // Kembalikan token ke Frontend agar bisa memanggil window.snap.pay()
    return NextResponse.json({
      order_id: orderId,
      snap_token: snapTransaction.token
    });

  } catch (error) {
    console.error("API Orders Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}
