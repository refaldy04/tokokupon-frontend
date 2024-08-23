import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token) {
    // Redirect ke halaman login jika token tidak ada
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Lanjutkan jika token ada
  return NextResponse.next();
}

// Tentukan rute mana yang memerlukan middleware ini
export const config = {
  matcher: ['/', '/buat-seminar', '/dashboard'], // Ganti dengan rute yang ingin Anda lindungi
};
