#!/usr/bin/env node
/**
 * qa-guards — deterministic pre-merge regression guards.
 *
 * Layer 1 of the release gate. Every check here encodes a defect that has ALREADY
 * shipped to production at least once. These are cheap, run on every push, and cost
 * nothing. Layer 2 (the qa-* agents in .claude/agents/) handles judgment calls that
 * cannot be expressed as a rule: does it look right, does the Japanese read naturally,
 * does the motion feel smooth.
 *
 * Exit 1 on any error. Warnings never fail the build.
 * Run: npm run qa
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const errors = [];
const warnings = [];
const err = (check, msg) => errors.push(`${check}: ${msg}`);
const warn = (check, msg) => warnings.push(`${check}: ${msg}`);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const srcFiles = walk('src');
const libFiles = srcFiles.filter((f) => f.startsWith('src/lib') && extname(f) === '.ts');
const read = (f) => readFileSync(f, 'utf8');

/** Source with // and /* *\/ comments blanked out, line numbers preserved.
 *  Without this, a guard matches the comment that explains it. */
function stripComments(t) {
  return t
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + ' '.repeat(m.length - p1.length));
}

/** Quoted string VALUES only (skips object keys), with line numbers. */
function stringValues(t) {
  const out = [];
  stripComments(t).split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/(?::\s*|\[\s*|,\s*|\(\s*)(['"`])((?:\\.|(?!\1)[^\\])*)\1/g)) {
      out.push({ line: i + 1, value: m[2] });
    }
  });
  return out;
}

/** Japanese script: hiragana, katakana, CJK, plus JP punctuation (〜、。ー). */
const JP = /[\u3000-\u303F\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uFF00-\uFFEF]/;

// ── 1. Motion: competing scroll engines ──────────────────────────────────────────
// Lenis drives smooth scroll. A native `scroll-behavior: smooth` on html fights it
// and produces stutter plus dead anchor links.
{
  const css = stripComments(read('src/app/globals.css'));
  const usesLenis = srcFiles.some((f) => f.endsWith('LenisProvider.tsx'));
  const htmlBlock = css.match(/\bhtml\s*\{[^}]*\}/s)?.[0] ?? '';
  if (usesLenis && /scroll-behavior:\s*smooth/.test(htmlBlock)) {
    err('scroll-engines', 'globals.css sets html { scroll-behavior: smooth } while LenisProvider is active. Two scroll engines will fight. Remove the native rule.');
  }
}

// ── 2. Motion: `transition: all` ────────────────────────────────────────────────
// Animates layout properties too; smears on hover and costs frames.
{
  const css = stripComments(read('src/app/globals.css'));
  if (/transition:\s*all\b/.test(css)) {
    err('transition-all', 'globals.css uses `transition: all`. Name the properties explicitly.');
  }
}

// ── 3. Motion: conflicting global video height ──────────────────────────────────
// `video { height: 100% }` overrides `img, video { height: auto }`, so a component
// that swaps <video> for <img> by device renders at two different heights.
{
  const css = stripComments(read('src/app/globals.css'));
  if (/(^|\n)\s*video\s*\{[^}]*height:\s*100%/s.test(css)) {
    err('video-height', 'globals.css has a bare `video { height: 100% }` rule that overrides `img, video { height: auto }`. Use an opt-in class instead.');
  }
}

