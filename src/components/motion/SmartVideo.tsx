'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Performance-first video for cards.
 *  - Mobile / reduced-motion: renders the poster image only — NO video is
 *    downloaded or decoded (the card links to a detail page with the real video).
 *  - Desktop: plays muted/looped, but only while on-screen (IntersectionObserver),
 *    and never preloads the full file (preload="metadata").
 * Poster is derived from the video path unless provided:
 *   /videos/x.mp4 -> /videos/posters/x.jpg
 */
function posterFor(src: string): string {
  return src.replace('/videos/', '/videos/posters/').replace(/\.mp4$/, '.jpg');
}

export function SmartVideo({
  src,
  poster,
  className = '',
  alt = '',
}: {
  src: string;
  poster?: string;
  className?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [lite, setLite] = useState(true); // default to the light path until we know
  const p = poster || posterFor(src);

  useEffect(() => {
    // Client-only capability check — decides the light (poster) vs video path.
    const mq = window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLite(mq.matches);
  }, []);

  useEffect(() => {
    if (lite) return;
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
  }, [lite]);

  if (lite) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p} alt={alt} loading="lazy" decoding="async" className={className} />;
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
    />
  );
}
