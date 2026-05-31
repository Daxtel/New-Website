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
        shouldReduceMotion
          ? {}
          : {
              y: -8,
              boxShadow: '0 20px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)',
              transition: { duration: 0.25, ease: EASE_OUT },
            }
      }
      className="bg-[#0A0A0A] p-8 cursor-default"
    >
      <h3 className="text-xl font-semibold text-[#D4AF37]">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{description}</p>
    </motion.div>
  );
}
