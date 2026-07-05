'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { navLinks } from '@/lib/home-content';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';
import { industryPages } from '@/lib/landing-pages';
import { localizeHref } from '@/lib/alternates';
import { MobileMenu } from '@/components/mobile-menu';
import { LanguageToggle } from '@/components/language-toggle';

export function SiteHeader({ locale = 'en' }: { locale?: Locale }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastY.current;
    const nowAtTop = latest < 20;
    // Reveal immediately when back at top — no secondary effect needed
    if (nowAtTop) {
      setHidden(false);
    } else if (latest > 80 && latest > prev + 4) {
      setHidden(true);
    } else if (latest < prev - 4) {
      setHidden(false);
    }
    setAtTop(nowAtTop);
    lastY.current = latest;
  });

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 border-b border-[#D4AF37]/12 bg-[#0A0A0A]/95 backdrop-blur-md"
      style={{
        boxShadow: atTop ? 'none' : '0 1px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href={localizeHref('/', locale)} className="text-lg font-bold tracking-tight text-[#D4AF37] transition-opacity hover:opacity-75 md:text-xl">
          STREETSHOW
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizeHref(link.href, locale)}
              className="group relative text-sm font-medium text-white/60 transition-colors hover:text-[#D4AF37]"
            >
              {pick(link.label, locale)}
              {/* Underline slides in from left */}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />
            </Link>
          ))}

          {/* Industries dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-white/60 transition-colors group-hover:text-[#D4AF37]"
              aria-haspopup="true"
            >
              {locale === 'ja' ? '業界' : 'Industries'}
              <svg className="h-3 w-3 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {/* Panel — appears on hover; padding-top bridges the gap to keep hover alive */}
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-lg border border-[#D4AF37]/15 bg-[#0A0A0A]/98 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
                {industryPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={localizeHref(`/industries/${page.slug}`, locale)}
                    className="block border-b border-[#D4AF37]/8 px-5 py-3.5 text-sm text-white/70 transition-colors last:border-b-0 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  >
                    {pick(page.navLabel, locale)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale} />
          <Link
            href={localizeHref('/contact', locale)}
            className="group relative hidden overflow-hidden rounded-full bg-[#D4AF37] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-all duration-300 hover:[box-shadow:0_0_20px_4px_rgba(212,175,55,0.35)] sm:inline-flex sm:items-center sm:justify-center"
          >
            {pick(site.primaryCta, locale)}
          </Link>
          <MobileMenu
            links={[
              ...(navLinks as unknown as { href: string; label: { en: string; ja: string } }[]),
              ...industryPages.map((page) => ({ href: `/industries/${page.slug}`, label: page.navLabel })),
            ].map((link) => ({ ...link, href: localizeHref(link.href, locale) }))}
            ctaLabel={pick(site.primaryCta, locale)}
            locale={locale}
            contactHref={localizeHref('/contact', locale)}
          />
        </div>
      </div>
    </motion.header>
  );
}
