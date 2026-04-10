import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'streetshow-locale';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Tell Vercel CDN to vary the cache by cookie value
  response.headers.set('x-middleware-cache', 'no-cache');

  // If cookie already set, skip detection
  if (request.cookies.get(COOKIE_NAME)) {
    return response;
  }

  // Detect language from Accept-Language header
  const acceptLang = request.headers.get('accept-language') || '';
  const locale = acceptLang.toLowerCase().startsWith('ja') ? 'ja' : 'en';

  response.cookies.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    // Match all pages except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
