'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { localizeHref } from '@/lib/alternates';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface BlogCardProps {
  slug:        string;
  category:    string;
  date:        string;
  readingTime: string;
  title:       string;
  excerpt:     string;
  readLabel:   string;
  index:       number;
  locale?:     'en' | 'ja';
}

export function AnimatedBlogCard({
  slug, category, date, readingTime, title, excerpt, readLabel, index, locale = 'en',
}: BlogCardProps) {
  const cardRef    = useRef<HTMLAnchorElement>(null);
  const shouldReduce = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (shouldReduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ rx: -dy * 3, ry: dx * 3 }); // subtle, text card, not image
  }

  return (
    <motion.a
      ref={cardRef}
      href={localizeHref(`/blog/${slug}`, locale)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      style={
        shouldReduce
          ? {}
          : { rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: 'preserve-3d', perspective: 1000 }
      }
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="group block border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 cursor-pointer md:p-12"
    >
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.15em] text-white/45">
        <span className="text-[#D4AF37]">{category}</span>
        <span>·</span>
        <time dateTime={date}>{date}</time>
        <span>·</span>
        <span>{readingTime}</span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-bold uppercase leading-tight tracking-tight text-[#D4AF37] md:text-3xl lg:text-4xl">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="mt-4 text-base leading-relaxed text-body-text md:text-lg">{excerpt}</p>

      {/* CTA arrow */}
      <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#D4AF37]">
        {readLabel}
        <motion.span
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </motion.span>
      </div>
    </motion.a>
  );
}
