'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { localizeHref } from '@/lib/alternates';
import { SmartVideo } from './SmartVideo';

type FilterCategory =
  | 'ALL'
  | 'HOSPITALITY'
  | 'LOCALIZATION'
  | 'JAPAN MARKET ENTRY'
  | 'PRODUCTION / CGI / 3D'
  | 'GROWTH / E-COMMERCE';

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
  { key: 'ALL',                   label: { en: 'All',                   ja: 'すべて' } },
  { key: 'HOSPITALITY',           label: { en: 'Hospitality',           ja: 'ホスピタリティ' } },
  { key: 'LOCALIZATION',          label: { en: 'Localization',          ja: 'ローカライズ' } },
  { key: 'JAPAN MARKET ENTRY',    label: { en: 'Japan Market Entry',    ja: '日本市場進出' } },
  { key: 'PRODUCTION / CGI / 3D', label: { en: 'Production / CGI / 3D', ja: '制作 / CGI / 3D' } },
  { key: 'GROWTH / E-COMMERCE',   label: { en: 'Growth / E-Commerce',   ja: 'グロース / EC' } },
];

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ── Individual card ────────────────────────────────────────────────────────────
function WorkCard({
  item,
  index,
  locale,
}: {
  item: ProjectCard;
  index: number;
  locale: 'en' | 'ja';
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setTilt({ rx: -dy * 5, ry: dx * 5 });
  }

  return (
    <motion.a
      ref={cardRef}
      href={localizeHref(`/work/${item.slug}`, locale)}
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
      animate-tilt={undefined}
      style={
        shouldReduceMotion
          ? {}
          : {
              rotateX: tilt.rx,
              rotateY: tilt.ry,
              transformStyle: 'preserve-3d',
              perspective: 900,
            }
      }
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setHovered(false); }}
      className="group relative block overflow-hidden bg-[#141414] cursor-pointer"
      data-cursor-play=""
    >
      {/* Glow border */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{
          boxShadow: hovered && !shouldReduceMotion
            ? 'inset 0 0 0 1px rgba(212,175,55,0.55), 0 0 28px rgba(212,175,55,0.12)'
            : 'inset 0 0 0 1px rgba(212,175,55,0)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
        {item.videoSrc ? (
          <SmartVideo
            src={item.videoSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.imageAlt || item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#242424]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Text */}
      <div className="p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-white/45">{item.proofLine}</p>
        <h2 className="mt-3 text-2xl font-semibold text-[#D4AF37]">{item.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-body-text md:text-base">{item.description}</p>
        <div className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-[#D4AF37]/75 transition-colors group-hover:text-[#D4AF37]">
          {item.caseStudyLabel} →
        </div>
      </div>
    </motion.a>
  );
}

// ── Filter pill with sliding active indicator ──────────────────────────────────
function FilterPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-full border px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200"
      style={{
        borderColor: isActive ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.15)',
        color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.6)',
      }}
    >
      {/* Filled bg slides in when active */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="bg"
            className="absolute inset-0 rounded-full bg-[#D4AF37]/10"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
          />
        )}
      </AnimatePresence>
      <span className="relative">{label}</span>
    </button>
  );
}

// ── Main exported component ────────────────────────────────────────────────────
export function AnimatedWorkFilter({
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
      {/* Filter bar */}
      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/45">{filterLabel}</p>
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <FilterPill
              key={f.key}
              label={locale === 'ja' ? f.label.ja : f.label.en}
              isActive={active === f.key}
              onClick={() => setActive(f.key)}
            />
          ))}
        </div>
      </div>

      {/* Grid with AnimatePresence for smooth filter transitions */}
      <motion.div
        layout
        className="mt-10 grid gap-5 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} locale={locale} />
          ))}
          {filtered.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-2 py-12 text-center text-white/45"
            >
              {locale === 'ja' ? '該当するプロジェクトがありません。' : 'No projects match this filter.'}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
