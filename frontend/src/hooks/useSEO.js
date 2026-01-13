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
      title: 'Services | Streetshow Productions',
      description: 'Full-service creative production for the Japan market. 3D anamorphic billboards, video production, Japan market localization, photography, and CGI.',
    },
    ja: {
      title: 'サービス｜Streetshow Productions',
      description: '日本市場向けフルサービスのクリエイティブ制作。3Dアナモルフィックビルボード、映像制作、日本市場ローカライズ、フォトグラフィー、CGI。',
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
