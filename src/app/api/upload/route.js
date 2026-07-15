import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const ALLOWED_SLOTS = [0, 1, 2];

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const sessionId = formData.get("sessionId") || "uploads";
    const slotRaw = formData.get("slot");

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    let fileName = "";
    
    // Validate slot 
    const slotNum = parseInt(slotRaw, 10);
    if (!isNaN(slotNum)) {
      if (slotNum < 0 || slotNum > 20) {
        return NextResponse.json(
          { error: `Slot foto tidak valid. Hanya slot 0–20 yang diizinkan.` },
          { status: 400 }
        );
      }
      fileName = `slot${slotNum}`;
    } else {
      // It's a string identifier like foto_pria, foto_wanita, foto_cover
      const allowedStringSlots = ["foto_pria", "foto_wanita", "foto_cover", "foto_hero", "pria", "wanita", "cover", "photo1", "photo2", "photo3", "filmPhoto1", "filmPhoto2", "filmPhoto3", "filmPhoto4", "filmPhoto5"];
      if (!allowedStringSlots.includes(slotRaw)) {
        return NextResponse.json(
          { error: `Slot foto tidak valid.` },
          { status: 400 }
        );
      }
      fileName = slotRaw;
    }

    // Sanitize sessionId to prevent path traversal
    const safeSessionId = sessionId.replace(/[^a-zA-Z0-9-_]/g, "").substring(0, 64);
    if (!safeSessionId) {
      return NextResponse.json({ error: "Session ID tidak valid" }, { status: 400 });
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use fixed slot-based filename so upsert truly overwrites the same slot
    // e.g. slot0.jpg, slot1.jpg, slot2.jpg — no timestamp, so upsert works correctly
    const originalName = file.name || "photo.jpg";
    const fileExt = originalName.split(".").pop().toLowerCase();
    const finalFileName = `${fileName}.${fileExt}`;
    const filePath = `${safeSessionId}/${finalFileName}`;

    // Upload to 'orders' bucket — upsert: true overwrites the same slot file
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from("orders")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json({ error: "Gagal mengunggah file ke storage" }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin
      .storage
      .from("orders")
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (error) {
    console.error("API Upload Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}
