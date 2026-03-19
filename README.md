# New Website

Streetshow Productions' new website codebase built in Next.js.

## Overview
This repository contains the new migration-ready website foundation for Streetshow Productions, designed around:

- Japan market entry
- localization-led brand strategy
- luxury hospitality positioning
- premium creative execution
- service detail pages
- project / case-study detail pages
- contact capture
- bilingual architecture foundations (EN / JP)

## Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Routes
### Core pages
- `/`
- `/japan-market-entry`
- `/hospitality`
- `/services`
- `/work`
- `/about`
- `/contact`

### Dynamic routes
- `/services/[slug]`
- `/work/[slug]`

### API
- `/api/contact`

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

## Contact form behavior
The current contact form posts to `/api/contact`.
Right now, submissions are stored locally in:

- `.submissions/contact.jsonl`

This is a temporary local capture layer until email, CRM, or webhook delivery is connected.

## Current status
This repo is in a strong handoff state and is suitable as the new website repo.

What is already done:
- migrated top-level marketing pages
- strategic positioning pages
- service detail route layer
- case-study route layer
- shared content catalogs
- media-backed work surfaces
- bilingual architecture foundation
- local contact capture endpoint

What still may be improved later:
- deeper EN/JP translation completion across all nested content
- production contact delivery integration
- analytics
- deployment configuration
- final media replacement and optimization

## Notes
See `READY_FOR_NEW_REPO.md` for the migration handoff summary.
