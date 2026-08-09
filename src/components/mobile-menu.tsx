'use client';

import { useState, useEffect, startTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: string;
  label: { en: string; ja: string };
};

export function MobileMenu({ links, ctaLabel, locale = 'en', contactHref = '/contact' }: { links: NavLink[]; ctaLabel: string; locale?: 'en' | 'ja'; contactHref?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Close on route change — startTransition avoids cascading-render lint warning
  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <div className="flex flex-col gap-[5px]">
          <span
            className={`block h-[2px] w-6 bg-[#D4AF37] transition-all duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#D4AF37] transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#D4AF37] transition-all duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out menu */}
      <nav
        className={`fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-[#0A0A0A] px-8 pt-24 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'text-body-text hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]'
              }`}
            >
              {locale === 'ja' ? link.label.ja : link.label.en}
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-[#D4AF37]/12 pt-8">
          <Link
            href={contactHref}
            className="flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]"
          >
            {ctaLabel}
          </Link>
        </div>
      </nav>
    </>
  );
}
