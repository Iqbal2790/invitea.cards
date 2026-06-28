import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, template_id, data_content, foto_urls } = body;

    // 1. Validasi data yang masuk
    if (!email || !template_id || !data_content) {
      return NextResponse.json(
        { success: false, error: 'Email, template_id, dan data_content wajib diisi' },
        { status: 400 }
      );
    }

    // 2. Simpan order baru ke tabel orders dengan status pending
    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          email,
          template_id,
          status_payment: 'pending',
          data_content,
          foto_urls: foto_urls || []
        }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { success: false, error: 'Gagal membuat order' },
        { status: 500 }
      );
    }

    // 3. Balas dengan order_id
    return NextResponse.json({
      success: true,
      order_id: order.id,
      message: 'Order berhasil dibuat'
    });
  } catch (error) {
    console.error('API Orders Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
