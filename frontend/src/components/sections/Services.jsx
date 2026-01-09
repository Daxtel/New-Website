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
  const section = content[language].services;

  return (
    <section className="py-24 md:py-32 bg-[#302f2c]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.85] tracking-tight">
            {section.title}
          </h2>
          <p className="mt-6 text-[#d9fb06]/70 text-lg md:text-xl leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3f4816]/30">
          {section.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Box;
            return (
              <div
                key={service.id}
                className="bg-[#302f2c] p-8 md:p-10 group hover:bg-[#3f4816]/20 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#d9fb06]/10 flex items-center justify-center group-hover:bg-[#d9fb06]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#d9fb06]" />
                  </div>
                  <span className="text-[#3f4816] text-4xl font-black">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[#d9fb06] font-semibold text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-[#888680] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
          {/* CTA Card */}
          <Link
            to="/services"
            className="bg-[#d9fb06] p-8 md:p-10 flex flex-col justify-between group hover:bg-[#d9fb06]/90 transition-colors"
          >
            <div className="text-[#1a1c1b] font-black text-2xl md:text-3xl uppercase leading-tight">
              {language === 'en' ? 'Explore All Services' : 'すべてのサービスを見る'}
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#1a1c1b]">
              <span className="text-sm font-semibold uppercase tracking-wider">
                {language === 'en' ? 'Learn More' : '詳しく見る'}
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
