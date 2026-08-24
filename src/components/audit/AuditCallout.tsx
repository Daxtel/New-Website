import { auditCallouts, auditPage } from '@/lib/audit-page';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { localizeHref } from '@/lib/alternates';
import { AuditCtaLink } from './AuditCtaLink';

/**
 * Cross-page callout linking to the Japan Creative Performance Audit. Same
 * hairline + gold system as the rest of the site. `variant` selects the copy and
 * the analytics source for the three placements (home / JME / localization).
 */
export function AuditCallout({
  variant,
  locale,
  tone = 'accent',
}: {
  variant: 'home' | 'jme' | 'localization';
  locale: Locale;
  tone?: 'accent' | 'integrated';
}) {
  const c = auditCallouts[variant];
  const href = localizeHref(`/services/${auditPage.slug}`, locale);
  // `integrated` reads as part of the surrounding section (hairline card); `accent`
  // is a distinct gold-tinted cross-sell for the JME / localization / services pages.
  const box = tone === 'integrated' ? 'border-white/8 bg-white/[0.02]' : 'border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]';

  return (
    <div className={`border p-8 md:p-10 ${box}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37] md:text-2xl">
            {pick(c.title, locale)}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body-text md:text-base">{pick(c.body, locale)}</p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.15em] text-muted-text">{pick(c.price, locale)}</p>
        </div>
        <AuditCtaLink
          href={href}
          event="japan_audit_cta_click"
          source={variant}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#D4AF37]/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0A0A0A] lg:self-auto"
        >
          {pick(c.cta, locale)} →
        </AuditCtaLink>
      </div>
    </div>
  );
}
