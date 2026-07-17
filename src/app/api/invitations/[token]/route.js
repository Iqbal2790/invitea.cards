import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    // 1. Fetch order data with related template info (replacing old invitations table)
    const { data: orderData, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        templates(
          id,
          nama,
          kategori,
          fields_config
        )
      `)
      .eq("magic_token", token)
      .single();

    if (error || !orderData) {
      console.error("Error fetching order by token:", error);
      return NextResponse.json({ error: "Undangan tidak ditemukan" }, { status: 404 });
    }

    // 2. Fetch RSVPs
    const { data: rsvps, error: rsvpError } = await supabaseAdmin
      .from("rsvp_responses")
      .select("*")
      .eq("order_id", orderData.id)
      .order("created_at", { ascending: false });

    if (rsvpError) {
      console.error("Error fetching rsvps:", rsvpError);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...orderData,
        orders: {
          status_payment: orderData.status_payment,
          templates: orderData.templates
        },
        rsvps: rsvps || []
      }
    });

  } catch (error) {
    console.error("System error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { token } = await params;
  
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { data_content, foto_urls } = body;

    const updateData = {};
    if (data_content !== undefined) updateData.data_content = data_content;
    if (foto_urls !== undefined) updateData.foto_urls = foto_urls;

    const { data: updated, error } = await supabaseAdmin
      .from("orders")
      .update(updateData)
      .eq("magic_token", token)
      .select()
      .single();

    if (error) {
      console.error("Error updating invitation:", error);
      return NextResponse.json({ error: "Gagal memperbarui data" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("System error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}
