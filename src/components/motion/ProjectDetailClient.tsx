'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from './ScrollReveal';
import { VideoScrubHero } from './VideoScrubHero';
import { localizeHref } from '@/lib/alternates';
import { SmartVideo } from './SmartVideo';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ProjectMeta {
  clientLabel: string;
  client: string;
  yearLabel: string;
  year: string;
  categoryLabel: string;
  category: string;
}

interface RelatedService {
  slug: string;
  title: string;
}

interface CaseStudyEntry {
  label: string;
  value: string;
}

interface ProjectDetailClientProps {
  backLabel: string;
  proofLine: string;
  title: string;
  intro: string;
  heroVideoSrc?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  meta: ProjectMeta;
  relatedServicesLabel: string;
  relatedServices: RelatedService[];
  servicesProvidedLabel: string;
  servicesProvided: string[];
  deliverablesLabel: string;
  deliverables: string[];
  projectFocusLabel: string;
  projectFocus: string[];
  caseStudyLabel: string;
  caseStudyEntries: CaseStudyEntry[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  nextProject?: { slug: string; title: string; videoSrc?: string; imageSrc?: string } | null;
  locale: 'en' | 'ja';
}

export function ProjectDetailClient({
  backLabel,
  proofLine,
  title,
  intro,
  heroVideoSrc,
  heroImageSrc,
  heroImageAlt,
  meta,
  relatedServicesLabel,
  relatedServices,
  servicesProvidedLabel,
  servicesProvided,
  deliverablesLabel,
  deliverables,
  projectFocusLabel,
  projectFocus,
  caseStudyLabel,
  caseStudyEntries,
  ctaHeading,
  ctaBody,
  ctaButtonLabel,
  nextProject,
  locale,
}: ProjectDetailClientProps) {
  return (
    <div className="mx-auto max-w-6xl">
      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Link
          href={localizeHref('/work', locale)}
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#D4AF37] cursor-pointer"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {backLabel}
        </Link>
      </motion.div>

      {/* ── Hero text ── */}
      <div className="max-w-5xl">
        <ScrollReveal delay={0.05}>
          <p className="text-xs uppercase tracking-[0.15em] text-white/45">{proofLine}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <h1 className="mt-4 text-[clamp(1.8rem,3.5vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-heading">
            {title}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.22}>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D4AF37]/80 md:text-xl">{intro}</p>
        </ScrollReveal>
      </div>

      {/* ── Hero media ── */}
      <ScrollReveal delay={0.1} className="mt-10">
        {heroVideoSrc ? (
          <VideoScrubHero src={heroVideoSrc} title={title} />
        ) : heroImageSrc ? (
          <div className="relative aspect-[16/8] overflow-hidden bg-[#1A1A1A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImageSrc}
              alt={heroImageAlt || title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-2xl font-bold leading-tight text-[#D4AF37] md:text-3xl">{title}</span>
            </div>
          </div>
        ) : null}
      </ScrollReveal>

      {/* ── Body: main content + sticky sidebar ── */}
      <div className="mt-12 grid gap-12 lg:grid-cols-3">

        {/* Main content, 2/3 */}
        <div className="lg:col-span-2 space-y-12">

          <ScrollReveal>
            <div>
              <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{servicesProvidedLabel}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {servicesProvided.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                    className="border border-white/8 bg-white/[0.02] p-5 text-[#D4AF37]/85 transition-colors hover:border-[#D4AF37]/25"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{deliverablesLabel}</h2>
              <div className="flex flex-wrap gap-3">
                {deliverables.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                    className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2 text-sm text-[#D4AF37]/85"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{projectFocusLabel}</h2>
              <div className="space-y-3">
                {projectFocus.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-3 text-body-text"
                  >
                    <span className="mt-1 text-[#D4AF37]">•</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Case study sections */}
          <div className="border-t border-[#D4AF37]/10 pt-12">
            <ScrollReveal>
              <h2 className="mb-8 text-xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{caseStudyLabel}</h2>
            </ScrollReveal>
            <div className="space-y-8">
              {caseStudyEntries.map((entry, i) => (
                <ScrollReveal key={entry.label} delay={i * 0.08}>
                  <div className="grid gap-4 border-b border-[#D4AF37]/10 pb-8 md:grid-cols-[180px_1fr] md:gap-8 last:border-b-0 last:pb-0">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] md:text-base">
                      {entry.label}
                    </h3>
                    <p className="text-base leading-relaxed text-body-text md:text-lg">{entry.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sticky sidebar, 1/3 ── */}
        <div className="space-y-8">
          <div className="lg:sticky lg:top-24">
            <ScrollReveal direction="left">
              <div className="border border-white/8 bg-white/[0.02] p-6">
                <div className="space-y-6">
                  {[
                    { label: meta.clientLabel,   value: meta.client   },
                    { label: meta.yearLabel,     value: meta.year     },
                    { label: meta.categoryLabel, value: meta.category },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/45">{label}</p>
                      <p className="mt-1 font-medium text-[#D4AF37]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {relatedServices.length > 0 && (
              <ScrollReveal delay={0.1} className="mt-6">
                <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.15em] text-[#D4AF37]">{relatedServicesLabel}</h2>
                <div className="space-y-3">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={localizeHref(`/services/${service.slug}`, locale)}
                      className="block border border-[#D4AF37]/10 bg-[#141414] p-4 transition-all hover:border-[#D4AF37]/30 cursor-pointer"
                    >
                      <span className="text-sm text-[#D4AF37]/85">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>

      {/* ── CTA bar ── */}
      <ScrollReveal className="mt-16">
        <div className="bg-[#D4AF37] p-10 md:p-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0A0A0A] md:text-3xl">{ctaHeading}</h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#0A0A0A]/75 md:text-lg">{ctaBody}</p>
            </div>
            <Link
              href={localizeHref('/contact', locale)}
              className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37] cursor-pointer"
            >
              {ctaButtonLabel}
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Next project peek ── */}
      {nextProject && (
        <ScrollReveal className="mt-8">
          <Link
            href={localizeHref(`/work/${nextProject.slug}`, locale)}
            className="group relative block overflow-hidden bg-[#141414] cursor-pointer"
            data-cursor-play=""
          >
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Next Project →</span>
            </div>
            <div className="relative aspect-[16/6] overflow-hidden">
              {nextProject.videoSrc ? (
                <SmartVideo
                  src={nextProject.videoSrc}
                  alt={nextProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : nextProject.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={nextProject.imageSrc}
                  alt={nextProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-[#141414]" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Next Project</p>
                <p className="mt-1 text-lg font-semibold text-heading">{nextProject.title}</p>
              </div>
              <span className="text-[#D4AF37]/60 transition-transform duration-300 group-hover:translate-x-2">→</span>
            </div>
          </Link>
        </ScrollReveal>
      )}
    </div>
  );
}
