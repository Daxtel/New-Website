'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initialises Lenis smooth scroll globally.
 * - Syncs with Framer Motion via requestAnimationFrame
 * - Disabled when prefers-reduced-motion is set
 * - Only runs on desktop (touch devices use native scroll)
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Don't apply on touch-primary devices
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 0, // disable touch, use native
    });

    lenisRef.current = lenis;

    // Expose lenis instance on window so other components can use stop/start
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
