'use client';
import { SmartVideo } from './motion/SmartVideo';

type CardVariant = 'widescreen' | 'phone' | 'phone-landscape';

type CampaignCard = {
  variant: CardVariant;
  label: string;
  title: string;
  subtitle: string;
  tag: string;
  videoSrc: string;
  rotate?: -90 | 90;
};

const cards: CampaignCard[] = [
  {
    variant: 'widescreen',
    label: 'NEW BALANCE JAPAN',
    title: 'Shohei Ohtani Activation',
    subtitle: 'Paid Media Campaign',
    tag: '16:9 · PAID MEDIA · ACTIVATION',
    videoSrc: '/videos/new-balance-ohtani.mp4',
  },
  {
    variant: 'phone',
    label: 'SHEIN JAPAN',
    title: 'Japan Ad Activation',
    subtitle: 'Paid Social Campaign',
    tag: '9:16 · PAID SOCIAL · ACTIVATION',
    videoSrc: '/videos/shein-japan.mp4',
  },
  {
    variant: 'widescreen',
    label: 'FUDITALYCO',
    title: 'Japan Market Entry',
    subtitle: 'Food Industry Campaign',
    tag: '16:9 · MARKET ENTRY · 2024',
    videoSrc: '/videos/fuditalyco-japan.mp4',
  },
  {
    variant: 'phone',
    label: 'THE RITZ-CARLTON, KYOTO',
    title: 'Private Dining Activation',
    subtitle: 'Hospitality Campaign',
    tag: '9:16 · HOSPITALITY · CAMPAIGN',
    videoSrc: '/videos/ritz-carlton-kyoto.mp4',
  },
  {
    variant: 'phone',
    label: 'QC RUNNING',
    title: 'On Japan',
    subtitle: 'Paid Social Campaign',
    tag: '9:16 · PAID SOCIAL · ACTIVATION',
    videoSrc: '/videos/qc-running-on-japan.mp4',
  },
];

function VideoPlayer({
  src,
  className,
  rotate,
}: {
  src: string;
  className?: string;
  rotate?: -90 | 90;
}) {
  if (rotate) {
    // Container query trick: video width = container height, video height = container width,
    // then rotated -90/90 so it perfectly fills the parent after rotation.
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ containerType: 'size' }}
      >
        <SmartVideo
          src={src}
          className="absolute left-1/2 top-1/2 object-cover"
          style={{
            width: '100cqh',
            height: '100cqw',
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          }}
        />
      </div>
    );
  }
  return <SmartVideo src={src} className={className} />;
}

function WidescreenCard({ card }: { card: CampaignCard }) {
  return (
    <div className="group cursor-pointer rounded-[4px] border border-[#C9A84C] transition-all duration-300 hover:border-[#C9A84C]/80 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#111111] rounded-t-[3px]">
        <VideoPlayer src={card.videoSrc} className="h-full w-full object-cover" />
      </div>
      <div className="bg-[#111111] px-5 pb-5 pt-4 rounded-b-[3px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A8070]">{card.label}</p>
        <h4 className="mt-1.5 text-base font-bold text-[#C9A84C]">{card.title}</h4>
        <p className="mt-0.5 text-sm text-white/50">{card.subtitle}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/30">{card.tag}</p>
      </div>
    </div>
  );
}

