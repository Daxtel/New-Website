'use client';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ProcessStepProps {
  number: string | number;
  title: string;
  description: string;
  index: number;
}

export function AnimatedProcessStep({ number, title, description, index }: ProcessStepProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="relative">
        <div className="mb-4 font-mono text-4xl font-medium leading-none text-accent/25">{number}</div>
        <h3 className="text-lg font-semibold tracking-tight text-heading">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body-text">{description}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_IN }}
    >
      {/* Step number counts up on reveal */}
      <motion.div
        className="mb-4 font-mono text-4xl font-medium leading-none text-accent/25"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.15, ease: EASE_IN }}
      >
        {number}
      </motion.div>
      <h3 className="text-lg font-semibold tracking-tight text-heading">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-body-text">{description}</p>
    </motion.div>
  );
}
