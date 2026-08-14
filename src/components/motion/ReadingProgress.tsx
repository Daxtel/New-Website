'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Thin gold reading-progress bar fixed to the top of the viewport.
 * Tracks how far the user has scrolled through the article.
 * Mounts as a client overlay, add once per blog post page.
 */
export function ReadingProgress() {
  const raw    = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 120, damping: 30 });

  useEffect(() => {
    function update() {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      raw.set(docHeight > 0 ? scrollTop / docHeight : 0);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [raw]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9997] h-[2px] origin-left bg-[#D4AF37]"
      style={{ scaleX: smooth, width: '100%' }}
    />
  );
}
