'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilterCategory = 'ALL' | 'HOSPITALITY' | 'LOCALIZATION' | 'JAPAN MARKET ENTRY' | 'PRODUCTION / CGI / 3D' | 'GROWTH / E-COMMERCE';

type ProjectCard = {
  slug: string;
  title: string;
  proofLine: string;
  description: string;
  category: FilterCategory;
  caseStudyLabel: string;
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const FILTERS: { key: FilterCategory; label: { en: string; ja: string } }[] = [
  { key: 'ALL', label: { en: 'All', ja: 'すべて' } },
  { key: 'HOSPITALITY', label: { en: 'Hospitality', ja: 'ホスピタリティ' } },
  { key: 'LOCALIZATION', label: { en: 'Localization', ja: 'ローカライズ' } },
  { key: 'JAPAN MARKET ENTRY', label: { en: 'Japan Market Entry', ja: '日本市場進出' } },
  { key: 'PRODUCTION / CGI / 3D', label: { en: 'Production / CGI / 3D', ja: '制作 / CGI / 3D' } },
  { key: 'GROWTH / E-COMMERCE', label: { en: 'Growth / E-Commerce', ja: 'グロース / EC' } },
];

export function WorkFilter({
  projects,
  locale,
  filterLabel,
}: {
  projects: ProjectCard[];
  locale: 'en' | 'ja';
  filterLabel: string;
}) {
  const [active, setActive] = useState<FilterCategory>('ALL');

  const filtered = active === 'ALL' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/45">{filterLabel}</p>
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActive(filter.key)}
              className={`cursor-pointer rounded-full border px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all ${
                active === filter.key
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                  : 'border-[#D4AF37]/15 text-white/60 hover:border-[#D4AF37]/40 hover:text-white/80'
              }`}
            >
              {locale === 'ja' ? filter.label.ja : filter.label.en}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="mt-10 grid gap-5 md:grid-cols-2" style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}>
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group block overflow-hidden bg-[#141414] transition-all duration-300 hover:bg-[#D4AF37]/5 hover:scale-[1.02]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
              {item.videoSrc ? (
                <video
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : item.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt || item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#242424]" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.15em] text-white/45">{item.proofLine}</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#D4AF37]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{item.description}</p>
              <div className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors group-hover:text-[#D4AF37]">
                {item.caseStudyLabel} →
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 py-12 text-center text-white/45">
            {locale === 'ja' ? '該当するプロジェクトがありません。' : 'No projects match this filter.'}
          </p>
        )}
      </div>
    </>
  );
}
