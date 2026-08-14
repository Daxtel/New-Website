/**
 * Recipients for lead-notification emails (contact, restaurant-lead, subscribe).
 *
 * CONTACT_TO_EMAIL supports a comma-separated list so the shared inbox and the
 * owner can both be notified, e.g. "admin@streetshowproduction.com, owner@...".
 * Whitespace is trimmed and empty entries dropped. If the variable is unset or
 * empty, leads fall back to the monitored admin inbox, never a personal address.
 */
const FALLBACK_TO = 'admin@streetshowproduction.com';

export function toRecipients(): string[] {
  const list = (process.env.CONTACT_TO_EMAIL ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length > 0 ? list : [FALLBACK_TO];
}
