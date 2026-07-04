import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Verifikasi sesi admin
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ambil data orders beserta relasi template
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select(`
        id,
        created_at,
        status_payment,
        email,
        data_content,
        slug,
        magic_token,
        templates ( id, nama, kategori, harga )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: 'Gagal mengambil data pesanan' }, { status: 500 });
    }

    // Transformasi data agar mudah dipakai oleh frontend
    const formattedOrders = orders.map(o => {
      let customerName = o.email; // Default ke email
      
      if (o.data_content) {
        const content = typeof o.data_content === 'string' ? JSON.parse(o.data_content) : o.data_content;
        
        if (o.templates?.kategori === 'undangan' && content.nama_mempelai) {
          customerName = content.nama_mempelai;
        } else if (content.nama_pengirim && content.nama_penerima) {
          customerName = `${content.nama_pengirim} to ${content.nama_penerima}`;
        } else if (content.nama_pengirim) {
          customerName = content.nama_pengirim;
        } else if (content.nama_pria && content.nama_wanita) {
          customerName = `${content.nama_pria} & ${content.nama_wanita}`;
        }
      }

      return {
        id: o.id,
        customer: customerName,
        email: o.email,
        template: o.templates?.nama || 'Unknown',
        category: o.templates?.kategori || '-',
        date: new Date(o.created_at).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'short', year: 'numeric'
        }),
        status: o.status_payment === 'paid' || o.status_payment === 'success' ? 'Lunas' : 
                o.status_payment === 'pending' ? 'Pending' : 'Batal',
        amount: o.templates?.harga || 0,
        magic_token: o.magic_token || null,
        raw_date: o.created_at
      };
    });

    return NextResponse.json({ data: formattedOrders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
