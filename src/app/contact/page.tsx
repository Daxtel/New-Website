import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { pick } from '@/lib/i18n';
import { contactPage } from '@/lib/secondary-pages';
import { contactPageBilingual } from '@/lib/secondary-pages-bilingual';
import { getLocale } from '@/lib/locale';
import { buildAlternates } from '@/lib/alternates';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isJa = locale === 'ja';
  return {
    title: {
      absolute: isJa
        ? 'お問い合わせ | 日本市場参入のご相談 | 東京・福岡 | Streetshow Productions'
        : 'Contact Streetshow | Discuss Your Japan Launch | Tokyo & Fukuoka',
    },
    description: isJa
      ? '日本市場参入、ホスピタリティの再構築、プレミアムキャンペーン制作、ローカライズ主導のブランド案件についてStreetshow Productionsにご相談ください。24時間以内にご返信します。'
      : 'Contact Streetshow Productions about Japan market entry, hospitality repositioning, premium campaigns, and localization-led brand work. Reply within 24 hours.',
    alternates: buildAlternates('/contact', locale),
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ inquiry?: string }>;
}) {
  const locale = await getLocale();
  const isAuditInquiry = (await searchParams).inquiry === 'japan-creative-performance-audit';

  return (
    <main className="bg-[#0A0A0A] text-white">
      <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
              {isAuditInquiry
                ? pick({ en: 'Request Your Japan Creative Performance Audit', ja: '日本向けクリエイティブ・パフォーマンス監査のリクエスト' }, locale)
                : pick(contactPageBilingual.title, locale)}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-body-text md:text-lg lg:text-xl">
              {isAuditInquiry
                ? pick(
                    {
                      en: 'A structured 7-business-day audit of your Japan creative, messaging, localization, and landing page performance. Starting from ¥350,000 + tax.',
                      ja: '日本向けのクリエイティブ、メッセージ、ローカライズ、ランディングページのパフォーマンスを7営業日で監査します。¥350,000＋税から。',
                    },
                    locale,
                  )
                : pick(contactPageBilingual.subtitle, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#D4AF37]/80 md:text-base">
              {pick(contactPageBilingual.qualification, locale)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
              {pick(contactPageBilingual.reassurance, locale)}
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-20">
            <div className="lg:col-span-3">
              <ContactForm locale={locale} />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#141414] p-8 md:p-10">
                <h2 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{pick(contactPageBilingual.contactInfoLabel, locale)}</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.emailLabel, locale)}</p>
                    <a href={`mailto:${contactPage.contact.email}`} className="mt-2 block break-all text-base font-medium text-[#D4AF37] md:text-lg">
                      {contactPage.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">
                      {pick({ en: 'Phone', ja: '電話' }, locale)}
                    </p>
                    <a href={`tel:${contactPage.contact.phoneHref}`} className="mt-2 block text-base font-medium text-[#D4AF37] md:text-lg">
                      {contactPage.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.15em] text-white/45">{pick(contactPageBilingual.locationLabel, locale)}</p>
                    <p className="mt-2 text-base font-medium text-[#D4AF37] md:text-lg">{contactPage.contact.location}</p>
                  </div>
                </div>

                <div className="mt-10 border-t border-[#D4AF37]/10 pt-8">
                  <p className="mb-4 text-base leading-relaxed text-body-text">
                    {pick(contactPageBilingual.directLabel, locale)}
                  </p>
                  <a
                    href={`tel:${contactPage.contact.phoneHref}`}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] transition-opacity hover:opacity-90"
                  >
                    {pick({ en: `Call ${contactPage.contact.phone}`, ja: `電話する ${contactPage.contact.phone}` }, locale)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
