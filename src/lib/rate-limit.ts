/**
 * Best-effort rate limiting for public form endpoints.
 *
 * Two layers, both fail-open (never block a legitimate user if the store is down):
 *
 *  1. Honeypot — a hidden field ("company_url") that real users never fill.
 *     Bots that auto-fill every input trip it. Zero infra.
 *
 *  2. Distributed limiter (optional) — sliding window keyed by IP, backed by
 *     Upstash Redis. Dormant until UPSTASH_REDIS_REST_URL + _TOKEN are set, so
 *     there is no dependency to provision before deploy. When configured, it
 *     caps each IP to MAX_REQUESTS per WINDOW_SECONDS.
 *
 * For hard, edge-level limits without code, configure Vercel Firewall rate
 * limiting rules in the dashboard instead — that runs before the function.
 */

const WINDOW_SECONDS = 60 * 10; // 10 minutes
const MAX_REQUESTS = 5; // per IP per window

/** True if the honeypot field was filled (i.e. the submitter is almost certainly a bot). */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

type RateResult = { allowed: boolean; limited: boolean };

/**
 * Returns { allowed, limited }. `limited` is only true when the store is
 * configured AND the caller exceeded the window. If Upstash is not configured
 * or the call fails, returns allowed=true (fail-open).
 */
export async function checkRateLimit(ip: string): Promise<RateResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { allowed: true, limited: false };

  const key = `rl:${ip}`;
  try {
    // INCR then, on first hit, set the TTL. Pipeline in one round trip.
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, WINDOW_SECONDS, 'NX'],
      ]),
    });
    if (!res.ok) return { allowed: true, limited: false };
    const data = (await res.json()) as Array<{ result: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    if (count > MAX_REQUESTS) return { allowed: false, limited: true };
    return { allowed: true, limited: false };
  } catch {
    // Store unreachable — never block a real submission on infra failure.
    return { allowed: true, limited: false };
  }
}

/** Extract the best-guess client IP from request headers. */
export function clientIpFrom(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}
