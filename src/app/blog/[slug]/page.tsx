import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { getCatalogService } from '@/lib/catalog';
import { JsonLd, buildBreadcrumbSchema } from '@/components/json-ld';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article' };
  const url = `/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
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
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage || '/og-image.jpg'],
    },
    alternates: {
      canonical: url,
      languages: { en: url, ja: url, 'x-default': url },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleUrl = `${site.url}/blog/${post.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.metaDescription,
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
    articleSection: post.category,
    inLanguage: 'en',
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Blog', url: `${site.url}/blog` },
    { name: post.title, url: articleUrl },
  ]);

  const relatedServices = post.relatedServices
    .map((s) => getCatalogService(s))
    .filter(Boolean);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <article className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="mb-10 inline-flex items-center text-sm text-white/55 transition-colors hover:text-[#D4AF37]">
            ← Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.15em] text-white/45">
            <span className="text-[#D4AF37]">{post.category}</span>
            <span>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight text-[#D4AF37]">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">{post.excerpt}</p>

          <div className="mt-8 flex items-center gap-3 border-t border-b border-[#D4AF37]/10 py-4 text-sm text-white/55">
            <span>By {post.author}</span>
            <span>·</span>
            <span>Streetshow Productions · Fukuoka & Tokyo, Japan</span>
          </div>

          <div className="mt-12 space-y-12">
            {post.sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2 className="mb-6 text-2xl font-bold uppercase tracking-tight text-[#D4AF37] md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-5">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base leading-relaxed text-white/75 md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {relatedServices.length > 0 && (
            <div className="mt-16 border-t border-[#D4AF37]/10 pt-12">
              <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">Related Services</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedServices.map((svc) => (
                  <Link
                    key={svc!.slug}
                    href={`/services/${svc!.slug}`}
                    className="block border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30 hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold text-[#D4AF37]">{svc!.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{svc!.intro}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 bg-[#D4AF37] p-10 md:p-14">
            <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{post.cta.heading}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">
              {post.cta.body}
            </p>
            <Link
              href={post.cta.linkHref}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
            >
              {post.cta.linkLabel.toUpperCase()}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
