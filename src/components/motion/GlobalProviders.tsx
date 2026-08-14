'use client';
import { LenisProvider } from './LenisProvider';
import { CustomCursor } from './CustomCursor';
import { FilmGrain } from './FilmGrain';

/**
 * GlobalProviders
 * Wraps every page with:
 *  1. Lenis smooth scroll
 *  2. Custom gold cursor (desktop only)
 *  3. Film grain overlay
 *
 * Mount once in layout.tsx, outside any conditional rendering.
 */
export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
      {/* Fixed overlays rendered after content so z-index stacking is clean */}
      <CustomCursor />
      <FilmGrain />
    </LenisProvider>
  );
}
