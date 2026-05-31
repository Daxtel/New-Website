'use client';
import { useEffect, useRef } from 'react';

/**
 * Cinematic film grain overlay using SVG feTurbulence noise.
 * Animates the base frequency every ~100ms so the grain "moves"
 * like real film stock. Fixed position, pointer-events-none.
 * Opacity: 4% — barely visible but adds tactile depth on dark BGs.
 */
export function FilmGrain() {
  const filterRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — don't animate grain
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let frame = 0;
    const interval = setInterval(() => {
      if (!filterRef.current) return;
      frame++;
      // Slightly shift base frequency each tick to simulate film grain movement
      const f1 = (0.65 + Math.sin(frame * 0.3) * 0.05).toFixed(4);
      const f2 = (0.65 + Math.cos(frame * 0.4) * 0.05).toFixed(4);
      filterRef.current.setAttribute('baseFrequency', `${f1} ${f2}`);
    }, 80); // ~12fps grain refresh

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] select-none"
      style={{ opacity: 0.04 }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.65 0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
