import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Video, Globe, Camera, Layers, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const iconMap = {
  cube: Box,
  video: Video,
  globe: Globe,
  camera: Camera,
  box: Layers,
};

const Services = () => {
  const { language } = useLanguage();
  const services = content[language].services;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#302f2c]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight">
            {services.title}
          </h2>
          <p className="mt-6 text-[#888680] text-base md:text-lg lg:text-xl">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.items.map((service) => {
            const Icon = iconMap[service.icon] || Box;
            return (
              <div
                key={service.id}
                className="bg-[#1a1c1b] p-6 md:p-8 group hover:bg-[#3f4816]/20 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#d9fb06]/10 flex items-center justify-center group-hover:bg-[#d9fb06]/20 transition-colors mb-6">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#d9fb06]" />
                </div>

                {/* Content */}
                <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-[#888680] text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#d9fb06] hover:text-[#d9fb06]/80 transition-colors font-medium uppercase tracking-wider text-sm min-h-[44px] touch-manipulation"
          >
            {language === 'en' ? 'View All Services' : 'すべてのサービス'}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
