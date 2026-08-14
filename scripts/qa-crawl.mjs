// qa-crawl.mjs — rendered-geometry crawler (Playwright + Chromium)
// -----------------------------------------------------------------------------
// Catches defects that TypeScript, ESLint and scripts/qa-guards.mjs cannot:
// two elements occupying the same pixels, silently-clipped text, and horizontal
// page overflow. Nothing is malformed, so the only way to catch it is to render
// and measure.
//
// Usage:
//   node scripts/qa-crawl.mjs                 # crawls http://localhost:3100
//   QA_CRAWL_URL=https://…vercel.app node scripts/qa-crawl.mjs
//   VERCEL_BYPASS=<secret> QA_CRAWL_URL=<preview> node scripts/qa-crawl.mjs
//   node scripts/qa-crawl.mjs --routes=/,/contact,/work   # explicit routes
//
// Env:
//   QA_CRAWL_URL   base URL to crawl (default http://localhost:3100)
//   VERCEL_BYPASS  Vercel protection-bypass secret; sent as the
//                  x-vercel-protection-bypass header on every request so a
//                  protected preview is reachable. NEVER commit this value.
//
// Output: .qa-crawl/report.json plus one PNG per finding (offenders outlined).
// Exit code: non-zero if any finding is reported.
//
// TUNING NOTES (kept honest so the crawler stays trustworthy):
//  - Text-collision overlap threshold is 25% of the SMALLER box (per the brief).
//    Below that, sub-pixel/antialias kerning of adjacent inline labels produced
//    noise; 25% removes it without hiding a real label-on-value collision.
//  - Only text-bearing elements are compared to each other (text-on-text). Text
//    laid over media (work-card titles over video) is intentional and skipped.
//  - position:fixed elements are excluded from BOTH the collision pass and the
//    overflow pass: the sticky header overlapping content on scroll is intended,
//    and the off-canvas mobile drawer (right-0 + translate-x-full, clipped by
//    html{overflow-x:clip}) is intended too. Including them produced only false
//    positives.
//  - Overflow is measured by real element rects (right edge > innerWidth), NOT
//    only documentElement.scrollWidth, because globals.css clips/hides the
//    scrollbar — the bug would be invisible to a scrollWidth-only check.
//  - <option> elements are never measured (the native popup is OS-drawn and has
//    no meaningful box in the flow); the SELECT is measured instead.
//  - Visibility is decided by Element.checkVisibility(), NOT by reading
//    display/visibility/opacity individually. A CLOSED <details> lays its content
//    out via content-visibility, so getBoundingClientRect returns a real box for
//    text that is never painted; checkVisibility() reports those as hidden and
//    kept ~92 phantom FAQ "collisions" out of the report.

import { chromium } from 'playwright';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const BASE = (process.env.QA_CRAWL_URL || 'http://localhost:3100').replace(/\/$/, '');
const BYPASS = process.env.VERCEL_BYPASS || '';
const VIEWPORTS = [
  { label: 'mobile', width: 390, height: 844 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1440, height: 900 },
];
const OUT = '.qa-crawl';

// ---- route discovery --------------------------------------------------------
async function discoverRoutes() {
  const cliArg = process.argv.find((a) => a.startsWith('--routes='));
  if (cliArg) return cliArg.slice('--routes='.length).split(',').map((s) => s.trim()).filter(Boolean);
  // Pull the sitemap from the target and reduce every <loc> to a path.
  try {
    const res = await fetch(`${BASE}/sitemap.xml`, BYPASS ? { headers: { 'x-vercel-protection-bypass': BYPASS } } : {});
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const paths = new Set();
    for (const loc of locs) {
      try { paths.add(new URL(loc).pathname || '/'); } catch { /* ignore */ }
    }
    if (paths.size) return [...paths].sort();
  } catch { /* fall through */ }
  // Fallback: a representative hand-list covering every page type.
  return ['/', '/work', '/services', '/about', '/hospitality', '/japan-market-entry', '/contact', '/blog'];
}

