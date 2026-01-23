import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Box, Video, Globe, Camera, Layers, Hotel } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content, servicesData, projects } from '../data/mock';
import { useSEO } from '../hooks/useSEO';

const iconMap = {
  cube: Box,
  video: Video,
  globe: Globe,
  camera: Camera,
  box: Layers,
  hotel: Hotel,
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  
  // Apply SEO for this service page
  useSEO(slug);
  
  const service = servicesData[slug];
  
  // Redirect to services index if service not found
  if (!service) {
    return <Navigate to="/services" replace />;
  }
  
  const Icon = iconMap[service.icon] || Box;
  
  // Get related projects
  const relatedProjectsData = projects.filter(p => 
    service.relatedProjects?.includes(p.slug)
  );
  
  // Get related services
  const relatedServicesData = Object.values(servicesData).filter(s => 
    service.relatedServices?.includes(s.slug)
  );

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'All Services' : 'すべてのサービス'}
          </Link>

          {/* Service Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#d9fb06]/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#d9fb06]" />
                </div>
              </div>
              <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.85] tracking-tight">
                {service.seo?.h1 ? service.seo.h1[language] : t(service.title)}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-[#d9fb06]/90 text-2xl md:text-3xl font-semibold mb-4">
                {t(service.headline)}
              </h2>
              <p className="text-[#888680] text-lg leading-relaxed">
                {t(service.intro)}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* What We Deliver */}
            <div className="lg:col-span-2">
              <h3 className="text-[#d9fb06] font-bold text-xl mb-6 uppercase tracking-wider">
                {language === 'en' ? 'What We Deliver' : '提供内容'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t(service.features).map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-[#302f2c] border border-[#3f4816]/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#d9fb06]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#d9fb06]" />
                    </div>
                    <span className="text-[#d9fb06]/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal For */}
            <div>
              <h3 className="text-[#d9fb06] font-bold text-xl mb-6 uppercase tracking-wider">
                {language === 'en' ? 'Ideal For' : '最適な用途'}
              </h3>
              <div className="bg-[#302f2c] border border-[#3f4816]/30 p-6">
                <ul className="space-y-3">
                  {t(service.idealFor).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#888680]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d9fb06]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjectsData.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[#d9fb06] font-bold text-xl uppercase tracking-wider">
                  {language === 'en' ? 'Related Projects' : '関連プロジェクト'}
                </h3>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors text-sm"
                >
                  {language === 'en' ? 'View All Work' : 'すべて見る'}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjectsData.map((project) => (
                  <Link
                    key={project.id}
                    to={`/work/${project.slug}`}
                    className="group bg-[#302f2c] overflow-hidden hover:bg-[#3f4816]/30 transition-colors"
                  >
                    <div className="aspect-video bg-[#3f4816]/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#d9fb06]/10 text-6xl font-black">
                          {String(project.id).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-[#888680] text-xs uppercase tracking-wider">
                        {t(project.category)}
                      </span>
                      <h4 className="mt-2 text-[#d9fb06] font-semibold text-xl group-hover:opacity-80 transition-opacity">
                        {t(project.title)}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          {relatedServicesData.length > 0 && (
            <div className="mb-20">
              <h3 className="text-[#d9fb06] font-bold text-xl mb-8 uppercase tracking-wider">
                {language === 'en' ? 'Related Services' : '関連サービス'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedServicesData.map((relatedService) => {
                  const RelatedIcon = iconMap[relatedService.icon] || Box;
                  return (
                    <Link
                      key={relatedService.slug}
                      to={`/services/${relatedService.slug}`}
                      className="group flex items-start gap-4 p-6 bg-[#302f2c] border border-[#3f4816]/30 hover:border-[#d9fb06]/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#d9fb06]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d9fb06]/20 transition-colors">
                        <RelatedIcon className="w-6 h-6 text-[#d9fb06]" />
                      </div>
                      <div>
                        <h4 className="text-[#d9fb06] font-semibold text-lg group-hover:opacity-80 transition-opacity">
                          {t(relatedService.title)}
                        </h4>
                        <p className="mt-1 text-[#888680] text-sm line-clamp-2">
                          {t(relatedService.intro).substring(0, 100)}...
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#d9fb06]/50 group-hover:text-[#d9fb06] transition-colors flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-[#d9fb06] p-10 md:p-16">
            <div className="max-w-3xl">
              <h2 className="font-black text-[#1a1c1b] text-3xl md:text-4xl uppercase tracking-tight">
                {language === 'en' 
                  ? `Ready to discuss your ${t(service.title).toLowerCase()} project?`
                  : `${t(service.title)}のプロジェクトについてご相談ください`
                }
              </h2>
              <p className="mt-4 text-[#1a1c1b]/70 text-lg">
                {language === 'en'
                  ? 'Book a consultation to explore how we can help bring your vision to life in Japan.'
                  : '日本でのビジョン実現について、お気軽にご相談ください。'
                }
              </p>
              <a
                href="https://calendly.com/jackson-streetshowproduction/discovery-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 bg-[#1a1c1b] text-[#d9fb06] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] transition-transform"
              >
                {language === 'en' ? 'Book a Consultation' : '無料相談を予約する'}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetailPage;
