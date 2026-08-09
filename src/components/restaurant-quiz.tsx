'use client';

import { useState, useEffect } from 'react';

type Step = 'type' | 'challenge' | 'details' | 'contact' | 'done';

type QuizData = {
  restaurantType: string;
  challenge: string;
  seats: string;
  area: string;
  name: string;
  restaurantName: string;
  instagram: string;
  email: string;
  phone: string;
};

const RESTAURANT_TYPES = [
  { value: 'italian', label: 'Italian', ja: 'イタリアン' },
  { value: 'japanese', label: 'Japanese / Washoku', ja: '和食' },
  { value: 'french', label: 'French', ja: 'フレンチ' },
  { value: 'cafe', label: 'Cafe / Coffee', ja: 'カフェ' },
  { value: 'bar', label: 'Bar / Izakaya', ja: 'バー・居酒屋' },
  { value: 'ramen', label: 'Ramen / Noodles', ja: 'ラーメン・麺類' },
  { value: 'yakiniku', label: 'Yakiniku / BBQ', ja: '焼肉・BBQ' },
  { value: 'other', label: 'Other', ja: 'その他' },
];

const CHALLENGES = [
  { value: 'no-time', label: 'No time to create content', ja: 'コンテンツを作る時間がない' },
  { value: 'no-ideas', label: "Don't know what to post", ja: '何を投稿すればいいかわからない' },
  { value: 'no-results', label: 'Posting but no results', ja: '投稿しても結果が出ない' },
  { value: 'quality', label: 'Content quality is low', ja: 'コンテンツのクオリティが低い' },
];

const AREAS = [
  { value: 'fukuoka', label: 'Fukuoka', ja: '福岡' },
  { value: 'tokyo', label: 'Tokyo', ja: '東京' },
  { value: 'osaka', label: 'Osaka', ja: '大阪' },
  { value: 'other', label: 'Other area', ja: 'その他' },
];

const STEP_ORDER: Step[] = ['type', 'challenge', 'details', 'contact'];

/* ----------  Meta Pixel helpers  ---------- */
function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
    (window as unknown as { fbq: (...a: unknown[]) => void }).fbq(...args);
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : undefined;
}

