'use client';
import { LenisProvider } from './LenisProvider';
import { FilmGrain } from './FilmGrain';

/**
 * GlobalProviders
 * Wraps every page with:
 *  1. Lenis smooth scroll
 *  2. Film grain overlay
 *
 * Mount once in layout.tsx — outside any conditional rendering.
 */
export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
      {/* Fixed overlays rendered after content so z-index stacking is clean */}
      <FilmGrain />
    </LenisProvider>
  );
}
