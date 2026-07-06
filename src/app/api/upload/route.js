import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique safe filename
    const originalName = file.name || "photo.jpg";
    const fileExt = originalName.split('.').pop().toLowerCase();
    const uniqueId = Date.now() + "-" + Math.random().toString(36).substring(2, 9);
    const fileName = `${uniqueId}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to 'orders' bucket
    const { data, error } = await supabaseAdmin
      .storage
      .from('orders')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json({ error: "Gagal mengunggah file ke storage" }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin
      .storage
      .from('orders')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (error) {
    console.error("API Upload Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}
