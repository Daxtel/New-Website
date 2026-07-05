'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

function toEnglish(path: string): string {
  if (path === '/ja') return '/';
  if (path.startsWith('/ja/')) return path.slice('/ja'.length);
  return path;
}

function toJapanese(path: string): string {
  if (path === '/ja' || path.startsWith('/ja/')) return path;
  return path === '/' ? '/ja' : `/ja${path}`;
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() || '/';

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return;
    const target = newLocale === 'ja' ? toJapanese(pathname) : toEnglish(pathname);
    // Hard navigation so <html lang> and every server component re-render for the new locale.
    window.location.href = target;
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors ${
          locale === 'en' ? 'text-[#C9A84C]' : 'text-[#8A8070] hover:text-[#C9A84C]/70'
        }`}
      >
        EN
      </button>
      <span className="text-[#8A8070]/40">|</span>
      <button
        onClick={() => switchLocale('ja')}
        className={`transition-colors ${
          locale === 'ja' ? 'text-[#C9A84C]' : 'text-[#8A8070] hover:text-[#C9A84C]/70'
        }`}
      >
        JA
      </button>
    </div>
  );
}
