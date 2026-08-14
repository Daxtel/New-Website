import type { ReactNode } from 'react';

/**
 * DeviceFrame — a portrait phone shell for 9:16 content.
 *
 * Extracted from campaign-work's PhoneCard so the same frame can hold a hero
 * video (VideoScrubHero) and the campaign grid cards.
 *
 * - Aspect-ratio driven (9/16), never a fixed pixel height, so it scales to any
 *   width without overflowing narrow phones.
 * - NO frame below `md`: on phones the chrome (rounded bezel, dark body, shadow)
 *   is suppressed and the screen fills the space edge to edge. The phone mockup
 *   only reads as a device on tablet/desktop, where there is room for it.
 * - `island` (Dynamic Island) is opt-in and only paints inside the md+ frame;
 *   the hero passes it false.
 */
export function DeviceFrame({
  children,
  island = false,
  className = '',
}: {
  children: ReactNode;
  island?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[9/16] w-full max-w-[300px] md:max-w-[320px] md:rounded-[40px] md:bg-[#2A2A2A] md:p-[12px] md:shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#111111] md:rounded-[28px]">
        {island && (
          <div className="absolute left-1/2 top-[12px] z-20 hidden h-[16px] w-[72px] -translate-x-1/2 rounded-full bg-[#0A0A0A] md:block" />
        )}
        {children}
      </div>
    </div>
  );
}
