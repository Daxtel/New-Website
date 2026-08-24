'use client';
import Link from 'next/link';
import { track } from '@/lib/analytics';

/**
 * Link that fires a GA4 event on click before navigating. Used for every audit
 * CTA (page + cross-page callouts) so clicks are attributable to their source.
 */
export function AuditCtaLink({
  href,
  event,
  source,
  className = '',
  children,
}: {
  href: string;
  event: string;
  source?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, source ? { source } : {})}
    >
      {children}
    </Link>
  );
}
