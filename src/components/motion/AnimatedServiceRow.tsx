'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ServiceRowProps {
  slug:        string;
  number:      string | number;
  title:       string;
  description: string;
  index:       number;
}

export function AnimatedServiceRow({ slug, number, title, description, index }: ServiceRowProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
      whileHover={shouldReduce ? {} : {
        y: -4,
        transition: { duration: 0.2, ease: EASE },
      }}
    >
      <Link
        href={`/services/${slug}`}
        className="group block bg-[#141414] p-8 transition-colors duration-300 hover:bg-[#D4AF37]/5 cursor-pointer md:p-10 lg:p-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-5">
            {/* Number pulses gold on hover */}
            <motion.span
              className="text-4xl font-black text-[#D4AF37]/20 tabular-nums transition-colors duration-300 group-hover:text-[#D4AF37]/40 md:text-5xl"
            >
              {number}
            </motion.span>
            <div>
              <h2 className="text-2xl font-bold text-[#D4AF37] md:text-3xl">{title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 md:text-base lg:text-lg">
                {description}
              </p>
            </div>
          </div>
          {/* Arrow slides right on hover */}
          <span className="hidden shrink-0 text-xl text-[#D4AF37]/40 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#D4AF37] lg:block">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
