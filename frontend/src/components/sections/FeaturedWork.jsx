import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content, projects } from '../../data/mock';

const FeaturedWork = () => {
  const { language, t } = useLanguage();
  const section = content[language].featuredWork;
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#1a1c1b]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight">
            {section.title}
          </h2>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[#d9fb06]/70 hover:text-[#d9fb06] transition-colors text-sm font-medium uppercase tracking-wider self-start sm:self-auto"
          >
            {language === 'en' ? 'View All Work' : 'すべて見る'}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featuredProjects.map((project, index) => (
            <FeaturedWorkTile 
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
  );
};

// Separate component for each tile to handle video refs properly
const FeaturedWorkTile = ({ project, index, language, t }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const hasFeaturedImage = project.featuredImage?.url;
  const hasFeaturedVideo = project.featuredVideo?.url;
  const isAutoplayVideo = hasFeaturedVideo && project.featuredVideo?.autoplay;
  const isHoverVideo = hasFeaturedVideo && !project.featuredVideo?.autoplay;

  // Handle hover-triggered video playback
  useEffect(() => {
    if (videoRef.current && isHoverVideo) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isHoverVideo]);

  // Handle autoplay video
  useEffect(() => {
    if (videoRef.current && isAutoplayVideo) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay failed, show poster image
          setVideoFailed(true);
        });
      }
    }
  }, [isAutoplayVideo]);

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
          // Video tile (autoplay or hover-triggered)
          <>
            <video
              ref={videoRef}
              src={project.featuredVideo.url}
              poster={project.featuredVideo.poster}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload={isAutoplayVideo ? "none" : "metadata"}
              aria-label={project.featuredVideo.alt[language]}
              onError={handleVideoError}
              autoPlay={isAutoplayVideo}
            />
            {/* Poster fallback for autoplay videos */}
            {isAutoplayVideo && project.featuredVideo.poster && (
              <img
                src={project.featuredVideo.poster}
                alt={project.featuredVideo.alt[language]}
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
            alt={project.featuredVideo.alt[language]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : hasFeaturedImage ? (
          // Image tile
          <img
            src={project.featuredImage.url}
            alt={project.featuredImage.alt[language]}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          // Fallback placeholder
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#d9fb06]/20 text-5xl md:text-6xl font-black">
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
      <div className="p-5 md:p-6">
        <span className="text-[#888680] text-xs uppercase tracking-wider">
          {project.tags ? project.tags[language] : t(project.category)}
        </span>
        <h3 className="mt-2 text-[#d9fb06] font-semibold text-lg md:text-xl group-hover:text-[#d9fb06] transition-colors">
          {typeof project.title === 'object' ? project.title[language] : t(project.title)}
        </h3>
        <p className="mt-2 text-[#888680] text-sm leading-relaxed line-clamp-2">
          {typeof project.description === 'object' ? project.description[language] : t(project.description)}
        </p>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-2 text-[#d9fb06]/60 group-hover:text-[#d9fb06] transition-colors">
          <span className="text-xs uppercase tracking-wider">
            {language === 'en' ? 'View Project' : '詳細を見る'}
          </span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedWork;
