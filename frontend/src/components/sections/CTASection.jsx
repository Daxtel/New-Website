import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const CTASection = () => {
  const { language } = useLanguage();
  const cta = content[language].cta;

  return (
    <section className="py-24 md:py-32 bg-[#1a1c1b] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#d9fb06]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d9fb06]/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-[87.5rem] mx-auto px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.85] tracking-tight">
            {cta.title}
          </h2>
          
          {/* Subtitle */}
          <p className="mt-8 text-[#888680] text-lg md:text-xl max-w-xl mx-auto">
            {cta.subtitle}
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              {cta.button}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#888680]">
            <a
              href="mailto:admin@streetshowproduction.com"
              className="hover:text-[#d9fb06] transition-colors"
            >
              admin@streetshowproduction.com
            </a>
            <span className="hidden sm:block">·</span>
            <span>Tokyo · Fukuoka</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
