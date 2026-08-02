import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si intenta acceder al login, le dejamos pasar
  if (pathname.startsWith('/admin-login')) {
    return NextResponse.next();
  }

  // Si intenta acceder a cualquier subruta de admin (incluyendo /admin a secas)
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session');

    // Si no hay cookie de sesión válida, redirigimos al login
    if (!sessionCookie || sessionCookie.value !== 'true') {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Aseguramos que cubra /admin y todo lo que cuelgue de él
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};