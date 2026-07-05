import type { Metadata } from 'next';
import { projectCatalog } from '@/lib/catalog';
import { pick, ui } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getLocale } from '@/lib/locale';
import { buildAlternates } from '@/lib/alternates';
import { AnimatedWorkFilter } from '@/components/motion/AnimatedWorkFilter';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { JsonLd, buildItemListSchema, buildBreadcrumbSchema } from '@/components/json-ld';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  return {
    title: {
      absolute: isJa
        ? '実績 | 映像制作・3Dビルボード | Streetshow Productions'
        : 'Our Work | Video Production & 3D Billboards | Streetshow Productions',
    },
    description: isJa
      ? 'ブランド映像、3Dアナモルフィックビルボード、日本市場ローカライズのポートフォリオ。クライアント：ニューバランス、SHEIN Japan、ザ・リッツ・カールトン京都、Charles & Keith。'
      : 'Portfolio of brand video, 3D anamorphic billboards, and Japan market localization. Clients: New Balance, SHEIN Japan, Ritz-Carlton Kyoto, Charles & Keith.',
    alternates: buildAlternates('/work', locale),
  };
}

const CATEGORY_MAP: Record<string, 'HOSPITALITY' | 'LOCALIZATION' | 'JAPAN MARKET ENTRY' | 'PRODUCTION / CGI / 3D' | 'GROWTH / E-COMMERCE'> = {
  'Hospitality':       'HOSPITALITY',
  'Localization':      'LOCALIZATION',
  'Video Production':  'JAPAN MARKET ENTRY',
  'Paid Social':       'JAPAN MARKET ENTRY',
  '3D Anamorphic':     'PRODUCTION / CGI / 3D',
  'Photography':       'PRODUCTION / CGI / 3D',
  'CGI':               'PRODUCTION / CGI / 3D',
  'E-Commerce':        'GROWTH / E-COMMERCE',
  'Live Commerce':     'GROWTH / E-COMMERCE',
};

export default async function WorkPage() {
  const locale = await getLocale();

  const projects = projectCatalog.map((item) => {
    const projectVideo = (item.media as { video?: string }).video;
    return {
      slug:           item.slug,
      title:          pick(item.title, locale),
      proofLine:      pick(item.proofLine, locale),
      description:    pick(item.description, locale),
      category:       CATEGORY_MAP[item.category] || ('PRODUCTION / CGI / 3D' as const),
      caseStudyLabel: pick(ui.cta.viewCaseStudy, locale),
      videoSrc:       projectVideo,
      imageSrc:       projectVideo ? undefined : item.media.image,
      imageAlt:       pick(item.media.alt, locale),
    };
  });

  const workItemList = buildItemListSchema({
    name: 'Selected Work — Streetshow Productions',
    items: projectCatalog.map((p) => ({
      name: pick(p.title, locale),
      url: `${site.url}/work/${p.slug}`,
      description: pick(p.proofLine, locale),
    })),
  });
  const workBreadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: site.url },
    { name: 'Work', url: `${site.url}/work` },
  ]);

  return (
    <main className="bg-[#0A0A0A] text-white">
      <JsonLd data={[workItemList, workBreadcrumb]} />
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">

          <ScrollReveal>
            <div className="max-w-4xl">
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tight text-[#D4AF37]">
                {pick(ui.sections.selectedWork, locale)}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
                {locale === 'ja'
                  ? 'ラグジュアリーホスピタリティ、日本市場向けキャンペーン、ローカライズ、プレミアムクリエイティブ実行における厳選された制作実績。'
                  : 'Selected projects that reflect our focus on luxury hospitality, Japan-market campaigns, localization, and premium creative execution in high-stakes brand environments.'}
              </p>
            </div>
          </ScrollReveal>

          <AnimatedWorkFilter
            projects={projects}
            locale={locale}
            filterLabel={pick(ui.sections.filterByFocus, locale)}
          />

          <ScrollReveal className="mt-16 border-t border-[#D4AF37]/10 pt-12 text-center">
            <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
              {pick(ui.sections.discussSimilarProject, locale)}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
              {locale === 'ja'
                ? 'Streetshow Productionsは、ローカル適合性と品質が成果に直結する、プレミアムキャンペーン、日本市場ローンチ、ハイステークスなブランド実行を支援します。'
                : 'Streetshow Productions supports premium campaigns, Japan-market launches, and high-stakes brand execution where local relevance and quality materially affect outcomes.'}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-all duration-300 hover:[box-shadow:0_0_24px_6px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                {pick({ en: "LET'S TALK", ja: '相談する' }, locale)}
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}
