import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pick, ui } from '@/lib/i18n';
import { getCatalogService, projectCatalog, serviceCatalog } from '@/lib/catalog';

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getCatalogService(params.slug);
  if (!service) return { title: 'Service' };
  return {
    title: service.title,
    description: service.intro,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const locale = 'en';
  const service = getCatalogService(params.slug);
  if (!service) notFound();

  const relatedProjects = projectCatalog.filter((project) => service.relatedProjects.includes(project.slug));
  const relatedServices = serviceCatalog.filter((item) => service.relatedServices.includes(item.slug));

  return (
    <main className="bg-[#1a1c1b] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Link href="/services" className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-lime-300">
            {pick(ui.sections.allServices, locale)}
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-lime-300">
                {service.title}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-2xl font-semibold text-lime-300/90 md:text-3xl">{service.headline}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{service.intro}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="border border-lime-300/10 bg-[#302f2c] p-8">
              <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-lime-300 md:text-2xl">{service.whyTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">{service.whyBody}</p>
            </div>
            <div className="border border-lime-300/10 bg-[#302f2c] p-8">
              <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-lime-300 md:text-2xl">{service.mistakesTitle}</h2>
              <div className="mt-4 space-y-3">
                {service.mistakes.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/65">
                    <span className="mt-1 text-lime-300">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.whatWeDeliver, locale)}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="border border-lime-300/10 bg-[#302f2c] p-5 text-lime-300/85">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.idealFor, locale)}</h3>
              <div className="border border-lime-300/10 bg-[#302f2c] p-6">
                <div className="space-y-3 text-white/65">
                  {service.idealFor.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-lime-300">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.relatedProjects, locale)}</h3>
                <Link href="/work" className="text-sm text-white/55 hover:text-lime-300">{pick(ui.cta.viewAllWork, locale)}</Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/work/${project.slug}`} className="overflow-hidden bg-[#302f2c] transition-colors hover:bg-lime-300/5">
                    <div className="relative aspect-[16/10] bg-lime-300/10">
                      <Image src={project.media.image} alt={typeof project.media.alt === 'string' ? project.media.alt : pick(project.media.alt as { en: string; ja: string }, locale)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
                    </div>
                    <div className="p-8">
                      <p className="text-xs uppercase tracking-[0.15em] text-white/45">{project.category}</p>
                      <h4 className="mt-3 text-2xl font-semibold text-lime-300">{project.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-white/65">{project.intro}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-8 text-xl font-bold uppercase tracking-[0.15em] text-lime-300">{pick(ui.sections.relatedServices, locale)}</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedServices.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="border border-lime-300/10 bg-[#302f2c] p-6 transition-colors hover:border-lime-300/30">
                    <h4 className="text-xl font-semibold text-lime-300">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.intro}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 bg-lime-300 p-10 md:p-14">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#1a1c1b] md:text-4xl">
                Ready to discuss your {service.title.toLowerCase()} project?
              </h2>
              <p className="mt-4 text-lg text-[#1a1c1b]/70">
                Discuss the strategic, creative, and local-market requirements for your project with Streetshow Productions.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1a1c1b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-lime-300">
                Book a Strategic Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
