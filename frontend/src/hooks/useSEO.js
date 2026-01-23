import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const seoData = {
  home: {
    en: {
      title: 'Streetshow Productions | Creative Production & 3D Billboards in Japan',
      description: 'Strategy-first creative production in Tokyo & Fukuoka. High-end video, 3D anamorphic billboards, and Japan market localization for brands entering and growing in Japan. Book a consultation.',
    },
    ja: {
      title: 'Streetshow Productions｜日本向け映像制作・3Dビルボード制作',
      description: '東京・福岡拠点のクリエイティブプロダクション。映像制作、ネイキッドアイ3D（3Dアナモルフィック）ビルボード、日本市場ローカライズまで戦略から一貫対応。無料相談受付中。',
    },
  },
  work: {
    en: {
      title: 'Our Work | Streetshow Productions',
      description: 'Selected projects across video production, 3D anamorphic billboards, CGI, and Japan market localization. View our portfolio of high-end creative production.',
    },
    ja: {
      title: '制作実績｜Streetshow Productions',
      description: '映像制作、3Dアナモルフィックビルボード、CGI、日本市場ローカライズの厳選プロジェクト。ハイエンドなクリエイティブ制作の実績をご覧ください。',
    },
  },
  services: {
    en: {
      title: 'Creative Production & Japan Market Localization | Streetshow Productions',
      description: 'Strategy-first creative production studio in Japan. High-end video, 3D anamorphic billboards, hospitality campaigns, and market localization for global brands.',
    },
    ja: {
      title: '日本市場向けクリエイティブ制作・ローカライズ｜Streetshow Productions',
      description: '日本市場に特化した戦略主導型クリエイティブ制作スタジオ。映像制作、3Dアナモルフィックビルボード、ホテル向け施策、海外ブランドのローカライズに対応。',
    },
  },
  '3d-anamorphic-billboards-japan': {
    en: {
      title: '3D Anamorphic Billboard Production in Japan | Streetshow Productions',
      description: 'Premium 3D anamorphic billboard production for high-traffic locations across Japan. Concept, 3D design, and delivery handled end-to-end.',
    },
    ja: {
      title: '日本の3Dアナモルフィックビルボード制作｜Streetshow Productions',
      description: '日本各地の主要ロケーション向け3Dアナモルフィックビルボード制作。企画・3D設計から納品まで一貫対応。',
    },
  },
  'video-production-japan': {
    en: {
      title: 'Video Production Company in Japan | Commercial & Brand Films',
      description: 'High-end video production in Japan for commercials, brand campaigns, and launches. Full production support for local and international teams.',
    },
    ja: {
      title: '日本の映像制作会社｜CM・ブランド映像制作',
      description: '日本国内でのCM・ブランドキャンペーン映像制作。海外チームとの連携を含め、企画から撮影・編集まで対応。',
    },
  },
  'japan-market-localization': {
    en: {
      title: 'Japan Market Localization for Global Brands | Streetshow Productions',
      description: 'Adapt global campaigns for Japanese audiences. Cultural consulting, creative direction, and localized execution for brands entering Japan.',
    },
    ja: {
      title: '海外ブランド向け 日本市場ローカライズ支援｜Streetshow Productions',
      description: '海外ブランドの日本市場参入・展開を支援。文化理解に基づいたローカライズ設計とクリエイティブ実行を提供。',
    },
  },
  'photography-cgi-japan': {
    en: {
      title: 'Commercial Photography & CGI in Japan | Streetshow Productions',
      description: 'High-end commercial photography and CGI visuals for advertising, digital, and OOH use across Japan.',
    },
    ja: {
      title: '日本の商業写真・CGI制作｜Streetshow Productions',
      description: '広告・デジタル・OOH向けの高品質な商業写真およびCGIビジュアルを日本国内で制作。',
    },
  },
  'hospitality-creative-strategy-japan': {
    en: {
      title: 'Hospitality Creative Strategy for Hotels in Japan | Streetshow Productions',
      description: 'Creative strategy and content production for hotels and resorts in Japan. Increase bookings, brand value, and guest engagement.',
    },
    ja: {
      title: '日本のホテル向けクリエイティブ戦略・映像制作｜Streetshow Productions',
      description: '日本のホテル・リゾート向けに、集客・予約率・ブランド価値向上を目的としたクリエイティブ戦略と映像制作を提供。',
    },
  },
  about: {
    en: {
      title: 'About Us | Streetshow Productions',
      description: 'Strategy-first creative production studio based in Tokyo & Fukuoka. Bilingual team specializing in high-end video, 3D billboards, and Japan market localization.',
    },
    ja: {
      title: '会社概要｜Streetshow Productions',
      description: '東京・福岡拠点の戦略重視クリエイティブプロダクションスタジオ。映像制作、3Dビルボード、日本市場ローカライズを専門とするバイリンガルチーム。',
    },
  },
  process: {
    en: {
      title: 'Our Process | Streetshow Productions',
      description: 'A clear, collaborative process from brief to delivery. Discovery, strategy, production, and launch - end-to-end creative production in Japan.',
    },
    ja: {
      title: '制作フロー｜Streetshow Productions',
      description: 'ブリーフから納品まで、明確で協働的なプロセス。ヒアリング、戦略立案、制作、ローンチまで一貫対応。',
    },
  },
  contact: {
    en: {
      title: 'Contact | Streetshow Productions',
      description: 'Book a consultation or get in touch. We respond within 24 hours. Creative production studio in Tokyo & Fukuoka, Japan.',
    },
    ja: {
      title: 'お問い合わせ｜Streetshow Productions',
      description: '無料相談のご予約、またはお問い合わせはこちら。24時間以内にご返信いたします。東京・福岡拠点のクリエイティブプロダクションスタジオ。',
    },
  },
};

// Hook for static pages
export const useSEO = (page = 'home') => {
  const { language } = useLanguage();

  useEffect(() => {
    const data = seoData[page]?.[language] || seoData.home[language];
    updateMetaTags(data.title, data.description, language);
  }, [language, page]);
};

// Hook for dynamic project pages
export const useProjectSEO = (project) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (!project?.seo) return;
    
    const seo = project.seo;
    const title = seo.metaTitle?.[language] || `${project.title?.[language]} | Streetshow Productions`;
    const description = seo.metaDescription?.[language] || project.description?.[language];
    
    updateMetaTags(title, description, language);
    
    // Add CreativeWork schema markup
    addProjectSchema(project, language);
    
  }, [language, project]);
};

// Helper function to update meta tags
const updateMetaTags = (title, description, language) => {
  // Update document title
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta title
  const metaTitle = document.querySelector('meta[name="title"]');
  if (metaTitle) {
    metaTitle.setAttribute('content', title);
  }
  
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title);
  }
  
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description);
  }
  
  // Update html lang attribute
  document.documentElement.lang = language;
};

// Helper function to add CreativeWork schema markup
const addProjectSchema = (project, language) => {
  // Remove existing schema if present
  const existingSchema = document.querySelector('script[data-schema="project"]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  if (!project) return;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.seo?.h1?.[language] || project.title?.[language],
    description: project.seo?.metaDescription?.[language] || project.description?.[language],
    creator: {
      '@type': 'Organization',
      name: 'Streetshow Productions',
      url: 'https://streetshow.jp'
    },
    locationCreated: {
      '@type': 'Place',
      name: project.seo?.location?.[language] || 'Japan'
    },
    dateCreated: project.year,
    genre: project.category?.[language],
    keywords: project.seo?.projectType?.[language]
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'project');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export default useSEO;