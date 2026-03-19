import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pick, ui } from '@/lib/i18n';
import { getCatalogProject, getCatalogService, projectCatalog } from '@/lib/catalog';

export function generateStaticParams() {
  return projectCatalog.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getCatalogProject(params.slug);
  if (!project) return { title: 'Case Study' };
  return {
    title: project.title,
    description: project.intro,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const locale = 'en';
  const project = getCatalogProject(params.slug);
  if (!project) notFound();

  const relatedServices = project.relatedServices
    .map((slug) => getCatalogService(slug))
    .filter(Boolean);

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Link href="/work" className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-lime-300">
            {pick(ui.sections.backToWork, locale)}
          </Link>

          <div className="max-w-5xl">
            <p className="text-xs uppercase tracking-[0.15em] text-white/45">{project.proofLine}</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-lime-300/80 md:text-xl">
              {project.intro}
            </p>
          </div>

          <div className="relative mt-10 aspect-[16/8] overflow-hidden bg-lime-300/10">
            <Image src={project.media.image} alt={typeof project.media.alt === 'string' ? project.media.alt : pick(project.media.alt as any, locale)} fill className="object-cover" sizes="100vw" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/50 via-transparent to-transparent" />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.servicesProvided, locale)}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.servicesProvided.map((item) => (
                    <div key={item} className="border border-lime-300/10 bg-[#302f2c] p-5 text-lime-300/85">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.deliverables, locale)}</h2>
                <div className="flex flex-wrap gap-3">
                  {project.deliverables.map((item) => (
                    <span key={item} className="border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-sm text-lime-300/85">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.projectFocus, locale)}</h2>
                <div className="space-y-3">
                  {project.projectFocus.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-white/65">
                      <span className="mt-1 text-lime-300">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-lime-300/10 pt-12">
                <h2 className="mb-8 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.caseStudy, locale)}</h2>
                <div className="space-y-8">
                  {[
                    ['Context', project.caseStudy.context],
                    ['Challenge', project.caseStudy.challenge],
                    ['Strategic Response', project.caseStudy.response],
                    ['Execution', project.caseStudy.execution],
                    ['Outcome', project.caseStudy.outcome],
                  ].map(([label, value]) => (
                    <div key={label as string} className="grid gap-4 border-b border-lime-300/10 pb-8 md:grid-cols-[180px_1fr] md:gap-8 last:border-b-0 last:pb-0">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-lime-300 md:text-base">{label}</h3>
                      <p className="text-base leading-relaxed text-white/65 md:text-lg">{value as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border border-lime-300/10 bg-[#302f2c] p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.client, locale)}</p>
                    <p className="mt-1 font-medium text-lime-300">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.year, locale)}</p>
                    <p className="mt-1 font-medium text-lime-300">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.category, locale)}</p>
                    <p className="mt-1 font-medium text-lime-300">{project.category}</p>
                  </div>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div>
                  <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.relatedServices, locale)}</h2>
                  <div className="space-y-3">
                    {relatedServices.map((service) => (
                      <Link key={service!.slug} href={`/services/${service!.slug}`} className="block border border-lime-300/10 bg-[#302f2c] p-4 transition-colors hover:border-lime-300/30">
                        <span className="text-sm text-lime-300/85">{service!.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 bg-lime-300 p-10 md:p-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a1c1b] md:text-3xl">Interested in a similar project?</h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#1a1c1b]/75 md:text-lg">
                  Streetshow Productions supports premium campaigns, Japan-market launches, and high-stakes brand execution where local relevance and quality materially affect outcomes.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#1a1c1b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                Book a Strategic Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
