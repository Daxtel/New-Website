import type { Metadata } from 'next';
import Link from 'next/link';
import { pick } from '@/lib/i18n';
import { japanMarketEntryPageBilingual } from '@/lib/strategic-pages-bilingual';
import { japanMarketEntryPage } from '@/lib/strategic-pages';

export const metadata: Metadata = {
  title: 'Japan Market Entry for Premium Brands',
  description:
    'Strategic Japan market entry, localization, and premium execution support for hospitality, real estate, and international brands.',
};

export default function JapanMarketEntry() {
  const locale = 'en';
  const page = japanMarketEntryPage;
  const shell = japanMarketEntryPageBilingual;

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="border-b border-lime-300/10 px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-5xl text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
            {pick(shell.title, locale)}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
            {pick(shell.subtitle, locale)}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-sm uppercase tracking-[0.15em] text-white/55 md:text-base">
            {pick(shell.support, locale)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]">
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
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            {page.sections.whyJapan.title}
          </h2>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-white/65 md:text-xl">
            {page.sections.whyJapan.intro}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.sections.whyJapan.points.map((point) => (
              <div key={point} className="border border-lime-300/10 bg-[#302f2c] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#302f2c] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            {page.sections.mistakes.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-lime-300/80 md:text-lg">
            {page.sections.mistakes.intro}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.sections.mistakes.points.map((point) => (
              <div key={point} className="border border-lime-300/10 bg-[#1a1c1b] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{point}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-base leading-relaxed text-white/65 md:text-lg">
            {page.sections.mistakes.closing}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            {page.sections.support.title}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/65 md:text-xl">
            {page.sections.support.intro}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.sections.support.points.map((point) => (
              <div key={point.title} className="border border-lime-300/10 bg-[#302f2c] p-8">
                <h3 className="text-xl font-bold text-lime-300 md:text-2xl">{point.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#302f2c] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            {page.sections.fit.title}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/65 md:text-lg">
            {page.sections.fit.intro}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.sections.fit.points.map((point) => (
              <div key={point} className="border border-lime-300/10 bg-[#1a1c1b] p-6">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-lime-300 p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#1a1c1b] md:text-3xl lg:text-4xl">
              {page.sections.cta.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#1a1c1b]/75 md:text-lg">
              {page.sections.cta.body}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#1a1c1b]/70 md:text-base">
              {page.sections.cta.reassurance}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#1a1c1b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                {page.primaryCta}
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center rounded-full border border-[#1a1c1b]/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]">
                {page.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
