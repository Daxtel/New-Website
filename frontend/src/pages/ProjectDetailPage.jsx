import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import HeroVideo from '../components/sections/HeroVideo';
import { useLanguage } from '../context/LanguageContext';
import { content, projects, servicesData } from '../data/mock';
import { useProjectSEO } from '../hooks/useSEO';

// Service anchor text mapping for internal linking
const serviceAnchorText = {
  '3d-anamorphic-billboards-japan': {
    en: '3D anamorphic billboard production in Japan',
    ja: '日本の3Dアナモルフィックビルボード制作'
  },
  '3d-anamorphic-billboards': {
    en: '3D anamorphic billboard production in Japan',
    ja: '日本の3Dアナモルフィックビルボード制作'
  },
  'video-production-japan': {
    en: 'video production company in Japan',
    ja: '日本の映像制作'
  },
  'japan-market-localization': {
    en: 'Japan market localization services',
    ja: '日本市場ローカライズ'
  },
  'photography-cgi-japan': {
    en: 'commercial photography & CGI in Japan',
    ja: '日本の商業写真・CGI制作'
  },
  'commercial-photography-japan': {
    en: 'commercial photography in Japan',
    ja: '日本の商業写真撮影'
  },
  '3d-cgi-production': {
    en: '3D & CGI production in Japan',
    ja: '日本の3D・CGI制作'
  },
  'hospitality-creative-strategy-japan': {
    en: 'hospitality creative strategy for hotels in Japan',
    ja: 'ホテル向け クリエイティブ戦略'
  }
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  
  const project = projects.find(p => p.slug === slug);
  
  // Apply dynamic SEO
  useProjectSEO(project);
  
  if (!project) {
    return (
      <Layout>
        <section className="pt-32 pb-24 bg-[#1a1c1b]">
          <div className="max-w-[87.5rem] mx-auto px-5 md:px-10 text-center">
            <h1 className="text-[#d9fb06] text-3xl font-bold mb-4">
              {language === 'en' ? 'Project not found' : 'プロジェクトが見つかりません'}
            </h1>
            <Link to="/work" className="text-[#d9fb06]/70 hover:text-[#d9fb06]">
              {language === 'en' ? 'Back to Work' : '制作実績に戻る'}
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  
  // Get related services data
  const relatedServicesData = (project.relatedServices || [])
    .map(slug => servicesData[slug])
    .filter(Boolean);

  // Get H1 and intro from SEO data or fallback
  const h1 = project.seo?.h1?.[language] || t(project.title);
  const intro = project.seo?.intro?.[language] || t(project.description);

  return (
    <Layout>
      {/* Hero Video Section - Only show if project has heroVideo */}
      {project.heroVideo && (
        <HeroVideo
          videoUrl={project.heroVideo.url}
          posterUrl={project.heroVideo.poster}
          posterAlt={project.heroVideo.alt[language]}
          aspectRatio="16/9"
          overlayStrength={0.5}
        >
          <div className="max-w-4xl">
            <span className="text-[#d9fb06]/70 text-sm uppercase tracking-wider mb-4 block">
              {t(project.category)} · {project.year}
            </span>
            <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.9] tracking-tight mb-6">
              {h1}
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed">
              {intro}
            </p>
          </div>
        </HeroVideo>
      )}

      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back to Work' : '制作実績に戻る'}
          </Link>

          {/* Project Header with SEO H1 - Only show if no hero video */}
          {!project.heroVideo && (
            <>
              <div className="mb-16">
                <span className="text-[#888680] text-sm uppercase tracking-wider">
                  {t(project.category)} · {project.year}
                </span>
                <h1 className="mt-4 font-black text-[#d9fb06] text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.9] tracking-tight max-w-4xl">
                  {h1}
                </h1>
              </div>

              {/* Intro Paragraph */}
              <div className="mb-16 max-w-3xl">
                <p className="text-[#d9fb06]/80 text-lg md:text-xl leading-relaxed">
                  {intro}
                </p>
              </div>
            </>
          )}

          {/* Main Image Placeholder - Hide if hero video exists */}
          {!project.heroVideo && (
            <div className="aspect-video bg-[#302f2c] mb-16 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#d9fb06]/10 text-9xl font-black">
                  {String(project.id).padStart(2, '0')}
                </span>
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left Column - Services Provided & Deliverables */}
            <div className="lg:col-span-2 space-y-12">
              {/* Services Provided */}
              {project.servicesProvided && (
                <div>
                  <h2 className="text-[#d9fb06] font-bold text-xl mb-6 uppercase tracking-wider">
                    {language === 'en' ? 'Services Provided' : '提供サービス'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {t(project.servicesProvided).map((service, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-[#302f2c] border border-[#3f4816]/30"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#d9fb06]/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#d9fb06]" />
                        </div>
                        <span className="text-[#d9fb06]/80 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables */}
              <div>
                <h2 className="text-[#d9fb06] font-bold text-xl mb-6 uppercase tracking-wider">
                  {language === 'en' ? 'Deliverables' : '納品物'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {t(project.deliverables).map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-[#3f4816]/30 text-[#d9fb06]/80 text-sm border border-[#3f4816]/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Focus */}
              {project.projectFocus && (
                <div>
                  <h2 className="text-[#d9fb06] font-bold text-xl mb-6 uppercase tracking-wider">
                    {language === 'en' ? 'Project Focus' : '目的 / フォーカス'}
                  </h2>
                  <ul className="space-y-3">
                    {t(project.projectFocus).map((focus, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#888680]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d9fb06] mt-2 flex-shrink-0" />
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Project Info & Related Services */}
            <div className="space-y-8">
              {/* Project Info Card */}
              <div className="bg-[#302f2c] border border-[#3f4816]/30 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[#888680] text-xs uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Client' : 'クライアント'}
                    </h3>
                    <p className="text-[#d9fb06] font-medium">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="text-[#888680] text-xs uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Year' : '年'}
                    </h3>
                    <p className="text-[#d9fb06] font-medium">{project.year}</p>
                  </div>
                  <div>
                    <h3 className="text-[#888680] text-xs uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Category' : 'カテゴリ'}
                    </h3>
                    <p className="text-[#d9fb06] font-medium">{t(project.category)}</p>
                  </div>
                  {project.seo?.location && (
                    <div>
                      <h3 className="text-[#888680] text-xs uppercase tracking-wider mb-1">
                        {language === 'en' ? 'Location' : 'ロケーション'}
                      </h3>
                      <p className="text-[#d9fb06] font-medium">{t(project.seo.location)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Services - Internal Links */}
              {relatedServicesData.length > 0 && (
                <div>
                  <h2 className="text-[#d9fb06] font-bold text-lg mb-4 uppercase tracking-wider">
                    {language === 'en' ? 'Related Services' : '関連サービス'}
                  </h2>
                  <div className="space-y-3">
                    {relatedServicesData.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="group flex items-center justify-between p-4 bg-[#302f2c] border border-[#3f4816]/30 hover:border-[#d9fb06]/30 transition-colors"
                      >
                        <span className="text-[#d9fb06]/80 group-hover:text-[#d9fb06] transition-colors text-sm">
                          {serviceAnchorText[service.slug]?.[language] || t(service.title)}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#d9fb06]/50 group-hover:text-[#d9fb06] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="aspect-[4/3] bg-[#302f2c]" />
            <div className="aspect-[4/3] bg-[#302f2c]" />
          </div>

          {/* CTA Section */}
          <div className="mb-16 bg-[#d9fb06] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-[#1a1c1b] font-bold text-2xl md:text-3xl">
                  {language === 'en' 
                    ? 'Interested in a similar project?' 
                    : '同様のプロジェクトにご興味がありますか？'
                  }
                </h2>
                <p className="mt-2 text-[#1a1c1b]/70">
                  {language === 'en'
                    ? 'Book a consultation to discuss your project needs.'
                    : 'プロジェクトのご要望についてご相談ください。'
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://calendly.com/jackson-streetshowproduction/discovery-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a1c1b] text-[#d9fb06] px-8 py-4 rounded-full font-semibold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform min-h-[48px] touch-manipulation"
                >
                  {language === 'en' ? 'Book a Consultation' : '無料相談を予約する'}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1a1c1b] text-[#1a1c1b] px-8 py-4 rounded-full font-semibold uppercase tracking-tight text-sm hover:bg-[#1a1c1b]/10 transition-colors min-h-[48px] touch-manipulation"
                >
                  {content[language].hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>

          {/* Next Project */}
          <div className="border-t border-[#3f4816]/50 pt-16">
            <span className="text-[#888680] text-sm uppercase tracking-wider">
              {language === 'en' ? 'Next Project' : '次のプロジェクト'}
            </span>
            <Link
              to={`/work/${nextProject.slug}`}
              className="mt-4 flex items-center justify-between group"
            >
              <h2 className="font-black text-[#d9fb06] text-2xl md:text-4xl uppercase tracking-tight group-hover:opacity-80 transition-opacity">
                {nextProject.seo?.h1?.[language] || t(nextProject.title)}
              </h2>
              <div className="w-14 h-14 rounded-full bg-[#d9fb06] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-[#1a1c1b]" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetailPage;
