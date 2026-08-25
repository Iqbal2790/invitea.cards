import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';
import { isRateLimited } from './lib/rateLimit';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Rate Limiting for API routes (except Midtrans webhook)
  if (pathname.startsWith('/api') && pathname !== '/api/midtrans/webhook') {
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
    // Limit: 60 requests per minute
    if (isRateLimited(ip, 60, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  // Protect /api/admin backend routes (except /api/admin/login)
  if (pathname.startsWith('/api/admin')) {
    if (pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  }

  // Protect /admin UI pages
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);
    
    if (!payload || payload.role !== 'admin') {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.next();
  }

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload && payload.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/:path*'],
};
