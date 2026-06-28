import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { invitation_id, nama_tamu, hadir } = body;

    if (!invitation_id || !nama_tamu || typeof hadir !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'invitation_id, nama_tamu, dan status hadir (boolean) wajib diisi' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('rsvp_responses')
      .insert([
        {
          invitation_id,
          nama_tamu,
          hadir
        }
      ]);

    if (error) {
      console.error('Supabase RSVP Error:', error);
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan data RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Terima kasih atas konfirmasi Anda!'
    });
  } catch (error) {
    console.error('API RSVP Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
