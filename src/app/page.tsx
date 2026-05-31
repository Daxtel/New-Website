import Link from 'next/link';
import type { Metadata } from 'next';
import { featuredWork, process, services, whoWeWorkWith } from '@/lib/home-content';
import { pick, ui } from '@/lib/i18n';
import { homePage, site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { ClientStrip } from '@/components/client-strip';
import { JsonLd, homeFaqSchema, buildBreadcrumbSchema } from '@/components/json-ld';
import { AnimatedHero } from '@/components/motion/AnimatedHero';
import { AnimatedWorkCard } from '@/components/motion/AnimatedWorkCard';
import { AnimatedServiceCard } from '@/components/motion/AnimatedServiceCard';
import { AnimatedProcessStep } from '@/components/motion/AnimatedProcessStep';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <AnimatedHero
        eyebrow={pick(homePage.eyebrow, locale)}
        headline={pick(homePage.headline, locale)}
        subheadline={pick(homePage.subheadline, locale)}
        trustLine={pick(homePage.trustLine, locale)}
        primaryCtaLabel={pick(site.primaryCta, locale)}
        secondaryCtaLabel={pick(ui.cta.viewSelectedWork, locale)}
      />

      {/* ── Client Strip ─────────────────────────────────────────── */}
      <ClientStrip locale={locale} />

      {/* ── Who We Work With ─────────────────────────────────────── */}
      <section className="px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37]">
                {pick(whoWeWorkWith.title, locale)}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
                {pick(whoWeWorkWith.intro, locale)}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whoWeWorkWith.items.map((item, i) => (
              <ScrollReveal key={pick(item, 'en')} delay={i * 0.08}>
                <div className="min-h-[140px] border border-[#D4AF37]/10 bg-[#141414] p-6 transition-colors duration-300 hover:border-[#D4AF37]/30 hover:bg-[#141414]">
                  <p className="text-base font-medium leading-snug text-[#D4AF37] md:text-lg">
                    {pick(item, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work ─────────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                  {pick(featuredWork.title, locale)}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
                  {pick(featuredWork.subtitle, locale)}
                </p>
              </div>
              <Link
                href="/work"
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors hover:text-[#D4AF37]"
              >
                {pick(ui.cta.viewAllWork, locale)}
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWork.items.map((item, i) => (
              <AnimatedWorkCard
                key={pick(item.title, 'en')}
                slug={item.slug}
                videoSrc={item.videoSrc}
                title={pick(item.title, locale)}
                proofLine={pick(item.proofLine, locale)}
                description={pick(item.description, locale)}
                ctaLabel={pick(ui.cta.viewCaseStudy, locale)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="bg-[#141414] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {pick(services.title, locale)}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
                {pick(services.subtitle, locale)}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, i) => (
              <AnimatedServiceCard
                key={pick(service.title, 'en')}
                title={pick(service.title, locale)}
                description={pick(service.description, locale)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {pick(process.title, locale)}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
                {pick(process.intro, locale)}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, i) => (
              <AnimatedProcessStep
                key={step.number}
                number={step.number}
                title={pick(step.title, locale)}
                description={pick(step.description, locale)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(
                {
                  en: 'Planning a launch, repositioning, or premium campaign in Japan?',
                  ja: '日本でのローンチ、再構築、またはプレミアムキャンペーンを計画中ですか？',
                },
                locale,
              )}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              {pick(
                {
                  en: 'Streetshow Productions works with selected brands and operators where strategic clarity, cultural nuance, and execution quality materially affect outcomes. If that describes your situation, we should discuss fit.',
                  ja: 'Streetshow Productionsは、戦略の明確さ、文化的ニュアンス、実行品質が成果を大きく左右する場面で、厳選されたブランドや事業者を支援します。ご状況に当てはまる場合は、適合性についてご相談ください。',
                },
                locale,
              )}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              {pick(
                {
                  en: 'Initial calls are used to assess goals, market context, and scope. We respond to serious inquiries promptly.',
                  ja: '初回の打ち合わせでは、目標、市場背景、スコープを確認します。真剣なご相談には速やかに対応します。',
                },
                locale,
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-all duration-300 hover:[box-shadow:0_0_24px_6px_rgba(212,175,55,0.35)]"
              >
                {pick(site.primaryCta, locale)}
              </Link>
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#D4AF37]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-all duration-300 hover:border-[#D4AF37] hover:[box-shadow:0_0_16px_2px_rgba(212,175,55,0.2)]"
              >
                <span className="absolute inset-0 rounded-full bg-[#D4AF37] scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0A0A0A]">
                  {pick(site.secondaryCta, locale)}
                </span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 text-sm text-white/50">{pick(site.location, locale)}</div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
