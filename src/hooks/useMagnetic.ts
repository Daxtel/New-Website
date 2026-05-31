'use client';
import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticOptions {
  /** How far the element moves toward the cursor (px). Default: 15 */
  strength?: number;
  /** Spring stiffness. Default: 200 */
  stiffness?: number;
  /** Spring damping. Default: 20 */
  damping?: number;
}

/**
 * useMagnetic
 *
 * Returns spring-animated x/y motion values + event handlers to spread
 * onto a motion element. The element is magnetically attracted to the
 * cursor while the mouse is within its bounding box.
 *
 * Usage:
 * ```tsx
 * const { x, y, handlers } = useMagnetic();
 * <motion.div style={{ x, y }} {...handlers}>Click me</motion.div>
 * ```
 */
export function useMagnetic({
  strength = 15,
  stiffness = 200,
  damping = 20,
}: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
      rawX.set(dx);
      rawY.set(dy);
    },
    [rawX, rawY, strength]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref,
    x,
    y,
    handlers: { onMouseMove, onMouseLeave } as {
      onMouseMove: React.MouseEventHandler<HTMLElement>;
      onMouseLeave: React.MouseEventHandler<HTMLElement>;
    },
  };
}
