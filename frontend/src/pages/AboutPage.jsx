import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content, projects, servicesData } from '../data/mock';
import { useSEO } from '../hooks/useSEO';

// About page media assets
const aboutMedia = {
  hero: {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=85&w=1600',
    alt: { en: 'Modern creative studio workspace', ja: 'モダンなクリエイティブスタジオワークスペース' }
  },
  team: {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=85&w=1200',
    alt: { en: 'Collaborative team environment', ja: 'コラボレーティブなチーム環境' }
  },
  process: {
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=85&w=1200',
    alt: { en: 'Strategic planning and production process', ja: '戦略立案と制作プロセス' }
  }
};

// Featured services to link
const featuredServiceSlugs = ['video-production-japan', 'japan-market-localization', '3d-anamorphic-billboards-japan'];

// Featured project slugs to showcase
const featuredProjectSlugs = ['shibuya-3d-anamorphic-billboard', 'tokyo-luxury-brand-video-campaign', 'japan-market-localization-campaign'];

const AboutPage = () => {
  useSEO('about');
  const { language } = useLanguage();
  const about = content[language].about;
  const whyUs = content[language].whyUs;

  // Get featured projects data
  const featuredProjects = projects.filter(p => featuredProjectSlugs.includes(p.slug));
  
  // Get featured services data
  const featuredServices = featuredServiceSlugs
    .map(slug => servicesData[slug])
    .filter(Boolean);

  // Helper to get localized text
  const t = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || '';
  };

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 lg:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          
          {/* Hero Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.85] tracking-tight">
                {about.title}
              </h1>
              <p className="mt-6 md:mt-8 text-[#d9fb06]/80 text-lg md:text-xl lg:text-2xl leading-relaxed">
                {about.intro}
              </p>
              <p className="mt-4 md:mt-6 text-[#888680] text-base md:text-lg leading-relaxed">
                {about.mission}
              </p>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={aboutMedia.hero.url}
                alt={aboutMedia.hero.alt[language]}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Stats/Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#3f4816]/30 mb-16 md:mb-20">
            <div className="bg-[#1a1c1b] p-6 md:p-8 lg:p-12">
              <span className="text-[#d9fb06] font-black text-4xl md:text-5xl lg:text-6xl">2</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-xs md:text-sm">
                {language === 'en' ? 'Offices in Japan' : '日本の拠点'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70 text-sm md:text-base">Tokyo · Fukuoka</p>
            </div>
            <div className="bg-[#1a1c1b] p-6 md:p-8 lg:p-12">
              <span className="text-[#d9fb06] font-black text-4xl md:text-5xl lg:text-6xl">100%</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-xs md:text-sm">
                {language === 'en' ? 'Bilingual Team' : 'バイリンガルチーム'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70 text-sm md:text-base">EN · JP</p>
            </div>
            <div className="bg-[#1a1c1b] p-6 md:p-8 lg:p-12">
              <span className="text-[#d9fb06] font-black text-4xl md:text-5xl lg:text-6xl">E2E</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-xs md:text-sm">
                {language === 'en' ? 'Production Capability' : '制作体制'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70 text-sm md:text-base">
                {language === 'en' ? 'Strategy to Delivery' : '戦略から納品まで'}
              </p>
            </div>
          </div>

          {/* Team Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20">
            <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
              <img
                src={aboutMedia.team.url}
                alt={aboutMedia.team.alt[language]}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1b]/30 via-transparent to-transparent" />
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="font-black text-[#d9fb06] text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight mb-4 md:mb-6">
                {about.team}
              </h2>
              <p className="text-[#888680] text-base md:text-lg leading-relaxed mb-6">
                {about.teamDescription}
              </p>
              <p className="text-[#888680] text-sm md:text-base leading-relaxed">
                {whyUs.credibility}
              </p>
            </div>
          </div>

          {/* Why Us Pillars */}
          <div className="border-t border-[#3f4816]/50 pt-12 md:pt-16 mb-16 md:mb-20">
            <h2 className="font-black text-[#d9fb06] text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight mb-4 md:mb-6">
              {whyUs.title}
            </h2>
            <p className="text-[#888680] text-base md:text-lg max-w-3xl leading-relaxed mb-10 md:mb-12">
              {whyUs.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {whyUs.pillars && whyUs.pillars.map((pillar, idx) => (
                <div key={idx} className="border-l-2 border-[#d9fb06] pl-4 md:pl-6 py-2">
                  <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[#888680] text-sm md:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For Section */}
          <div className="bg-[#302f2c] p-8 md:p-12 mb-16 md:mb-20">
            <h3 className="text-[#d9fb06] font-bold text-xl md:text-2xl mb-6">
              {whyUs.idealFor?.title}
            </h3>
            <ul className="space-y-3">
              {whyUs.idealFor?.points?.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#888680]">
                  <span className="text-[#d9fb06] mt-1">•</span>
                  <span className="text-base md:text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Services Section with Links */}
          <div className="border-t border-[#3f4816]/50 pt-12 md:pt-16 mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h2 className="font-black text-[#d9fb06] text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight">
                {language === 'en' ? 'Our Services' : 'サービス'}
              </h2>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors text-sm"
              >
                {language === 'en' ? 'View All Services' : 'すべてのサービス'}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-[#302f2c] p-6 md:p-8 hover:bg-[#3f4816]/30 transition-colors"
                >
                  <h3 className="text-[#d9fb06] font-semibold text-lg md:text-xl mb-3 group-hover:opacity-80 transition-opacity">
                    {t(service.title)}
                  </h3>
                  <p className="text-[#888680] text-sm leading-relaxed line-clamp-3">
                    {t(service.intro)?.substring(0, 150)}...
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-[#d9fb06] text-sm group-hover:gap-2 transition-all">
                    {language === 'en' ? 'Learn More' : '詳しく見る'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Projects Section with Links */}
          <div className="border-t border-[#3f4816]/50 pt-12 md:pt-16 mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h2 className="font-black text-[#d9fb06] text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight">
                {language === 'en' ? 'Featured Work' : '主要プロジェクト'}
              </h2>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors text-sm"
              >
                {language === 'en' ? 'View All Work' : 'すべての実績'}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => {
                const hasFeaturedImage = project.featuredImage?.url;
                const hasFeaturedVideo = project.featuredVideo?.url;
                const posterImage = project.featuredVideo?.poster;
                
                return (
                  <Link
                    key={project.id}
                    to={`/work/${project.slug}`}
                    className="group bg-[#302f2c] overflow-hidden hover:bg-[#3f4816]/30 transition-colors"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      {hasFeaturedImage ? (
                        <img
                          src={project.featuredImage.url}
                          alt={project.featuredImage.alt?.[language] || t(project.title)}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : hasFeaturedVideo && posterImage ? (
                        <img
                          src={posterImage}
                          alt={project.featuredVideo.alt?.[language] || t(project.title)}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#3f4816]/20">
                          <span className="text-[#d9fb06]/10 text-4xl font-black">
                            {String(project.id).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-[#888680] text-xs uppercase tracking-wider">
                        {t(project.category)}
                      </span>
                      <h3 className="mt-2 text-[#d9fb06] font-semibold text-lg group-hover:opacity-80 transition-opacity">
                        {t(project.title)}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 md:mt-20 text-center">
            <p className="text-[#888680] text-base md:text-lg mb-6">
              {whyUs.cta || (language === 'en' ? "Let's discuss your project" : 'まずはご相談ください')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              {content[language].hero.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
