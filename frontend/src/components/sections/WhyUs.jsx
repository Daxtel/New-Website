import React from 'react';
import { MapPin, Users, MessageSquare, Network } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const iconMap = [
  MapPin,
  Users,
  MessageSquare,
  Network,
];

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
          <p className="mt-4 md:mt-6 text-[#d9fb06]/70 text-base md:text-lg lg:text-xl leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {section.points.map((point, index) => {
            const Icon = iconMap[index];
            return (
              <div
                key={index}
                className="border border-[#3f4816]/50 p-6 md:p-8 lg:p-10 hover:border-[#d9fb06]/30 transition-colors group"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#3f4816]/30 flex items-center justify-center group-hover:bg-[#d9fb06]/10 transition-colors">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#d9fb06]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-2 md:mb-3">
                      {point.title}
                    </h3>
                    <p className="text-[#888680] text-sm md:text-base leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
