import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Verifikasi sesi admin
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: templates, error } = await supabaseAdmin
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data: templates });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Verifikasi sesi admin
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    
    // Ensure fields_config is properly formatted
    const newTemplate = {
      nama: body.nama,
      kategori: body.kategori,
      harga: body.harga,
      thumbnail_url: body.thumbnail_url || null,
      fields_config: body.fields_config || {},
      fitur_maps: body.fitur_maps || false,
      fitur_countdown: body.fitur_countdown || false,
      fitur_rsvp: body.fitur_rsvp || false,
      is_active: body.is_active !== undefined ? body.is_active : true
    };

    const { data, error } = await supabaseAdmin
      .from('templates')
      .insert([newTemplate])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
