import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content, projects, servicesData } from '../data/mock';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  
  const project = projects.find(p => p.slug === slug);
  
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
  
  // Get related service
  const relatedService = project.serviceSlug ? servicesData[project.serviceSlug] : null;

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Back Link */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[#888680] hover:text-[#d9fb06] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back to Work' : '制作実績に戻る'}
          </Link>

          {/* Project Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="text-[#888680] text-sm uppercase tracking-wider">
                {t(project.category)} · {project.year}
              </span>
              <h1 className="mt-4 font-black text-[#d9fb06] text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.85] tracking-tight">
                {t(project.title)}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-[#d9fb06]/80 text-lg md:text-xl leading-relaxed">
                {t(project.description)}
              </p>
            </div>
          </div>

          {/* Main Image Placeholder */}
          <div className="aspect-video bg-[#302f2c] mb-16 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#d9fb06]/10 text-9xl font-black">
                {String(project.id).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="border-l-2 border-[#d9fb06] pl-6">
              <h3 className="text-[#888680] text-sm uppercase tracking-wider mb-2">
                {language === 'en' ? 'Client' : 'クライアント'}
              </h3>
              <p className="text-[#d9fb06] font-medium">{project.client}</p>
            </div>
            <div className="border-l-2 border-[#d9fb06] pl-6">
              <h3 className="text-[#888680] text-sm uppercase tracking-wider mb-2">
                {language === 'en' ? 'Year' : '年'}
              </h3>
              <p className="text-[#d9fb06] font-medium">{project.year}</p>
            </div>
            <div className="border-l-2 border-[#d9fb06] pl-6">
              <h3 className="text-[#888680] text-sm uppercase tracking-wider mb-2">
                {language === 'en' ? 'Deliverables' : '納品物'}
              </h3>
              <p className="text-[#d9fb06] font-medium">
                {t(project.deliverables).join(', ')}
              </p>
            </div>
            {relatedService && (
              <div className="border-l-2 border-[#d9fb06] pl-6">
                <h3 className="text-[#888680] text-sm uppercase tracking-wider mb-2">
                  {language === 'en' ? 'Service' : 'サービス'}
                </h3>
                <Link 
                  to={`/services/${project.serviceSlug}`}
                  className="text-[#d9fb06] font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                >
                  {t(relatedService.title)}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Gallery Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="aspect-[4/3] bg-[#302f2c]" />
            <div className="aspect-[4/3] bg-[#302f2c]" />
          </div>

          {/* Related Service CTA */}
          {relatedService && (
            <div className="mb-16 bg-[#302f2c] p-8 md:p-10 border border-[#3f4816]/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <span className="text-[#888680] text-sm uppercase tracking-wider">
                    {language === 'en' ? 'Related Service' : '関連サービス'}
                  </span>
                  <h3 className="mt-2 text-[#d9fb06] font-bold text-xl md:text-2xl">
                    {t(relatedService.title)}
                  </h3>
                  <p className="mt-2 text-[#888680] max-w-xl">
                    {t(relatedService.intro).substring(0, 120)}...
                  </p>
                </div>
                <Link
                  to={`/services/${project.serviceSlug}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#d9fb06] text-[#1a1c1b] px-6 py-3 rounded-full font-semibold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform flex-shrink-0"
                >
                  {language === 'en' ? 'Learn More' : '詳しく見る'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Next Project */}
          <div className="border-t border-[#3f4816]/50 pt-16">
            <span className="text-[#888680] text-sm uppercase tracking-wider">
              {language === 'en' ? 'Next Project' : '次のプロジェクト'}
            </span>
            <Link
              to={`/work/${nextProject.slug}`}
              className="mt-4 flex items-center justify-between group"
            >
              <h2 className="font-black text-[#d9fb06] text-3xl md:text-4xl uppercase tracking-tight group-hover:opacity-80 transition-opacity">
                {t(nextProject.title)}
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
