import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const CTASection = () => {
  const { language } = useLanguage();
  const cta = content[language].cta;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#1a1c1b] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#d9fb06]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d9fb06]/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-[87.5rem] mx-auto px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="font-black text-[#d9fb06] text-[clamp(2rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight">
            {cta.title}
          </h2>
          
          {/* Subtitle */}
          <p className="mt-6 md:mt-8 text-[#888680] text-base md:text-lg lg:text-xl max-w-xl mx-auto">
            {cta.subtitle}
          </p>

          {/* CTA Button */}
          <div className="mt-8 md:mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-8 md:px-10 py-4 md:py-5 rounded-full font-semibold uppercase tracking-tight text-sm md:text-base hover:scale-[1.02] hover:opacity-90 transition-all min-h-[48px] touch-manipulation"
            >
              {cta.button}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Location Info */}
          <div className="mt-8 md:mt-12 text-center text-[#888680] text-sm md:text-base">
            <span>Tokyo · Fukuoka</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
