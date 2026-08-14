'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'link' | 'play' | 'view' | 'drag';

const CURSOR_LABELS: Record<CursorState, string> = {
  default: '',
  hover: '',
  link: '',
  play: 'PLAY',
  view: 'VIEW',
  drag: 'DRAG',
};

const DOT_SIZE = 8;
const RING_SIZE = 40;

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const cursorRef = useRef<HTMLDivElement>(null);

  // Raw mouse position (dot — snappy)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring follows with spring lag
  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const ringX = useSpring(dotX, springConfig);
  const ringY = useSpring(dotY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    function onMouseMove(e: MouseEvent) {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function onMouseEnter() {
      setVisible(true);
    }

    // Detect what element is under the cursor
    function detectState(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const el = target.closest<HTMLElement>(
        'a, button, [data-cursor], [data-cursor-play], [data-cursor-drag], [role="button"]'
      );
      if (!el) {
        setState('default');
        return;
      }
      if (el.dataset.cursorPlay !== undefined) { setState('play'); return; }
      if (el.dataset.cursorDrag !== undefined) { setState('drag'); return; }
      if (el.dataset.cursor) { setState(el.dataset.cursor as CursorState); return; }
      // Default interactive element
      const tag = el.tagName.toLowerCase();
      if (tag === 'a') setState('link');
      else setState('hover');
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', detectState);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', detectState);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [dotX, dotY, visible]);

  const isExpanded = state === 'play' || state === 'view' || state === 'drag';
  const isLink = state === 'link' || state === 'hover';
  const label = CURSOR_LABELS[state];

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      {/* Dot — snaps exactly to cursor */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isExpanded ? 0 : DOT_SIZE,
          height: isExpanded ? 0 : DOT_SIZE,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute rounded-full bg-[#D4AF37]"
      />

      {/* Ring — spring lags behind */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isExpanded ? 88 : isLink ? 52 : RING_SIZE,
          height: isExpanded ? 88 : isLink ? 52 : RING_SIZE,
          backgroundColor: isExpanded ? 'rgba(212,175,55,0.95)' : 'transparent',
          borderColor: isExpanded ? 'rgba(212,175,55,0)' : isLink ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.5)',
          borderWidth: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="absolute flex items-center justify-center rounded-full border"
      >
        {/* Label text inside expanded cursor */}
        <motion.span
          animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A]"
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
