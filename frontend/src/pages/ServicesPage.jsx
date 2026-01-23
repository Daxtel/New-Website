import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Video, Globe, Camera, Layers, ArrowRight, ArrowUpRight, Hotel } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content, servicesData } from '../data/mock';
import { useSEO } from '../hooks/useSEO';

const iconMap = {
  cube: Box,
  video: Video,
  globe: Globe,
  camera: Camera,
  box: Layers,
  hotel: Hotel,
};

// Service order matching the priority in requirements
const serviceOrder = [
  '3d-anamorphic-billboards-japan',
  'video-production-japan',
  'japan-market-localization',
  'photography-cgi-japan',
  'hospitality-creative-strategy-japan'
];

const ServicesPage = () => {
  useSEO('services');
  const { language, t } = useLanguage();
  const pageContent = content[language].servicesPage;

  // Get services in the correct order
  const orderedServices = serviceOrder.map(slug => servicesData[slug]).filter(Boolean);

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 lg:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {pageContent.title}
            </h1>
            <p className="mt-4 md:mt-6 text-[#888680] text-base md:text-lg lg:text-xl">
              {pageContent.subtitle}
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-px">
            {orderedServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Box;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="block bg-[#302f2c] p-6 md:p-8 lg:p-12 group hover:bg-[#3f4816]/20 transition-colors duration-300 touch-manipulation"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                      <span className="text-[#3f4816] text-3xl md:text-4xl lg:text-5xl font-black group-hover:text-[#d9fb06]/30 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#d9fb06]/10 flex items-center justify-center group-hover:bg-[#d9fb06]/20 transition-colors">
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#d9fb06]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-[#d9fb06] font-bold text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 group-hover:opacity-90 transition-opacity">
                        {t(service.title)}
                      </h3>
                      <p className="text-[#888680] text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl">
                        {t(service.intro).substring(0, 150)}...
                      </p>
                    </div>

                    {/* Arrow - Desktop */}
                    <div className="flex-shrink-0 hidden lg:block">
                      <div className="w-12 h-12 rounded-full bg-[#3f4816]/30 flex items-center justify-center group-hover:bg-[#d9fb06] transition-colors">
                        <ArrowUpRight className="w-5 h-5 text-[#d9fb06] group-hover:text-[#1a1c1b] transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Arrow */}
                  <div className="mt-4 lg:hidden flex items-center gap-2 text-[#d9fb06]/70 group-hover:text-[#d9fb06] transition-colors">
                    <span className="text-sm uppercase tracking-wider">
                      {language === 'en' ? 'Learn More' : '詳しく見る'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 md:mt-16 bg-[#d9fb06] p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-[#1a1c1b] font-bold text-xl md:text-2xl lg:text-3xl">
                  {language === 'en' ? 'Have a project in mind?' : 'プロジェクトのご相談はこちら'}
                </h3>
                <p className="mt-2 text-[#1a1c1b]/70 text-sm md:text-base">
                  {language === 'en' 
                    ? 'Let\'s discuss how we can help bring your vision to life in Japan.'
                    : '日本でのビジョン実現について、お気軽にご相談ください。'
                  }
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1c1b] text-[#d9fb06] px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform min-h-[48px] touch-manipulation self-start md:self-auto"
              >
                {content[language].hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
