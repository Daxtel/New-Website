import { NextRequest, NextResponse } from 'next/server';

const LOCALE_HEADER = 'x-locale';
const PATHNAME_HEADER = 'x-pathname';

/**
 * URL-based locale routing without moving any route files.
 *
 * `/ja` and `/ja/*` are rewritten to the underlying language-neutral route
 * (`/ja/services` -> `/services`) while the locale is passed downstream via a
 * request header. Server components read it through getLocale(). Every other
 * path renders in English. This keeps EN and JA on distinct, indexable URLs
 * (required for hreflang + separate Japanese indexing) with no [locale] segment.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isJa = pathname === '/ja' || pathname.startsWith('/ja/');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, isJa ? 'ja' : 'en');

  if (isJa) {
    // Strip the /ja prefix and render the underlying route.
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = pathname === '/ja' ? '/' : pathname.slice('/ja'.length);
    requestHeaders.set(PATHNAME_HEADER, rewritten.pathname);
    return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
  }

  requestHeaders.set(PATHNAME_HEADER, pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // All pages except Next internals, API routes, and static assets.
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)',
  ],
};
