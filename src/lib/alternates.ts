import type { Metadata } from 'next';
import type { Locale } from './i18n';

/**
 * Build canonical + hreflang alternates for a page.
 *
 * `path` is the language-neutral logical path, e.g. '/services' or
 * '/services/video-production-japan' (always the EN-form path, no /ja prefix).
 *
 * Returns:
 *  - canonical: the current locale's own URL (self-referencing per language)
 *  - languages: symmetric hreflang map listing BOTH language URLs + x-default
 *
 * metadataBase (set in the root layout) resolves these to absolute URLs.
 */
export function buildAlternates(path: string, locale: Locale): Metadata['alternates'] {
  const en = path;
  const ja = path === '/' ? '/ja' : `/ja${path}`;
  return {
    canonical: locale === 'ja' ? ja : en,
    languages: {
      en,
      ja,
      'x-default': en,
    },
  };
}

/** The `/ja` URL for a given language-neutral path (used by the language toggle). */
export function jaPath(path: string): string {
  return path === '/' ? '/ja' : `/ja${path}`;
}

/**
 * Prefix an internal href with `/ja` when rendering in Japanese so JA pages link
 * to JA pages. Leaves English, external, hash, mailto/tel, and already-prefixed
 * hrefs untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale !== 'ja') return href;
  if (!href.startsWith('/')) return href; // external, mailto:, tel:, #anchor
  if (href === '/ja' || href.startsWith('/ja/')) return href;
  return jaPath(href);
}
