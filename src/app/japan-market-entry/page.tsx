import type { Metadata } from 'next';
import Link from 'next/link';
import { pick } from '@/lib/i18n';
import { japanMarketEntryPageBilingual } from '@/lib/strategic-pages-bilingual';
import { getLocale } from '@/lib/locale';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { blogPosts } from '@/lib/blog';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { AuditCallout } from '@/components/audit/AuditCallout';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  return {
    title: {
      absolute: isJa
        ? '海外ブランドの日本市場参入クリエイティブパートナー | Streetshow Productions'
        : 'Japan Market Entry Creative Partner for Premium Brands | Streetshow Productions',
    },
    description: isJa
      ? '日本市場に参入する海外プレミアムブランドを、戦略、ローカライズ、映像制作、キャンペーン実行で包括的に支援。ホスピタリティ、不動産、国際ブランド向け。福岡・東京。'
      : 'Strategic Japan market entry, localization, and premium execution support for hospitality, real estate, and international brands. Based in Fukuoka and Tokyo.',
    alternates: buildAlternates('/japan-market-entry', locale),
  };
}

export default async function JapanMarketEntry() {
  const locale = await getLocale();
  const shell = japanMarketEntryPageBilingual;

  // Guides visible for this language track, newest first.
  const guides = blogPosts
    .filter((p) => (locale === 'ja' ? p.lang !== 'en' : p.lang !== 'ja'))
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 6);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="border-b border-[#D4AF37]/10 px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <ScrollReveal>
            <h1 className="mx-auto max-w-5xl text-[clamp(1.9rem,4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
              {pick(shell.title, locale)}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
              {pick(shell.subtitle, locale)}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-sm uppercase tracking-[0.15em] text-white/55 md:text-base">
              {pick(shell.support, locale)}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={localizeHref('/contact', locale)} className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] cursor-pointer transition-all duration-300 hover:[box-shadow:0_0_20px_4px_rgba(212,175,55,0.35)]">
                {pick(shell.primaryCta, locale)}
              </Link>
              <Link href={localizeHref('/work', locale)} className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white cursor-pointer transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]">
                {pick(shell.secondaryCta, locale)}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
              {pick(shell.sections.whyJapan.title, locale)}
            </h2>
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-body-text md:text-xl">
              {pick(shell.sections.whyJapan.intro, locale)}
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.whyJapan.points.map((point, i) => (
              <ScrollReveal key={point.en} delay={i * 0.07}>
                <div className="border-l-2 border-[#D4AF37]/25 pl-6">
                  <p className="text-base leading-relaxed text-body-text md:text-lg">{pick(point, locale)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141414] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
            {pick(shell.sections.mistakes.title, locale)}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 md:text-lg">
            {pick(shell.sections.mistakes.intro, locale)}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.mistakes.points.map((point) => (
              <div key={point.en} className="border-l-2 border-[#D4AF37]/25 pl-6">
                <p className="text-base leading-relaxed text-body-text md:text-lg">{pick(point, locale)}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-base leading-relaxed text-body-text md:text-lg">
            {pick(shell.sections.mistakes.closing, locale)}
          </p>
        </div>
      </section>

      {/* ── Lower-friction entry: Japan Creative Performance Audit ── */}
      <section className="px-6 pt-16 md:px-10 md:pt-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <AuditCallout variant="jme" locale={locale} />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
            {pick(shell.sections.support.title, locale)}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-body-text md:text-xl">
            {pick(shell.sections.support.intro, locale)}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shell.sections.support.points.map((point) => (
              <div key={point.title.en} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)]">
                <h3 className="text-xl font-semibold text-heading md:text-2xl">{pick(point.title, locale)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body-text md:text-base">{pick(point.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
              {locale === 'ja' ? '日本市場参入ガイド' : 'Japan Market Entry Guides'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((post) => (
                <Link
                  key={post.slug}
                  href={localizeHref(`/blog/${post.slug}`, locale)}
                  className="block rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)] transition-all hover:border-[#D4AF37]/25"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-white/45">{pick(post.category, locale)}</p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-[#D4AF37]">{pick(post.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-3">{pick(post.excerpt, locale)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#141414] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
            {pick(shell.sections.fit.title, locale)}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-body-text md:text-lg">
            {pick(shell.sections.fit.intro, locale)}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.fit.points.map((point) => (
              <div key={point.en} className="border-l-2 border-[#D4AF37]/25 pl-6">
                <p className="text-base leading-relaxed text-body-text md:text-lg">{pick(point, locale)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-[#D4AF37] p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl lg:text-4xl">
              {pick(shell.sections.cta.title, locale)}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">
              {pick(shell.sections.cta.body, locale)}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#0A0A0A]/70 md:text-base">
              {pick(shell.sections.cta.reassurance, locale)}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={localizeHref('/contact', locale)} className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(shell.primaryCta, locale)}
              </Link>
              <Link href={localizeHref('/work', locale)} className="inline-flex items-center justify-center rounded-full border border-[#0A0A0A]/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">
                {pick(shell.secondaryCta, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
