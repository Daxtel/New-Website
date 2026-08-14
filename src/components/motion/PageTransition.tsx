'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Lenis keeps its own internal scroll position and does not reset on a Next.js
  // client navigation. Without this, clicking a nav link from halfway down a page
  // lands the visitor halfway down the NEXT page while the fade plays.
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    // mode="wait" plays the full exit before the enter begins, so the durations add
    // up on every navigation. Kept short deliberately: 0.35 + 0.35 read as sluggish.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: EASE_IN }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