// ---- in-page measurement (runs in the browser) ------------------------------
// Returned findings are plain data; screenshots are taken afterwards in Node.
function measure() {
  const OVERLAP_RATIO = 0.25;

  const isVisible = (el, r) => {
    // checkVisibility() is the authority: it returns false for display:none,
    // visibility:hidden, opacity:0 AND content-visibility-hidden subtrees. The last
    // one matters because a CLOSED <details> lays its content out via
    // content-visibility (so getBoundingClientRect still returns a real box) but
    // never PAINTS it — without this check every accordion answer looked like it
    // collided with the next question. Verified with checkVisibility()===false.
    if (el.checkVisibility && !el.checkVisibility({
      checkVisibilityCSS: true, contentVisibilityAuto: true,
      opacityProperty: true, visibilityProperty: true,
    })) return false;
    if (el.getAttribute('aria-hidden') === 'true' || el.closest('[aria-hidden="true"]')) return false;
    if (r.width < 1 || r.height < 1) return false;
    if (r.right < 0 || r.bottom < 0) return false;              // fully offscreen top/left (honeypot at -9999)
    if (r.left > window.innerWidth || r.top > window.innerHeight * 4) return false;
    return true;
  };
  const isFixed = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (getComputedStyle(n).position === 'fixed') return true;
    }
    return false;
  };
  const hasOwnText = (el) =>
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);

  const cssPath = (el) => {
    if (!el) return '';
    if (el.id) return `#${el.id}`;
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 4; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.classList.length) s += '.' + [...n.classList].slice(0, 2).join('.');
      const sibs = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
      if (sibs.length > 1) s += `:nth-of-type(${sibs.indexOf(n) + 1})`;
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  // Collect visible, non-fixed, text-bearing elements (skip <option>).
  const all = [...document.querySelectorAll('body *')].filter((el) => {
    if (el.tagName === 'OPTION' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return false;
    if (!hasOwnText(el)) return false;
    const r = el.getBoundingClientRect();
    if (!isVisible(el, r)) return false;
    if (isFixed(el)) return false;
    return true;
  });

  const rectOf = (el) => el.getBoundingClientRect();
  const area = (r) => Math.max(0, r.width) * Math.max(0, r.height);
  const findings = [];

  // 1) Text-on-text collisions.
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      const a = all[i], b = all[j];
      if (a.contains(b) || b.contains(a)) continue;            // ancestor/descendant is not a collision
      const ra = rectOf(a), rb = rectOf(b);
      const ix = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
      const iy = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
      const overlap = ix * iy;
      if (overlap <= 0) continue;
      const ratio = overlap / Math.max(1, Math.min(area(ra), area(rb)));
      if (ratio < OVERLAP_RATIO) continue;
      findings.push({
        type: 'text-collision',
        a: cssPath(a), b: cssPath(b),
        aText: a.textContent.trim().slice(0, 40), bText: b.textContent.trim().slice(0, 40),
        overlapPx: Math.round(overlap), ratio: +ratio.toFixed(2),
        box: { x: Math.max(ra.left, rb.left) + scrollX, y: Math.max(ra.top, rb.top) + scrollY, w: ix, h: iy },
      });
    }
  }

  // 2) Clipped text.
  for (const el of all) {
    const cs = getComputedStyle(el);
    const ox = cs.overflowX, oy = cs.overflow;
    const clipped = (ox === 'hidden' || ox === 'clip' || oy === 'hidden' || oy === 'clip');
    if (clipped && el.scrollWidth > el.clientWidth + 1) {
      const r = rectOf(el);
      findings.push({
        type: 'clipped-text',
        el: cssPath(el), text: el.textContent.trim().slice(0, 40),
        scrollWidth: el.scrollWidth, clientWidth: el.clientWidth,
        box: { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height },
      });
    }
  }

  // 3) Horizontal overflow — measured by real rects, not just scrollWidth.
  // Only overflow masked by BODY's overflow-x:hidden counts. An element clipped by
  // a nearer ancestor (a marquee track, a drag carousel, any overflow-hidden box)
  // is intentional, so we skip it — walk ancestors up to but NOT including body.
  const clippedByAncestor = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(n).overflowX)) return true;
    }
    return false;
  };
  const vw = window.innerWidth;
  let widest = null;
  for (const el of [...document.querySelectorAll('body *')]) {
    if (isFixed(el)) continue;                                 // intentional off-canvas / sticky
    if (el.checkVisibility && !el.checkVisibility({
      checkVisibilityCSS: true, contentVisibilityAuto: true,
      opacityProperty: true, visibilityProperty: true,
    })) continue;                                              // unpainted (e.g. closed <details>)
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    if (r.right > vw + 1 && !clippedByAncestor(el)) {
      if (!widest || r.right > widest.right) {
        widest = { sel: cssPath(el), right: Math.round(r.right), width: Math.round(r.width) };
      }
    }
  }
  const docScrollW = document.documentElement.scrollWidth;
  if (widest || docScrollW > vw + 1) {
    findings.push({
      type: 'horizontal-overflow',
      innerWidth: vw, documentScrollWidth: docScrollW,
      widestElement: widest,
    });
  }

  return findings;
}

// Draw red outlines around a finding's boxes, for the screenshot.
function outline(boxes) {
  // Boxes are in PAGE coordinates; scroll the first one into view, then draw
  // absolutely-positioned outlines so the screenshot actually frames the defect.
  const layer = document.createElement('div');
  layer.id = '__qa_outline__';
  layer.style.cssText = 'position:absolute;inset:0;z-index:2147483647;pointer-events:none;';
  for (const b of boxes) {
    if (!b || b.w == null) continue;
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:${b.x}px;top:${b.y}px;width:${Math.max(2, b.w)}px;height:${Math.max(2, b.h)}px;outline:2px solid #ff2d55;background:rgba(255,45,85,.18);`;
    layer.appendChild(d);
  }
  document.body.appendChild(layer);
  if (boxes[0] && boxes[0].w != null) window.scrollTo(0, Math.max(0, boxes[0].y - 150));
}
function clearOutline() {
  document.getElementById('__qa_outline__')?.remove();
}

