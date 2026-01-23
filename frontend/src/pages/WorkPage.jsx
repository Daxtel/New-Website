import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content, projects } from '../data/mock';
import { useSEO } from '../hooks/useSEO';

// Project tile component with video hover support (matches FeaturedWork behavior)
const WorkProjectTile = ({ project, index, language, t }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const hasFeaturedImage = project.featuredImage?.url;
  const hasFeaturedVideo = project.featuredVideo?.url;

  // Handle hover-triggered video playback
  useEffect(() => {
    if (videoRef.current && hasFeaturedVideo) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, hasFeaturedVideo]);

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative bg-[#302f2c] overflow-hidden transition-all duration-300 hover:bg-[#3f4816]/30 touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Container */}
      <div className="aspect-[4/3] bg-[#3f4816]/20 relative overflow-hidden">
        {hasFeaturedVideo && !videoFailed ? (
          // Video tile (hover-triggered)
          <>
            <video
              ref={videoRef}
              src={project.featuredVideo.url}
              poster={project.featuredVideo.poster}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={project.featuredVideo.alt?.[language]}
              onError={handleVideoError}
            />
            {/* Poster fallback layer */}
            {project.featuredVideo.poster && (
              <img
                src={project.featuredVideo.poster}
                alt={project.featuredVideo.alt?.[language] || ''}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
                loading="lazy"
              />
            )}
          </>
        ) : hasFeaturedVideo && videoFailed && project.featuredVideo.poster ? (
          // Fallback to poster image if video fails
          <img
            src={project.featuredVideo.poster}
            alt={project.featuredVideo.alt?.[language] || ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : hasFeaturedImage ? (
          // Image tile
          <img
            src={project.featuredImage.url}
            alt={project.featuredImage.alt?.[language] || ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          // Fallback placeholder
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#d9fb06]/10 text-6xl md:text-8xl font-black">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#d9fb06]/0 group-hover:bg-[#d9fb06]/5 transition-colors duration-300" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[#888680] text-xs uppercase tracking-wider">
              {t(project.category)} · {project.year}
            </span>
            <h3 className="mt-2 text-[#d9fb06] font-semibold text-lg md:text-xl lg:text-2xl">
              {t(project.title)}
            </h3>
            <p className="mt-2 md:mt-3 text-[#888680] text-sm leading-relaxed line-clamp-2">
              {t(project.description)}
            </p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#3f4816]/30 flex items-center justify-center group-hover:bg-[#d9fb06] transition-colors">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#d9fb06] group-hover:text-[#1a1c1b] transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const WorkPage = () => {
  useSEO('work');
  const { language, t } = useLanguage();
  const pageContent = content[language].workPage;
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = pageContent.categories;
  
  const filteredProjects = activeFilter === 'All' || activeFilter === 'すべて'
    ? projects
    : projects.filter(p => t(p.category) === activeFilter);

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 lg:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-3xl mb-10 md:mb-12">
            <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {pageContent.title}
            </h1>
            <p className="mt-4 md:mt-6 text-[#888680] text-base md:text-lg lg:text-xl">
              {pageContent.subtitle}
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium uppercase tracking-wider transition-all min-h-[44px] touch-manipulation ${
                  activeFilter === cat
                    ? 'bg-[#d9fb06] text-[#1a1c1b]'
                    : 'border border-[#3f4816] text-[#888680] hover:border-[#d9fb06]/50 hover:text-[#d9fb06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {filteredProjects.map((project, index) => (
              <WorkProjectTile
                key={project.id}
                project={project}
                index={index}
                language={language}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkPage;
