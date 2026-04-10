import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

function buildEmailHtml(body: ContactPayload): string {
  const fields = [
    { label: 'Name', value: body.name },
    { label: 'Email', value: body.email },
    { label: 'Company', value: body.company },
    { label: 'Message', value: body.message },
  ];

  const rows = fields
    .filter((f) => f.value)
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;color:#D4AF37;white-space:nowrap">${f.label}</td><td style="padding:8px 12px;color:#F5F5F5">${f.value}</td></tr>`,
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
    body.message ? `\nMessage:\n${body.message}` : '',
    ``,
    `Received: ${new Date().toISOString()}`,
  ];
  return lines.filter(Boolean).join('\n');
}

// Primary inbox (Resend's onboarding sender can only deliver to this verified owner address on the free tier).
// Set CONTACT_TO_EMAIL in Vercel env to override. If you add a custom sending domain in Resend later,
// you can set CONTACT_FROM_EMAIL to a branded from-address.
const DEFAULT_TO = 'streetshow21@gmail.com';
const DEFAULT_FROM = 'Streetshow Website <onboarding@resend.dev>';

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
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
