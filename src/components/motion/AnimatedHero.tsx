'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

// Typed bezier tuple so TypeScript is happy with Framer Motion's Easing type
const EASE_IN: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface AnimatedHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  trustLine: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

// Stagger container variant
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Each word slides up from clip
const wordVariant = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_IN },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_IN },
  },
});

export function AnimatedHero({
  eyebrow,
  headline,
  subheadline,
  trustLine,
  primaryCtaLabel,
  secondaryCtaLabel,
}: AnimatedHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: background moves at 0.4x scroll speed
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -120]);

  const words = headline.split(' ');
  // Estimate headline word count to calculate total stagger time for sub-element delays
  const headlineDuration = 0.1 + words.length * 0.08 + 0.55; // delayChildren + stagger + word anim

  if (shouldReduceMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-b border-[#D4AF37]/10"
      >
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-28 lg:pt-36">
          <div className="max-w-5xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70 sm:text-sm">{eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.25rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37] sm:mt-6">
              {headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 sm:mt-8 md:text-lg lg:text-xl">
              {subheadline}
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/55 sm:mt-5 md:text-base">
              {trustLine}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">
                {primaryCtaLabel}
              </Link>
              <Link href="/work" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#D4AF37]/10"
    >
      {/* Parallax grid background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)] [background-size:80px_80px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-28 lg:pt-36">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate="show"
            className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/70 sm:text-sm"
          >
            {eyebrow}
          </motion.p>

          {/* Headline — word by word */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap gap-x-[0.25em] text-[clamp(2.25rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-[#D4AF37] sm:mt-6"
            aria-label={headline}
          >
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block leading-[1.1]">
                <motion.span variants={wordVariant} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp(headlineDuration)}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-3xl text-base leading-relaxed text-[#D4AF37]/80 sm:mt-8 md:text-lg lg:text-xl"
          >
            {subheadline}
          </motion.p>

          {/* Trust line */}
          <motion.p
            variants={fadeUp(headlineDuration + 0.15)}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-4xl text-sm leading-relaxed text-white/55 sm:mt-5 md:text-base"
          >
            {trustLine}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp(headlineDuration + 0.3)}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <CTAButton href="/contact" primary>
              {primaryCtaLabel}
            </CTAButton>
            <CTAButton href="/work">
              {secondaryCtaLabel}
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Animated CTA button (fill from left) ──────────────────────────────────────
function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link href={href} className="relative group overflow-hidden inline-flex min-h-[52px] items-center justify-center rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
      style={
        primary
          ? { background: '#D4AF37', color: '#0A0A0A' }
          : { border: '2px solid #D4AF37', color: '#D4AF37' }
      }
    >
      {/* Fill-from-left overlay (secondary only) */}
      {!primary && (
        <span className="absolute inset-0 rounded-full bg-[#D4AF37] scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />
      )}
      {/* Gold pulse glow (primary only) */}
      {primary && (
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 [box-shadow:0_0_20px_4px_rgba(212,175,55,0.4)]" />
      )}
      <span className={`relative z-10 transition-colors duration-300 ${!primary ? 'group-hover:text-[#0A0A0A]' : ''}`}>
        {children}
      </span>
    </Link>
  );
}
