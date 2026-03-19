# Ready for New Repo

## Current state
The Next.js migration app is now in a strong handoff state.

Location:
- `tmp/website-main/next-frontend`

## What is in place
- Next.js app scaffolded and building cleanly
- Shared header/footer shell
- Top-level marketing routes
  - `/`
  - `/japan-market-entry`
  - `/hospitality`
  - `/services`
  - `/work`
  - `/about`
  - `/contact`
- Dynamic service detail routes
- Dynamic project/case-study routes
- Shared content catalog and media references
- Initial bilingual architecture layer (`en` / `ja`)
- Contact form UI
- Contact submission API route writing to `.submissions/contact.jsonl`

## Important notes
- Bilingual support is structurally prepared, but not every deep content block has been fully translated yet.
- Current pages default to English in runtime usage.
- Contact submissions are stored locally for now, not forwarded to email/CRM.
- Before production deployment, decide on:
  - email/CRM destination
  - final bilingual routing approach
  - analytics
  - image optimization policy
  - deployment target (Vercel or other)

## Recommended next repo actions
1. Initialize a fresh git repo from this folder
2. Add environment strategy if external integrations are introduced
3. Connect production contact handling
4. Add real language switch / locale routing
5. Replace any remaining placeholder visual assets as needed

## Validation
Last validated command:
- `npm run build`

This app should now be treated as the new migration-ready codebase.
