// Thin wrapper over the existing GA4 gtag (see components/analytics/GoogleAnalytics).
// No second analytics library; safe no-op when gtag is absent (SSR, blocked, dev).
type Params = Record<string, string | number | boolean>;

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', event, params);
}
