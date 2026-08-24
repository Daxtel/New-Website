import { auditPage } from '@/lib/audit-page';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

/**
 * Illustrative "Creative Performance" artifact for the audit page. The numbers are
 * a sample of what the report communicates (NOT real client data) which the
 * ILLUSTRATIVE label makes explicit. Static (no motion, no JS) to keep it fast.
 */
export function AuditScorecard({ locale }: { locale: Locale }) {
  const sc = auditPage.scorecard;
  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
          {pick(sc.title, locale)}
        </p>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-text">
          {pick(sc.label, locale)}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {sc.rows.map((row) => {
          const lvl = sc.levels[row.level];
          return (
            <div key={row.label.en} className="flex items-center gap-3 sm:gap-4">
              <span className="w-28 shrink-0 text-[13px] text-body-text">{pick(row.label, locale)}</span>
              <span className="relative h-px flex-1 bg-white/10">
                <span
                  className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[#D4AF37]"
                  style={{ width: `${lvl.width}%` }}
                />
              </span>
              <span className="w-[68px] shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-[#D4AF37]/85">
                {pick(lvl.label, locale)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-wrap gap-2 border-t border-white/8 pt-5">
        {sc.tags.map((tag) => (
          <span
            key={tag.en}
            className="border border-[#D4AF37]/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]/85"
          >
            {pick(tag, locale)}
          </span>
        ))}
      </div>
    </div>
  );
}
