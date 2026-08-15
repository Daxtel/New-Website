'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { DeviceFrame } from './DeviceFrame';
import { startOffsetFor } from './videoOffsets';

interface VideoScrubHeroProps {
  src: string;
  title: string;
}

function posterFor(src: string): string {
  return src.replace('/videos/', '/videos/posters/').replace(/\.mp4$/, '.jpg');
}

/** Mobile-weight transcode: 720p max, no audio, faststart. ~70-85% smaller. */
function mobileSrcFor(src: string): string {
  return src.replace('/videos/', '/videos/mobile/');
}

/** Sources shot vertically (9:16). They belong in a phone frame, not cropped into
 *  a 16:9 hero. Kept in sync with the poster orientations by the qa-guards
 *  `poster-orientation` check. */
const PORTRAIT_SRCS = new Set([
  '/videos/jtl-live-commerce.mp4',
  '/videos/qc-running-on-japan.mp4',
  '/videos/ritz-carlton-kyoto.mp4',
  '/videos/shein-japan.mp4',
]);
const isPortraitSrc = (src: string) => PORTRAIT_SRCS.has(src);

/**
 * VideoScrubHero — the hero video on every /work/[slug] detail page.
 *
 * The hard rule: this video must be PLAYABLE on every device, and must never
 * depend on autoplay succeeding. iOS Safari refuses inline autoplay in Low Power
 * Mode and with Reduce Motion on; when it refuses, the old version showed a
 * poster with no way to start it — indistinguishable from a dead image.
 *
 * Touch devices: always get a visible play control over the poster. We still
 * ATTEMPT muted inline autoplay, but the control is hidden only once the
 * `playing` event actually fires — never because play() resolved. If autoplay is
 * refused, or nothing is playing, the control stays and a tap starts it (with
 * native controls, so the user can pause/scrub).
 *
 * Desktop landscape: unchanged — the full-quality file scrubs (seeks) on scroll.
 * Desktop portrait: muted inline autoplay loop inside the phone frame.
 * Reduce Motion (any device): no autoplay, but a play control is always present.
 */
export function VideoScrubHero({ src, title }: VideoScrubHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);

  const portrait = isPortraitSrc(src);
  const startOffset = startOffsetFor(src);

  // null = capability not yet known (SSR + first paint) → poster only, no download
  // of the wrong-weight file.
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false); // confirmed via the `playing` event
  const [activated, setActivated] = useState(false); // user tapped → enable controls
  const [failed, setFailed] = useState(false); // mobile transcode 404 → fall back to master

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const onMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    durationRef.current = v.duration;
    if (startOffset > 0 && v.currentTime < startOffset) v.currentTime = startOffset;
  }, [startOffset]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(hover: none)').matches);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Desktop LANDSCAPE only: scrub the full file by scroll position.
  const desktopScrub = isTouch === false && !reduced && !portrait;

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!desktopScrub) return;
    const video = videoRef.current;
    if (!video || !durationRef.current) return;
    const clamped = Math.min(progress / 0.6, 1); // first 60% of scroll = full duration
    const target = startOffset + clamped * (durationRef.current - startOffset);
    if (Math.abs(video.currentTime - target) > 0.04) video.currentTime = target;
  });

  // Playback intent per surface. Never trust the play() promise — the `playing`
  // event (onPlaying) is what flips `playing` and hides the control.
  useEffect(() => {
    if (isTouch === null) return;
    const video = videoRef.current;
    if (!video) return;

    if (desktopScrub) {
      // Play briefly so the browser permits seeking, then hold on frame 0.
      video.play().then(() => video.pause()).catch(() => {});
      return;
    }
    // Touch (either orientation) or desktop portrait: attempt muted autoplay,
    // unless Reduce Motion is on (then wait for a tap).
    if (!reduced) video.play().catch(() => {});
  }, [isTouch, reduced, desktopScrub]);

  const activate = useCallback(() => {
    setActivated(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  }, []);

  const poster = posterFor(src);
  const showControl = (isTouch === true || reduced) && !playing;

  // ── Media: poster-only until capability known, or on desktop-reduced (respect
  // the OS setting), otherwise a real, reachable <video>. ──────────────────────
  let media: React.ReactNode;
  if (isTouch === null) {
    // eslint-disable-next-line @next/next/no-img-element
    media = <img src={poster} alt={title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />;
  } else {
    const videoSrc = isTouch ? (failed ? src : mobileSrcFor(src)) : src;
    const autoPlay = !reduced && (isTouch === true || portrait); // desktop landscape uses scrub, not autoplay
    media = (
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        loop={(isTouch === true || portrait) && startOffset === 0}
        autoPlay={autoPlay}
        controls={activated}
        preload={reduced ? 'none' : isTouch ? 'metadata' : 'auto'}
        onLoadedMetadata={onMetadata}
        onPlaying={() => setPlaying(true)}
        onEnded={startOffset > 0 ? () => { const v = videoRef.current; if (v) { v.currentTime = startOffset; v.play().catch(() => {}); } } : undefined}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={title}
      />
    );
  }

  const inner = (
    <>
      {media}

      {/* Play control — same treatment as SmartVideo, so the site is consistent.
          Visible until playback is CONFIRMED (or on Reduce Motion, until tapped). */}
      {showControl && (
        <button
          type="button"
          onClick={activate}
          aria-label={`Play video: ${title}`}
          className="group/play absolute inset-0 z-20 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-opacity duration-300"
        >
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/45 backdrop-blur-sm transition-transform duration-300 group-hover/play:scale-105"
          >
            <svg viewBox="0 0 24 24" className="ml-[3px] h-6 w-6 fill-[#D4AF37]" role="presentation">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {/* Landscape keeps its overlaid title + scrub bar. Portrait keeps NO text
          inside the screen (the h1 above the hero already names the project). */}
      {!portrait && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 p-8">
            <span className="text-2xl font-bold leading-tight text-[#D4AF37] md:text-3xl">{title}</span>
          </div>
          {desktopScrub && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D4AF37]/10">
              <div
                className="h-full origin-left bg-[#D4AF37]/70"
                ref={(el) => {
                  if (!el) return;
                  return scrollYProgress.on('change', (v) => {
                    el.style.transform = `scaleX(${Math.min(v / 0.6, 1)})`;
                  });
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );

  if (portrait) {
    return (
      <div ref={sectionRef}>
        <DeviceFrame>{inner}</DeviceFrame>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative aspect-[16/8] overflow-hidden bg-[#1A1A1A]">
      {inner}
    </div>
  );
}