async function runChecks(page, route, viewport, state, findings, shots) {
  const raw = await page.evaluate(measure);
  for (const f of raw) {
    const rec = { route, viewport: viewport.label, width: viewport.width, state, ...f };
    findings.push(rec);
    // Screenshot with the offender(s) outlined.
    const boxes = f.box ? [f.box]
      : f.widestElement ? []                                   // overflow: whole-page shot
      : [];
    try {
      if (boxes.length) await page.evaluate(outline, boxes);
      const name = `${route.replace(/[^a-z0-9]+/gi, '_') || 'root'}__${viewport.label}__${state}__${f.type}__${shots.n++}.png`;
      await page.screenshot({ path: `${OUT}/${name}`, fullPage: false });
      rec.screenshot = name;
      if (boxes.length) await page.evaluate(clearOutline);
    } catch { /* screenshot best-effort */ }
  }
}

async function crawl() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const routes = await discoverRoutes();
  console.log(`qa-crawl → ${BASE}  (${routes.length} routes × ${VIEWPORTS.length} viewports)`);
  if (BYPASS) console.log('  using Vercel protection-bypass header');

  const browser = await chromium.launch();
  const context = await browser.newContext(
    BYPASS ? { extraHTTPHeaders: { 'x-vercel-protection-bypass': BYPASS } } : {},
  );
  const page = await context.newPage();

  const findings = [];
  const shots = { n: 0 };

  for (const route of routes) {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      let ok = true;
      try {
        // 'load', not 'networkidle': video routes autoload streaming media that
        // never goes idle, so networkidle would hang every one to the timeout.
        const res = await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 30000 });
        if (res && res.status() >= 400) { ok = false; console.log(`  ! ${route} [${viewport.label}] HTTP ${res.status()}`); }
      } catch (e) {
        ok = false; console.log(`  ! ${route} [${viewport.label}] nav failed: ${e.message.split('\n')[0]}`);
      }
      if (!ok) continue;

      // Settle entrance animations before measuring. framer-motion `whileInView`
      // elements sit at their initial off-position (e.g. a ScrollReveal x-offset)
      // until scrolled into view; measuring at load catches that transient state
      // and reports phantom overflow. Sweep the whole page (viewport(once:true)
      // makes it permanent), then return to top.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);                          // let the final settle finish

      // Static pass.
      await runChecks(page, route, viewport, 'static', findings, shots);

      // Interactive pass: focus each field, then select first real option.
      const controls = await page.$$('form input:not([type=hidden]), form textarea, form select');
      for (const c of controls) {
        try {
          const tag = await c.evaluate((el) => el.tagName);
          await c.focus();
          if (tag === 'SELECT') {
            const vals = await c.evaluate((el) => [...el.options].filter((o) => o.value).map((o) => o.value));
            if (vals.length) await c.selectOption(vals[0]).catch(() => {});
          }
        } catch { /* control may be detached; ignore */ }
      }
      if (controls.length) {
        await page.waitForTimeout(200);
        await runChecks(page, route, viewport, 'interactive', findings, shots);
      }
    }
  }

  await browser.close();

  // De-dupe identical findings that repeat across static+interactive.
  const seen = new Set();
  const unique = findings.filter((f) => {
    const k = `${f.route}|${f.viewport}|${f.type}|${f.a || f.el || f.widestElement?.sel || ''}|${f.b || ''}`;
    if (seen.has(k)) return false; seen.add(k); return true;
  });

  await writeFile(`${OUT}/report.json`, JSON.stringify({ base: BASE, generated: 'n/a', routes, findings: unique }, null, 2));

  // Readable summary.
  console.log(`\n── qa-crawl summary ──  ${unique.length} finding(s)`);
  for (const f of unique) {
    if (f.type === 'text-collision') {
      console.log(`  [${f.viewport} ${f.width} ${f.state}] ${f.route}  COLLISION ${f.overlapPx}px (${Math.round(f.ratio * 100)}%)`);
      console.log(`      A: ${f.a}  "${f.aText}"`);
      console.log(`      B: ${f.b}  "${f.bText}"`);
    } else if (f.type === 'clipped-text') {
      console.log(`  [${f.viewport} ${f.width} ${f.state}] ${f.route}  CLIPPED ${f.el}  sw=${f.scrollWidth} cw=${f.clientWidth}  "${f.text}"`);
    } else if (f.type === 'horizontal-overflow') {
      console.log(`  [${f.viewport} ${f.width} ${f.state}] ${f.route}  H-OVERFLOW innerW=${f.innerWidth} scrollW=${f.documentScrollWidth}  widest=${f.widestElement ? f.widestElement.sel + ' (right ' + f.widestElement.right + ')' : 'n/a'}`);
    }
  }
  if (!unique.length) console.log('  clean — no collisions, clipped text, or horizontal overflow.');
  console.log(`\nreport: ${OUT}/report.json`);

  if (unique.length) process.exit(1);
}

crawl().catch((e) => { console.error(e); process.exit(2); });
