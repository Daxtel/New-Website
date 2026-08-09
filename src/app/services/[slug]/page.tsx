import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pick, ui } from '@/lib/i18n';
import { getCatalogService, projectCatalog, serviceCatalog } from '@/lib/catalog';
import { CampaignWork } from '@/components/campaign-work';
import { SmartVideo } from '@/components/motion/SmartVideo';
import { getLocale } from '@/lib/locale';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { JsonLd, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/components/json-ld';
import { site } from '@/lib/site';

export const dynamicParams = true;

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getCatalogService(slug);
  if (!service) return { title: 'Service' };
  const title = pick(service.metaTitle, locale);
  const description = pick(service.metaDescription, locale);
  const url = `/services/${slug}`;
  return {
    // Absolute — metaTitle already includes the brand; avoid double suffix.
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Streetshow Productions',
      url,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: pick(service.title, locale) }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    alternates: buildAlternates(url, locale),
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getCatalogService(slug);
  if (!service) notFound();

  const relatedProjects = projectCatalog.filter((project) => service.relatedProjects.includes(project.slug));
  const relatedServices = serviceCatalog.filter((item) => service.relatedServices.includes(item.slug));

  const serviceUrl = `${site.url}/services/${slug}`;
  const serviceTitle = pick(service.title, locale);
  const serviceSchema = buildServiceSchema({
    name: serviceTitle,
    description: pick(service.description, locale),
    url: serviceUrl,
    slug,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Services', url: `${site.url}/services` },
    { name: serviceTitle, url: serviceUrl },
  ]);
  const svcFaqs = pick(service.faq, locale);
  const schemas: Record<string, unknown>[] = [serviceSchema, breadcrumbSchema];
  if (svcFaqs && svcFaqs.length > 0) {
    schemas.push(buildFaqSchema(svcFaqs));
  }

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={schemas} />
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Link href={localizeHref('/services', locale)} className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-[#D4AF37]">
            {pick(ui.sections.allServices, locale)}
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {serviceTitle}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-2xl font-semibold text-[#D4AF37]/90 md:text-3xl">{pick(service.headline, locale)}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{pick(service.intro, locale)}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="border border-[#D4AF37]/10 bg-[#141414] p-8">
              <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-2xl">{pick(service.whyTitle, locale)}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">{pick(service.whyBody, locale)}</p>
            </div>
            <div className="border border-[#D4AF37]/10 bg-[#141414] p-8">
              <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-2xl">{pick(service.mistakesTitle, locale)}</h2>
              <div className="mt-4 space-y-3">
                {pick(service.mistakes, locale).map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/65">
                    <span className="mt-1 text-[#D4AF37]">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.whatWeDeliver, locale)}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pick(service.features, locale).map((feature) => (
                  <div key={feature} className="border border-[#D4AF37]/10 bg-[#141414] p-5 text-[#D4AF37]/85">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.idealFor, locale)}</h3>
              <div className="border border-[#D4AF37]/10 bg-[#141414] p-6">
                <div className="space-y-3 text-white/65">
                  {pick(service.idealFor, locale).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {slug === 'video-production-japan' && <CampaignWork />}

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.relatedProjects, locale)}</h3>
                <Link href={localizeHref('/work', locale)} className="text-sm text-white/55 hover:text-[#D4AF37]">{pick(ui.cta.viewAllWork, locale)}</Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((project) => {
                  const projectVideo = (project.media as { video?: string }).video;
                  return (
                    <Link key={project.slug} href={localizeHref(`/work/${project.slug}`, locale)} className="group block overflow-hidden bg-[#141414] transition-all hover:bg-[#D4AF37]/5 hover:scale-[1.02]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                        {projectVideo ? (
                          <SmartVideo
                            src={projectVideo}
                            alt={pick(project.title, locale)}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.media.image}
                            alt={pick(project.media.alt, locale)}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>
                      <div className="p-8">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/45">{project.category}</p>
                        <h4 className="mt-3 text-2xl font-semibold text-[#D4AF37]">{pick(project.title, locale)}</h4>
                        <p className="mt-3 text-sm leading-relaxed text-white/65">{pick(project.intro, locale)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {svcFaqs && svcFaqs.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-3xl">
                {locale === 'ja' ? 'よくあるご質問' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {svcFaqs.map((item) => (
                  <details key={item.q} className="group border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base font-semibold text-[#D4AF37] md:text-lg">{item.q}</h3>
                        <span className="mt-1 text-[#D4AF37] transition-transform group-open:rotate-45">+</span>
                      </div>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-8 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.relatedServices, locale)}</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedServices.map((item) => (
                  <Link key={item.slug} href={localizeHref(`/services/${item.slug}`, locale)} className="border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30 hover:scale-[1.02]">
                    <h4 className="text-xl font-semibold text-[#D4AF37]">{pick(item.title, locale)}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{pick(item.intro, locale)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 bg-[#D4AF37] p-10 md:p-14">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-4xl">
                {pick(ui.sections.discussProject, locale)}
              </h2>
              <p className="mt-4 text-lg text-[#0A0A0A]/70">
                {pick({
                  en: 'Discuss the strategic, creative, and local-market requirements for your project with Streetshow Productions.',
                  ja: 'Streetshow Productionsとプロジェクトの戦略的・クリエイティブ・ローカル市場要件についてご相談ください。',
                }, locale)}
              </p>
              <Link href={localizeHref('/contact', locale)} className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(ui.cta.letsTalk, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
