import { NextResponse } from 'next/server';
import { toRecipients } from '@/lib/recipients';
import { checkRateLimit, clientIpFrom, isHoneypotTripped } from '@/lib/rate-limit';

/**
 * Japan Execution enquiry endpoint.
 *
 * Same shape as /api/contact: honeypot, IP rate limit, normalize and clamp, log
 * before send so a submission is never lost, then Resend. It uses the same
 * RESEND_API_KEY and CONTACT_TO_EMAIL that the contact form already uses, so
 * there is nothing new to configure.
 */

type LeadPayload = {
  delivering?: string;
  timing?: string;
  size?: string;
  region?: string;
  budget?: string;
  needs?: string[];
  name?: string;
  company?: string;
  email?: string;
  notes?: string;
  company_url?: string; // honeypot, must stay empty
};

const MAX_LEN: Record<string, number> = {
  delivering: 120,
  timing: 60,
  size: 60,
  region: 60,
  budget: 60,
  name: 200,
  company: 200,
  email: 254,
  notes: 5000,
};

const MAX_NEEDS = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Clean = Omit<LeadPayload, 'company_url'>;

function normalize(body: LeadPayload): Clean {
  const out: Clean = {};
  for (const key of Object.keys(MAX_LEN) as (keyof typeof MAX_LEN)[]) {
    const raw = body[key as keyof LeadPayload];
    if (typeof raw === 'string') {
      const trimmed = raw.trim().slice(0, MAX_LEN[key]);
      if (trimmed) (out as Record<string, unknown>)[key] = trimmed;
    }
  }
  if (Array.isArray(body.needs)) {
    const needs = body.needs
      .filter((n): n is string => typeof n === 'string')
      .map((n) => n.trim().slice(0, 120))
      .filter(Boolean)
      .slice(0, MAX_NEEDS);
    if (needs.length) out.needs = needs;
  }
  return out;
}

function rows(body: Clean): [string, string][] {
  return (
    [
      ['Delivering', body.delivering],
      ['Timing', body.timing],
      ['Audience size', body.size],
      ['Region', body.region],
      ['Budget range', body.budget],
      ['Needs', body.needs?.join(', ')],
      ['Name', body.name],
      ['Company', body.company],
      ['Email', body.email],
    ] as [string, string | undefined][]
  ).filter((r): r is [string, string] => Boolean(r[1]));
}

function buildEmailHtml(body: Clean): string {
  const cells = rows(body)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#8A857A;font-size:13px">${escapeHtml(label)}</td><td style="padding:6px 0;color:#F5F5F5;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const notes = body.notes
    ? `<p style="color:#8A857A;font-size:13px;margin:24px 0 4px">Anything else we should know?</p><p style="color:#F5F5F5;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${escapeHtml(body.notes)}</p>`
    : '';
  return `<div style="background:#0A0A0A;padding:32px;font-family:system-ui,sans-serif">
    <p style="color:#D4AF37;font-size:12px;letter-spacing:.15em;text-transform:uppercase;margin:0 0 8px">Japan Execution enquiry</p>
    <p style="color:#F5F5F5;opacity:.6;font-size:14px;margin:0 0 24px">Submitted via the /japan-execution form</p>
    <table style="border-collapse:collapse">${cells}</table>
    ${notes}
  </div>`;
}

function buildEmailText(body: Clean): string {
  const lines = rows(body).map(([label, value]) => `${label}: ${value}`);
  if (body.notes) lines.push('', 'Anything else we should know?', body.notes);
  lines.push('', `Received: ${new Date().toISOString()}`);
  return lines.join('\n');
}

const DEFAULT_FROM = 'Streetshow Productions <noreply@streetshowproduction.com>';

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }

  let raw: LeadPayload;
  try {
    raw = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend success so they do not retry.
  if (isHoneypotTripped(raw.company_url)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const { limited } = await checkRateLimit(clientIpFrom(req.headers));
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  const body = normalize(raw);

  if (!body.name || !body.company || !body.email) {
    return NextResponse.json(
      { error: 'Name, company and work email are required.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  console.log(
    '[japan-execution] submission',
    JSON.stringify({ receivedAt: new Date().toISOString(), ...body }),
  );

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmails = toRecipients();
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!resendApiKey) {
    console.warn('[japan-execution] RESEND_API_KEY not set — submission logged but no email sent.');
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmails,
        reply_to: body.email,
        subject: `Japan Execution enquiry from ${body.company}`,
        html: buildEmailHtml(body),
        text: buildEmailText(body),
      }),
    });
    if (!res.ok) {
      console.error('[japan-execution] resend failed', res.status, await res.text());
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (err) {
    console.error('[japan-execution] resend threw', err);
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
