import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    let query = supabaseAdmin
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (id) {
      query = query.eq('id', id);
    }
    if (category) {
      query = query.eq('kategori', category);
    }

    const { data: templates, error } = await query;

    if (error) throw error;

    // Return single object if id is requested, else array
    if (id) {
      return NextResponse.json({ data: templates[0] || null });
    }

    return NextResponse.json({ data: templates });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
