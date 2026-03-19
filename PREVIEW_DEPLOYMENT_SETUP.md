# Preview Deployment Setup

This repo is prepared for Vercel preview and production deployments through GitHub Actions.

## What is already in the repo
- `.github/workflows/vercel-preview.yml`
- `.github/workflows/vercel-production.yml`
- `vercel.json`

## What you need to do once in Vercel
1. Create/import the project in Vercel from this GitHub repo.
2. In the Vercel project settings, collect:
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`
3. Create a Vercel token with deployment access.

## Add these GitHub repo secrets
In GitHub → Settings → Secrets and variables → Actions, add:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Preview flow
After secrets are added:
- every pull request to `main` will create/update a Vercel preview deployment
- pushes to non-main branches will also create preview deployments

## Production flow
After secrets are added:
- every push to `main` will deploy to production

## Recommended branch workflow
- keep `main` as production
- create feature branches for all work
- open pull requests for preview deployments
- merge to `main` when approved

## Important note
Current contact handling writes locally to `.submissions/contact.jsonl`.
That is fine for code testing but not ideal for real production lead handling.
Before public launch, connect `/api/contact` to a real destination.
