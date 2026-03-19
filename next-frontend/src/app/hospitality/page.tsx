import type { Metadata } from 'next';
import Link from 'next/link';
import { pick } from '@/lib/i18n';
import { hospitalityPageBilingual } from '@/lib/strategic-pages-bilingual';
import { hospitalityPage } from '@/lib/strategic-pages';

export const metadata: Metadata = {
  title: 'Creative Strategy & Execution for Luxury Hospitality in Japan',
  description:
    'Strategy-led creative, localization, and premium execution for luxury hotels, resorts, and destination properties in Japan.',
};

export default function HospitalityPage() {
  const locale = 'en';
  const page = hospitalityPage;
  const shell = hospitalityPageBilingual;

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="border-b border-lime-300/10 px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            {pick(shell.title, locale)}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-lime-300/80 md:text-xl lg:text-2xl">
            {pick(shell.subtitle, locale)}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
            {pick(shell.support, locale)}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]">
              {pick(shell.primaryCta, locale)}
            </Link>
            <Link href="/work" className="inline-flex items-center justify-center rounded-full border border-lime-300/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
              {pick(shell.secondaryCta, locale)}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#302f2c] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
              {page.sections.why.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
              {page.sections.why.body}
            </p>
          </div>
          <div className="border border-lime-300/10 bg-[#1a1c1b] p-8">
            <h3 className="text-xl font-bold text-lime-300 md:text-2xl">{page.sections.drivers.title}</h3>
            <div className="mt-6 space-y-4">
              {page.sections.drivers.points.map((point) => (
                <div key={point} className="border-b border-lime-300/10 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-base leading-relaxed text-white/70 md:text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
            {page.sections.support.title}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {page.sections.support.points.map((point) => (
              <div key={point} className="border border-lime-300/10 bg-[#302f2c] p-8">
                <p className="text-lg leading-relaxed text-lime-300 md:text-xl">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#302f2c] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
            {page.sections.fit.title}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-5xl">
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
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#1a1c1b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                {page.primaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
