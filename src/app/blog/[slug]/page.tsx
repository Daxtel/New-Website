import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { getCatalogService } from '@/lib/catalog';
import { JsonLd, buildBreadcrumbSchema, buildFaqSchema } from '@/components/json-ld';
import { site } from '@/lib/site';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { buildAlternates, localizeHref } from '@/lib/alternates';
import { ReadingProgress } from '@/components/motion/ReadingProgress';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { LeadMagnet } from '@/components/lead-magnet';

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
    // Absolute so the global "%s | Streetshow Productions" template isn't
    // appended (meta titles already include the brand suffix).
    title: { absolute: metaTitle },
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
    // Single-language posts (en-only or ja-only) self-canonical to their own
    // language URL with no hreflang pair, and noindex the opposite-language
    // render. Bilingual posts get the full hreflang pair.
    alternates:
      post.lang === 'en'
        ? { canonical: url }
        : post.lang === 'ja'
        ? { canonical: `/ja${url}` }
        : buildAlternates(url, locale),
    ...((post.lang === 'en' && locale === 'ja') || (post.lang === 'ja' && locale === 'en')
      ? { robots: { index: false, follow: true } }
      : {}),
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

  const faqSchema = post.faqs?.length
    ? buildFaqSchema(post.faqs.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })))
    : null;
  const schemas = faqSchema
    ? [articleSchema, breadcrumbSchema, faqSchema]
    : [articleSchema, breadcrumbSchema];

  return (
    <main className="bg-[#0A0A0A] text-white">
      <ReadingProgress />
      <JsonLd data={schemas} />
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

          <h1 className="mt-6 text-[clamp(1.7rem,3.2vw,2.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-heading">
            {title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-body-text md:text-xl">{pick(post.excerpt, locale)}</p>

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
                    <p key={pIdx} className="text-base leading-relaxed text-body-text md:text-lg">
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
                    className="block rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)] transition-all hover:border-[#D4AF37]/25 hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold text-heading">{pick(svc!.title, locale)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">{pick(svc!.intro, locale)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 border-t border-[#D4AF37]/10 pt-12">
              <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-[#D4AF37] md:text-3xl">
                {locale === 'ja' ? 'よくある質問' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-6 md:space-y-8">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#D4AF37]/10 pb-6 md:pb-8">
                    <h3 className="text-lg font-semibold text-heading md:text-xl">{pick(faq.q, locale)}</h3>
                    <p className="mt-3 text-base leading-relaxed text-body-text md:text-lg">{pick(faq.a, locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <LeadMagnet locale={locale} source={`blog:${post.slug}`} variant="inline" />
          </div>

          <div className="mt-16 rounded-2xl bg-[#D4AF37] p-10 md:p-14">
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
