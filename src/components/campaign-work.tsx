'use client';
import { SmartVideo } from './motion/SmartVideo';
import { DeviceFrame } from './motion/DeviceFrame';

type CardVariant = 'widescreen' | 'phone';

type CampaignCard = {
  variant: CardVariant;
  label: string;
  title: string;
  subtitle: string;
  tag: string;
  videoSrc: string;
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

function VideoPlayer({ src, className }: { src: string; className?: string }) {
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
    <DeviceFrame island className="group max-w-[240px] md:max-w-[280px]">
      <VideoPlayer src={card.videoSrc} className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      {/* Top: label */}
      <div className="absolute left-0 top-0 z-10 flex w-full flex-col items-center px-3 pt-10 md:px-5 md:pt-14">
        <p className="text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-[#C9A84C] md:text-[11px]">{card.label}</p>
      </div>
      {/* Bottom: title, subtitle, tag */}
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col items-center gap-1 px-3 pb-4 md:px-5 md:pb-6">
        <h4 className="text-center text-[13px] font-bold leading-tight text-[#C9A84C] drop-shadow-lg md:text-base">{card.title}</h4>
        <p className="text-center text-[11px] text-body-text drop-shadow md:text-sm">{card.subtitle}</p>
        <p className="mt-1 text-center text-[9px] uppercase tracking-[0.1em] text-white/60 md:text-[10px]">{card.tag}</p>
      </div>
    </DeviceFrame>
  );
}

function renderCard(card: CampaignCard, key: string) {
  if (card.variant === 'widescreen') return <WidescreenCard key={key} card={card} />;
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
