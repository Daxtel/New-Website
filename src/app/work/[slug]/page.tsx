import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pick, ui } from '@/lib/i18n';
import { getCatalogProject, getCatalogService, projectCatalog } from '@/lib/catalog';
import { getLocale } from '@/lib/locale';
import { JsonLd, buildCaseStudySchema, buildBreadcrumbSchema } from '@/components/json-ld';
import { site } from '@/lib/site';

export const dynamicParams = true;

export function generateStaticParams() {
  return projectCatalog.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getCatalogProject(slug);
  if (!project) return { title: 'Case Study' };
  const title = pick(project.metaTitle, locale);
  const description = pick(project.metaDescription, locale);
  const ogImage = project.media.image || '/og-image.jpg';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Streetshow Productions',
      url: `/work/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pick(project.media.alt, locale) }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/work/${slug}`,
      languages: {
        en: `/work/${slug}`,
        ja: `/work/${slug}`,
        'x-default': `/work/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getCatalogProject(slug);
  if (!project) notFound();

  const relatedServices = project.relatedServices
    .map((slug) => getCatalogService(slug))
    .filter(Boolean);

  const projectUrl = `${site.url}/work/${slug}`;
  const title = pick(project.title, locale);
  const caseStudySchema = buildCaseStudySchema({
    title,
    description: pick(project.intro, locale),
    url: projectUrl,
    image: `${site.url}${project.media.image || '/og-image.jpg'}`,
    client: project.client,
    year: project.year,
    category: project.category,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Selected Work', url: `${site.url}/work` },
    { name: title, url: projectUrl },
  ]);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[caseStudySchema, breadcrumbSchema]} />
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Link href="/work" className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-[#D4AF37]">
            {pick(ui.sections.backToWork, locale)}
          </Link>

          <div className="max-w-5xl">
            <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(project.proofLine, locale)}</p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D4AF37]/80 md:text-xl">
              {pick(project.intro, locale)}
            </p>
          </div>

          <div className="relative mt-10 aspect-[16/8] overflow-hidden bg-[#1A1A1A]">
            {(() => {
              const heroVideo = (project.media as { video?: string }).video;
              if (heroVideo) {
                return (
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                );
              }
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.media.image}
                  alt={pick(project.media.alt, locale)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              );
            })()}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-2xl font-bold leading-tight text-[#D4AF37] md:text-3xl">{title}</span>
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.servicesProvided, locale)}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {pick(project.servicesProvided, locale).map((item) => (
                    <div key={item} className="border border-[#D4AF37]/10 bg-[#141414] p-5 text-[#D4AF37]/85">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.deliverables, locale)}</h2>
                <div className="flex flex-wrap gap-3">
                  {pick(project.deliverables, locale).map((item) => (
                    <span key={item} className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2 text-sm text-[#D4AF37]/85">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.projectFocus, locale)}</h2>
                <div className="space-y-3">
                  {pick(project.projectFocus, locale).map((item) => (
                    <div key={item} className="flex items-start gap-3 text-white/65">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#D4AF37]/10 pt-12">
                <h2 className="mb-8 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.caseStudy, locale)}</h2>
                <div className="space-y-8">
                  {[
                    [ui.caseStudyLabels.context, pick(project.caseStudy.context, locale)],
                    [ui.caseStudyLabels.challenge, pick(project.caseStudy.challenge, locale)],
                    [ui.caseStudyLabels.strategicResponse, pick(project.caseStudy.response, locale)],
                    [ui.caseStudyLabels.execution, pick(project.caseStudy.execution, locale)],
                    [ui.caseStudyLabels.outcome, pick(project.caseStudy.outcome, locale)],
                  ].map(([label, value]) => (
                    <div key={(label as { en: string; ja: string }).en} className="grid gap-4 border-b border-[#D4AF37]/10 pb-8 md:grid-cols-[180px_1fr] md:gap-8 last:border-b-0 last:pb-0">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] md:text-base">{pick(label as { en: string; ja: string }, locale)}</h3>
                      <p className="text-base leading-relaxed text-white/65 md:text-lg">{value as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border border-[#D4AF37]/10 bg-[#141414] p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.client, locale)}</p>
                    <p className="mt-1 font-medium text-[#D4AF37]">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.year, locale)}</p>
                    <p className="mt-1 font-medium text-[#D4AF37]">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">{pick(ui.sections.category, locale)}</p>
                    <p className="mt-1 font-medium text-[#D4AF37]">{project.category}</p>
                  </div>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div>
                  <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(ui.sections.relatedServices, locale)}</h2>
                  <div className="space-y-3">
                    {relatedServices.map((service) => (
                      <Link key={service!.slug} href={`/services/${service!.slug}`} className="block border border-[#D4AF37]/10 bg-[#141414] p-4 transition-all hover:border-[#D4AF37]/30 hover:scale-[1.02]">
                        <span className="text-sm text-[#D4AF37]/85">{pick(service!.title, locale)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 bg-[#D4AF37] p-10 md:p-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{pick(ui.sections.interestedSimilar, locale)}</h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">
                  {pick({
                    en: 'Streetshow Productions supports premium campaigns, Japan-market launches, and high-stakes brand execution where local relevance and quality materially affect outcomes.',
                    ja: 'Streetshow Productionsは、ローカルでの適合性と品質が成果を左右するプレミアムキャンペーン、日本市場向けローンチ、高水準のブランド実行を支援します。',
                  }, locale)}
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(ui.cta.letsTalk, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
