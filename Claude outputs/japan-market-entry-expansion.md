# Task: Expand the Japan Market Entry Guide

**For Claude Code. Paste this whole file.**

---

## What this is

The article copy below is finished and approved. Your job is to integrate it into
the existing blog post, not to rewrite it and not to create a new post.

**Target:** `src/lib/blog.ts`, the post with slug `japan-market-entry-guide-2026`
(live at `/blog/japan-market-entry-guide-2026` and `/ja/blog/japan-market-entry-guide-2026`).

**Why this page and not a new one:** it already ranks for Japan market entry, and
`japan market entry strategy` is close enough to the same query that a second post
would split the ranking signal between two of our own pages. The four sections below
are genuinely absent from the current 1,400 words, so this makes that page the pillar
rather than adding a competitor to it.

## Ground rules

- **Read the existing article in full first.** If any new section overlaps something
  already there, tell me before you merge them. Do not silently duplicate.
- **House style:** no em dashes in English copy. No filler ("materially affect
  outcomes", "world-class"). Premium, direct, strategy-first. `npm run qa` enforces
  some of this; the rest is judgement.
- **Do not invent anything.** One section below is deliberately blocked pending
  information from me. Leave it out rather than filling it in.
- Work on a branch. Commit incrementally. Push for the Vercel preview. Do not merge
  to `main` — report and I approve.

## Workflow

1. Branch: `content/japan-market-entry-pillar`
2. Read the existing post, confirm no overlap, flag anything you find
3. Insert the four new sections at the positions given below
4. Update the metadata as specified
5. Add the internal links listed at the end
6. `npm run verify` (lint + qa guards + build) must exit 0
7. `npm run qa:crawl` must be clean — this adds a lot of body copy and headings,
   so check for new overflow or collisions at 390 / 768 / 1440
8. Push, get the preview URL, send me screenshots of the page at all three widths
9. Stop. Do not merge.

---

## Insertion points

The existing article runs:

1. The 2026 Japan market opportunity in numbers
2. Why most foreign brands underperform in Japan
3. The operating model we use at Streetshow
4. What a premium Japan market entry actually involves
5. How to evaluate a Japan market entry partner
6. Bottom line for 2026

Insert the four new sections **between 2 and 3**. The reader moves from "why launches
fail" into "here is what the work actually is", and only then meets our operating
model. That order earns the pitch instead of leading with it.

Resulting order:

1. The 2026 Japan market opportunity in numbers *(existing)*
2. Why most foreign brands underperform in Japan *(existing)*
3. **The regulatory groundwork most brands underestimate** *(new)*
4. **Positioning: what has to change, and what must not** *(new)*
5. **Distribution: how your product actually reaches a Japanese buyer** *(new)*
6. **Creative adaptation is not translation** *(new)*
7. What a premium Japan market entry actually involves *(existing)*
8. The operating model we use at Streetshow *(existing)*
9. How to evaluate a Japan market entry partner *(existing)*
10. *(CTA section — BLOCKED, see bottom of file. Do not add it yet.)*
11. Bottom line for 2026 *(existing)*

All new sections are H2. Do not introduce an H3 level; the article has none and the
hierarchy guard expects no skipped levels.

## Metadata updates

Replace the existing values with these. The title is absolute — the layout template
must not append the brand suffix again. This page was part of the double-suffix
regression once already.

**metaTitle:**
```
Japan Market Entry Strategy: The 2026 Guide for Premium Brands
```

**metaDescription** (152 characters, inside the 120-160 guard):
```
A step-by-step Japan market entry strategy for premium brands: regulatory groundwork, positioning, distribution, and creative that works in market.
```

Leave the slug unchanged. Changing it would lose the page's existing authority and
require a redirect for no benefit.

---

# SECTION 3 — new

## The regulatory groundwork most brands underestimate

Nothing here is difficult. It is simply slower than the timeline in your launch deck,
and almost every delay we see traces back to a step that looked administrative and
turned out to be sequential.

Four questions decide your calendar.

**Who is the importer of record?** Someone with a legal presence in Japan has to take
responsibility for the goods entering the country. If you are not establishing an
entity, that is your distributor, a trading company, or an import agent. This decision
is not paperwork. It determines who controls your pricing, your channel relationships,
and how easily you can change partners in year three. Brands routinely sign this away
in month one to move faster, then spend years trying to get it back.

**What category does your product fall into?** Cosmetics, food and beverage,
supplements, medical devices and electrical goods each sit under a different approval
regime, with different documentation and different lead times. A general merchandise
item can clear in weeks. A product touching skin or entering the body can take the
better part of a year. Find out which you are before you commit to a launch date, not
after.

**What has to appear on the packaging?** Japanese labelling requirements are specific
and enforced. Ingredients, origin, importer details, handling and category-specific
warnings all have prescribed treatment. This is the item most often discovered late,
because it sits between marketing and compliance and neither team owns it. Relabelling
a shipment that has already landed is expensive, and it delays your launch by the
length of the reprint.

**How is consumption tax handled, and are your invoices compliant?** Japan's qualified
invoice system affects how your B2B partners account for the tax they pay you. Get the
registration and the invoice format wrong and your wholesale customers absorb a cost
they did not expect, which is a bad way to begin a relationship with a Japanese buyer.

Two points to hold onto. First, these steps are sequential, not parallel: category
classification drives documentation, documentation drives labelling, labelling drives
your print deadline, and the print deadline drives your launch date. Second, none of
this is creative work, and none of it is optional. Scope it in month one with a
specialist, and treat the timeline it produces as the real one.

*This section is strategic guidance, not legal or customs advice. Requirements change
and vary by product category. Confirm your obligations with a qualified specialist
before committing to a launch date.*

---

# SECTION 4 — new

## Positioning: what has to change, and what must not

The instinct most brands arrive with is that Japan needs a softer, more polite version
of their global positioning. That instinct produces work that is pleasant, forgettable,
and indistinguishable from the three other foreign brands launching that quarter.

The useful question is narrower. Your global positioning contains a promise and a set
of proofs. The promise usually travels. The proofs almost never do.

A performance brand selling on "worn by the best athletes in the world" is making a
promise about credibility. In its home market, the proof is a roster of names the
audience grew up watching. In Japan, that roster may mean very little, while a single
domestic athlete carries more weight than the entire international list. The promise is
unchanged. The proof has to be rebuilt from local material.

A hospitality brand selling on "effortless luxury" faces a harder version of the same
problem. In Japan, service excellence is not a differentiator you can claim. It is the
baseline the market already delivers, at a standard most international operators
underestimate. Arriving with a promise the local competition has met for decades reads
as naive. The position has to move to something the market does not already have.

Three things to work out before anyone writes a line of copy.

**What is the reference set?** Japanese buyers will not compare you to your global
competitors. They will compare you to whatever occupies your shelf, your price band, or
your category in their market. Know who that actually is. It is frequently a domestic
brand your category team has never heard of.

**What is your credibility source?** Foreign origin can be an asset or a liability
depending on category. In some, provenance sells. In others, the market wants evidence
that you have done the work to belong here. Decide which you are, and build proof
accordingly.

**What are you willing to not say?** Claims that work as confident in English can read
as overreaching in Japanese. The brands that land well usually say less and demonstrate
more. This is the hardest adjustment for founders, and it is the one that most reliably
separates launches that build trust from launches that spend a year apologising for
their first campaign.

What must not change is the thing that makes you worth choosing. Adapting a brand until
it resembles the local market is not localization, it is erasure, and it removes the
only reason a Japanese buyer would pick you over an incumbent who understands them
better.

---

# SECTION 5 — new

## Distribution: how your product actually reaches a Japanese buyer

Distribution decisions outlive campaigns. A channel choice made in month two constrains
your pricing, your margin and your brand control for years, and unwinding it is
considerably harder than making it.

Four routes, with the real trade-off in each.

**Direct-to-consumer.** You keep the margin, the customer relationship and full control
of how the brand is presented. You also take on Japanese-language customer service,
domestic payment methods, delivery expectations that are stricter than most markets, and
returns handling. DTC in Japan is not a cheap entry route. It is a commitment to
operating in the market properly, and it rewards brands willing to make it.

**Marketplace.** Rakuten and Amazon Japan put you in front of volume immediately. The
cost is that you are competing on a page designed to make comparison easy, where the
visual conventions and the density of information are unlike anything in Western
e-commerce. A storefront that looks clean and premium by international standards
frequently underperforms against a domestic competitor's denser, busier page, because
the density is what Japanese shoppers read as thorough.

**Wholesale and retail.** Placement in the right store is a credibility signal that
money cannot easily buy, and it reaches a customer who will never find you online. It is
also slow. Japanese buyers evaluate over long cycles, expect consistency, and are
assessing whether you will still be here in three years. Treat a first meeting as the
opening of a relationship, not a pitch.

**Distributor.** The fastest route to being in market, and the one that costs you the
most optionality. A good distributor brings relationships you cannot build in a year. A
bad one becomes a wall between you and your own customers, and the exclusivity clause
you signed in month one is what keeps it there. If you go this way, negotiate the exit
before you negotiate the terms.

Most premium brands end up with a combination, and the sequencing matters more than the
mix. The pattern that works: establish DTC first so you own the brand presentation and
learn what Japanese customers actually buy, then use that evidence in wholesale
conversations. Walking into a retail buyer's office with domestic sales data is a
categorically different conversation from walking in with a lookbook.

---

# SECTION 6 — new

## Creative adaptation is not translation

Translated creative fails in a way that is difficult to see from outside the market,
because nothing about it is technically wrong. The words are accurate. The tone is off,
and tone is what the audience is actually reading.

Where it breaks:

**Register.** Japanese encodes the relationship between speaker and audience in the
grammar itself. A brand voice that is warm and direct in English has to choose a level
of formality in Japanese, and that choice signals who you think your customer is. Get it
wrong in either direction and you sound either presumptuous or distant. There is no
neutral option.

**Pacing.** Japanese advertising typically establishes context before it makes a claim.
A lot of Western creative does the reverse, opening on the claim and supporting it
afterwards. Run that structure unchanged and the opening frame reads as aggressive
rather than confident.

**Density.** Japanese audiences accept, and often expect, more information on screen and
on page than Western audiences tolerate. Creative stripped to a single image and three
words can read as thin rather than elegant.

**Format.** Vertical is not an afterthought in Japan, it is frequently the primary
format, and creative shot for landscape and cropped down is visibly compromised. Plan
the vertical edit at the shoot, not in the edit suite.

**Casting and setting.** Audiences notice immediately whether a location was actually
shot in Japan or approximated somewhere cheaper. So does the trade press. If the
campaign claims a connection to the market, the footage has to earn it.

The practical consequence is that adaptation belongs at the brief, not at the end. A
campaign conceived globally and localised afterwards inherits every structural decision
that does not fit. A campaign briefed with both markets in view produces assets that
work in both without either feeling like the compromise.

---

## Internal links to add

While editing, link from the new sections to existing pages. Use the natural phrase as
anchor text, not a keyword jammed in. One link per target, no more.

| From | To |
|---|---|
| Creative adaptation section | `/services/video-production-japan` |
| Positioning section | `/japan-market-entry` |
| Distribution section | the JTL case study (real commerce proof) |
| Creative adaptation section | the New Balance work page |
| Hospitality paragraph in positioning | `/hospitality` |

---

## Japanese version

Once the English is approved, the `/ja` track needs these four sections **written as
Japanese, not translated from the English above**. The positioning and creative sections
in particular will read as foreign if carried across literally, which would be a poor
look on a page arguing that translation is not localization.

Do this as a separate commit after the English is signed off, so the two can be reviewed
independently.

---

## BLOCKED — do not write this section

Section 10, the CTA, depends on an accurate description of the **7-day Japan market
review**. The owner has confirmed it is a real service but has not yet supplied what it
covers, what the client receives, or whether it is paid.

**Do not draft it, do not approximate it, do not use a placeholder.** An earlier tool
invented details about this same offering and it was caught before publication. Ship the
four sections above without it. The CTA and its lead-capture quiz land in a second pass
once the details arrive.

---

## Before you report back

- [ ] Existing article read in full, no duplication with the new sections
- [ ] Four sections inserted between 2 and 3, all H2, no skipped heading levels
- [ ] Still exactly one H1 on the page
- [ ] metaTitle absolute, no double brand suffix rendered
- [ ] metaDescription between 120 and 160 characters
- [ ] Zero em dashes in the English copy
- [ ] Internal links added, all resolving
- [ ] `npm run verify` exits 0
- [ ] `npm run qa:crawl` clean at 390 / 768 / 1440
- [ ] Preview URL and screenshots at all three widths
- [ ] Not merged