function generateEventId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function RestaurantQuiz({ locale = 'ja' }: { locale?: 'en' | 'ja' }) {
  const [step, setStep] = useState<Step>('type');
  const [data, setData] = useState<QuizData>({
    restaurantType: '',
    challenge: '',
    seats: '',
    area: '',
    name: '',
    restaurantName: '',
    instagram: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Track quiz start
  useEffect(() => {
    fbq('track', 'ViewContent', { content_name: 'restaurant-quiz' });
  }, []);

  const stepIndex = STEP_ORDER.indexOf(step as (typeof STEP_ORDER)[number]);
  const progress = step === 'done' ? 100 : ((stepIndex + 1) / STEP_ORDER.length) * 100;

  function selectOption(field: keyof QuizData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    // Auto-advance after selection
    const currentIndex = STEP_ORDER.indexOf(step as (typeof STEP_ORDER)[number]);
    if (currentIndex < STEP_ORDER.length - 1) {
      setTimeout(() => setStep(STEP_ORDER[currentIndex + 1]), 300);
    }
  }

  function goBack() {
    const currentIndex = STEP_ORDER.indexOf(step as (typeof STEP_ORDER)[number]);
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Generate shared event_id for Pixel ↔ CAPI deduplication
    const eventId = generateEventId();

    try {
      const res = await fetch('/api/restaurant-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          eventId,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          userAgent: navigator.userAgent,
          sourceUrl: window.location.href,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      // Fire Meta Pixel Lead event with same event_id for deduplication
      fbq('track', 'Lead', {
        content_name: 'restaurant-content-package',
        content_category: data.restaurantType,
        value: 1,
        currency: 'JPY',
      }, { eventID: eventId });

      setStatus('success');
      setStep('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  const en = locale === 'en';

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-white/45">
          <span>{en ? `Step ${stepIndex + 1} of ${STEP_ORDER.length}` : `ステップ ${stepIndex + 1} / ${STEP_ORDER.length}`}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-[#D4AF37] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: Restaurant Type */}
      {step === 'type' && (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
            {en ? 'What type of restaurant do you run?' : 'どんなジャンルのお店ですか？'}
          </h2>
          <p className="mt-2 text-sm text-white/55">
            {en ? 'Select the closest match' : '最も近いものを選んでください'}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {RESTAURANT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => selectOption('restaurantType', t.value)}
                className={`border px-5 py-4 text-left text-base transition-all ${
                  data.restaurantType === t.value
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-white/10 bg-[#141414] text-body-text hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                {en ? t.label : t.ja}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Challenge */}
      {step === 'challenge' && (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
            {en ? "What's your biggest content challenge?" : 'コンテンツの一番の課題は？'}
          </h2>
          <p className="mt-2 text-sm text-white/55">
            {en ? 'This helps us tailor your free content concept' : 'あなたに最適なコンテンツ提案のために'}
          </p>
          <div className="mt-6 grid gap-3">
            {CHALLENGES.map((c) => (
              <button
                key={c.value}
                onClick={() => selectOption('challenge', c.value)}
                className={`border px-5 py-4 text-left text-base transition-all ${
                  data.challenge === c.value
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-white/10 bg-[#141414] text-body-text hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                {en ? c.label : c.ja}
              </button>
            ))}
          </div>
          <button onClick={goBack} className="mt-6 text-sm text-white/45 hover:text-[#D4AF37]">
            {en ? '← Back' : '← 戻る'}
          </button>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 'details' && (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
            {en ? 'Tell us about your restaurant' : 'お店について教えてください'}
          </h2>
          <p className="mt-2 text-sm text-white/55">
            {en ? 'So we can build a concept that fits' : '最適なプランをご提案するために'}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Area' : 'エリア'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {AREAS.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setData((prev) => ({ ...prev, area: a.value }))}
                    className={`border px-4 py-3 text-sm transition-all ${
                      data.area === a.value
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-white/10 bg-[#141414] text-body-text hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {en ? a.label : a.ja}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Number of seats (approx)' : '席数（おおよそ）'}
              </label>
              <input
                type="text"
                value={data.seats}
                onChange={(e) => setData((prev) => ({ ...prev, seats: e.target.value }))}
                placeholder={en ? 'e.g. 30' : '例: 30席'}
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button onClick={goBack} className="text-sm text-white/45 hover:text-[#D4AF37]">
              {en ? '← Back' : '← 戻る'}
            </button>
            <button
              onClick={() => data.area && setStep('contact')}
              disabled={!data.area}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] disabled:opacity-40"
            >
              {en ? 'Next →' : '次へ →'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Contact Info */}
      {step === 'contact' && (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
            {en ? 'Where should we send your free content concept?' : '無料コンテンツ提案の送り先は？'}
          </h2>
          <p className="mt-2 text-sm text-white/55">
            {en ? "We'll send it within 48 hours. No spam, ever." : '48時間以内にお届けします。迷惑メールは送りません。'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Your Name' : 'お名前'} *
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Restaurant Name' : '店名'} *
              </label>
              <input
                type="text"
                required
                value={data.restaurantName}
                onChange={(e) => setData((prev) => ({ ...prev, restaurantName: e.target.value }))}
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                Instagram
              </label>
              <input
                type="text"
                value={data.instagram}
                onChange={(e) => setData((prev) => ({ ...prev, instagram: e.target.value }))}
                placeholder="@yourrestaurant"
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Email' : 'メールアドレス'} *
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
                {en ? 'Phone (optional)' : '電話番号（任意）'}
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder={en ? '080-XXXX-XXXX' : '080-XXXX-XXXX'}
                className="w-full border border-white/10 bg-[#141414] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#D4AF37]/40"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-300">{errorMsg}</p>
            )}

            <div className="flex items-center gap-4 pt-2">
              <button onClick={goBack} type="button" className="text-sm text-white/45 hover:text-[#D4AF37]">
                {en ? '← Back' : '← 戻る'}
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A] disabled:opacity-60"
              >
                {status === 'loading'
                  ? (en ? 'Sending...' : '送信中...')
                  : (en ? 'Get My Free Content Concept' : '無料コンテンツ提案を受け取る')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Done */}
      {step === 'done' && (
        <div className="animate-fadeIn text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10">
            <svg className="h-10 w-10 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">
            {en ? "You're in!" : 'ありがとうございます！'}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body-text">
            {en
              ? "We'll review your restaurant and send a custom content concept within 48 hours. Check your inbox."
              : 'お店の情報を確認し、48時間以内にカスタムコンテンツ提案をお届けします。メールをご確認ください。'}
          </p>
          <p className="mt-6 text-sm text-white/45">
            {en
              ? 'In the meantime, follow us on Instagram for examples of our work.'
              : 'その間、Instagramで私たちの制作実績をご覧ください。'}
          </p>
        </div>
      )}
    </div>
  );
}
