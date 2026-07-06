import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { getCatalogService } from '@/lib/catalog';
import { JsonLd, buildBreadcrumbSchema } from '@/components/json-ld';
import { site } from '@/lib/site';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { ReadingProgress } from '@/components/motion/ReadingProgress';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article' };
  const url = `/blog/${post.slug}`;
  const metaTitle = pick(post.metaTitle, locale);
  const metaDescription = pick(post.metaDescription, locale);
  const title = pick(post.title, locale);
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.tags,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      url,
      siteName: 'Streetshow Productions',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified || post.datePublished,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.heroImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [post.heroImage || '/og-image.jpg'],
    },
    alternates: buildAlternates(url, locale),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const title = pick(post.title, locale);
  const articleUrl = `${site.url}/blog/${post.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: title,
    description: pick(post.metaDescription, locale),
    image: `${site.url}${post.heroImage || '/og-image.jpg'}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${site.url}/about`,
    },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: articleUrl,
    keywords: post.tags.join(', '),
    articleSection: pick(post.category, locale),
    inLanguage: locale,
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Blog', url: `${site.url}/blog` },
    { name: title, url: articleUrl },
  ]);

  const relatedServices = post.relatedServices
    .map((s) => getCatalogService(s))
    .filter(Boolean);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <ReadingProgress />
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <article className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <Link href={localizeHref('/blog', locale)} className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-[#D4AF37]">
            {locale === 'ja' ? '← ブログに戻る' : '← Back to Blog'}
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.15em] text-white/45">
            <span className="text-[#D4AF37]">{pick(post.category, locale)}</span>
            <span>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{pick(post.readingTime, locale)}</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight text-[#D4AF37]">
            {title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">{pick(post.excerpt, locale)}</p>

          <div className="mt-8 flex items-center gap-3 border-t border-b border-[#D4AF37]/10 py-4 text-sm text-white/55">
            <span>{locale === 'ja' ? '執筆' : 'By'} {post.author}</span>
            <span>·</span>
            <span>
              {locale === 'ja'
                ? 'Streetshow Productions · 福岡・東京'
                : 'Streetshow Productions · Fukuoka & Tokyo, Japan'}
            </span>
          </div>

          <div className="mt-12 space-y-12">
            {post.sections.map((section, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
              <section>
                {section.heading && (
                  <h2 className="mb-6 text-2xl font-bold uppercase tracking-tight text-[#D4AF37] md:text-3xl">
                    {pick(section.heading, locale)}
                  </h2>
                )}
                <div className="space-y-5">
                  {pick(section.paragraphs, locale).map((p, pIdx) => (
                    <p key={pIdx} className="text-base leading-relaxed text-white/75 md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
              </ScrollReveal>
            ))}
          </div>

          {relatedServices.length > 0 && (
            <div className="mt-16 border-t border-[#D4AF37]/10 pt-12">
              <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                {locale === 'ja' ? '関連サービス' : 'Related Services'}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedServices.map((svc) => (
                  <Link
                    key={svc!.slug}
                    href={localizeHref(`/services/${svc!.slug}`, locale)}
                    className="block border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30 hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold text-[#D4AF37]">{pick(svc!.title, locale)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{pick(svc!.intro, locale)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 bg-[#D4AF37] p-10 md:p-14">
            <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{pick(post.cta.heading, locale)}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">
              {pick(post.cta.body, locale)}
            </p>
            <Link
              href={localizeHref(post.cta.linkHref, locale)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
            >
              {pick(post.cta.linkLabel, locale).toUpperCase()}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
