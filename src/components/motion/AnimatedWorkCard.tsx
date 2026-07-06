'use client';
import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { localizeHref } from '@/lib/alternates';

const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface WorkCardProps {
  slug: string;
  videoSrc: string;
  title: string;
  proofLine: string;
  description: string;
  ctaLabel: string;
  index: number;
  locale?: 'en' | 'ja';
}

export function AnimatedWorkCard({
  slug,
  videoSrc,
  title,
  proofLine,
  description,
  ctaLabel,
  index,
  locale = 'en',
}: WorkCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rotateX: -dy * 6, rotateY: dx * 6 });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }

  return (
    <motion.a
      ref={cardRef}
      href={localizeHref(`/work/${slug}`, locale)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_IN }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className="group flex h-full flex-col overflow-hidden bg-[#141414] cursor-pointer"
      data-cursor-play=""
    >
      {/* Glow border overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-sm"
        animate={{
          boxShadow: hovered && !shouldReduceMotion
            ? 'inset 0 0 0 1px rgba(212,175,55,0.6), 0 0 30px 0 rgba(212,175,55,0.15)'
            : 'inset 0 0 0 1px rgba(212,175,55,0), 0 0 0px 0 rgba(212,175,55,0)',
        }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 md:text-xs">{proofLine}</p>
        <h3 className="mt-3 text-lg font-semibold leading-tight text-[#D4AF37] md:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{description}</p>
        <div className="mt-auto pt-5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors group-hover:text-[#D4AF37] md:text-xs">
          {ctaLabel} →
        </div>
      </div>
    </motion.a>
  );
}
