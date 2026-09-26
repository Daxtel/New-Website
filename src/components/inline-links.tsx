import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';
import { localizeHref } from '@/lib/alternates';

/**
 * Opt-in inline links inside copy strings.
 *
 * Copy lives in plain strings across lib/, and most of it should stay that
 * way. When a sentence genuinely needs a link, write it as `[label](/path)`
 * and pass the string through here. Anything without the token comes back
 * untouched, so this is safe to apply to every paragraph in a template.
 *
 * Paths are internal only (must start with `/`) and are localized, so a `ja`
 * page links to the `ja` route. First lived inside the blog template; lifted
 * here once service and landing templates needed the same thing.
 */
const INTERNAL_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function renderParagraph(text: string, locale: Locale): ReactNode {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INTERNAL_LINK)) {
    const [token, label, href] = match;
    const at = match.index ?? 0;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      <Link
        key={`${href}-${at}`}
        href={localizeHref(href, locale)}
        className="text-[#D4AF37] underline underline-offset-4 transition-colors hover:text-[#D4AF37]/80"
      >
        {label}
      </Link>,
    );
    cursor = at + token.length;
  }
  if (!parts.length) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}
