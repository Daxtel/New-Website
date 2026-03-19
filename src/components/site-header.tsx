import Link from 'next/link';
import { navLinks } from '@/lib/home-content';
import { pick } from '@/lib/i18n';
import { site } from '@/lib/site';

export function SiteHeader() {
  const locale = 'en';
  return (
    <header className="sticky top-0 z-50 border-b border-lime-300/10 bg-[#1a1c1b]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link href="/" className="text-lg font-bold tracking-tight text-lime-300 md:text-xl">
          STREETSHOW PRODUCTIONS
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-lime-300/70 transition-colors hover:text-lime-300">
              {pick(link.label, locale)}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-lime-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1c1b] md:text-sm"
        >
          {pick(site.primaryCta, locale)}
        </Link>
      </div>
    </header>
  );
}
