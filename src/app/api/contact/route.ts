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
    `New Project Inquiry — streetshowproduction.com`,
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'name, email, and message are required' },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Send via Resend API
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Streetshow Website <onboarding@resend.dev>',
          to: ['admin@streetshowproduction.com'],
          reply_to: body.email,
          subject: `New Inquiry: ${body.name}${body.company ? ` — ${body.company}` : ''}`,
          html: buildEmailHtml(body),
          text: buildPlainText(body),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }
    } else {
      // Fallback: log to console (visible in Vercel function logs)
      console.log('=== NEW CONTACT FORM SUBMISSION ===');
      console.log(JSON.stringify({ receivedAt: new Date().toISOString(), ...body }, null, 2));
      console.log('=== END SUBMISSION ===');
      console.log('Set RESEND_API_KEY env var to enable email delivery.');
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }
}
