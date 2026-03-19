import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projectCatalogBilingual } from '@/lib/catalog-bilingual';
import { pick, ui } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Selected hospitality, Japan-market entry, localization, and premium creative case studies by Streetshow Productions.',
};

export default function WorkPage() {
  const locale = 'en';

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
              Selected Work
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              Selected projects that reflect our focus on luxury hospitality, Japan-market campaigns, localization, and premium creative execution in high-stakes brand environments.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
              Each case study is included for what it demonstrates: strategic fit, cultural alignment, production quality, and premium brand sensitivity in Japan.
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/45">{pick(ui.sections.filterByFocus, locale)}</p>
            <div className="flex flex-wrap gap-3">
              {['All', 'Hospitality', 'Localization', 'Japan Market Entry', 'Production / CGI / 3D'].map((filter) => (
                <div key={filter} className="rounded-full border border-lime-300/15 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                  {filter}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projectCatalogBilingual.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="overflow-hidden bg-[#302f2c] transition-colors hover:bg-lime-300/5">
                <div className="relative aspect-[4/3] bg-lime-300/10">
                  <Image src={item.media.image} alt={pick(item.media.alt, locale)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/50 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(item.proofLine, locale)}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-lime-300">{pick(item.title, locale)}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{pick(item.description, locale)}</p>
                  <div className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-lime-300/75">{pick(ui.cta.viewCaseStudy, locale)}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-lime-300/10 pt-12 text-center">
            <h2 className="text-2xl font-bold text-lime-300 md:text-3xl">Discuss a Similar Project</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              Streetshow Productions supports premium campaigns, Japan-market launches, and high-stakes brand execution where local relevance and quality materially affect outcomes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]">
                Book a Strategic Call
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-lime-300/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
