# Streetshow Productions — Claude Code Handoff

Paste everything below the line into Claude Code, from the repo root
(`/Users/streetshowproductions/New-Website`). Nothing left to fill in — it is ready
to use as-is.

---

## START OF PROMPT

You are working on the Streetshow Productions website at
`/Users/streetshowproductions/New-Website`. Read `CLAUDE.md` first, but be warned it
is stale — correcting it is one of your tasks.

### Ground truth about this repo

The stack is **Next.js 16 (App Router) + TypeScript + React 19 + Tailwind 4**,
deployed on Vercel (project `streetshow-productions`), repo
`github.com/Daxtel/New-Website`. `CLAUDE.md` currently claims React + Craco +
Python — that is wrong.

The new site is **live in production** on streetshowproduction.com. Squarespace is
gone and the subscription is cancelled. Anything you break, clients see.

### Work already completed — do NOT redo it

There is an existing branch **`release/mobile-video-and-motion-qa`** with three
commits on it, not yet pushed. Check it out and read the commit messages before
doing anything else:

```
git checkout release/mobile-video-and-motion-qa
git log --oneline -3
```

- `5963ed1` — rescued a 5-day-old uncommitted copy rewrite (homepage hero,
  subheadline, meta description, trust line now names New Balance / SHEIN Japan /
  Ritz-Carlton).
- `251a7ac` — mobile video restored, motion bugs fixed, lint gate greened.
  Specifically: added `/public/videos/mobile/*` transcodes (59MB → 18MB,
  `kuoe-kyoto` 30MB → 5.2MB); rewrote `SmartVideo.tsx` so touch devices get the
  mobile source plus a real play control instead of a dead poster image;
  `VideoScrubHero.tsx` now autoplays the mobile transcode on phones; removed
  `html { scroll-behavior: smooth }` which was fighting Lenis; replaced the global
  `transition: all` with an explicit property list; `PageTransition` now resets
  Lenis scroll on route change; removed the `video { height: 100% }` rule that
  overrode `img, video { height: auto }`; fixed all 7 lint errors in
  `ParticleFieldScene.tsx` and stopped it allocating a WebGL context on mobile to
  draw zero particles; `.gitignore` now tracks `.claude/agents/`.
- `05b7e29` — two-layer QA gate: `scripts/qa-guards.mjs` (deterministic, wired into
  both deploy workflows as `npm run qa`) and `.github/workflows/qa-agents.yml`
  (agent review on PRs).

`npm run lint` exits 0 and `npm run qa` exits 0 on this branch. Verify that yourself
before you start; if either fails, something has drifted.

### Hard constraints

1. **One production deploy.** Everything ships together in a single merge to `main`.
   Do not push anything to `main` piecemeal. Commit incrementally on the release
   branch so failures are bisectable, then merge once at the end.
2. **Verify on the preview URL, not locally.** Pushing the branch triggers
   `.github/workflows/vercel-preview.yml`, which lints, runs the QA guards, builds,
   and deploys a Vercel preview. All verification happens against that deployed URL.
3. **Hard gate.** Any `blocker` finding stops the merge. No exceptions, no "good
   enough for now". This was an explicit decision by the owner.
4. Never commit directly to `main`.

### Task 1 — Contact form is sending leads to the wrong inbox

Highest business priority. Enquiries are reaching a personal address instead of the
shared inbox the assistant monitors, so leads sit unanswered.

The code already supports this and no one knew. All three API routes —
`src/app/api/contact/route.ts`, `src/app/api/restaurant-lead/route.ts`,
`src/app/api/subscribe/route.ts` — read `process.env.CONTACT_TO_EMAIL` and fall back
to a hardcoded `DEFAULT_TO = 'jackson@streetshowproduction.com'`. The variable is
almost certainly unset in Vercel, so every form is hitting the fallback.

Do this:

- Change `DEFAULT_TO` in all three routes from `jackson@streetshowproduction.com` to
  **`admin@streetshowproduction.com`**, so the fallback is correct even if the env
  var goes missing again. This is the monitored inbox the assistant works from.
- Support a comma-separated list in `CONTACT_TO_EMAIL` so the shared inbox and the
  owner can both be notified when wanted. Parse it, trim whitespace, drop empties,
  and pass the array to Resend's `to` field.
