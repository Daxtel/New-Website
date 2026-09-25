import type { ImageSlot } from '@/lib/japan-execution';

/**
 * An image slot that reserves its space before the asset exists.
 *
 * The Japan Execution assets are being supplied after the page ships. Until a
 * slot's `ready` flag is flipped, this renders a surface-coloured block at the
 * exact aspect ratio the real image will occupy, so there is no broken image, no
 * stock stand-in, and no layout shift when the file lands. Once `ready` is true
 * it renders the real image with width and height set, which reserves the same
 * box during load.
 */
export function ReservedImage({ slot, className = '' }: { slot: ImageSlot; className?: string }) {
  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#141414]"
        style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
      >
        {slot.ready ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.src}
            alt={slot.alt}
            width={slot.width}
            height={slot.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#141414] to-[#1A1A1A]"
          />
        )}
      </div>
      {slot.caption && (
        <figcaption className="mt-3 text-[11px] leading-relaxed text-muted-text/70">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
