# Deployment Guide

## Recommended platform
Deploy this project on **Vercel** for the simplest Next.js production setup.

## Before deployment
Decide the following:
- production domain
- contact form destination (currently local JSONL storage only)
- analytics provider
- final bilingual rollout approach

## Environment variables
No required environment variables are needed for the current local-only contact handler.

If you later connect email, CRM, or webhooks, add them to `.env.local` and your deployment provider.

## Vercel setup
1. Import the GitHub repo into Vercel
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Output: default Next.js output
5. Node version: use provider default compatible with Next 16

## Domain
Expected primary site URL currently configured in code:
- `https://streetshowproduction.com`

If the final production domain differs, update:
- `src/lib/site.ts`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

## Contact form
Current behavior:
- POSTs to `/api/contact`
- writes to `.submissions/contact.jsonl`

Recommended production replacement:
- webhook to CRM
- Resend/email pipeline
- Airtable / Notion / HubSpot / custom backend

## Post-deploy checklist
- verify all routes render
- verify metadata output
- verify robots.txt and sitemap.xml
- test contact form submission
- test external images
- verify canonical URL