- Keep `reply_to` set to the submitter's address — replying must reach the lead, not
  the form.
- The two error-path messages in `src/app/api/contact/route.ts` (around lines 199 and
  209) already tell users to email `admin@streetshowproduction.com` when delivery
  fails. That is now consistent with `DEFAULT_TO` — confirm it, and check the other
  two routes for any hardcoded address that still says otherwise.
- Confirm `admin@streetshowproduction.com` can actually receive from Resend. The
  sender domain was changed once already for exactly this reason (commit `e335c6f`,
  "use verified domain for Resend email sender").
- `.env.example` is covered by the `.env*` line in `.gitignore`, so it is not in the
  repo and cannot document this. Document `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`
  in `README.md` instead — what they do, that `CONTACT_FROM_EMAIL` must be a
  Resend-verified domain, and that leaving them unset silently routes leads to the
  fallback.
- Then tell me, in your final message, the exact Vercel dashboard steps to set
  `CONTACT_TO_EMAIL` for Production, Preview, and Development. I will do that part —
  you do not have Vercel access.

Finally: write a test submission through the deployed preview and confirm the mail
actually arrives. Do not mark this done based on reading the code.

### Task 2 — Verify the video and motion fixes on real devices

Everything in `251a7ac` is verified only by types and lint. Nobody has looked at it.
Push the branch, get the preview URL, and check on the deployed site:

- A phone can play every video. Tap-to-play works on the work cards, and the work
  detail hero autoplays inline.
- **Test at 768px with touch emulation on, not just at phone width.** The code
  branches on the `(hover: none)` media query, which is true on iPad. Desktop-only
  testing is exactly what let this defect reach clients in the first place.
- Scrolling is smooth with no stutter or overshoot, and anchor links work.
- Hovering buttons and links no longer smears.
- Navigating from halfway down a page lands at the top of the next page.
- Work cards are the same height on mobile and desktop.
- Report actual bytes transferred per route on a mobile profile from the network log.

### Task 3 — Run the QA agents

Five agent definitions exist in `.claude/agents/`: `qa-visual`, `qa-copy`, `qa-i18n`,
`qa-motion-perf`, `qa-release-gate`. Read them.

Run the four specialists **concurrently** — one message, multiple Task tool calls —
against the deployed preview URL. Then run `qa-release-gate` with all four reports.

Every report must cover mobile and desktop. Reject and re-run any report that covers
only desktop.

Fix every `blocker`. Re-run the affected agent to confirm the fix. Repeat until
`qa-release-gate` returns `VERDICT: PASS`.

### Task 4 — Rewrite CLAUDE.md

It is the only persistent memory this project has, and it is currently wrong. Every
future session starts from it.

- Stack: Next.js 16 App Router, TypeScript, React 19, Tailwind 4, deployed on Vercel.
  Not React + Craco, not a Python backend.
- Repo is `New-Website`, not `Website-Main-`.
- Squarespace is decommissioned; the Next.js site is live on the apex domain.
- Replace the "Current Goals (March 2026)" section with the real current state.
- Add a "Verification" section: `npm run verify` runs lint, QA guards, and build.
  All work happens on a branch, is verified on the Vercel preview URL, and merges to
  `main` exactly once. Any blocker from the QA agents stops the merge.
- Add a "Known regressions — do not reintroduce" section listing: poster-only video
  with no play control, `transition: all`, `scroll-behavior: smooth` alongside Lenis,
  `video { height: 100% }`, double brand suffix in page titles, Ritz-Carlton Fukuoka
  named as a client when it is a prospect.

### Task 5 — Fix the overlapping label on the contact form selects

On `/contact`, the "PROJECT TYPE" and "BUDGET RANGE" labels render on top of the
"Select one" text. Confirmed in production.

Cause is in `FloatSelect` in `src/components/contact-form.tsx`:

```ts
const lifted = focused || value.length > 0;
```

That logic is correct for `FloatField`, where an empty `<input>` renders nothing and
the vertically centred label has the box to itself. It is wrong for a `<select>`,
which always paints its current option — here the placeholder
`<option value="" disabled hidden>Select one</option>`. So with nothing selected the
centred label and the option text occupy the same space.