// ── 4. Video: every referenced video needs a poster and a mobile transcode ───────
{
  const referenced = new Set();
  for (const f of [...libFiles, ...srcFiles.filter((x) => /\.tsx?$/.test(x))]) {
    for (const m of read(f).matchAll(/['"`](\/videos\/[\w-]+\.mp4)['"`]/g)) referenced.add(m[1]);
  }
  for (const v of referenced) {
    const poster = v.replace('/videos/', '/videos/posters/').replace(/\.mp4$/, '.jpg');
    const mobile = v.replace('/videos/', '/videos/mobile/');
    if (!existsSync(join('public', v))) { err('video-missing', `${v} is referenced but not in public/`); continue; }
    if (!existsSync(join('public', poster))) err('video-poster', `${v} has no poster at ${poster}`);
    if (!existsSync(join('public', mobile))) {
      err('video-mobile', `${v} has no mobile transcode at ${mobile}. Mobile visitors would be served the full-size file.`);
    } else {
      const mb = statSync(join('public', mobile)).size / 1024 / 1024;
      if (mb > 6) err('video-mobile-size', `${mobile} is ${mb.toFixed(1)}MB — too heavy for mobile. Re-encode under 6MB.`);
    }
  }
  if (referenced.size === 0) warn('video-scan', 'no /videos/*.mp4 references found — check the scan pattern still matches');
}

// ── 5. Video: no poster-only dead ends ──────────────────────────────────────────
// The exact defect clients reported: a still image on mobile with no way to play it.
{
  const sv = existsSync('src/components/motion/SmartVideo.tsx') ? read('src/components/motion/SmartVideo.tsx') : '';
  if (sv && !/aria-label=.*[Pp]lay|Play video/.test(sv)) {
    err('video-playable', 'SmartVideo has no play control. Touch devices must have a way to start the video.');
  }
}

// ── 6. Copy: prospects must never appear as clients ─────────────────────────────
{
  for (const f of libFiles) {
    const t = read(f);
    if (/Ritz[- ]?Carlton\s*Fukuoka|リッツ・カールトン福岡/i.test(t)) {
      err('prospect-as-client', `${f} names Ritz-Carlton Fukuoka. That is a PROSPECT, not a delivered client. It must not appear in public copy.`);
    }
  }
}

// ── 7. Copy: em dashes were deliberately removed (commit 7cc6588) ───────────────
{
  for (const f of libFiles) {
    for (const { line, value } of stringValues(read(f))) {
      // — is legitimate Japanese punctuation (ダッシュ). Only flag English copy.
      if (value.includes('—') && !JP.test(value)) {
        warn('em-dash', `${f}:${line} English copy contains an em dash: "${value.slice(0, 60)}"`);
      }
    }
  }
}

// ── 8. Copy: no placeholders in shipped content ─────────────────────────────────
{
  const bad = /lorem ipsum|\bTBD\b|\bTODO\b|coming soon|your company here|\bXXX\b/i;
  for (const f of libFiles) {
    for (const { line, value } of stringValues(read(f))) {
      if (bad.test(value)) err('placeholder', `${f}:${line} placeholder content in copy: "${value.slice(0, 80)}"`);
    }
  }
}

// ── 9. i18n: parity and untranslated slots ──────────────────────────────────────
{
  let en = 0, ja = 0;
  for (const f of libFiles) {
    const t = read(f);
    en += [...t.matchAll(/(?:^|[\s{,])en:\s*['"`]/g)].length;
    ja += [...t.matchAll(/(?:^|[\s{,])ja:\s*['"`]/g)].length;

    t.split('\n').forEach((line, i) => {
      const m = line.match(/\bja:\s*'([^']*)'/);
      if (!m) return;
      const v = m[1];
      if (v.trim() === '') { err('i18n-empty', `${f}:${i + 1} has an empty ja value`); return; }
      if (JP.test(v)) return;
      // No Japanese at all. Distinguish English prose from legitimately-Latin
      // values: prices, brand names, URLs, single labels.
      const words = v.match(/[A-Za-z]{2,}/g) ?? [];
      if (words.length >= 4) {
        err('i18n-untranslated', `${f}:${i + 1} ja value looks like untranslated English: "${v.slice(0, 60)}"`);
      } else if (words.length > 0 && v.length > 24) {
        warn('i18n-latin', `${f}:${i + 1} ja value has no Japanese characters: "${v.slice(0, 60)}"`);
      }
      if (v.includes('�')) err('i18n-encoding', `${f}:${i + 1} ja value contains a replacement character (mojibake)`);
    });
  }
  const drift = Math.abs(en - ja);
  if (drift > 0) warn('i18n-parity', `${en} en keys vs ${ja} ja keys (drift ${drift}) — confirm every pair is intentional`);
}

// ── 10. SEO: no double brand suffix (fixed twice: c324b89, f1ffa38) ─────────────
{
  for (const f of srcFiles.filter((x) => /\.tsx?$/.test(x))) {
    const t = read(f);
    if (/title:\s*[`'"][^`'"]*\|\s*Streetshow Productions/.test(t) && !/absolute/.test(t)) {
      warn('double-brand-suffix', `${f} appends "| Streetshow Productions" to a title without marking it absolute — the layout template may add it again`);
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────────
const line = '─'.repeat(72);
console.log(`\n${line}\nqa-guards — deterministic pre-merge checks\n${line}`);
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`    ! ${w}`);
}
if (errors.length) {
  console.log(`\n  ${errors.length} ERROR(s):`);
  for (const e of errors) console.log(`    x ${e}`);
  console.log(`\n${line}\nFAILED — these are known regressions. Fix before merging.\n${line}\n`);
  process.exit(1);
}
console.log(`\n  All deterministic guards passed.${warnings.length ? ` (${warnings.length} warning(s) above.)` : ''}`);
console.log(`\n  Note: this layer cannot judge whether the site LOOKS right, whether the`);
console.log(`  Japanese READS naturally, or whether the motion FEELS smooth.`);
console.log(`  That is what the qa-* agents in .claude/agents/ are for.\n${line}\n`);
