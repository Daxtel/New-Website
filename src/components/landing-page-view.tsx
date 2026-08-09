import Link from 'next/link';
import type { LandingPage } from '@/lib/landing-pages';
import { getCatalogProject, getCatalogService } from '@/lib/catalog';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/components/json-ld';
import { site } from '@/lib/site';
import { pick } from '@/lib/i18n';
import { localizeHref } from '@/lib/alternates';

type Props = {
  page: LandingPage;
  locale: 'en' | 'ja';
  breadcrumbParent: { name: string; url: string };
};

export function LandingPageView({ page, locale, breadcrumbParent }: Props) {
  const basePath = `/${page.kind === 'location' ? 'locations' : 'industries'}/${page.slug}`;
  const pageUrl = `${site.url}${localizeHref(basePath, locale)}`;
  const h1 = pick(page.h1, locale);

  const faqSchema = buildFaqSchema(
    page.faqs.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })),
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    breadcrumbParent,
    { name: h1, url: pageUrl },
  ]);

  const relatedServices = page.relatedServices
    .map((s) => getCatalogService(s))
    .filter(Boolean);
  const relatedProjects = page.relatedProjects
    .map((p) => getCatalogProject(p))
    .filter(Boolean);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="border-b border-[#D4AF37]/10 px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
            {h1}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-body-text md:text-xl lg:text-2xl">
            {pick(page.intro, locale)}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#D4AF37]/70 md:text-base">
            {pick(page.trustLine, locale)}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={localizeHref('/contact', locale)}
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              {locale === 'ja' ? '相談する' : "Let's Talk"}
            </Link>
            <Link
              href={localizeHref('/work', locale)}
              className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-colors hover:border-[#D4AF37]"
            >
              {locale === 'ja' ? '制作実績を見る' : 'View Selected Work'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sections ────────────────────────────────────────────── */}
      {page.sections.map((section, idx) => (
        <section
          key={idx}
          className={`px-6 py-16 md:px-10 md:py-24 ${idx % 2 === 1 ? 'bg-[#141414]' : ''}`}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(section.heading, locale)}
            </h2>
            {section.body && (
              <p className="mt-6 max-w-4xl text-base leading-relaxed text-body-text md:text-lg">
                {pick(section.body, locale)}
              </p>
            )}
            {section.points && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {section.points.map((point) => (
                  <div
                    key={point.en}
                    className="border border-[#D4AF37]/10 bg-[#0A0A0A] p-6"
                  >
                    <p className="text-base leading-relaxed text-body-text md:text-lg">
                      {pick(point, locale)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── Related services ────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="border-t border-[#D4AF37]/10 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
              {locale === 'ja' ? '関連サービス' : 'Related Services'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedServices.map((svc) => (
                <Link
                  key={svc!.slug}
                  href={localizeHref(`/services/${svc!.slug}`, locale)}
                  className="block border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30"
                >
                  <h3 className="text-lg font-semibold text-heading">{pick(svc!.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{pick(svc!.intro, locale)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related work ────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-[#D4AF37]/10 bg-[#141414] px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
              {locale === 'ja' ? '関連実績' : 'Related Work'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj!.slug}
                  href={localizeHref(`/work/${proj!.slug}`, locale)}
                  className="block border border-[#D4AF37]/10 bg-[#0A0A0A] p-6 transition-all hover:border-[#D4AF37]/30"
                >
                  <h3 className="text-lg font-semibold text-heading">{pick(proj!.title, locale)}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/45">
                    {proj!.category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-[#D4AF37]/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
            {locale === 'ja' ? 'よくある質問' : 'Frequently Asked Questions'}
          </h2>
          <div className="mt-10 space-y-6 md:space-y-8">
            {page.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[#D4AF37]/10 pb-6 md:pb-8">
                <h3 className="text-lg font-semibold text-heading md:text-xl">{pick(faq.q, locale)}</h3>
                <p className="mt-3 text-base leading-relaxed text-body-text md:text-lg">{pick(faq.a, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="bg-[#D4AF37] p-8 md:p-12 lg:p-14">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl lg:text-4xl">
              {pick(page.cta.title, locale)}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">
              {pick(page.cta.body, locale)}
            </p>
            <div className="mt-8">
              <Link
                href={localizeHref('/contact', locale)}
                className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
              >
                {locale === 'ja' ? '日本市場参入のご相談' : 'Discuss Your Japan Launch'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
