'use client';

import type { Locale } from '@/lib/i18n';

export function LanguageToggle({ locale }: { locale: Locale }) {
  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return;
    // Set the cookie
    document.cookie = `streetshow-locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    // Hard navigate with cache-bust param to defeat browser and CDN cache
    const url = new URL(window.location.href);
    url.searchParams.set('l', newLocale);
    window.location.href = url.toString();
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
