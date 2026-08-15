// Per-clip playback start offsets, in seconds.
//
// Some source masters open on an intro card before the real content. The KUOE
// brand film starts with a black lead-in and a "please rotate your phone" title
// (0–~4.5s) before the Kyoto pagoda establishing shot at ~5s — which is also the
// frame the poster was cut from. Rather than re-encode the master (quality is the
// product), we start playback a few seconds in and loop back to the offset, not to
// zero, so the intro card is never shown in a hero or a grid card.
//
// Keyed by the master src (the videos/NAME.mp4 path); the same offset applies to
// the derived mobile transcode (startOffsetFor normalizes the mobile path first).
const OFFSETS: Record<string, number> = {
  '/videos/kuoe-kyoto.mp4': 5,
};

export function startOffsetFor(src: string): number {
  return OFFSETS[src.replace('/videos/mobile/', '/videos/')] ?? 0;
}
