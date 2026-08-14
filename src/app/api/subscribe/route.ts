import { NextResponse } from 'next/server';
import { toRecipients } from '@/lib/recipients';
import { checkRateLimit, clientIpFrom, isHoneypotTripped } from '@/lib/rate-limit';

type SubscribePayload = {
  email?: string;
  locale?: string;
  source?: string;
  company_url?: string; // honeypot — must stay empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GUIDE = {
  en: '/downloads/japan-production-cost-guide-en.pdf',
  ja: '/downloads/japan-production-cost-guide-ja.pdf',
};

const DEFAULT_FROM = 'Streetshow Productions <noreply@streetshowproduction.com>';
const SITE = 'https://streetshowproduction.com';

function esc(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 5_000) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }

  let raw: SubscribePayload;
  try {
    raw = (await req.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't retry.
  if (isHoneypotTripped(raw.company_url)) {
    return NextResponse.json({ ok: true, downloadUrl: GUIDE.en });
  }

  const { limited } = await checkRateLimit(clientIpFrom(req.headers));
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  const email = (raw.email || '').trim().slice(0, 254);
  const locale = raw.locale === 'ja' ? 'ja' : 'en';
  const source = (raw.source || 'site').trim().slice(0, 120);
  const downloadUrl = GUIDE[locale];

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Never lose a lead, even if email delivery fails.
  console.log('[subscribe]', JSON.stringify({ receivedAt: new Date().toISOString(), email, locale, source }));

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmails = toRecipients();
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  // Download works regardless of email delivery — hand the link back immediately.
  if (!resendApiKey) {
    return NextResponse.json({ ok: true, downloadUrl, delivered: false });
  }

  const guideUrl = `${SITE}${downloadUrl}`;

  // 1) Notify owner of the new lead.
  const notify = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmails,
      reply_to: email,
      subject: `New lead magnet subscriber: ${email}`,
      text: `New guide download subscriber\n\nEmail: ${email}\nLanguage: ${locale}\nSource: ${source}\nGuide: ${guideUrl}\n\nReceived: ${new Date().toISOString()}`,
    }),
  }).catch((err) => console.error('[subscribe] notify failed', err));

  // 2) Send the subscriber the guide they requested (transactional).
  const subjectByLocale = locale === 'ja'
    ? 'ガイドのダウンロード | Streetshow Productions'
    : 'Your Japan Production Cost Guide | Streetshow Productions';
  const bodyByLocale = locale === 'ja'
    ? `ダウンロードいただきありがとうございます。以下からガイドを入手できます。\n\n${guideUrl}\n\n日本での映像制作・市場参入のご相談は ${SITE}/ja/contact まで。\n\nStreetshow Productions`
    : `Thanks for downloading. Get your guide here:\n\n${guideUrl}\n\nPlanning a shoot or Japan launch? Talk to us: ${SITE}/contact\n\nStreetshow Productions`;
  const htmlByLocale = `<div style="font-family:Inter,system-ui,sans-serif;background:#0A0A0A;padding:28px"><div style="max-width:560px;margin:0 auto;color:#F5F5F5">
    <p style="color:#D4AF37;font-weight:600;margin:0 0 12px">STREETSHOW PRODUCTIONS</p>
    <p style="margin:0 0 18px;line-height:1.6">${esc(bodyByLocale).replace(/\n/g, '<br>')}</p>
    <a href="${guideUrl}" style="display:inline-block;background:#D4AF37;color:#0A0A0A;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600">${locale === 'ja' ? 'ガイドをダウンロード' : 'Download the Guide'}</a>
  </div></div>`;

  const deliver = fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: subjectByLocale,
      text: bodyByLocale,
      html: htmlByLocale,
    }),
  }).catch((err) => console.error('[subscribe] deliver failed', err));

  await Promise.allSettled([notify, deliver]);
  return NextResponse.json({ ok: true, downloadUrl, delivered: true });
}
