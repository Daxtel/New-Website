import Link from 'next/link';
import { navLinks } from '@/lib/home-content';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';
import { MobileMenu } from '@/components/mobile-menu';
import { LanguageToggle } from '@/components/language-toggle';

export function SiteHeader({ locale = 'en' }: { locale?: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/12 bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#D4AF37] md:text-xl">
          STREETSHOW
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-[#D4AF37]"
            >
              {pick(link.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale} />
          <Link
            href="/contact"
            className="hidden items-center justify-center rounded-full bg-[#D4AF37] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-colors hover:bg-[#E8C84A] sm:inline-flex"
          >
            {pick(site.primaryCta, locale)}
          </Link>
          <MobileMenu
            links={navLinks as unknown as { href: string; label: { en: string; ja: string } }[]}
            ctaLabel={pick(site.primaryCta, locale)}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}