function PhoneCard({ card }: { card: CampaignCard }) {
  return (
    <div className="flex flex-col items-center">
      {/* iPhone frame - portrait */}
      <div
        className="group relative flex w-[220px] md:w-[280px] flex-col items-center rounded-[36px] bg-[#2A2A2A] p-[10px] md:p-[12px]"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
      >
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[14px] md:top-[16px] z-20 h-[14px] md:h-[16px] w-[60px] md:w-[72px] -translate-x-1/2 rounded-full bg-[#0A0A0A]" />
        {/* Screen with video + overlay content */}
        <div className="relative flex h-[440px] md:h-[516px] w-full flex-col items-center overflow-hidden rounded-[12px] bg-[#111111]">
          {/* Background video fills screen */}
          <VideoPlayer src={card.videoSrc} className="absolute inset-0 h-full w-full object-cover" />
          {/* Dark overlay for text legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          {/* Top: label */}
          <div className="relative z-10 px-3 pt-10 md:px-5 md:pt-14 w-full flex flex-col items-center">
            <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9A84C] text-center leading-tight">{card.label}</p>
          </div>
          {/* Bottom: title, subtitle, tag */}
          <div className="relative z-10 mt-auto flex flex-col items-center gap-1 px-3 pb-4 md:px-5 md:pb-6 w-full">
            <h4 className="text-[13px] md:text-base font-bold text-[#C9A84C] text-center leading-tight drop-shadow-lg">{card.title}</h4>
            <p className="text-[11px] md:text-sm text-body-text text-center drop-shadow">{card.subtitle}</p>
            <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/60 text-center">{card.tag}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneLandscapeCard({ card }: { card: CampaignCard }) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* iPhone frame - landscape (rotated 90°). Responsive width so it never
          overflows narrow phones; aspect-ratio drives height instead of a fixed px. */}
      <div
        className="group relative flex aspect-[440/220] w-full max-w-[440px] md:max-w-[516px] flex-row items-center rounded-[36px] bg-[#2A2A2A] p-[10px] md:p-[12px]"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
      >
        {/* Dynamic Island - on the left side when phone is landscape */}
        <div className="absolute left-[14px] md:left-[16px] top-1/2 z-20 h-[60px] md:h-[72px] w-[14px] md:w-[16px] -translate-y-1/2 rounded-full bg-[#0A0A0A]" />
        {/* Screen with video + overlay content */}
        <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[12px] bg-[#111111]">
          {/* Background video fills screen (with optional rotation) */}
          <VideoPlayer
            src={card.videoSrc}
            className="absolute inset-0 h-full w-full object-cover"
            rotate={card.rotate}
          />
          {/* Dark overlay for text legibility */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          {/* Top: label */}
          <div className="relative z-10 w-full px-6 pt-3 md:px-10 md:pt-4 flex flex-col items-center">
            <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9A84C] text-center leading-tight">{card.label}</p>
          </div>
          {/* Bottom: title, subtitle, tag */}
          <div className="relative z-10 mt-auto flex flex-col items-center gap-1 w-full px-6 pb-3 md:px-10 md:pb-4">
            <h4 className="text-[13px] md:text-base font-bold text-[#C9A84C] text-center leading-tight drop-shadow-lg">{card.title}</h4>
            <p className="text-[11px] md:text-sm text-body-text text-center drop-shadow">{card.subtitle}</p>
            <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/60 text-center">{card.tag}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCard(card: CampaignCard, key: string) {
  if (card.variant === 'widescreen') return <WidescreenCard key={key} card={card} />;
  if (card.variant === 'phone-landscape') {
    return (
      <div key={key} className="flex items-center justify-center">
        <PhoneLandscapeCard card={card} />
      </div>
    );
  }
  return (
    <div key={key} className="flex items-center justify-center">
      <PhoneCard card={card} />
    </div>
  );
}

export function CampaignWork() {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">Campaign Work</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/45 md:text-base">
        Selected video work produced for premium brand campaigns across Japan.
      </p>

      {/* Row 1 + 2: widescreen + phone pairs */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2" style={{ gap: '32px' }}>
        {renderCard(cards[0], 'c0')}
        {renderCard(cards[1], 'c1')}
        {renderCard(cards[2], 'c2')}
        {renderCard(cards[3], 'c3')}
      </div>

      {/* Row 3: QC Running (portrait phone), centered */}
      <div className="mt-8 flex justify-center">
        {renderCard(cards[4], 'c4')}
      </div>
    </div>
  );
}