Fix: in `FloatSelect` only, the label must always be in the lifted position, because
there is always text beneath it. Do not fix this by adjusting `z-index` or padding —
the existing `z-10` on that label (absent from the input's label) is a previous
attempt to layer over the collision instead of removing it. Remove `z-10` too if it
is no longer needed.

Check the same reasoning against `FloatField` and `FloatTextArea`. Any control that
renders text while "empty" has this bug.

### Task 6 — Build a rendered-geometry crawler

This class of defect is invisible to TypeScript, ESLint, and `scripts/qa-guards.mjs`,
because nothing is malformed. Two elements simply occupy the same pixels. The only
way to catch it is to render and measure.

Build `scripts/qa-crawl.mjs` using Playwright with the Chromium already available.
Add it to `package.json` as `qa:crawl`. It must NOT run in the deploy workflows —
it is slow. Wire it into `.github/workflows/qa-agents.yml` before the agents run, and
make it runnable on demand.

For each route, at viewport widths 390, 768 and 1440:

1. **Text collision.** Collect every element that renders its own text (a direct
   non-whitespace text node child). Get each `getBoundingClientRect()`. Report any
   pair whose rectangles intersect where neither element contains the other, and the
   overlap exceeds 25% of the smaller box.
   - Skip elements that are invisible: `visibility: hidden`, `opacity: 0`, zero-area,
     `aria-hidden="true"`, or clipped offscreen (the honeypot field at
     `left-[-9999px]` in the contact form is legitimate).
   - Skip pairs where either element is `position: fixed` — the sticky header
     overlapping page content on scroll is intentional.
   - Text deliberately laid over media (work card titles over video) is intentional.
     Do not report a text element overlapping a non-text element; only text-on-text.

2. **Clipped text.** Any text element where `scrollWidth > clientWidth + 1` and the
   computed `overflow` is `hidden` — content is being silently cut off.

3. **Horizontal page overflow.** `document.documentElement.scrollWidth >
   window.innerWidth`. Report the widest offending element. Note that `globals.css`
   sets `overflow-x: hidden` and `max-width: 100vw` on body, which HIDES this rather
   than fixing it, so it is currently invisible in the browser. Measure, do not look.

4. **Interactive states.** A page-load-only crawl would miss the exact bug in Task 5
   if a value were preselected. After the static pass, for every form on the page:
   focus each input, select and textarea in turn, and re-run checks 1 and 2. Then
   select the first real option in each `<select>` and re-run. State-dependent
   collisions are the ones that reach clients.

Output a JSON report plus a PNG screenshot per finding, with the offending elements
outlined, into `.qa-crawl/` (add that directory to `.gitignore`). Exit non-zero if
any finding is found. Print a readable summary: route, viewport, state, the two
selectors involved, and the overlap in pixels.

Then run it against the deployed preview URL and fix everything it finds. Report
anything you judge to be a false positive rather than silently filtering it — if the
crawler is noisy it will be ignored, so tune it against real output, and record in
the script's header comment what you tuned and why.

### Task 7 — Report before merging, do not merge on your own

When `qa-release-gate` returns PASS and `npm run qa:crawl` is clean, stop and give me:

- The preview URL.
- What each agent found and what you changed.
- What the crawler found, and any finding you classified as a false positive.
- Anything you deferred, and why.
- The Vercel steps for `CONTACT_TO_EMAIL`.

I will approve the merge to `main`.

### Two things to flag, not fix

- **Bandwidth.** `public/videos/` is now ~78MB committed to git and served from
  Vercel's `/public` on every deploy. The desktop originals are still unoptimised —
  `kuoe-kyoto.mp4` is 80 seconds of 1080p at 30MB. On the Vercel free tier's 100GB
  monthly bandwidth, roughly 3,300 views of that one file exhausts the allowance.
  Do not re-encode the desktop masters without asking — this is a video production
  studio's showreel and quality is the product. Propose options (a video CDN such as
  Mux, Cloudflare Stream or Bunny; or a reviewed re-encode) and let me decide.
- **Em dashes.** `npm run qa` reports 20 em-dash warnings in the August blog copy,
  contradicting the removal done in commit `7cc6588`. They are warnings, not
  blockers. Ask before doing a sweep.

## END OF PROMPT
