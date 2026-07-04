import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Cari admin di database
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: 'Email atau kata sandi tidak valid' },
        { status: 401 }
      );
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email atau kata sandi tidak valid' },
        { status: 401 }
      );
    }

    // Buat JWT Token
    const token = await createToken({ 
      sub: admin.id, 
      email: admin.email,
      role: 'admin' 
    });

    // Set HTTP-only Cookie
    const response = NextResponse.json(
      { success: true, message: 'Login berhasil' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 jam
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
