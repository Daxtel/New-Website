import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const TrustedBy = () => {
  const { language } = useLanguage();
  const section = content[language].trustedBy;

  // Client logos - 7 logos, displayed once, no repetition
  const brands = [
    { 
      id: 1, 
      name: 'Shein',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/y9f1dfls_streetshow-client-logo-Shein.png'
    },
    { 
      id: 2, 
      name: 'QC',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/j3i6bdqn_streetshow-client-logo-QC.png'
    },
    { 
      id: 3, 
      name: 'New Balance',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/rowqon6l_streetshow-client-logo-new-balance.png'
    },
    { 
      id: 4, 
      name: 'Kubota Spears',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/prj3egii_streetshow-client-logo-Kubota%20Spears.png'
    },
    { 
      id: 5, 
      name: 'TATA Elxsi',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/hlqeo3l0_streetshow-client-logo-TATA-Elxsi.png'
    },
    { 
      id: 6, 
      name: 'Ritz-Carlton',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/tjnyazzf_streetshow-client-logo-ritz-carlton.png'
    },
    { 
      id: 7, 
      name: 'Jägermeister',
      logo: 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/ei9s0het_streetshow-client-logo-jagermeister.png'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#1a1c1b] border-y border-[#3f4816]/30">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Title */}
        <h2 className="text-[#888680] text-xs md:text-sm uppercase tracking-widest text-center mb-8 md:mb-10">
          {section.title}
        </h2>

        {/* Static Logo Row - with uniform opacity applied to container */}
        <div 
          className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16"
          style={{ opacity: 0.82 }}
        >
          {brands.map((brand) => {
            // Scale multipliers and opacity adjustments for visual normalization
            const adjustments = {
              'Jägermeister': { scale: 0.85, opacity: 0.65 },
              'Kubota Spears': { scale: 0.92, opacity: 0.70 }
            };
            const config = adjustments[brand.name] || { scale: 1, opacity: 1 };
            
            return (
              <div
                key={brand.id}
                className="flex items-center justify-center h-[56px] md:h-[72px]"
                style={{ pointerEvents: 'none' }}
              >
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-auto object-contain"
                  style={{ 
                    filter: 'brightness(0) invert(1)',
                    transform: `scale(${config.scale})`,
                    opacity: config.opacity
                  }}
                  draggable="false"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

