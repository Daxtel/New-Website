import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const Process = () => {
  const { language } = useLanguage();
  const section = content[language].process;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#302f2c]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight">
            {section.title}
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {section.steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Number */}
              <div className="text-[#3f4816] text-[4rem] md:text-[5rem] lg:text-[6rem] font-black leading-none mb-4 group-hover:text-[#d9fb06]/20 transition-colors">
                {step.number}
              </div>
              
              {/* Content */}
              <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-2 md:mb-3">
                {step.title}
              </h3>
              <p className="text-[#888680] text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line - Desktop */}
              {index < section.steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-px bg-[#3f4816]/50 translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
