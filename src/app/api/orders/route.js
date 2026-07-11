import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { snap } from "@/lib/midtrans";

export async function POST(request) {
  try {
    const { email, template_id, data_content } = await request.json();

    if (!email || !template_id) {
      return NextResponse.json({ error: "Email dan Template ID wajib diisi" }, { status: 400 });
    }



    // 2. Cek ketersediaan dan harga template di database
    const { data: template, error: templateError } = await supabaseAdmin
      .from("templates")
      .select("id, nama, harga, kategori")
      .eq("id", template_id)
      .single();

    if (templateError || !template) {
      console.error("Template tidak ditemukan:", templateError);
      return NextResponse.json(
        { error: "Template tidak ditemukan di database. Pastikan ID valid atau Database sudah diisi (seed)." }, 
        { status: 404 }
      );
    }

    // 2.5 Generate custom slug
    let slugBase = "undangan";
    if (template.kategori === "undangan") {
      const namaPria = data_content?.nama_panggilan_pria || "pasangan";
      const namaWanita = data_content?.nama_panggilan_wanita || "bahagia";
      slugBase = `${namaPria}-dan-${namaWanita}`;
    } else if (template.kategori === "ucapan") {
      slugBase = `untuk-${data_content?.receiverName || "penerima"}`;
    }

    let newSlug = slugBase
      .normalize("NFD")                        // decompose accented chars
      .replace(/[\u0300-\u036f]/g, "")         // strip accent marks
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    
    // Check uniqueness
    let finalSlug = newSlug;
    let isUnique = false;
    let counter = 0;
    
    while (!isUnique && counter < 10) {
      const { data: existing } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("slug", finalSlug)
        .maybeSingle();
        
      if (!existing) {
        isUnique = true;
      } else {
        const randomStr = Math.random().toString(36).substring(2, 6);
        finalSlug = `${newSlug}-${randomStr}`;
        counter++;
      }
    }

    // 3. Buat rekam jejak pesanan (Order) di Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: email,
        template_id: template.id,
        status_payment: "pending",
        data_content: data_content || {},
        slug: finalSlug
      })
      .select("id, slug")
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
        gross_amount: Math.round(Number(template.harga))
      },
      customer_details: {
        email: email
      },
      item_details: [{
        id: template.id,
        price: Math.round(Number(template.harga)),
        quantity: 1,
        name: (template.nama || "Template Invitea").substring(0, 50)
      }],
      expiry: {
        duration: 5,
        unit: "minute"
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
    return NextResponse.json({ 
      error: "Terjadi kesalahan internal server", 
      details: error.message,
      apiResponse: error.ApiResponse || null
    }, { status: 500 });
  }
}
