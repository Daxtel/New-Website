'use client';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export function AnimatedServiceCard({ title, description, index }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE_IN }}
      whileHover={
        shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25, ease: EASE_OUT } }
      }
      className="group border-t border-white/10 pt-6 cursor-default"
    >
      <span className="font-mono text-[11px] text-muted-text tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-heading transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-body-text">{description}</p>
    </motion.div>
  );
}
