import { NextResponse } from 'next/server';

type LeadPayload = {
  restaurantType?: string;
  challenge?: string;
  seats?: string;
  area?: string;
  name?: string;
  restaurantName?: string;
  instagram?: string;
  email?: string;
  phone?: string;
};

const CHALLENGE_LABELS: Record<string, string> = {
  'no-time': 'No time to create content',
  'no-ideas': "Doesn't know what to post",
  'no-results': 'Posting but no results',
  'quality': 'Content quality is low',
};

const AREA_LABELS: Record<string, string> = {
  fukuoka: 'Fukuoka',
  tokyo: 'Tokyo',
  osaka: 'Osaka',
  other: 'Other',
};

function buildEmailHtml(lead: LeadPayload): string {
  const rows = [
    { label: 'Name', value: lead.name },
    { label: 'Restaurant', value: lead.restaurantName },
    { label: 'Type', value: lead.restaurantType },
    { label: 'Area', value: AREA_LABELS[lead.area || ''] || lead.area },
    { label: 'Seats', value: lead.seats },
    { label: 'Challenge', value: CHALLENGE_LABELS[lead.challenge || ''] || lead.challenge },
    { label: 'Instagram', value: lead.instagram ? `@${lead.instagram.replace(/^@/, '')}` : undefined },
    { label: 'Email', value: lead.email },
    { label: 'Phone', value: lead.phone },
  ]
    .filter((r) => r.value)
    .map(
      (r) =>
        `<tr><td style="padding:10px 14px;font-weight:600;vertical-align:top;color:#D4AF37;white-space:nowrap;border-bottom:1px solid rgba(212,175,55,0.08)">${r.label}</td><td style="padding:10px 14px;color:#F5F5F5;border-bottom:1px solid rgba(212,175,55,0.08)">${r.value}</td></tr>`,
    )
    .join('');

  return `
    <div style="background:#0A0A0A;padding:32px;font-family:'Inter',system-ui,sans-serif">
      <div style="max-width:600px;margin:0 auto">
        <div style="background:#D4AF37;padding:3px"></div>
        <h1 style="color:#D4AF37;font-size:22px;margin:20px 0 4px">New Restaurant Lead</h1>
        <p style="color:#F5F5F5;opacity:0.5;font-size:13px;margin:0 0 20px">From Facebook Ad → Restaurant Landing Page</p>
        <table style="width:100%;border-collapse:collapse;background:#141414;border:1px solid rgba(212,175,55,0.12);border-radius:4px">
          ${rows}
        </table>
        <div style="margin-top:20px;padding:16px;background:#141414;border:1px solid rgba(212,175,55,0.12);border-radius:4px">
          <p style="color:#D4AF37;font-size:13px;font-weight:600;margin:0 0 8px">ACTION REQUIRED</p>
          <p style="color:#F5F5F5;opacity:0.7;font-size:13px;margin:0">Send custom content concept within 48 hours to ${lead.email}</p>
        </div>
        <p style="color:#F5F5F5;opacity:0.3;font-size:11px;margin-top:20px">Received at ${new Date().toISOString()}</p>
      </div>
    </div>
  `;
}

function buildPlainText(lead: LeadPayload): string {
  return [
    '=== NEW RESTAURANT LEAD ===',
    `Source: Facebook Ad → Restaurant Landing Page`,
    '',
    `Name: ${lead.name}`,
    `Restaurant: ${lead.restaurantName}`,
    `Type: ${lead.restaurantType}`,
    `Area: ${AREA_LABELS[lead.area || ''] || lead.area}`,
    lead.seats ? `Seats: ${lead.seats}` : '',
    `Challenge: ${CHALLENGE_LABELS[lead.challenge || ''] || lead.challenge}`,
    lead.instagram ? `Instagram: @${lead.instagram.replace(/^@/, '')}` : '',
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : '',
    '',
    `ACTION: Send custom content concept within 48 hours`,
    '',
    `Received: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

const DEFAULT_TO = 'jackson@streetshowproduction.com';
const DEFAULT_FROM = 'Streetshow Website <onboarding@resend.dev>';

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!body.name || !body.email || !body.restaurantName) {
    return NextResponse.json(
      { error: 'Name, email, and restaurant name are required.' },
      { status: 400 },
    );
  }

  // Always log to Vercel function logs
  console.log(
    '[restaurant-lead]',
    JSON.stringify({ receivedAt: new Date().toISOString(), ...body }),
  );

  // --- Google Sheets webhook (optional) ---
  const sheetsWebhookUrl = process.env.RESTAURANT_SHEETS_WEBHOOK;
  if (sheetsWebhookUrl) {
    try {
      await fetch(sheetsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: body.name,
          restaurant: body.restaurantName,
          type: body.restaurantType,
          area: AREA_LABELS[body.area || ''] || body.area,
          seats: body.seats,
          challenge: CHALLENGE_LABELS[body.challenge || ''] || body.challenge,
          instagram: body.instagram,
          email: body.email,
          phone: body.phone,
        }),
      });
    } catch (err) {
      console.error('[restaurant-lead] Sheets webhook failed', err);
      // Non-blocking — don't fail the request
    }
  }

  // --- Email notification via Resend ---
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!resendApiKey) {
    console.warn('[restaurant-lead] RESEND_API_KEY not set — lead logged but no email sent.');
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
        to: [toEmail],
        reply_to: body.email,
        subject: `🍽️ New Restaurant Lead: ${body.restaurantName} (${AREA_LABELS[body.area || ''] || body.area})`,
        html: buildEmailHtml(body),
        text: buildPlainText(body),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[restaurant-lead] Resend error', res.status, err);
      // Still return success to the user — lead is in logs
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (err) {
    console.error('[restaurant-lead] Resend fetch failed', err);
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
