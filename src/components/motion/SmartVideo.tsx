'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * SmartVideo, video that is always WATCHABLE, on every device.
 *
 * History: this component previously rendered a poster <img> on touch devices and
 * never mounted a <video> at all, so phone and iPad users had no way to play the
 * work. That fixed a real performance problem (one card was a 30MB 1080p mp4) by
 * removing the product. This version fixes the cause instead:
 *
 *  - Touch devices are served a mobile-weight transcode from /videos/mobile/
 *    (720p max, no audio track, faststart), typically 70-85% smaller.
 *  - Touch devices show the poster plus a visible play control. Nothing is
 *    downloaded until the user taps, so a grid of cards still costs ~0 bytes of
 *    video, but every video is reachable.
 *  - `autoPlayOnMobile` opts a single prominent video (a hero) into muted inline
 *    autoplay. Do not set it on grid cards.
 *  - Desktop autoplays muted/looped only while on screen, preload="metadata".
 *
 * Poster and mobile source are derived from the video path unless supplied:
 *   /videos/x.mp4 -> /videos/posters/x.jpg  and  /videos/mobile/x.mp4
 */
function posterFor(src: string): string {
  return src.replace('/videos/', '/videos/posters/').replace(/\.mp4$/, '.jpg');
}

function mobileSrcFor(src: string): string {
  return src.replace('/videos/', '/videos/mobile/');
}

export function SmartVideo({
  src,
  poster,
  className = '',
  alt = '',
  style,
  autoPlayOnMobile = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  /** Autoplay muted inline on touch devices. For heroes only, never grid cards. */
  autoPlayOnMobile?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // null = capability not yet known (SSR + first paint). Poster-only until we know,
  // so no device ever starts downloading the wrong-weight file.
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [activated, setActivated] = useState(false);
  const [failed, setFailed] = useState(false);

  const p = poster || posterFor(src);

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(touch);
     
    setReduced(rm);
  }, []);

  // Desktop: play only while on screen. Never run the observer for reduced motion.
  useEffect(() => {
    if (isTouch !== false || reduced) return;
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [isTouch, reduced]);

  const activate = useCallback(() => {
    setActivated(true);
    // The <video> mounts this tick; play on the next one, inside the user gesture's
    // grace period so iOS Safari still counts it as user-initiated.
    requestAnimationFrame(() => {
      ref.current?.play().catch(() => {});
    });
  }, []);

  // If the mobile transcode is missing, fall back to the original rather than
  // showing a broken player.
  const onError = useCallback(() => setFailed(true), []);

  // --- Poster-only, pre-detection ---------------------------------------------
  if (isTouch === null) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p} alt={alt} loading="lazy" decoding="async" className={className} style={style} />;
  }

  // --- Touch devices ------------------------------------------------------------
  if (isTouch) {
    const touchSrc = failed ? src : mobileSrcFor(src);
    const shouldAutoplay = autoPlayOnMobile && !reduced;

    if (!shouldAutoplay && !activated) {
      return (
        <button
          type="button"
          onClick={(e) => {
            // Cards are wrapped in <Link>. Play here instead of navigating away.
            e.preventDefault();
            e.stopPropagation();
            activate();
          }}
          aria-label={alt ? `Play video: ${alt}` : 'Play video'}
          className={`${className} group/play cursor-pointer border-0 bg-transparent p-0`}
          style={style}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="ml-[3px] h-5 w-5 fill-[#D4AF37]" role="presentation">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      );
    }

    return (
      <video
        ref={ref}
        src={touchSrc}
        poster={p}
        muted
        loop
        playsInline
        controls={activated}
        autoPlay={shouldAutoplay}
        preload={shouldAutoplay ? 'metadata' : 'auto'}
        onError={onError}
        className={className}
        style={style}
        aria-label={alt || undefined}
      />
    );
  }

  // --- Desktop -------------------------------------------------------------------
  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p} alt={alt} loading="lazy" decoding="async" className={className} style={style} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={p}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={style}
      aria-label={alt || undefined}
    />
  );
}
