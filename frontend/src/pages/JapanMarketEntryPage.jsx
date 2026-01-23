import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import HeroVideo from '../components/sections/HeroVideo';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';

const CALENDLY_URL = 'https://calendly.com/jackson-streetshowproduction/discovery-meeting';
const VIDEO_URL = 'https://customer-assets.emergentagent.com/job_streetshow-preview/artifacts/ybfqoebd_streetshow-japan-market-localization-hero.mp4';

const JapanMarketEntryPage = () => {
  useSEO('japan-market-localization');
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: 'Japan Market Entry & Localization',
        subtitle: 'Strategy-first creative production for brands entering or scaling in the Japanese market.',
        cta: 'Book a Consultation',
        posterAlt: 'Japan market entry and localization campaign execution by Streetshow Productions'
      },
      approach: {
        title: 'Our Approach',
        intro: 'We don't just translate—we adapt. Our localization service transforms global campaigns into culturally resonant content that connects with Japanese audiences while maintaining brand consistency.',
        points: [
          {
            title: 'Cultural Strategy First',
            description: 'Deep market research and cultural consulting before any creative execution.'
          },
          {
            title: 'Creative Adaptation',
            description: 'Transcreation and visual localization tailored for Japanese consumer behavior.'
          },
          {
            title: 'End-to-End Execution',
            description: 'From strategy development to media placement and campaign optimization in Japan.'
          }
        ]
      },
      services: {
        title: 'What We Deliver',
        list: [
          'Market research and competitive analysis',
          'Cultural consulting and brand positioning',
          'Creative adaptation and transcreation',
          'Visual and messaging localization',
          'Media strategy for Japan',
          'Campaign execution and optimization'
        ]
      }
    },
    ja: {
      hero: {
        title: '日本市場参入・ローカライズ支援',
        subtitle: '日本市場への参入・拡大を目指すブランドのための、戦略主導型クリエイティブ制作。',
        cta: '無料相談を予約する',
        posterAlt: 'Streetshow Productionsによる日本市場向けローカライズ施策の制作・実行'
      },
      approach: {
        title: '私たちのアプローチ',
        intro: '私たちは単なる翻訳ではなく、アダプテーションを行います。ローカライズサービスでは、グローバルキャンペーンをブランドの一貫性を保ちながら、日本のオーディエンスに響くコンテンツへと変換します。',
        points: [
          {
            title: '文化戦略を最優先',
            description: 'クリエイティブ実行の前に、詳細な市場調査と文化コンサルティングを実施。'
          },
          {
            title: 'クリエイティブアダプテーション',
            description: '日本の消費者行動に合わせたトランスクリエーションとビジュアルローカライズ。'
          },
          {
            title: 'エンドツーエンド実行',
            description: '戦略立案から日本でのメディア展開、キャンペーン最適化まで一貫対応。'
          }
        ]
      },
      services: {
        title: '提供サービス',
        list: [
          '市場調査・競合分析',
          '文化コンサルティング・ブランドポジショニング',
          'クリエイティブアダプテーション・トランスクリエーション',
          'ビジュアル・メッセージングのローカライズ',
          '日本向けメディア戦略',
          'キャンペーン実行・最適化'
        ]
      }
    }
  };

  const pageContent = content[language];

  return (
    <Layout>
      {/* Hero Video Section */}
      <HeroVideo
        videoUrl={VIDEO_URL}
        posterUrl={VIDEO_URL.replace('.mp4', '-poster.webp')} // Poster will be added later
        posterAlt={pageContent.hero.posterAlt}
        aspectRatio="16/9"
        overlayStrength={0.5}
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.9] tracking-tight mb-6">
            {pageContent.hero.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 leading-relaxed">
            {pageContent.hero.subtitle}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all min-h-[48px] touch-manipulation"
          >
            {pageContent.hero.cta}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </HeroVideo>

      {/* Approach Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight mb-8">
            {pageContent.approach.title}
          </h2>
          <p className="text-[#888680] text-lg md:text-xl mb-12 md:mb-16 max-w-3xl">
            {pageContent.approach.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {pageContent.approach.points.map((point, idx) => (
              <div key={idx} className="bg-[#302f2c] p-6 md:p-8">
                <h3 className="text-[#d9fb06] font-bold text-xl md:text-2xl mb-4">
                  {point.title}
                </h3>
                <p className="text-[#888680] text-base leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#302f2c]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h2 className="font-black text-[#d9fb06] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.85] tracking-tight mb-12">
            {pageContent.services.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
            {pageContent.services.list.map((service, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d9fb06] flex-shrink-0 mt-1" />
                <span className="text-[#888680] text-base md:text-lg">{service}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 md:mt-16">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all min-h-[48px] touch-manipulation"
            >
              {pageContent.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JapanMarketEntryPage;
