import Link from 'next/link';
import type { Metadata } from 'next';
import { featuredWork, process, services, whoWeWorkWith } from '@/lib/home-content';
import { pick, ui } from '@/lib/i18n';
import { homePage, site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { ClientStrip } from '@/components/client-strip';
import { JsonLd, homeFaqSchema, buildBreadcrumbSchema } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Japan Market Entry & Premium Creative Production | Streetshow Productions',
  description:
    'Strategy-first creative production studio in Fukuoka and Tokyo. Japan market entry, localization, luxury hospitality creative, video, CGI, and 3D anamorphic billboards for premium brands.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const locale = await getLocale();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
  ]);
  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[homeFaqSchema, breadcrumbSchema]} />
      <section className="relative overflow-hidden border-b border-[#D4AF37]/10">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-28 lg:pt-36">
          <div className="max-w-5xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70 sm:text-sm">
              {pick(homePage.eyebrow, locale)}
            </p>
            <h1 className="mt-5 text-[clamp(2.25rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37] sm:mt-6">
              {pick(homePage.headline, locale)}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 sm:mt-8 md:text-lg lg:text-xl">
              {pick(homePage.subheadline, locale)}
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/55 sm:mt-5 md:text-base">
              {pick(homePage.trustLine, locale)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]"
              >
                {pick(site.primaryCta, locale)}
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
              >
                {pick(ui.cta.viewSelectedWork, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ClientStrip locale={locale} />

      <section className="px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37]">
              {pick(whoWeWorkWith.title, locale)}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{pick(whoWeWorkWith.intro, locale)}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whoWeWorkWith.items.map((item) => (
              <div key={pick(item, 'en')} className="min-h-[140px] border border-[#D4AF37]/10 bg-[#141414] p-6">
                <p className="text-base font-medium leading-snug text-[#D4AF37] md:text-lg">{pick(item, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {pick(featuredWork.title, locale)}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{pick(featuredWork.subtitle, locale)}</p>
            </div>
            <Link href="/work" className="text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors hover:text-[#D4AF37]">
              {pick(ui.cta.viewAllWork, locale)}
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWork.items.map((item) => (
              <Link
                key={pick(item.title, 'en')}
                href={`/work/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden bg-[#141414] transition-all hover:bg-[#D4AF37]/5 hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 md:text-xs">{pick(item.proofLine, locale)}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-tight text-[#D4AF37] md:text-xl">{pick(item.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{pick(item.description, locale)}</p>
                  <div className="mt-auto pt-5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors group-hover:text-[#D4AF37] md:text-xs">{pick(ui.cta.viewCaseStudy, locale)} →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141414] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(services.title, locale)}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">{pick(services.subtitle, locale)}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service) => (
              <div key={pick(service.title, 'en')} className="bg-[#0A0A0A] p-8">
                <h3 className="text-xl font-semibold text-[#D4AF37]">{pick(service.title, locale)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{pick(service.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(process.title, locale)}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">{pick(process.intro, locale)}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="mb-4 text-6xl font-black leading-none text-[#D4AF37]/15">{step.number}</div>
                <h3 className="text-xl font-semibold text-[#D4AF37]">{pick(step.title, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{pick(step.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
            {pick({
              en: 'Planning a launch, repositioning, or premium campaign in Japan?',
              ja: '日本でのローンチ、再構築、またはプレミアムキャンペーンを計画中ですか？',
            }, locale)}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
            {pick({
              en: 'Streetshow Productions works with selected brands and operators where strategic clarity, cultural nuance, and execution quality materially affect outcomes. If that describes your situation, we should discuss fit.',
              ja: 'Streetshow Productionsは、戦略の明確さ、文化的ニュアンス、実行品質が成果を大きく左右する場面で、厳選されたブランドや事業者を支援します。ご状況に当てはまる場合は、適合性についてご相談ください。',
            }, locale)}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            {pick({
              en: 'Initial calls are used to assess goals, market context, and scope. We respond to serious inquiries promptly.',
              ja: '初回の打ち合わせでは、目標、市場背景、スコープを確認します。真剣なご相談には速やかに対応します。',
            }, locale)}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]"
            >
              {pick(site.primaryCta, locale)}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#D4AF37]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
            >
              {pick(site.secondaryCta, locale)}
            </Link>
          </div>
          <div className="mt-10 text-sm text-white/50">{pick(site.location, locale)}</div>
        </div>
      </section>
    </main>
  );
}
