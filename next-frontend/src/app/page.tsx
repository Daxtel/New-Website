import Link from 'next/link';
import { featuredWork, process, services, whoWeWorkWith } from '@/lib/home-content';
import { pick, ui } from '@/lib/i18n';
import { homePage, site } from '@/lib/site';

export default function Home() {
  const locale = 'en';
  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="relative overflow-hidden border-b border-lime-300/10">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#d9fb06_1px,transparent_1px),linear-gradient(90deg,#d9fb06_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-28 lg:pt-36">
          <div className="max-w-5xl">
            <p className="text-sm uppercase tracking-[0.2em] text-lime-300/70">
              {pick(homePage.eyebrow, locale)}
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
              {pick(homePage.headline, locale)}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-lime-300/80 md:text-lg lg:text-xl">
              {pick(homePage.subheadline, locale)}
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-white/55 md:text-base">
              {pick(homePage.trustLine, locale)}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]"
              >
                {pick(site.primaryCta, locale)}
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border-2 border-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300"
              >
                {pick(ui.cta.viewSelectedWork, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-lime-300/10 px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-lime-300">
              {whoWeWorkWith.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{whoWeWorkWith.intro}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whoWeWorkWith.items.map((item) => (
              <div key={item} className="min-h-[140px] border border-lime-300/10 bg-[#302f2c] p-6">
                <p className="text-base font-medium leading-snug text-lime-300 md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
                {featuredWork.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{featuredWork.subtitle}</p>
            </div>
            <Link href="/work" className="text-sm font-medium uppercase tracking-[0.15em] text-lime-300/75 transition-colors hover:text-lime-300">
              {pick(ui.cta.viewAllWork, locale)}
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredWork.items.map((item) => (
              <div key={item.title} className="overflow-hidden bg-[#302f2c] transition-colors hover:bg-lime-300/5">
                <div className="aspect-[4/3] bg-lime-300/10" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/45">{item.proofLine}</p>
                  <h3 className="mt-3 text-xl font-semibold text-lime-300">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.description}</p>
                  <div className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-lime-300/75">{pick(ui.cta.viewCaseStudy, locale)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#302f2c] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
              {services.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">{services.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service) => (
              <div key={service.title} className="bg-[#1a1c1b] p-8">
                <h3 className="text-xl font-semibold text-lime-300">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
              {process.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">{process.intro}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="mb-4 text-6xl font-black leading-none text-lime-300/15">{step.number}</div>
                <h3 className="text-xl font-semibold text-lime-300">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-lime-300/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
            Planning a launch, repositioning, or premium campaign in Japan?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
            Streetshow Productions works with selected brands and operators where strategic clarity, cultural nuance, and execution quality materially affect outcomes. If that describes your situation, we should discuss fit.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            Initial calls are used to assess goals, market context, and scope. We respond to serious inquiries promptly.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1c1b]"
            >
              {pick(site.primaryCta, locale)}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-lime-300/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300"
            >
              {pick(site.secondaryCta, locale)}
            </Link>
          </div>
          <div className="mt-10 text-sm text-white/50">{pick(site.location, locale)}</div>
        </div>
      </section>
    </main>
  );
}
