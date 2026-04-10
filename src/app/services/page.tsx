import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCatalogBilingual } from '@/lib/catalog-bilingual';
import { pick, ui } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { aboutPageBilingual } from '@/lib/secondary-pages-bilingual';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Services for Japan market entry, localization, hospitality creative strategy, video production, photography, CGI, and 3D billboard execution.',
};

export default async function ServicesPage() {
  const locale = await getLocale();

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(ui.sections.services, locale)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              {pick({
                en: 'Streetshow Productions supports premium brands entering or operating in Japan through strategy, localization, and high-level creative execution.',
                ja: 'Streetshow Productionsは、日本市場への進出・運営を目指すプレミアムブランドを、戦略、ローカライズ、ハイレベルなクリエイティブ実行で支援します。',
              }, locale)}
            </p>
          </div>

          <div className="mt-12 space-y-px">
            {serviceCatalogBilingual.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="block bg-[#141414] p-8 transition-all hover:bg-[#D4AF37]/5 hover:scale-[1.02] md:p-10 lg:p-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-center gap-5">
                    <span className="text-4xl font-black text-[#D4AF37]/20 md:text-5xl">{service.number}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">{pick(service.title, locale)}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 md:text-base lg:text-lg">
                        {pick(service.description, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-[#D4AF37] p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{pick(ui.sections.discussProject, locale)}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0A0A0A]/70 md:text-base">
                  {pick(aboutPageBilingual.credibility, locale)}
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(ui.cta.letsTalk, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
