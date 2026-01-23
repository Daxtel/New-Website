import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const TrustedBy = () => {
  const { language } = useLanguage();
  const section = content[language].trustedBy;

  // Placeholder brand logos (will be replaced with actual logos later)
  const brands = [
    { id: 1, name: 'Brand 01' },
    { id: 2, name: 'Brand 02' },
    { id: 3, name: 'Brand 03' },
    { id: 4, name: 'Brand 04' },
    { id: 5, name: 'Brand 05' },
    { id: 6, name: 'Brand 06' },
    { id: 7, name: 'Brand 07' },
    { id: 8, name: 'Brand 08' },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#1a1c1b] border-y border-[#3f4816]/30 overflow-hidden">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Title */}
        <h2 className="text-[#888680] text-xs md:text-sm uppercase tracking-widest text-center mb-8 md:mb-10">
          {section.title}
        </h2>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#1a1c1b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#1a1c1b] to-transparent z-10 pointer-events-none" />
        
        <div className="flex">
          {/* First set of logos */}
          <div className="flex gap-12 md:gap-16 animate-marquee">
            {brands.map((brand) => (
              <div
                key={`first-${brand.id}`}
                className="flex-shrink-0 flex items-center justify-center h-12 md:h-16 w-32 md:w-40"
              >
                {/* Placeholder logo container */}
                <div className="w-full h-full flex items-center justify-center opacity-70 hover:opacity-90 transition-opacity duration-300">
                  <div className="text-[#888680] text-xs md:text-sm font-semibold uppercase tracking-wider border border-[#888680]/30 px-6 py-3 md:py-4 rounded whitespace-nowrap">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex gap-12 md:gap-16 animate-marquee" aria-hidden="true">
            {brands.map((brand) => (
              <div
                key={`second-${brand.id}`}
                className="flex-shrink-0 flex items-center justify-center h-12 md:h-16 w-32 md:w-40"
              >
                {/* Placeholder logo container */}
                <div className="w-full h-full flex items-center justify-center opacity-70 hover:opacity-90 transition-opacity duration-300">
                  <div className="text-[#888680] text-xs md:text-sm font-semibold uppercase tracking-wider border border-[#888680]/30 px-6 py-3 md:py-4 rounded whitespace-nowrap">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

