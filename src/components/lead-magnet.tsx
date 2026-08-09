'use client';

import { useState } from 'react';

type Props = {
  locale?: 'en' | 'ja';
  source?: string;
  /** Visual variant: 'band' (full-width gold block) or 'inline' (bordered card). */
  variant?: 'band' | 'inline';
};

const COPY = {
  en: {
    eyebrow: 'Free Guide',
    title: 'Japan Video Production & Market Entry — Cost & Planning Guide',
    body: 'Budget ranges, cost drivers, Fukuoka vs Tokyo, and a pre-quote checklist for brands filming or launching in Japan.',
    placeholder: 'Work email',
    cta: 'Send me the guide',
    sending: 'Sending…',
    successTitle: 'Guide ready.',
    successBody: 'Check your inbox — or download it now:',
    download: 'Download the Guide',
    invalid: 'Please enter a valid email address.',
    error: 'Something went wrong. Try again.',
    privacy: 'No spam. Unsubscribe anytime.',
  },
  ja: {
    eyebrow: '無料ガイド',
    title: '日本での映像制作・市場参入 — 費用と計画ガイド',
    body: '費用レンジ、コストドライバー、福岡と東京の違い、見積前チェックリスト。日本で撮影・ローンチするブランド向け。',
    placeholder: '業務用メール',
    cta: 'ガイドを受け取る',
    sending: '送信中…',
    successTitle: 'ガイドを用意しました。',
    successBody: 'メールをご確認ください。今すぐダウンロードも可能です：',
    download: 'ガイドをダウンロード',
    invalid: '有効なメールアドレスを入力してください。',
    error: 'エラーが発生しました。再度お試しください。',
    privacy: 'スパムなし。いつでも配信停止できます。',
  },
};

export function LeadMagnet({ locale = 'en', source = 'site', variant = 'band' }: Props) {
  const t = COPY[locale];
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg(t.invalid);
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source, company_url: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || t.error);
        return;
      }
      setDownloadUrl(data.downloadUrl);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(t.error);
    }
  }

  const wrap =
    variant === 'band'
      ? 'bg-[#D4AF37] text-[#0A0A0A]'
      : 'border border-[#D4AF37]/20 bg-[#141414] text-white';
  const titleColor = variant === 'band' ? 'text-[#0A0A0A]' : 'text-[#D4AF37]';
  const bodyColor = variant === 'band' ? 'text-[#0A0A0A]/75' : 'text-body-text';

  return (
    <div className={`${wrap} p-8 md:p-10 lg:p-12`}>
      <div className="mx-auto max-w-3xl">
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${variant === 'band' ? 'text-[#0A0A0A]/60' : 'text-[#D4AF37]/70'}`}>
          {t.eyebrow}
        </p>
        <h2 className={`mt-3 text-2xl font-black uppercase leading-tight tracking-tight ${titleColor} md:text-3xl`}>
          {t.title}
        </h2>

        {status === 'success' ? (
          <div className="mt-5">
            <p className={`text-lg font-semibold ${titleColor}`}>{t.successTitle}</p>
            <p className={`mt-1 ${bodyColor}`}>{t.successBody}</p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-flex min-h-[52px] items-center justify-center rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] ${
                variant === 'band' ? 'bg-[#0A0A0A] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#0A0A0A]'
              }`}
            >
              {t.download}
            </a>
          </div>
        ) : (
          <>
            <p className={`mt-4 leading-relaxed ${bodyColor}`}>{t.body}</p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`company_url_${source}`}>Company URL (leave blank)</label>
                <input
                  id={`company_url_${source}`}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={t.placeholder}
                className={`min-h-[52px] flex-1 rounded-full px-6 text-base outline-none ${
                  variant === 'band'
                    ? 'bg-[#0A0A0A]/5 text-[#0A0A0A] placeholder-[#0A0A0A]/45 focus:bg-[#0A0A0A]/10'
                    : 'border border-[#D4AF37]/20 bg-[#0A0A0A] text-white placeholder-white/40 focus:border-[#D4AF37]/50'
                }`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`min-h-[52px] whitespace-nowrap rounded-full px-8 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity disabled:opacity-70 ${
                  variant === 'band' ? 'bg-[#0A0A0A] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#0A0A0A]'
                }`}
              >
                {status === 'loading' ? t.sending : t.cta}
              </button>
            </form>
            {status === 'error' && <p className="mt-3 text-sm text-red-700">{errorMsg}</p>}
            <p className={`mt-3 text-xs ${variant === 'band' ? 'text-[#0A0A0A]/55' : 'text-white/45'}`}>{t.privacy}</p>
          </>
        )}
      </div>
    </div>
  );
}
