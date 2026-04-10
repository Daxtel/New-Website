import type { Metadata } from 'next';
import Link from 'next/link';
import { pick } from '@/lib/i18n';
import { japanMarketEntryPageBilingual } from '@/lib/strategic-pages-bilingual';
import { getLocale } from '@/lib/locale';

export const metadata: Metadata = {
  title: 'Japan Market Entry for Premium Brands',
  description:
    'Strategic Japan market entry, localization, and premium execution support for hospitality, real estate, and international brands.',
};

export default async function JapanMarketEntry() {
  const locale = await getLocale();
  const shell = japanMarketEntryPageBilingual;

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="border-b border-[#D4AF37]/10 px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-5xl text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37]">
            {pick(shell.title, locale)}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
            {pick(shell.subtitle, locale)}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-sm uppercase tracking-[0.15em] text-white/55 md:text-base">
            {pick(shell.support, locale)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">
              {pick(shell.primaryCta, locale)}
            </Link>
            <Link href="/work" className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white">
              {pick(shell.secondaryCta, locale)}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
            {pick(shell.sections.whyJapan.title, locale)}
          </h2>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-white/65 md:text-xl">
            {pick(shell.sections.whyJapan.intro, locale)}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.whyJapan.points.map((point) => (
              <div key={point.en} className="border border-[#D4AF37]/10 bg-[#141414] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{pick(point, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141414] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
            {pick(shell.sections.mistakes.title, locale)}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 md:text-lg">
            {pick(shell.sections.mistakes.intro, locale)}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.mistakes.points.map((point) => (
              <div key={point.en} className="border border-[#D4AF37]/10 bg-[#0A0A0A] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{pick(point, locale)}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-base leading-relaxed text-white/65 md:text-lg">
            {pick(shell.sections.mistakes.closing, locale)}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
            {pick(shell.sections.support.title, locale)}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/65 md:text-xl">
            {pick(shell.sections.support.intro, locale)}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shell.sections.support.points.map((point) => (
              <div key={point.title.en} className="border border-[#D4AF37]/10 bg-[#141414] p-8">
                <h3 className="text-xl font-bold text-[#D4AF37] md:text-2xl">{pick(point.title, locale)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{pick(point.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141414] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
            {pick(shell.sections.fit.title, locale)}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/65 md:text-lg">
            {pick(shell.sections.fit.intro, locale)}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shell.sections.fit.points.map((point) => (
              <div key={point.en} className="border border-[#D4AF37]/10 bg-[#0A0A0A] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{pick(point, locale)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#D4AF37] p-8 md:p-10 lg:p-12">
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
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(shell.primaryCta, locale)}
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center rounded-full border border-[#0A0A0A]/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">
                {pick(shell.secondaryCta, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
