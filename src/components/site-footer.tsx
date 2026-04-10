import Link from 'next/link';
import { navLinks } from '@/lib/home-content';
import { pick, ui } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

export function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  return (
    <footer className="border-t border-[#D4AF37]/10 bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-[#D4AF37] md:text-2xl">
              STREETSHOW PRODUCTIONS
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              {pick(site.description, locale)}
            </p>
            <p className="mt-3 text-sm text-white/55 md:text-base">{pick(site.location, locale)}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70">{pick(ui.sections.navigation, locale)}</p>
            <div className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#D4AF37] md:text-base">
                  {pick(link.label, locale)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70">{pick(ui.sections.contact, locale)}</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/65 md:text-base">
              <span>{pick(site.location, locale)}</span>
              <a href="mailto:admin@streetshowproduction.com" className="transition-colors hover:text-[#D4AF37]">
                admin@streetshowproduction.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#D4AF37]/10 pt-6 text-center text-sm text-white/45">
          © 2026 Streetshow Productions
        </div>
      </div>
    </footer>
  );
}
