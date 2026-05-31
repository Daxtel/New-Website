'use client';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up:    { y: 30 },
    down:  { y: -30 },
    left:  { x: 30 },
    right: { x: -30 },
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: EASE_IN }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
