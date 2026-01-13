import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const CALENDLY_URL = 'https://calendly.com/jackson-streetshowproduction/discovery-meeting';

const Hero = () => {
  const { language } = useLanguage();
  const hero = content[language].hero;

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-[#1a1c1b] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(#d9fb06 1px, transparent 1px), linear-gradient(90deg, #d9fb06 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-5 md:px-10 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="font-black text-[#d9fb06] uppercase leading-[0.85] tracking-tight">
            <span className="block text-[clamp(2.75rem,9vw,6rem)]">
              {language === 'en' ? 'Creative' : 'クリエイティブ'}
            </span>
            <span className="block text-[clamp(2.75rem,9vw,6rem)]">
              {language === 'en' ? 'Production' : 'プロダクション'}
            </span>
            <span className="block text-[clamp(1.75rem,6vw,4rem)] text-[#3f4816] mt-2">
              {language === 'en' ? 'for Japan' : 'for Japan'}
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-8 md:mt-10 text-[#d9fb06]/80 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
            {hero.subtext}
          </p>

          {/* CTAs */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#d9fb06] text-[#1a1c1b] px-8 py-4 md:py-5 rounded-full font-semibold uppercase tracking-tight text-sm hover:scale-[1.02] hover:opacity-90 transition-all min-h-[48px] touch-manipulation"
            >
              {hero.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#d9fb06] text-[#d9fb06] px-8 py-4 md:py-5 rounded-full font-semibold uppercase tracking-tight text-sm hover:bg-[#d9fb06] hover:text-[#1a1c1b] transition-all min-h-[48px] touch-manipulation"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="flex items-center gap-3 text-[#888680] text-sm">
          <span className="uppercase tracking-widest">
            {language === 'en' ? 'Tokyo' : '東京'} · {language === 'en' ? 'Fukuoka' : '福岡'}
          </span>
          <div className="w-16 h-px bg-[#888680]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
