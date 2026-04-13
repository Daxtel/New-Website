'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import type { Locale } from '@/lib/i18n';

/** Routes that render without site header/footer (ad landing pages, funnels) */
const STANDALONE_ROUTES = ['/restaurant'];

export function LayoutShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!isStandalone && <SiteHeader locale={locale} />}
      {children}
      {!isStandalone && <SiteFooter locale={locale} />}
    </>
  );
}
