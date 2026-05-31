import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCatalog } from '@/lib/catalog';
import { pick, ui } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { aboutPageBilingual } from '@/lib/secondary-pages-bilingual';
import { JsonLd, buildItemListSchema, buildBreadcrumbSchema } from '@/components/json-ld';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { AnimatedServiceRow } from '@/components/motion/AnimatedServiceRow';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Services for Japan market entry, localization, hospitality creative strategy, video production, photography, CGI, and 3D billboard execution.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const locale = await getLocale();

  const servicesItemList = buildItemListSchema({
    name: 'Services — Streetshow Productions',
    items: serviceCatalog.map((s) => ({
      name: pick(s.title, locale),
      url: `${site.url}/services/${s.slug}`,
      description: pick(s.description, locale),
    })),
  });
  const servicesBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Services', url: `${site.url}/services` },
  ]);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[servicesItemList, servicesBreadcrumb]} />
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
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
            {serviceCatalog.map((service, i) => (
              <AnimatedServiceRow
                key={service.slug}
                slug={service.slug}
                number={service.number}
                title={pick(service.title, locale)}
                description={pick(service.description, locale)}
                index={i}
              />
            ))}
          </div>

          <ScrollReveal className="mt-12">
          <div className="bg-[#D4AF37] p-8 md:p-10 lg:p-12">
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
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
