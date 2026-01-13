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
      title: 'Creative Production Services for the Japan Market | Streetshow Productions',
      description: 'High-end creative production services for brands entering and growing in Japan. Video production, 3D anamorphic billboards, and Japan market localization.',
    },
    ja: {
      title: '日本市場向けクリエイティブ制作サービス｜Streetshow Productions',
      description: '日本市場に特化したクリエイティブ制作サービス。映像制作、3Dアナモルフィックビルボード、海外ブランド向けローカライズに対応。',
    },
  },
  '3d-anamorphic-billboards': {
    en: {
      title: '3D Anamorphic Billboard Production in Japan | Streetshow Productions',
      description: 'Naked-eye 3D billboard content designed for premium LED screens across Japan. Ideal for product launches, brand awareness, and market entry campaigns.',
    },
    ja: {
      title: '日本の3Dアナモルフィックビルボード制作｜Streetshow Productions',
      description: '日本国内の主要LEDビジョン向けネイキッドアイ3Dビルボード制作。新商品ローンチやブランド認知拡大に最適。',
    },
  },
  'video-production-japan': {
    en: {
      title: 'Video Production Company in Japan | Streetshow Productions',
      description: 'Commercials, brand films, and advertising videos produced in Japan. Culturally adapted video content for brands targeting the Japanese market.',
    },
    ja: {
      title: '日本の映像制作会社｜Streetshow Productions',
      description: '日本市場向けの広告映像、ブランドムービー、プロモーション動画制作。文化理解に基づくローカライズ対応。',
    },
  },
  'japan-market-localization': {
    en: {
      title: 'Japan Market Localization for Foreign Brands | Streetshow Productions',
      description: 'We localize global creative for Japan by adapting visuals, messaging, and creative direction to align with Japanese culture and consumer behavior.',
    },
    ja: {
      title: '海外ブランド向け 日本市場ローカライズ｜Streetshow Productions',
      description: '海外クリエイティブを日本市場向けに最適化。翻訳ではなく、文化理解に基づく表現設計を行います。',
    },
  },
  'commercial-photography-japan': {
    en: {
      title: 'Commercial & Product Photography in Japan | Streetshow Productions',
      description: 'High-end commercial and product photography in Japan for advertising, hospitality, lifestyle, and brand campaigns.',
    },
    ja: {
      title: '日本の商業写真・商品撮影｜Streetshow Productions',
      description: '広告・商品・ホテル・ライフスタイル向けの商業写真撮影を日本国内で提供。',
    },
  },
  '3d-cgi-production': {
    en: {
      title: '3D & CGI Advertising Production in Japan | Streetshow Productions',
      description: '3D product visualization, CGI commercials, and motion graphics for advertising campaigns across digital and outdoor media in Japan.',
    },
    ja: {
      title: '日本の3D・CGI広告制作｜Streetshow Productions',
      description: '3Dビジュアライゼーション、CGI広告映像、モーショングラフィックス制作に対応。',
    },
  },
  'hospitality-creative-strategy-japan': {
    en: {
      title: 'Hospitality Creative Strategy & Hotel Marketing in Japan | Streetshow Productions',
      description: 'Creative strategy, content production, and campaign planning for hotels and resorts in Japan. We help hospitality brands increase bookings, visibility, and ROI through high-end visuals and performance-driven creative.',
    },
    ja: {
      title: 'ホテル・宿泊施設向け クリエイティブ戦略・マーケティング｜Streetshow Productions',
      description: 'ホテル・リゾート向けのクリエイティブ戦略とコンテンツ制作。映像・写真・広告設計を通じて、集客・予約率・ROI向上を支援します。',
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

export const useSEO = (page = 'home') => {
  const { language } = useLanguage();

  useEffect(() => {
    const data = seoData[page]?.[language] || seoData.home[language];
    
    // Update document title
    document.title = data.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.description);
    }
    
    // Update meta title
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', data.title);
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', data.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', data.description);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', data.title);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', data.description);
    }
    
    // Update html lang attribute
    document.documentElement.lang = language;
    
  }, [language, page]);
};

export default useSEO;
