import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCatalog } from '@/lib/catalog';
import { pick, ui } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { buildAlternates } from '@/lib/alternates';
import { aboutPageBilingual } from '@/lib/secondary-pages-bilingual';
import { JsonLd, buildItemListSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/components/json-ld';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { AnimatedServiceRow } from '@/components/motion/AnimatedServiceRow';

const servicesFaqsEn = [
  {
    q: 'How much does video production cost in Japan?',
    a: 'Video production in Japan costs between ¥300,000 and ¥2,000,000 per day depending on crew size, equipment, location permits, and deliverables. A typical 3-day brand shoot in Fukuoka runs ¥1.2M to ¥1.8M all-in.',
  },
  {
    q: 'Can I hire an English-speaking video crew in Fukuoka?',
    a: 'Yes. Streetshow Productions operates an English, French, and Japanese-speaking production crew based in Fukuoka with regular shoots in Tokyo, Osaka, and across Japan.',
  },
  {
    q: 'What is the difference between translation and localization?',
    a: 'Translation converts words from one language to another. Localization adapts the entire message, including tone, cultural references, visual style, and platform format, to resonate with the target audience. In Japan, this difference determines whether content converts or gets ignored.',
  },
  {
    q: 'Do I need a Japanese agency or can a foreign agency handle Japan marketing?',
    a: 'You need a partner who understands both worlds. A purely Japanese agency may not understand your global brand standards. A purely foreign agency will miss the cultural register that Japanese consumers respond to. Streetshow bridges both.',
  },
];

const servicesFaqsJa = [
  {
    q: '日本での映像制作コストはどのくらいですか？',
    a: '日本での映像制作費は、クルー規模、機材、ロケ申請、成果物によって1日¥300,000〜¥200万です。福岡での標準的な3日間のブランド撮影は、すべて込みで¥120万〜¥180万になります。',
  },
  {
    q: '福岡で英語を話せる映像クルーを雇えますか？',
    a: 'はい。Streetshow Productionsは福岡を拠点に英語・フランス語・日本語対応の制作クルーを運営しており、東京・大阪など日本全国での撮影も定期的に行っています。',
  },
  {
    q: '翻訳とローカライズの違いは何ですか？',
    a: '翻訳は言葉を他の言語に変換します。ローカライズはメッセージ全体、つまりトーン、文化的参照、ビジュアルスタイル、プラットフォームフォーマットをターゲットオーディエンスに響くよう適応させます。日本では、この違いがコンテンツの効果を大きく左右します。',
  },
  {
    q: '日本マーケティングは日本のエージェンシーに頼むべきですか？',
    a: '両方の世界を理解するパートナーが必要です。純粋な日本のエージェンシーはグローバルブランド基準を見落とす可能性があります。純粋な外国のエージェンシーは日本の消費者が反応する文化的センスを理解できません。Streetshowは両方を橋渡しします。',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  return {
    title: {
      absolute: isJa
        ? '映像制作 福岡・東京 | Streetshow Productions'
        : 'Video Production in Fukuoka & Tokyo | Streetshow Productions',
    },
    description: isJa
      ? '英語・日本語・フランス語対応の映像制作クルーが福岡・東京を拠点に活動。ブランドCM、商品映像、ホスピタリティコンテンツ。¥300,000/日から。'
      : 'English-speaking video production crew in Fukuoka and Tokyo. Brand commercials, product videos, hospitality content. From ¥300,000/day.',
    alternates: buildAlternates('/services', locale),
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();

  const servicesItemList = buildItemListSchema({
    name: 'Services — Streetshow Productions',
    items: serviceCatalog.map((s) => ({
      name: pick(s.title, locale),
      url: `${site.url}/services/${s.slug}`,
      description: pick(s.description, locale),
    })),
  });
  const servicesBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Services', url: `${site.url}/services` },
  ]);
  const localeFaqs = locale === 'ja' ? servicesFaqsJa : servicesFaqsEn;
  const servicesFaqSchema = buildFaqSchema(servicesFaqsEn);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[servicesItemList, servicesBreadcrumb, servicesFaqSchema]} />
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
              {pick(ui.sections.services, locale)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
              {pick({
                en: 'Streetshow Productions supports premium brands entering or operating in Japan through strategy, localization, and high-level creative execution.',
                ja: 'Streetshow Productionsは、日本市場への進出・運営を目指すプレミアムブランドを、戦略、ローカライズ、ハイレベルなクリエイティブ実行で支援します。',
              }, locale)}
            </p>
          </div>

          <div className="mt-12 space-y-px">
            {serviceCatalog.map((service, i) => (
              <AnimatedServiceRow
                key={service.slug}
                slug={service.slug}
                number={service.number}
                title={pick(service.title, locale)}
                description={pick(service.description, locale)}
                index={i}
              />
            ))}
          </div>

          {/* FAQ Section */}
          <ScrollReveal className="mt-20">
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37]">
              {locale === 'ja' ? 'よくある質問' : 'Frequently Asked Questions'}
            </h2>
          </ScrollReveal>
          <div className="mt-8 space-y-4">
            {localeFaqs.map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 0.06}>
                <details className="group border border-[#D4AF37]/10 bg-[#141414] p-6 transition-all hover:border-[#D4AF37]/30">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold text-[#D4AF37] md:text-lg">{item.q}</h3>
                      <span className="mt-1 shrink-0 text-[#D4AF37] transition-transform group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">{item.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10">
            <p className="text-sm text-white/45">
              {locale === 'ja' ? '戦略的インサイト: ' : 'Strategy reading: '}
              <Link href="/blog" className="text-[#D4AF37]/70 underline-offset-4 transition-colors hover:text-[#D4AF37] hover:underline">
                {locale === 'ja' ? '日本市場参入ガイドとインサイト' : 'Japan market entry guides and insights'}
              </Link>
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
          <div className="bg-[#D4AF37] p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{pick(ui.sections.discussProject, locale)}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0A0A0A]/70 md:text-base">
                  {pick(aboutPageBilingual.credibility, locale)}
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {pick(ui.cta.letsTalk, locale)}
              </Link>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
