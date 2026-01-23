import React, { useState, useEffect, useRef } from 'react';

const HeroVideo = ({ 
  videoUrl, 
  posterUrl, 
  posterAlt,
  aspectRatio = '16/9',
  overlayStrength = 0.4,
  children 
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay when video loads
    const playVideo = async () => {
      try {
        await video.play();
        setVideoLoaded(true);
      } catch (error) {
        console.log('Autoplay failed (expected on some browsers):', error);
        setPlayFailed(true);
      }
    };

    video.addEventListener('loadeddata', playVideo);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#1a1c1b] overflow-hidden">
      {/* Video Container with locked aspect ratio */}
      <div 
        className="relative w-full"
        style={{ aspectRatio }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterUrl}
          playsInline
          muted
          loop
          preload="metadata"
          aria-label={posterAlt}
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img src={posterUrl} alt={posterAlt} className="w-full h-full object-cover" />
        </video>

        {/* Dark Gradient Overlay for readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          style={{ opacity: overlayStrength }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[87.5rem] mx-auto px-5 md:px-10 py-16 md:py-24 lg:py-32">
            {children}
          </div>
        </div>

        {/* Subtle play indicator if autoplay failed (mobile) */}
        {playFailed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white/70 border-b-8 border-b-transparent ml-1" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroVideo;
