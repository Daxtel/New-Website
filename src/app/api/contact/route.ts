import { NextResponse } from 'next/server';
import { checkRateLimit, clientIpFrom, isHoneypotTripped } from '@/lib/rate-limit';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message?: string;
  company_url?: string; // honeypot — must stay empty
};

// Per-field maximum lengths. Anything longer is truncated during normalization.
// Honeypot (company_url) is intentionally excluded — it's checked, never emailed.
const MAX_LEN: Partial<Record<keyof ContactPayload, number>> = {
  name: 200,
  email: 254,
  company: 200,
  website: 300,
  projectType: 120,
  budget: 60,
  timeline: 120,
  location: 200,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape HTML so user input cannot inject markup into the notification email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Trim and clamp every string field to its max length; drop non-string values.
function normalize(body: ContactPayload): ContactPayload {
  const out: ContactPayload = {};
  (Object.keys(MAX_LEN) as (keyof ContactPayload)[]).forEach((key) => {
    const raw = body[key];
    if (typeof raw === 'string') {
      const trimmed = raw.trim().slice(0, MAX_LEN[key]);
      if (trimmed) out[key] = trimmed;
    }
  });
  return out;
}

function buildEmailHtml(body: ContactPayload): string {
  const fields = [
    { label: 'Name', value: body.name },
    { label: 'Email', value: body.email },
    { label: 'Company', value: body.company },
    { label: 'Website', value: body.website },
    { label: 'Project Type', value: body.projectType },
    { label: 'Budget Range', value: body.budget },
    { label: 'Timeline', value: body.timeline },
    { label: 'Location', value: body.location },
    { label: 'Goal in Japan', value: body.message },
  ];

  const rows = fields
    .filter((f) => f.value)
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;color:#D4AF37;white-space:nowrap">${f.label}</td><td style="padding:8px 12px;color:#F5F5F5">${escapeHtml(f.value as string)}</td></tr>`,
    )
    .join('');

  return `
    <div style="background:#0A0A0A;padding:32px;font-family:'Inter',system-ui,sans-serif">
      <div style="max-width:600px;margin:0 auto">
        <h1 style="color:#D4AF37;font-size:24px;margin:0 0 8px">New Project Inquiry</h1>
        <p style="color:#F5F5F5;opacity:0.6;font-size:14px;margin:0 0 24px">Submitted via streetshowproduction.com</p>
        <table style="width:100%;border-collapse:collapse;background:#141414;border:1px solid rgba(212,175,55,0.12);border-radius:4px">
          ${rows}
        </table>
        <p style="color:#F5F5F5;opacity:0.4;font-size:12px;margin-top:24px">Received at ${new Date().toISOString()}</p>
      </div>
    </div>
  `;
}

function buildPlainText(body: ContactPayload): string {
  const lines = [
    `New Project Inquiry from streetshowproduction.com`,
    ``,
    body.name ? `Name: ${body.name}` : '',
    body.email ? `Email: ${body.email}` : '',
    body.company ? `Company: ${body.company}` : '',
    body.website ? `Website: ${body.website}` : '',
    body.projectType ? `Project Type: ${body.projectType}` : '',
    body.budget ? `Budget Range: ${body.budget}` : '',
    body.timeline ? `Timeline: ${body.timeline}` : '',
    body.location ? `Location: ${body.location}` : '',
    body.message ? `\nGoal in Japan:\n${body.message}` : '',
    ``,
    `Received: ${new Date().toISOString()}`,
  ];
  return lines.filter(Boolean).join('\n');
}

const DEFAULT_TO = 'jackson@streetshowproduction.com';
const DEFAULT_FROM = 'Streetshow Productions <noreply@streetshowproduction.com>';

export async function POST(req: Request) {
  // Reject oversized payloads before parsing.
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }

  let raw: ContactPayload;
  try {
    raw = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't retry.
  if (isHoneypotTripped(raw.company_url)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Rate limit by IP (no-op unless Upstash is configured).
  const { limited } = await checkRateLimit(clientIpFrom(req.headers));
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  const body = normalize(raw);

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  // Always log to Vercel function logs so submissions are never fully lost,
  // even if email delivery fails.
  console.log('[contact] submission', JSON.stringify({ receivedAt: new Date().toISOString(), ...body }));

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!resendApiKey) {
    // No API key set — the submission is in the logs but no email was sent.
    // Return success so the user still sees confirmation, but tell them how to follow up directly.
    console.warn('[contact] RESEND_API_KEY not set — submission logged but no email delivered.');
    return NextResponse.json({
      ok: true,
      delivered: false,
      note: 'Submission received. Email delivery not configured.',
    });
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
        to: [toEmail],
        reply_to: body.email,
        subject: `New Inquiry: ${body.name}${body.company ? ` / ${body.company}` : ''}`,
        html: buildEmailHtml(body),
        text: buildPlainText(body),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[contact] Resend error', res.status, err);
      return NextResponse.json(
        {
          error:
            'We could not deliver your message automatically. Please email admin@streetshowproduction.com directly — we will respond promptly.',
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[contact] Resend fetch failed', err);
    return NextResponse.json(
      {
        error:
          'We could not deliver your message automatically. Please email admin@streetshowproduction.com directly — we will respond promptly.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
