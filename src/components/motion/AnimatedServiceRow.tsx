'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { localizeHref } from '@/lib/alternates';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ServiceRowProps {
  slug:        string;
  number:      string | number;
  title:       string;
  description: string;
  index:       number;
  locale:      'en' | 'ja';
}

export function AnimatedServiceRow({ slug, number, title, description, index, locale }: ServiceRowProps) {
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
        href={localizeHref(`/services/${slug}`, locale)}
        className="group block border-t border-white/10 py-7 transition-colors duration-300 hover:border-[#D4AF37]/40 cursor-pointer"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="mt-1 font-mono text-[13px] text-muted-text tabular-nums">
              {number}
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-heading transition-colors group-hover:text-accent md:text-xl">{title}</h2>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-body-text">
                {description}
              </p>
            </div>
          </div>
          {/* Arrow slides right on hover */}
          <span className="hidden shrink-0 text-lg text-muted-text transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent lg:block">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
