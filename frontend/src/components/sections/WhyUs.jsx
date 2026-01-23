import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const CALENDLY_URL = 'https://calendly.com/jackson-streetshowproduction/discovery-meeting';

const WhyUs = () => {
  const { language } = useLanguage();
  const section = content[language].whyUs;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#1a1c1b]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight">
            {section.title}
          </h2>
          <p className="mt-6 md:mt-8 text-[#d9fb06]/80 text-base md:text-lg lg:text-xl leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
          {section.pillars.map((pillar, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-[#d9fb06] font-bold text-xl md:text-2xl mb-3 md:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#888680] text-sm md:text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Credibility Line */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[#d9fb06]/70 text-base md:text-lg italic max-w-3xl mx-auto">
            {section.credibility}
          </p>
        </div>

        {/* Ideal For Section */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16">
          <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-6">
            {section.idealFor.title}
          </h3>
          <ul className="space-y-3 md:space-y-4">
            {section.idealFor.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#888680] text-sm md:text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d9fb06] mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 text-[#d9fb06] hover:text-[#d9fb06]/80 transition-colors text-base md:text-lg font-medium group min-h-[48px] touch-manipulation"
          >
            {section.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
