import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locationPages, getLocationPage } from '@/lib/landing-pages';
import { LandingPageView } from '@/components/landing-page-view';
import { site } from '@/lib/site';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { buildAlternates, jaPath } from '@/lib/alternates';

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getLocationPage(slug);
  if (!page) return { title: 'Location' };
  const path = `/locations/${page.slug}`;
  return {
    title: { absolute: pick(page.metaTitle, locale) },
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

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getLocationPage(slug);
  if (!page) notFound();

  const basePath = `/locations/${page.slug}`;
  return (
    <LandingPageView
      page={page}
      locale={locale}
      breadcrumbParent={{
        name: locale === 'ja' ? '拠点' : 'Locations',
        url: `${site.url}${locale === 'ja' ? jaPath(basePath) : basePath}`,
      }}
    />
  );
}
