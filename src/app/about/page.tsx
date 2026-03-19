import type { Metadata } from 'next';
import Link from 'next/link';
import { pick } from '@/lib/i18n';
import { aboutPage } from '@/lib/secondary-pages';
import { aboutPageBilingual } from '@/lib/secondary-pages-bilingual';

export const metadata: Metadata = {
  title: 'About Streetshow Productions',
  description:
    'About Streetshow Productions, a premium Japan market entry, localization, and execution partner for high-end brands.',
};

export default function AboutPage() {
  const locale = 'en';

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div className="max-w-4xl">
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
                {pick(aboutPageBilingual.title, locale)}
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-lime-300/80 md:text-xl lg:text-2xl">
                {pick(aboutPageBilingual.intro, locale)}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
                {pick(aboutPageBilingual.mission, locale)}
              </p>
            </div>
            <div className="border border-lime-300/10 bg-[#302f2c] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{pick(aboutPageBilingual.positioningLabel, locale)}</p>
              <p className="mt-4 text-lg leading-relaxed text-lime-300 md:text-xl">
                {pick(aboutPageBilingual.positioning, locale)}
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px bg-lime-300/10 md:grid-cols-3">
            {aboutPage.proofStrip.map((item) => (
              <div key={item.label} className="bg-[#1a1c1b] p-8 md:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.15em] text-white/45">{item.label}</p>
                <p className="mt-3 text-xl font-semibold text-lime-300 md:text-2xl lg:text-3xl">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="border border-lime-300/10 bg-[#302f2c] p-8 md:p-10 lg:p-12">
              <h2 className="text-3xl font-black uppercase tracking-tight text-lime-300 md:text-4xl">{pick(aboutPageBilingual.operatingEdgeLabel, locale)}</h2>
              <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
                {aboutPage.operatingEdge}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-white/55 md:text-base">
                {aboutPage.credibility}
              </p>
            </div>
            <div className="grid gap-px bg-lime-300/10 h-fit">
              <div className="bg-[#1a1c1b] p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{pick(aboutPageBilingual.primaryVerticalLabel, locale)}</p>
                <p className="mt-3 text-lg leading-relaxed text-lime-300 md:text-xl">{pick(aboutPageBilingual.primaryVerticalValue, locale)}</p>
              </div>
              <div className="bg-[#1a1c1b] p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{pick(aboutPageBilingual.coreCapabilityLabel, locale)}</p>
                <p className="mt-3 text-lg leading-relaxed text-lime-300 md:text-xl">{pick(aboutPageBilingual.coreCapabilityValue, locale)}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-lime-300/10 pt-12">
            <h2 className="text-2xl font-bold text-lime-300 md:text-3xl">{pick(aboutPageBilingual.bestFitLabel, locale)}</h2>
            <div className="mt-6 space-y-3">
              {aboutPage.bestFit.map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/65">
                  <span className="mt-1 text-lime-300">•</span>
                  <span className="text-base md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-lime-300/10 pt-12 text-center">
            <h2 className="text-2xl font-bold text-lime-300 md:text-3xl">{pick({ en: 'Discuss Your Project', ja: 'プロジェクトについて相談する' }, locale)}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              {aboutPage.credibility}
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]">
              {pick({ en: 'Book a Strategic Call', ja: '戦略コールを予約する' }, locale)}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
