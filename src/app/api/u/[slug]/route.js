import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    // Fetch order data with related template info by slug
    const { data: orderData, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        templates(
          id,
          nama,
          kategori
        )
      `)
      .eq("slug", slug)
      .single();

    if (error || !orderData) {
      console.error("Error fetching order by slug:", error);
      return NextResponse.json({ error: "Undangan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: orderData
    });

  } catch (error) {
    console.error("System error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}
