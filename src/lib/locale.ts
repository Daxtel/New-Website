import { cookies } from 'next/headers';
import type { Locale } from './i18n';

const COOKIE_NAME = 'streetshow-locale';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  return value === 'ja' ? 'ja' : 'en';
}
