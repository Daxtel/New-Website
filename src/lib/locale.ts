import { headers, cookies } from 'next/headers';
import type { Locale } from './i18n';

const COOKIE_NAME = 'streetshow-locale';

/**
 * Resolve the active locale.
 * URL-based routing wins: middleware sets `x-locale` from the `/ja` prefix.
 * Falls back to the legacy cookie, then English.
 */
export async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  const fromUrl = headerStore.get('x-locale');
  if (fromUrl === 'ja') return 'ja';
  if (fromUrl === 'en') return 'en';

  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === 'ja' ? 'ja' : 'en';
}

/** The current language-neutral pathname (no /ja prefix), set by middleware. */
export async function getPathname(): Promise<string> {
  const headerStore = await headers();
  return headerStore.get('x-pathname') || '/';
}
