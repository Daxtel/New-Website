# Streetshow Productions — Master Context File

## Company
Streetshow Productions is a strategy-first creative production studio based in
Fukuoka and Tokyo, Japan. Founded in 2013. Global team across Japan, France, and
Kigali.

## Owner
Jackson (Daxtel Jackson), Director, Strategist, Videographer.
Email: admin@streetshowproduction.com. GitHub: Daxtel.

## What We Do
- Japan market entry and localization (cultural adaptation, not just translation)
- Video production for international brands in Japan (Fukuoka, Tokyo, nationwide)
- Hospitality creative strategy (hotels, resorts, luxury brands)
- 3D anamorphic billboard production (Shibuya, Shinjuku, Osaka)
- Photography and CGI
- Live commerce and e-commerce growth

## Target Clients
- International/luxury brands entering Japan
- Hotels and resorts in Japan (especially Fukuoka and Tokyo)
- Fashion, automotive, F&B, e-commerce, lifestyle
- Companies needing Japan market localization and bilingual execution

## Proven Clients
New Balance Japan, SHEIN Japan, The Ritz-Carlton Kyoto, Ritz-Carlton Osaka, TATA,
Kubota Spears, QC Running, TV5, JTL E-Commerce, KUOE Kyoto, Fuditalyco,
SOUMEI Champagne, Charles & Keith.

Note: **The Ritz-Carlton Fukuoka is a PROSPECT, not a client** — never name it as a
client in site copy or proposals.

## Brand Voice
- Premium but direct. No fluff. No em dashes in copy (the QA gate flags them).
- Strategy-first: start with business goals.
- Bilingual: English and Japanese.
- Confident, specific, results-focused. Never generic.

## The website (this repo)

**This repo `New-Website` is the live production site** at streetshowproduction.com.
Squarespace is decommissioned; the subscription is cancelled. The Next.js site is
live on the apex domain. Anything broken here, clients see.

### Tech stack
- **Next.js 16 (App Router), TypeScript, React 19, Tailwind 4.**
- Deployed on **Vercel** (project `streetshow-productions`, repo
  `github.com/Daxtel/New-Website`).
- NOT React + Craco. NOT a Python backend. NOT the old `Website-Main-` repo.
- Bilingual EN/JP via cookie/URL locale; JA routes served under `/ja/*` (middleware
  rewrite, no `[locale]` segment). Content lives in `src/lib/*` data files.
- Lead email via Resend from `/api/{contact,restaurant-lead,subscribe}`; recipients
  from `CONTACT_TO_EMAIL` (comma list), fallback `admin@streetshowproduction.com`.

## Verification (do this, every time)
- `npm run verify` runs **lint + QA guards + build**. It must be clean before any
  merge. (`npm run qa` alone runs the deterministic guards in `scripts/qa-guards.mjs`.)
- **All work happens on a branch, never directly on `main`.** Commit incrementally
  so failures are bisectable.
- **Verify on the deployed Vercel preview URL, not locally.** Pushing the branch
  triggers `.github/workflows/vercel-preview.yml` (lint, QA guards, build, preview
  deploy). All human/agent QA runs against that URL, on mobile AND desktop.
- Agent QA lives in `.claude/agents/` (`qa-visual`, `qa-copy`, `qa-i18n`,
  `qa-motion-perf`, `qa-release-gate`). Run the four specialists concurrently, then
  the release gate. **Any `blocker` finding stops the merge — no exceptions.**
- Merge to `main` **exactly once**, at the end, and only the owner approves it.

## Known regressions — do NOT reintroduce
- **Poster-only video with no play control on mobile.** Touch devices must get a
  real, playable video (mobile transcode + play control), never a dead still image.
- **`transition: all`** in global CSS. Use an explicit property list.
- **`scroll-behavior: smooth`** in CSS alongside Lenis — they fight and cause jank.
- **`video { height: 100% }`** overriding `img, video { height: auto }`.
- **Double brand suffix in page titles** (metaTitle already includes the brand; use
  `title: { absolute }`, don't let the template append a second suffix).
- **Naming Ritz-Carlton Fukuoka as a client** — it is a prospect.
- **Em dashes in English copy** — the QA gate flags them.

## Rules for all agents
- Never ship placeholder content.
- Brand voice: premium, direct, results-focused.
- Bilingual (EN + JA) where applicable; JA is native copy, not machine translation,
  unless explicitly marked interim.
- Pricing in JPY unless the client is non-Japan based.
- Every piece of content has a clear path to ROI.
