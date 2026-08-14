'use client';

const clients = [
  'The Ritz-Carlton Kyoto',
  'New Balance',
  'Kubota Spears',
  'QC Running',
  'Tata Elxsi',
  'JTL K.K.',
  'SHEIN Japan',
];

const label = {
  en: 'Companies We Have Worked With',
  ja: '取引実績のある企業',
};

function ClientName({ name }: { name: string }) {
  return (
    <span className="whitespace-nowrap text-[11px] md:text-[13px] font-medium uppercase tracking-[0.2em] text-[#F5F0E8]/40 transition-all duration-300 hover:text-[#F5F0E8]/90">
      {name}
    </span>
  );
}

function Separator() {
  return <span className="text-[#C9A84C]/20 px-4 md:px-5 select-none">·</span>;
}

export function ClientStrip({ locale = 'en' }: { locale?: 'en' | 'ja' }) {
  return (
    <section className="border-y border-[#C9A84C]/15 bg-[#111111]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <p className="pt-5 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A8070] md:pt-4 md:pb-1">
          {locale === 'ja' ? label.ja : label.en}
        </p>
      </div>

      {/* Desktop: static row (lg+ only — at 768 the 7 names overflow and clip) */}
      <div className="hidden h-[60px] items-center lg:flex">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 lg:px-16 w-full">
          {clients.map((name, i) => (
            <span key={name} className="flex items-center">
              <ClientName name={name} />
              {i < clients.length - 1 && <Separator />}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile + tablet: marquee (fits any width) */}
      <div className="relative h-[48px] overflow-hidden lg:hidden">
        <div className="marquee-track flex items-center h-full">
          {/* Two copies for seamless loop */}
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-content flex items-center shrink-0">
              {clients.map((name, i) => (
                <span key={`${copy}-${name}`} className="flex items-center">
                  <ClientName name={name} />
                  {(i < clients.length - 1 || copy === 0) && <Separator />}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
