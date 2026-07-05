import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industryPages, getIndustryPage } from '@/lib/landing-pages';
import { LandingPageView } from '@/components/landing-page-view';
import { site } from '@/lib/site';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { buildAlternates, jaPath } from '@/lib/alternates';

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getIndustryPage(slug);
  if (!page) return { title: 'Industry' };
  const path = `/industries/${page.slug}`;
  return {
    title: pick(page.metaTitle, locale),
    description: pick(page.metaDescription, locale),
    keywords: page.targetKeywords,
    alternates: buildAlternates(path, locale),
    openGraph: {
      title: pick(page.metaTitle, locale),
      description: pick(page.metaDescription, locale),
      url: locale === 'ja' ? jaPath(path) : path,
      siteName: site.name,
      locale: locale === 'ja' ? 'ja_JP' : 'en_JP',
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getIndustryPage(slug);
  if (!page) notFound();

  const basePath = `/industries/${page.slug}`;
  return (
    <LandingPageView
      page={page}
      locale={locale}
      breadcrumbParent={{
        name: locale === 'ja' ? '業界' : 'Industries',
        url: `${site.url}${locale === 'ja' ? jaPath(basePath) : basePath}`,
      }}
    />
  );
}
