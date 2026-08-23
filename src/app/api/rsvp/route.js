import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, order_id, nama_tamu, status_kehadiran, jumlah_tamu, pesan } = body;

    if (!nama_tamu || (!slug && !order_id)) {
      return NextResponse.json({ error: "Slug/Order ID dan Nama Tamu wajib diisi" }, { status: 400 });
    }

    let targetOrderId = order_id;

    if (slug) {
      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("slug", slug)
        .single();

      if (orderError || !order) {
        return NextResponse.json({ error: "Undangan tidak ditemukan" }, { status: 404 });
      }
      targetOrderId = order.id;
    }

    const { data, error } = await supabaseAdmin
      .from("rsvp_responses")
      .insert([
        {
          order_id: targetOrderId,
          nama_tamu,
          status_kehadiran: status_kehadiran || "Hanya Ucapan",
          jumlah_tamu: jumlah_tamu ? parseInt(jumlah_tamu, 10) : 1,
          pesan: pesan || null
        }
      ])
      .select("id, nama_tamu, status_kehadiran, jumlah_tamu, pesan, created_at");

    if (error) {
      console.error("Error inserting RSVP:", error);
      return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error("System error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}
