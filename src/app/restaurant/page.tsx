import type { Metadata } from 'next';
import Script from 'next/script';
import { RestaurantQuiz } from '@/components/restaurant-quiz';
import { getLocale } from '@/lib/locale';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export const metadata: Metadata = {
  title: 'Restaurant Content Package — Free Concept in 48 Hours',
  description:
    '1日の撮影で20本のコンテンツ。6週間分のSNS投稿を一度に。福岡のレストラン向け無料コンテンツ提案。',
  alternates: { canonical: '/restaurant' },
  robots: { index: false, follow: false }, // Don't index ad landing pages
};

export default async function RestaurantLandingPage() {
  const locale = await getLocale();

  return (
    <>
      {/* Meta Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      <main className="min-h-screen bg-[#0A0A0A] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#D4AF37]/10">
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)] [background-size:80px_80px]" />
          <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-16 text-center sm:px-6 sm:pt-20 md:px-10 md:pt-24">
            {/* Social proof badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {locale === 'en' ? 'Real result' : '実績'}
              </span>
              <span className="text-xs text-white/55">
                {locale === 'en'
                  ? 'Italian restaurant — 45% more reservations in 6 weeks'
                  : 'イタリアンレストラン — 6週間で予約45%増'}
              </span>
            </div>

            <h1 className="text-[clamp(1.75rem,6vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37]">
              {locale === 'en'
                ? '1 Day of Shooting. 6 Weeks of Content. Zero Posting Stress.'
                : '1日の撮影。6週間分のコンテンツ。投稿のストレスゼロ。'}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              {locale === 'en'
                ? "Locals and tourists are choosing where to eat based on what they see on Instagram. If you're not showing up the right way, someone else takes that booking."
                : '地元の人も観光客も、Instagramで見た情報で食べるお店を選んでいます。正しい見せ方をしていなければ、その予約は他の店に流れます。'}
            </p>

            <p className="mt-4 text-sm text-[#D4AF37]/70">
              {locale === 'en'
                ? 'Answer 4 quick questions → get a free custom content concept within 48 hours'
                : '4つの質問に答えるだけ → 48時間以内に無料コンテンツ提案をお届け'}
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20">
          <RestaurantQuiz locale={locale} />
        </section>

        {/* Trust strip */}
        <section className="border-t border-[#D4AF37]/10 px-5 py-10 sm:px-6 md:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 text-center sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-[#D4AF37]">20+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/45">
                  {locale === 'en' ? 'Content pieces per shoot' : '1回の撮影で20本以上'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#D4AF37]">6</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/45">
                  {locale === 'en' ? 'Weeks of content covered' : '週間分のコンテンツ'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#D4AF37]">48h</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/45">
                  {locale === 'en' ? 'Free concept delivered' : '無料提案をお届け'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-[#D4AF37]/10 px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-[#D4AF37] md:text-3xl">
              {locale === 'en' ? 'How It Works' : 'サービスの流れ'}
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[#D4AF37]/10 text-xl font-black text-[#D4AF37]">
                  1
                </div>
                <h3 className="text-base font-semibold text-[#D4AF37]">
                  {locale === 'en' ? 'Morning' : '午前'}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {locale === 'en'
                    ? 'We capture what guests never see — the prep, the details, the story behind the food.'
                    : 'お客様が見ることのない裏側を撮影。仕込み、こだわり、料理の背景にあるストーリー。'}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[#D4AF37]/10 text-xl font-black text-[#D4AF37]">
                  2
                </div>
                <h3 className="text-base font-semibold text-[#D4AF37]">
                  {locale === 'en' ? 'Midday' : '昼'}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {locale === 'en'
                    ? "Short-form videos in the owner's own words. Authentic, not scripted."
                    : 'オーナーの言葉でショート動画を撮影。台本なし、リアルな魅力を。'}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[#D4AF37]/10 text-xl font-black text-[#D4AF37]">
                  3
                </div>
                <h3 className="text-base font-semibold text-[#D4AF37]">
                  {locale === 'en' ? 'Afternoon' : '午後'}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {locale === 'en'
                    ? 'The atmosphere — what it actually feels like to walk in. The finishing touch.'
                    : '雰囲気の撮影。実際にお店に入った時の空気感を映像に。'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency / scarcity */}
        <section className="border-t border-[#D4AF37]/10 px-5 py-10 sm:px-6 md:px-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]/70">
              {locale === 'en'
                ? 'We take 5 restaurants per month — limited availability'
                : '月5店舗限定 — お早めにお問い合わせください'}
            </p>
          </div>
        </section>

        {/* Minimal footer for landing page */}
        <footer className="border-t border-white/5 px-5 py-6 sm:px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs text-white/30">
              Streetshow Productions — Fukuoka & Tokyo, Japan
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
