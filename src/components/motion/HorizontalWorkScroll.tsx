'use client';
import { useRef, useState, useEffect, useCallback, startTransition } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { AnimatedWorkCard } from './AnimatedWorkCard';
import { SmartVideo } from './SmartVideo';
import { localizeHref } from '@/lib/alternates';

interface WorkItem {
  slug: string;
  videoSrc: string;
  title: string;
  proofLine: string;
  description: string;
}

interface HorizontalWorkScrollProps {
  items: WorkItem[];
  ctaLabel: string;
  dragLabel?: string;
  locale?: 'en' | 'ja';
}

const CARD_WIDTH = 380;   // px
const CARD_GAP   = 20;    // px

export function HorizontalWorkScroll({ items, ctaLabel, dragLabel = 'Drag to explore', locale = 'en' }: HorizontalWorkScrollProps) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => startTransition(() => setIsMobile(window.innerWidth < 1024));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const rawX = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.8 });

  // Progress 0 → 1
  const progress = useTransform(x, [0, -maxDrag || -1], [0, 1]);
  const barWidth  = useTransform(progress, [0, 1], ['0%', '100%']);

  // Recalculate max drag on mount + resize
  useEffect(() => {
    function calc() {
      const container = containerRef.current;
      const track     = trackRef.current;
      if (!container || !track) return;
      const overflow = track.scrollWidth - container.clientWidth;
      setMaxDrag(Math.max(0, overflow));
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [items.length]);

  // Clamp helper
  const clamp = useCallback(
    (val: number) => Math.max(-maxDrag, Math.min(0, val)),
    [maxDrag]
  );

  // Wheel: vertical delta → horizontal movement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onWheel(e: WheelEvent) {
      // Only intercept when scrolled far enough into the section
      const rect = container!.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5) return; // not yet in view
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal trackpad — let it pass

      const atStart = rawX.get() >= 0;
      const atEnd   = rawX.get() <= -maxDrag;
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return; // escape scroll

      e.preventDefault();
      rawX.set(clamp(rawX.get() - e.deltaY * 0.9));
    }

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [rawX, maxDrag, clamp]);

  // Mobile + tablet: vertical card grid (phones and iPad portrait)
  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={localizeHref(`/work/${item.slug}`, locale)}
            className="group flex flex-col overflow-hidden bg-[#141414] border border-[#D4AF37]/10"
          >
            <div className="relative aspect-video overflow-hidden bg-[#1A1A1A]">
              <SmartVideo
                src={item.videoSrc}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/45">{item.proofLine}</p>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-[#D4AF37]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body-text">{item.description}</p>
              <div className="mt-auto pt-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75">
                {ctaLabel} →
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ cursor: 'none' }}
        data-cursor-drag=""
      >
        <motion.div
          ref={trackRef}
          style={{ x, gap: CARD_GAP, paddingRight: 40 }}
          drag="x"
          dragConstraints={{ right: 0, left: -maxDrag }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
          onDrag={(_, info) => {
            rawX.set(clamp(rawX.get() + info.delta.x));
          }}
          className="flex"
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              className="shrink-0"
              style={{ width: CARD_WIDTH }}
            >
              <AnimatedWorkCard
                slug={item.slug}
                videoSrc={item.videoSrc}
                title={item.title}
                proofLine={item.proofLine}
                description={item.description}
                ctaLabel={ctaLabel}
                locale={locale}
                index={i}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-px w-full bg-[#D4AF37]/10">
        <motion.div
          className="h-full bg-[#D4AF37]/60 origin-left"
          style={{ width: barWidth }}
        />
      </div>

      {/* Drag hint — fades out after first interaction */}
      <DragHint x={rawX} label={dragLabel} />
    </div>
  );
}

// ── Drag hint ─────────────────────────────────────────────────────────────────
function DragHint({ x, label }: { x: ReturnType<typeof useMotionValue<number>>; label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsub = x.on('change', (v) => {
      if (v < -20) setVisible(false);
    });
    return unsub;
  }, [x]);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/30"
    >
      <span className="inline-block">←</span>
      <span>{label}</span>
      <span className="inline-block">→</span>
    </motion.div>
  );
}
