# Streetshow Next.js Migration

## Purpose
This app is the parallel Next.js rebuild target for Streetshow Productions.

- Existing working site remains at `../frontend`
- New migration target lives at `./next-frontend`
- Do not break or replace the working CRA build until core pages are migrated and reviewed

## Locked position
- Brand: Streetshow Productions
- Domain: https://streetshowproduction.com
- Location: Fukuoka & Tokyo, Japan
- Core offer: Japan market entry, localization, and premium creative execution
- Primary vertical: luxury hospitality
- Secondary vertical: premium real estate / destination brands
- Primary CTA: Book a Strategic Call
- Languages: English + Japanese

## Migration order
1. Home
2. Japan Market Entry
3. Hospitality
4. Services
5. Service Detail
6. Work
7. Project Detail
8. About
9. Contact

## Content strategy
Move copy and page data into typed content modules under `src/lib/` or `src/content/`.
Prefer structured objects over hardcoded JSX strings.

## Immediate next steps
- Build shared layout, nav, footer, and CTA primitives
- Port homepage hero and trust structure
- Add route groups for `(marketing)` pages if desired
- Add bilingual content structure before page count expands
- Introduce proper metadata per route
