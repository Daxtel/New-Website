import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Video, Globe, Camera, Layers, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/mock';

const iconMap = {
  cube: Box,
  video: Video,
  globe: Globe,
  camera: Camera,
  box: Layers,
};

const ServicesPage = () => {
  const { language } = useLanguage();
  const pageContent = content[language].servicesPage;
  const services = content[language].services;

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="font-black text-[#d9fb06] text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {pageContent.title}
            </h1>
            <p className="mt-6 text-[#888680] text-lg md:text-xl">
              {pageContent.subtitle}
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-px">
            {services.items.map((service, index) => {
              const Icon = iconMap[service.icon] || Box;
              return (
                <div
                  key={service.id}
                  className="bg-[#302f2c] p-8 md:p-12 group hover:bg-[#3f4816]/20 transition-colors duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <span className="text-[#3f4816] text-4xl md:text-5xl font-black">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-16 h-16 rounded-full bg-[#d9fb06]/10 flex items-center justify-center group-hover:bg-[#d9fb06]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[#d9fb06]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-[#d9fb06] font-bold text-2xl md:text-3xl mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[#888680] text-base md:text-lg leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#d9fb06] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-[#1a1c1b] font-bold text-2xl md:text-3xl">
                  {language === 'en' ? 'Have a project in mind?' : 'プロジェクトのご相談はこちら'}
                </h3>
                <p className="mt-2 text-[#1a1c1b]/70">
                  {language === 'en' 
                    ? 'Let\'s discuss how we can help bring your vision to life in Japan.'
                    : '日本でのビジョン実現について、お気軽にご相談ください。'
                  }
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1c1b] text-[#d9fb06] px-8 py-4 rounded-full font-semibold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform"
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
