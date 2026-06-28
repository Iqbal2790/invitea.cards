import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const order_id = formData.get('order_id');

    if (!file || !order_id) {
      return NextResponse.json({ success: false, error: 'File dan order_id wajib diisi' }, { status: 400 });
    }

    // Buat path unik menggunakan timestamp untuk mencegah bentrok nama file
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const path = `${order_id}/${timestamp}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('orders')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage Error:', error);
      return NextResponse.json({ success: false, error: 'Gagal mengupload file ke storage' }, { status: 500 });
    }

    // Dapatkan Public URL
    const { data: publicUrlData } = supabase.storage
      .from('orders')
      .getPublicUrl(path);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error('API Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
