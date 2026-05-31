'use client';
import { useRef, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';

interface VideoScrubHeroProps {
  src: string;
  title: string;
  /** px height the section occupies for scroll mapping — default 600 */
  scrollHeight?: number;
}

/**
 * VideoScrubHero
 *
 * Full-width video that plays normally on load then scrubs (seeks) as
 * the user scrolls past the section. On mobile / reduced-motion it
 * falls back to a standard autoPlay loop.
 */
export function VideoScrubHero({ src, title }: VideoScrubHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Store video duration once metadata loads
  const onMetadata = useCallback(() => {
    if (videoRef.current) {
      durationRef.current = videoRef.current.duration;
    }
  }, []);

  useEffect(() => {
    isMobileRef.current = window.matchMedia('(hover: none)').matches;
  }, []);

  // Map scroll progress → video currentTime
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    if (isMobileRef.current || shouldReduceMotion) return;

    // First 60% of scroll = full video duration; last 40% = hold last frame
    const clampedProgress = Math.min(progress / 0.6, 1);
    const targetTime = clampedProgress * durationRef.current;

    // Only seek if significantly different (avoid thrashing)
    if (Math.abs(video.currentTime - targetTime) > 0.04) {
      video.currentTime = targetTime;
    }
  });

  // On desktop: pause + load for scrubbing; on mobile: autoPlay loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const isMobile = window.matchMedia('(hover: none)').matches;

    if (isMobile || shouldReduceMotion) {
      video.autoplay = true;
      video.loop     = true;
      video.play().catch(() => {});
    } else {
      video.autoplay = false;
      video.loop     = false;
      video.preload  = 'auto';
      // Start playing briefly so browser allows seeking
      video.play().then(() => video.pause()).catch(() => {});
    }
  }, [shouldReduceMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative aspect-[16/8] overflow-hidden bg-[#1A1A1A]"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={onMetadata}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={title}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <span className="text-2xl font-bold leading-tight text-[#D4AF37] md:text-3xl">{title}</span>
      </div>

      {/* Scroll progress bar along bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D4AF37]/10">
        <div
          className="h-full bg-[#D4AF37]/70 origin-left transition-transform duration-75"
          style={{ transform: 'scaleX(var(--progress, 0))' }}
          ref={(el) => {
            if (!el) return;
            const unsub = scrollYProgress.on('change', (v) => {
              el.style.setProperty('--progress', String(Math.min(v / 0.6, 1)));
              el.style.transform = `scaleX(${Math.min(v / 0.6, 1)})`;
            });
            return unsub;
          }}
        />
      </div>
    </div>
  );
}
