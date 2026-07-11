import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { order_id, nama_tamu, status_kehadiran, jumlah_tamu, pesan } = body;

    if (!order_id || !nama_tamu) {
      return NextResponse.json({ error: "Order ID and Nama Tamu are required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("rsvp_responses")
      .insert([
        {
          order_id,
          nama_tamu,
          status_kehadiran: status_kehadiran || "Hanya Ucapan",
          jumlah_tamu: jumlah_tamu ? parseInt(jumlah_tamu, 10) : 1,
          pesan: pesan || null
        }
      ])
      .select();

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
