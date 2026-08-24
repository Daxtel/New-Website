import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { auditPage } from '@/lib/audit-page';
import { projectCatalog } from '@/lib/catalog';
import { JsonLd, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/components/json-ld';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ClientStrip } from '@/components/client-strip';
import { SmartVideo } from '@/components/motion/SmartVideo';
import { AuditScorecard } from '@/components/audit/AuditScorecard';
import { AuditCtaLink } from '@/components/audit/AuditCtaLink';

const PATH = `/services/${auditPage.slug}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = pick(auditPage.meta.title, locale);
  const description = pick(auditPage.meta.description, locale);
  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(PATH, locale),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Streetshow Productions',
      url: locale === 'ja' ? `/ja${PATH}` : PATH,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: pick(auditPage.hero.eyebrow, locale) }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  };
}

const sectionCls = 'px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16';
const contactHref = (locale: Locale) => `${localizeHref('/contact', locale)}?inquiry=${auditPage.slug}`;

export default async function JapanCreativePerformanceAuditPage() {
  const locale = await getLocale();
  const p = auditPage;
  const url = `${site.url}${PATH}`;

  const serviceSchema = buildServiceSchema({
    name: pick({ en: 'Japan Creative Performance Audit', ja: '日本向けクリエイティブ・パフォーマンス監査' }, locale),
    description: pick(p.meta.description, locale),
    url,
    slug: p.slug,
    offer: { price: '350000', priceCurrency: 'JPY' },
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Services', url: `${site.url}/services` },
    { name: pick({ en: 'Japan Creative Performance Audit', ja: '日本向けクリエイティブ・パフォーマンス監査' }, locale), url },
  ]);
  const faqSchema = buildFaqSchema(p.faqs.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })));

  const relevantProjects = p.work.slugs
    .map((slug) => projectCatalog.find((proj) => proj.slug === slug))
    .filter((proj): proj is NonNullable<typeof proj> => Boolean(proj));

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />

      {/* ── Hero ── */}
      <section className="border-b border-[#D4AF37]/10 px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">{pick(p.hero.eyebrow, locale)}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1 className="mt-5 max-w-4xl text-[clamp(1.9rem,4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(p.hero.h1, locale)}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body-text">{pick(p.hero.supporting, locale)}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-text">{pick(p.hero.priceLabel, locale)}</p>
                <p className="text-2xl font-bold text-[#D4AF37] md:text-3xl">{pick(p.hero.price, locale)}</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <p className="text-lg font-medium text-heading">{pick(p.hero.duration, locale)}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.32}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <AuditCtaLink
                href={contactHref(locale)}
                event="japan_audit_cta_click"
                source="hero_primary"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-colors hover:bg-[#D4AF37]/90"
              >
                {pick(p.hero.primaryCta, locale)}
              </AuditCtaLink>
              <AuditCtaLink
                href="#what-we-review"
                event="japan_audit_review_click"
                source="hero_secondary"
                className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-colors hover:border-[#D4AF37]"
              >
                {pick(p.hero.secondaryCta, locale)}
              </AuditCtaLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Proof strip (reuses the homepage client strip) ── */}
      <ClientStrip locale={locale} />

      {/* ── Problem ── */}
      <section className={sectionCls}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading lg:sticky lg:top-28">
              {pick(p.problem.heading, locale)}
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {p.problem.body.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <p className="text-lg leading-relaxed text-body-text">{pick(para, locale)}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two moments ── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(p.moments.heading, locale)}
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {p.moments.columns.map((col, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="h-full border-l-2 border-[#D4AF37]/25 pl-6">
                  <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(col.title, locale)}</h3>
                  <p className="mt-4 text-base leading-relaxed text-body-text">{pick(col.body, locale)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we review ── */}
      <section id="what-we-review" className={sectionCls}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(p.review.heading, locale)}
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-body-text">{pick(p.review.supporting, locale)}</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {p.review.categories.map((cat, i) => (
              <ScrollReveal key={cat.title.en} delay={(i % 3) * 0.06}>
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted-text tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#D4AF37]">{pick(cat.title, locale)}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-body-text">{pick(cat.body, locale)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables + illustrative scorecard ── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
                {pick(p.deliverables.heading, locale)}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-body-text">{pick(p.deliverables.supporting, locale)}</p>
            </div>
          </ScrollReveal>

          {/* Deliverables fill the main column; the illustrative scorecard rides
              sticky alongside so neither column is left empty. */}
          <div className="mt-12 grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_340px] lg:gap-x-16">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {p.deliverables.items.map((item, i) => (
                <ScrollReveal key={item.n} delay={(i % 2) * 0.06}>
                  <div className="flex gap-4 border-t border-white/10 pt-5">
                    <span className="font-mono text-sm text-[#D4AF37] tabular-nums">{item.n}</span>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-[0.12em] text-heading">{pick(item.title, locale)}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-body-text">{pick(item.body, locale)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal direction="left">
              <div className="lg:sticky lg:top-28">
                <AuditScorecard locale={locale} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Scope & investment ── */}
      <section className={sectionCls}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="p-8 md:p-14">
                <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{pick(p.scope.heading, locale)}</h2>
                <p className="mt-3 text-base font-semibold text-[#B8860B] md:text-lg">
                  {pick(p.scope.price, locale)} · {pick(p.scope.duration, locale)}
                </p>

                <AuditCtaLink
                  href={contactHref(locale)}
                  event="japan_audit_cta_click"
                  source="scope"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-opacity hover:opacity-90"
                >
                  {pick(p.scope.cta, locale)}
                </AuditCtaLink>

                <div className="mt-10 border-t border-black/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999]">
                    {locale === 'ja' ? '対象範囲' : "What's included"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.scope.includes.map((item) => (
                      <span key={item.en} className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[#333]">
                        {pick(item, locale)}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-8 text-sm text-[#888]">{pick(p.scope.note, locale)}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What this is not ── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
                {pick(p.notIncluded.heading, locale)}
              </h2>
              <p className="mt-6 text-base text-body-text">{pick(p.notIncluded.intro, locale)}</p>
            </div>
          </ScrollReveal>
          <div>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {p.notIncluded.items.map((item) => (
                <li key={item.en} className="flex items-start gap-3 text-[15px] text-muted-text">
                  <span aria-hidden="true" className="mt-[10px] h-px w-3 shrink-0 bg-white/25" />
                  <span>{pick(item, locale)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-body-text">{pick(p.notIncluded.footer, locale)}</p>
          </div>
        </div>
      </section>

      {/* ── Strategic value ── */}
      <section className={sectionCls}>
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(p.value.heading, locale)}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-body-text">{pick(p.value.body, locale)}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Relevant work ── */}
      {relevantProjects.length > 0 && (
        <section className={sectionCls}>
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
                {pick(p.work.heading, locale)}
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relevantProjects.map((project, i) => {
                const projectVideo = (project.media as { video?: string }).video;
                return (
                  <ScrollReveal key={project.slug} delay={i * 0.08}>
                    <a href={localizeHref(`/work/${project.slug}`, locale)} className="group block overflow-hidden rounded-2xl bg-[#141414] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.55)] transition-colors hover:bg-[#D4AF37]/5">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                        {projectVideo ? (
                          <SmartVideo src={projectVideo} alt={pick(project.title, locale)} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={project.media.image} alt={pick(project.media.alt, locale)} className="absolute inset-0 h-full w-full object-cover" />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>
                      <div className="p-6">
                        <p className="text-[11px] uppercase tracking-[0.15em] text-white/45">{project.category}</p>
                        <h3 className="mt-2 text-lg font-semibold leading-tight text-[#D4AF37]">{pick(project.title, locale)}</h3>
                      </div>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-8 text-2xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-3xl">
              {locale === 'ja' ? 'よくあるご質問' : 'Frequently Asked Questions'}
            </h2>
          </ScrollReveal>
          <div className="divide-y divide-white/8">
            {p.faqs.map((item) => (
              <details key={item.q.en} className="group py-6 first:pt-0 last:pb-0">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold text-[#D4AF37] transition-colors group-hover:text-[#D4AF37]/80 md:text-lg">{pick(item.q, locale)}</h3>
                    <span className="mt-1 text-[#D4AF37] transition-transform group-open:rotate-45">+</span>
                  </div>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-body-text md:text-lg">{pick(item.a, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-[#D4AF37] p-10 md:p-16">
          <h2 className="max-w-3xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-black uppercase leading-[0.95] tracking-tight text-[#0A0A0A]">
            {pick(p.finalCta.heading, locale)}
          </h2>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[#0A0A0A]">
            <span className="text-lg font-bold">{pick(p.finalCta.service, locale)}</span>
            <span className="text-base">{pick(p.finalCta.price, locale)}</span>
            <span className="text-base">·</span>
            <span className="text-base">{pick(p.finalCta.duration, locale)}</span>
          </div>
          <p className="mt-3 text-[15px] text-[#0A0A0A]/75">{pick(p.finalCta.deliverables, locale)}</p>
          <AuditCtaLink
            href={contactHref(locale)}
            event="japan_audit_cta_click"
            source="final"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-transform hover:scale-[1.02]"
          >
            {pick(p.finalCta.cta, locale)}
          </AuditCtaLink>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#0A0A0A]/70">{pick(p.finalCta.microcopy, locale)}</p>
        </div>
      </section>
    </main>
  );
}
