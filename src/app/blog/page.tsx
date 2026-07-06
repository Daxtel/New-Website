import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { buildAlternates } from '@/lib/alternates';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { AnimatedBlogCard } from '@/components/motion/AnimatedBlogCard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  const title = isJa
    ? 'ブログ | 日本市場参入・クリエイティブ戦略 | Streetshow Productions'
    : 'Blog | Japan Market Entry & Creative Strategy | Streetshow Productions';
  const description = isJa
    ? '日本市場参入、ホスピタリティマーケティング、3Dビルボード広告、ローカライズ戦略に関するインサイト。Streetshow Productions（福岡）より。'
    : 'Insights on Japan market entry, hospitality marketing, 3D billboard advertising, and localization strategy from Streetshow Productions in Fukuoka.';
  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates('/blog', locale),
    openGraph: {
      title: isJa ? 'インサイト・ブログ | Streetshow Productions' : 'Insights & Blog | Streetshow Productions',
      description,
      type: 'website',
      url: '/blog',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Streetshow Productions Blog' }],
    },
  };
}

export default async function BlogIndexPage() {
  const locale = await getLocale();

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                {locale === 'ja' ? 'インサイト' : 'Insights'}
              </p>
              <h1 className="mt-4 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {locale === 'ja' ? 'インサイト・ブログ' : 'Insights & Blog'}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
                {locale === 'ja'
                  ? '日本市場進出、ラグジュアリーホスピタリティクリエイティブ、ライブコマース、プレミアムブランド実行に関するStreetshowチームからのパースペクティブ。'
                  : 'Perspectives on Japan market entry, luxury hospitality creative, live commerce, and premium brand execution from the Streetshow team.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 space-y-8">
            {blogPosts.map((post, i) => (
              <AnimatedBlogCard
                key={post.slug}
                slug={post.slug}
                category={pick(post.category, locale)}
                date={new Date(post.datePublished).toLocaleDateString(
                  locale === 'ja' ? 'ja-JP' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
                readingTime={pick(post.readingTime, locale)}
                title={pick(post.title, locale)}
                excerpt={pick(post.excerpt, locale)}
                readLabel={locale === 'ja' ? '記事を読む' : 'Read Article'}
                index={i}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
