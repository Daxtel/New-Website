import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { site } from '@/lib/site';
import { japanExecution as p } from '@/lib/japan-execution';
import { JsonLd, buildServiceSchema, buildBreadcrumbSchema } from '@/components/json-ld';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SmartVideo } from '@/components/motion/SmartVideo';
import { ReservedImage } from '@/components/japan-execution/ReservedImage';
import { JapanExecutionQuiz } from '@/components/japan-execution/JapanExecutionQuiz';

const PATH = p.path;
const URL_ABS = `${site.url}${PATH}`;
const sectionCls = 'px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32';

/**
 * English-only page. The audience is international agency and brand teams, so
 * there is no Japanese track: the /ja render canonicals here and is noindexed,
 * and the sitemap lists this URL with no ja alternate.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = p.metaTitle;
  const description = p.metaDescription;
  return {
    // metaTitle already carries the brand, so mark it absolute and stop the
    // layout template appending a second suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: PATH },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Streetshow Productions',
      url: PATH,
      // Page-specific share image cut from the hero still, so a share of this
      // page shows the arena rather than the site-wide default.
      images: [
        {
          url: '/images/japan-execution/og-japan-execution.jpg',
          width: 1200,
          height: 630,
          alt: p.hero.still.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/japan-execution/og-japan-execution.jpg'],
    },
    ...(locale === 'ja' ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function JapanExecutionPage() {
  const serviceSchema = buildServiceSchema({
    name: 'Japan Event Production and Execution',
    description:
      'Event production, fabrication and bilingual production coordination in Japan for international agencies and brands.',
    url: URL_ABS,
    slug: 'japan-execution',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Japan Execution', url: URL_ABS },
  ]);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="border-b border-[#D4AF37]/10 px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pb-24 md:pt-28 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <h1 className="text-display font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.hero.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body-text md:text-xl">
              {p.hero.subhead}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
              {p.hero.proof.join(' · ')}
            </p>
            <a
              href={p.hero.ctaHref}
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              {p.hero.cta}
            </a>
          </div>

          {/* Muted autoplay loop when the video exists, reserved still until then.
              Either way the box is the same size, so nothing shifts on load. */}
          <div className="mt-12 overflow-hidden rounded-2xl">
            {p.hero.video.ready && p.hero.video.src ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#141414]">
                <SmartVideo
                  src={p.hero.video.src}
                  alt={p.hero.still.alt}
                  autoPlayOnMobile
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : (
              <ReservedImage slot={p.hero.still} />
            )}
          </div>
        </div>
      </section>

      {/* ── The problem ─────────────────────────────────────────── */}
      <section className={sectionCls}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.problem.h2}
            </h2>
            <div className="mt-8 space-y-5">
              {p.problem.body.map((para) => (
                <p key={para} className="text-base leading-relaxed text-body-text md:text-lg">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Intent ──────────────────────────────────────────────── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.intent.h2}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-body-text md:text-lg">
              {p.intent.body}
            </p>
          </ScrollReveal>
          <ul className="mt-10 space-y-5">
            {p.intent.items.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.06}>
                <li className="border-l-2 border-[#D4AF37]/25 pl-5 text-base leading-relaxed text-body-text md:text-lg">
                  {item}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>

        {/* Reference imagery for this section. Wider than the text column on
            purpose, so it reads as a band under the argument rather than an
            inline figure. Carries no venue and no client. */}
        <div className="mx-auto mt-14 max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {p.intent.images.map((slot, i) => (
              <ScrollReveal key={slot.src} delay={i * 0.06}>
                <ReservedImage slot={slot} pan={i % 2 === 1 ? 'b' : 'a'} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scope ───────────────────────────────────────────────── */}
      <section className={sectionCls}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="max-w-4xl text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.scope.h2}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {p.scope.columns.map((col, i) => (
              <ScrollReveal key={col.heading} delay={i * 0.08}>
                <div className="border-l-2 border-[#D4AF37]/25 pl-6">
                  <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-2xl">
                    {col.heading}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-body-text md:text-lg">
                    {col.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12">
            <ReservedImage slot={p.scope.image} className="mx-auto max-w-3xl" />
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-12 max-w-4xl text-base leading-relaxed text-[#D4AF37]/80 md:text-lg">
              {p.scope.closing}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────────── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.work.h2}
            </h2>
          </ScrollReveal>

          <div className="mt-14 space-y-16 md:space-y-20">
            {p.work.entries.map((entry, i) => (
              <ScrollReveal key={entry.title}>
                <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  {/* Alternating sides on desktop. On mobile the image always
                      comes first, which order-1/order-2 keeps true. */}
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    {/* Portrait assets get a width cap so a tall frame does not
                        stretch the row far past its text column. */}
                    <ReservedImage
                      slot={entry.image}
                      className={entry.image.height > entry.image.width ? 'mx-auto max-w-sm' : ''}
                      pan={i % 2 === 1 ? 'b' : 'a'}
                    />
                  </div>
                  <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                      {entry.venue}
                    </p>
                    <p className="mt-5 text-base leading-relaxed text-body-text md:text-lg">
                      {entry.body}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="mx-auto mt-20 max-w-4xl text-center text-subtitle font-semibold leading-snug text-[#D4AF37]">
              {p.work.pullQuote}
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* ── Ground truth ────────────────────────────────────────── */}
      <section className={sectionCls}>
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.groundTruth.h2}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-12">
            {p.groundTruth.items.map((item, i) => (
              <ScrollReveal key={item.lead} delay={(i % 2) * 0.08}>
                <div>
                  <h3 className="text-base font-bold leading-snug text-heading md:text-lg">
                    {item.lead}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-body-text">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-12 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 md:text-lg">
              {p.groundTruth.closing}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How we plug in ──────────────────────────────────────── */}
      <section className={`bg-[#141414] ${sectionCls}`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.plugIn.h2}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {p.plugIn.columns.map((col, i) => (
              <ScrollReveal key={col.heading} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-base font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                    {col.heading}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-body-text">{col.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-12 max-w-4xl text-base leading-relaxed text-[#D4AF37]/80 md:text-lg">
              {p.plugIn.closing}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── The form ────────────────────────────────────────────── */}
      <section id="japan-brief" className={`scroll-mt-24 ${sectionCls}`}>
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-title font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {p.form.h2}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-body-text md:text-lg">
              {p.form.subhead}
            </p>
          </ScrollReveal>
          <div className="mt-14">
            <JapanExecutionQuiz />
          </div>
          <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
            {p.closingLine}
          </p>
        </div>
      </section>
    </main>
  );
}
