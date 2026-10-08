import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Only fetch active testimonials for the public page
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("id, nama, pesan")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Gagal memuat testimoni" }, { status: 500 });
  }
}
