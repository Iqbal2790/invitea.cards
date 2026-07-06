import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_PHOTOS = 3;
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

    // Validate slot index (must be 0, 1, or 2)
    const slot = parseInt(slotRaw, 10);
    if (isNaN(slot) || !ALLOWED_SLOTS.includes(slot)) {
      return NextResponse.json(
        { error: `Slot foto tidak valid. Hanya slot 0–${MAX_PHOTOS - 1} yang diizinkan.` },
        { status: 400 }
      );
    }

    // Sanitize sessionId to prevent path traversal
    const safeSessionId = sessionId.replace(/[^a-zA-Z0-9-_]/g, "").substring(0, 64);
    if (!safeSessionId) {
      return NextResponse.json({ error: "Session ID tidak valid" }, { status: 400 });
    }

    // Check how many files already exist in this session folder
    const { data: existingFiles, error: listError } = await supabaseAdmin
      .storage
      .from("orders")
      .list(safeSessionId);

    if (!listError && existingFiles && existingFiles.length >= MAX_PHOTOS) {
      return NextResponse.json(
        { error: `Maksimal ${MAX_PHOTOS} foto yang diizinkan per sesi.` },
        { status: 400 }
      );
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique safe filename: {slot}-{timestamp}.{ext}
    const originalName = file.name || "photo.jpg";
    const fileExt = originalName.split(".").pop().toLowerCase();
    const fileName = `slot${slot}-${Date.now()}.${fileExt}`;
    const filePath = `${safeSessionId}/${fileName}`;

    // Upload to 'orders' bucket
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from("orders")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true // overwrite same slot if re-uploaded
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
