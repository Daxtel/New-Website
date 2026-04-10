import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Insights & Blog',
  description:
    'Insights on Japan market entry, localization, luxury hospitality creative, live commerce, and premium brand execution from Streetshow Productions.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights & Blog | Streetshow Productions',
    description:
      'Insights on Japan market entry, localization, luxury hospitality creative, and premium brand execution.',
    type: 'website',
    url: '/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Streetshow Productions Blog' }],
  },
};

export default function BlogIndexPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Insights</p>
            <h1 className="mt-4 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              Insights & Blog
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              Perspectives on Japan market entry, luxury hospitality creative, live commerce, and premium brand execution from the Streetshow team.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-[#D4AF37]/10 bg-[#141414] p-8 transition-all hover:border-[#D4AF37]/30 hover:scale-[1.01] md:p-12"
              >
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
                <h2 className="mt-4 text-2xl font-bold uppercase leading-tight tracking-tight text-[#D4AF37] md:text-3xl lg:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#D4AF37]">
                  Read Article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
