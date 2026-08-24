import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pick, ui } from '@/lib/i18n';
import { getCatalogProject, getCatalogService, projectCatalog } from '@/lib/catalog';
import { getLocale } from '@/lib/locale';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { JsonLd, buildCaseStudySchema, buildBreadcrumbSchema, buildVideoObjectSchema } from '@/components/json-ld';
import { site } from '@/lib/site';
import { ProjectDetailClient } from '@/components/motion/ProjectDetailClient';

export const dynamicParams = true;

export function generateStaticParams() {
  return projectCatalog.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getCatalogProject(slug);
  if (!project) return { title: 'Case Study' };
  const title       = pick(project.metaTitle, locale);
  const description = pick(project.metaDescription, locale);
  const ogImage     = project.media.image || '/og-image.jpg';
  return {
    // Absolute — metaTitle already includes the brand; avoid double suffix.
    title: { absolute: title },
    description,
    openGraph: {
      title, description,
      type: 'article',
      siteName: 'Streetshow Productions',
      url: `/work/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pick(project.media.alt, locale) }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    alternates: buildAlternates(`/work/${slug}`, locale),
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }  = await params;
  const locale    = await getLocale();
  const project   = getCatalogProject(slug);
  if (!project) notFound();

  const relatedServices = project.relatedServices
    .map((s) => getCatalogService(s))
    .filter(Boolean);

  // Find next project in catalog for the peek section
  const currentIdx  = projectCatalog.findIndex((p) => p.slug === slug);
  const nextRaw     = projectCatalog[(currentIdx + 1) % projectCatalog.length];
  const nextProject = nextRaw && nextRaw.slug !== slug ? {
    slug:     nextRaw.slug,
    title:    pick(nextRaw.title, locale),
    videoSrc: (nextRaw.media as { video?: string }).video,
    imageSrc: nextRaw.media.image,
  } : null;

  const projectUrl       = `${site.url}/work/${slug}`;
  const title            = pick(project.title, locale);
  const heroVideo        = (project.media as { video?: string }).video;

  const caseStudySchema  = buildCaseStudySchema({
    title,
    description: pick(project.intro, locale),
    url:         projectUrl,
    image:       `${site.url}${project.media.image || '/og-image.jpg'}`,
    client:      project.client,
    year:        project.year,
    category:    project.category,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home',          url: site.url },
    { name: 'Selected Work', url: `${site.url}/work` },
    { name: title,           url: projectUrl },
  ]);

  const videoSchema = heroVideo
    ? buildVideoObjectSchema({
        name: title,
        description: pick(project.intro, locale),
        contentUrl: heroVideo.startsWith('http') ? heroVideo : `${site.url}${heroVideo}`,
        thumbnailUrl: `${site.url}${project.media.image || '/og-image.jpg'}`,
        uploadDate: `${project.year}-01-01`,
        url: projectUrl,
      })
    : null;

  const schemas = videoSchema
    ? [caseStudySchema, breadcrumbSchema, videoSchema]
    : [caseStudySchema, breadcrumbSchema];

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={schemas} />
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <ProjectDetailClient
          backLabel={pick(ui.sections.backToWork, locale)}
          proofLine={pick(project.proofLine, locale)}
          title={title}
          intro={pick(project.intro, locale)}
          heroVideoSrc={heroVideo}
          heroImageSrc={!heroVideo ? project.media.image : undefined}
          heroImageAlt={pick(project.media.alt, locale)}
          meta={{
            clientLabel:   pick(ui.sections.client, locale),
            client:        project.client,
            yearLabel:     pick(ui.sections.year, locale),
            year:          project.year,
            categoryLabel: pick(ui.sections.category, locale),
            category:      project.category,
          }}
          relatedServicesLabel={pick(ui.sections.relatedServices, locale)}
          relatedServices={relatedServices.map((s) => ({
            slug:  s!.slug,
            title: pick(s!.title, locale),
          }))}
          servicesProvidedLabel={pick(ui.sections.servicesProvided, locale)}
          servicesProvided={pick(project.servicesProvided, locale)}
          deliverablesLabel={pick(ui.sections.deliverables, locale)}
          deliverables={pick(project.deliverables, locale)}
          projectFocusLabel={pick(ui.sections.projectFocus, locale)}
          projectFocus={pick(project.projectFocus, locale)}
          caseStudyLabel={pick(ui.sections.caseStudy, locale)}
          caseStudyEntries={[
            { label: pick(ui.caseStudyLabels.context,          locale), value: pick(project.caseStudy.context,  locale) },
            { label: pick(ui.caseStudyLabels.challenge,        locale), value: pick(project.caseStudy.challenge, locale) },
            { label: pick(ui.caseStudyLabels.strategicResponse,locale), value: pick(project.caseStudy.response,  locale) },
            { label: pick(ui.caseStudyLabels.execution,        locale), value: pick(project.caseStudy.execution, locale) },
            { label: pick(ui.caseStudyLabels.outcome,          locale), value: pick(project.caseStudy.outcome,   locale) },
          ]}
          ctaHeading={pick(ui.sections.interestedSimilar, locale)}
          ctaBody={pick({
            en: 'Streetshow Productions supports premium campaigns, Japan-market launches, and high-stakes brand execution where local relevance and quality determine whether a campaign converts.',
            ja: 'Streetshow Productionsは、ローカルでの適合性と品質が成果を左右するプレミアムキャンペーン、日本市場向けローンチ、高水準のブランド実行を支援します。',
          }, locale)}
          ctaButtonLabel={pick(ui.cta.letsTalk, locale)}
          nextProject={nextProject}
          locale={locale}
        />

        {slug === 'jtl-japan-luxury-preowned-live-commerce' && (
          <div className="mx-auto mt-16 max-w-6xl border border-white/8 bg-white/[0.02] p-6">
            <p className="text-base leading-relaxed text-body-text">
              {pick(
                {
                  en: 'JTL is one of several Fukuoka-based brands we work with. See our',
                  ja: 'JTLは、当社が福岡で手がけるブランドの一社です。詳しくは',
                },
                locale,
              )}{' '}
              <Link
                href={localizeHref('/locations/video-production-fukuoka', locale)}
                className="text-[#D4AF37] underline underline-offset-4 hover:text-[#D4AF37]/80"
              >
                {pick({ en: 'Fukuoka production team', ja: '福岡の制作チームページ' }, locale)}
              </Link>
              {locale === 'ja' ? 'をご覧ください。' : '.'}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
