import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const TrustedBy = () => {
  const { language } = useLanguage();
  const section = content[language].trustedBy;

  // Client logos with public URLs
  const brands = [
    { 
      id: 1, 
      name: 'Shein',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/3kgdsk5q_streetshow-client-logo-Shein.png'
    },
    { 
      id: 2, 
      name: 'QC',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/wpvyzn9t_streetshow-client-logo-QC.png'
    },
    { 
      id: 3, 
      name: 'New Balance',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/y89k2ym9_streetshow-client-logo-new-balance.png'
    },
    { 
      id: 4, 
      name: 'Kubota Spears',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/w7y3it7s_streetshow-client-logo-Kubota%20Spears.png'
    },
    { 
      id: 5, 
      name: 'TATA Elxsi',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/468nhcgw_streetshow-client-logo-TATA-Elxsi.png'
    }
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
          <div className="flex gap-12 md:gap-16 lg:gap-20 animate-marquee">
            {brands.map((brand) => (
              <div
                key={`first-${brand.id}`}
                className="flex-shrink-0 flex items-center justify-center h-12 md:h-14"
              >
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-auto object-contain opacity-70 grayscale brightness-200"
                  style={{ filter: 'grayscale(100%) brightness(2)' }}
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex gap-12 md:gap-16 lg:gap-20 animate-marquee" aria-hidden="true">
            {brands.map((brand) => (
              <div
                key={`second-${brand.id}`}
                className="flex-shrink-0 flex items-center justify-center h-12 md:h-14"
              >
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-auto object-contain opacity-70 grayscale brightness-200"
                  style={{ filter: 'grayscale(100%) brightness(2)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

