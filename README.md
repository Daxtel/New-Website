# New Website

Streetshow Productions' new production website codebase built with Next.js.

## Purpose
This repository is the new website foundation for Streetshow Productions, focused on:

- Japan market entry
- localization-led brand strategy
- luxury hospitality positioning
- premium creative execution
- service detail pages
- project / case-study detail pages
- contact capture
- bilingual architecture foundations (EN / JP)

## Tech stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Route map
### Main pages
- `/`
- `/japan-market-entry`
- `/hospitality`
- `/services`
- `/work`
- `/about`
- `/contact`

### Dynamic detail routes
- `/services/[slug]`
- `/work/[slug]`

### API
- `/api/contact`

### SEO/support routes
- `/robots.txt`
- `/sitemap.xml`

## Local development
```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000`

## Production build
```bash
npm run build
npm run start
```

## Contact form & lead email

Three API routes send lead-notification email via Resend: `/api/contact`,
`/api/restaurant-lead`, `/api/subscribe`. Each submission is also logged to the
Vercel function logs so a lead is never fully lost, even if email delivery fails.

### Environment variables

| Variable | Purpose | Notes |
|----------|---------|-------|
| `RESEND_API_KEY` | Auth for Resend email delivery. | If unset, submissions are logged but no email is sent (the form still returns success). |
| `CONTACT_TO_EMAIL` | Who receives lead notifications. | **Comma-separated list supported** (e.g. `admin@streetshowproduction.com, owner@streetshowproduction.com`) so the shared inbox and the owner can both be notified. Whitespace is trimmed, empty entries dropped. |
| `CONTACT_FROM_EMAIL` | The `From:` address on notification email. | **Must be on a Resend-verified sending domain** or delivery fails silently. Defaults to `Streetshow Productions <noreply@streetshowproduction.com>`. |

**Important:** if `CONTACT_TO_EMAIL` is unset or empty, leads fall back to
`admin@streetshowproduction.com` (the monitored shared inbox) — never a personal
address. Leaving it unset silently routes every lead to that fallback, so set it
explicitly in Vercel for Production, Preview, and Development.

`reply_to` on each notification is the submitter's own address, so replying from
the inbox reaches the lead, not the form.

## Deployment
Recommended deployment target:
- **Vercel**

Quick start:
1. import this GitHub repo into Vercel
2. keep the default Next.js framework setting
3. run the default build command: `npm run build`
4. connect the production domain

See `DEPLOYMENT.md` for the full deployment checklist.

## Current status
This repository is now in a polished handoff state.

Already in place:
- migrated top-level marketing pages
- strategic positioning pages
- service detail route layer
- case-study route layer
- shared content catalogs
- media-backed work surfaces
- bilingual architecture foundation
- local contact capture endpoint
- robots and sitemap support
- deployment guidance

Still appropriate for future improvement:
- deeper EN/JP translation completion across all nested content
- production contact delivery integration
- analytics
- image optimization and media replacement where needed

## Additional docs
- `READY_FOR_NEW_REPO.md` — migration handoff summary
- `DEPLOYMENT.md` — deployment and production checklist
