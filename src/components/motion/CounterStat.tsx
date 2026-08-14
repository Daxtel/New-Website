'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CounterStatProps {
  label: string;
  value: string; // e.g. "7+ Years", "50+ Projects", "¥2B+"
  delay?: number;
}

/**
 * Animated proof-strip stat.
 * Extracts the numeric part of `value`, counts up to it when the element
 * enters the viewport, then restores any suffix / prefix text.
 */
export function CounterStat({ label, value, delay = 0 }: CounterStatProps) {
  const ref            = useRef<HTMLDivElement>(null);
  const isInView       = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce   = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated    = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || shouldReduce) return;
    hasAnimated.current = true;

    // Extract numeric part + surrounding text
    const match = value.match(/^([^0-9]*)(\d[\d,.]*)(.*)$/);
    if (!match) return; // no number found, just display as-is

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    if (isNaN(target)) return;

    const duration   = 1200; // ms
    const startTime  = performance.now() + delay * 1000;
    let raf: number;

    function tick(now: number) {
      if (now < startTime) { raf = requestAnimationFrame(tick); return; }
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value); // ensure exact final value
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, delay, shouldReduce]);

  return (
    <div ref={ref} className="bg-[#0A0A0A] p-8 md:p-10 lg:p-12">
      <p className="text-xs uppercase tracking-[0.15em] text-white/45">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[#D4AF37] tabular-nums md:text-2xl lg:text-3xl">
        {display}
      </p>
    </div>
  );
}
