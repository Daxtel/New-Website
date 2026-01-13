import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/mock';
import { useSEO } from '../hooks/useSEO';

const ProcessPage = () => {
  useSEO('process');
  const { language } = useLanguage();
  const pageContent = content[language].processPage;
  const process = content[language].process;

  return (
    <Layout>
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 lg:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <h1 className="font-black text-[#d9fb06] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {pageContent.title}
            </h1>
            <p className="mt-4 md:mt-6 text-[#888680] text-base md:text-lg lg:text-xl">
              {pageContent.subtitle}
            </p>
          </div>

          {/* Process Steps - Detailed */}
          <div className="space-y-0">
            {process.steps.map((step, index) => (
              <div
                key={index}
                className={`border-t border-[#3f4816]/50 py-10 md:py-16 lg:py-20 ${
                  index === process.steps.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8 lg:gap-20">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="text-[#d9fb06] font-black text-5xl md:text-6xl lg:text-8xl leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow max-w-2xl">
                    <h3 className="text-[#d9fb06] font-bold text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#888680] text-base md:text-lg lg:text-xl leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Extended description based on step */}
                    <div className="mt-4 md:mt-6 text-[#888680]/80 text-sm md:text-base space-y-3">
                      {index === 0 && (
                        <p>
                          {language === 'en'
                            ? 'We start by deeply understanding your brand, objectives, and the specific nuances of reaching your target audience in Japan.'
                            : 'ブランド、目標、日本のターゲットオーディエンスにリーチするための具体的なニュアンスを深く理解することから始めます。'
                          }
                        </p>
                      )}
                      {index === 1 && (
                        <p>
                          {language === 'en'
                            ? 'Our strategy phase aligns creative direction with market positioning, ensuring your message resonates authentically with Japanese audiences.'
                            : '戦略フェーズでは、クリエイティブの方向性と市場ポジショニングを一致させ、日本のオーディエンスに本物の共感を生むメッセージを作ります。'
                          }
                        </p>
                      )}
                      {index === 2 && (
                        <p>
                          {language === 'en'
                            ? 'With our in-house team and trusted network across Japan, we execute every aspect of production to the highest standards.'
                            : '社内チームと日本全国の信頼できるネットワークを活用し、制作のあらゆる面を最高水準で実行します。'
                          }
                        </p>
                      )}
                      {index === 3 && (
                        <p>
                          {language === 'en'
                            ? 'We ensure smooth deployment across all channels and provide ongoing support to optimize performance.'
                            : '全チャネルへのスムーズな展開を保証し、パフォーマンス最適化のための継続的なサポートを提供します。'
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 bg-[#302f2c] p-6 md:p-10 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="font-black text-[#d9fb06] text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight">
                {language === 'en' ? 'Ready to Start?' : '始めましょう'}
              </h2>
              <p className="mt-3 md:mt-4 text-[#888680] text-base md:text-lg">
                {language === 'en'
                  ? 'Book a consultation to discuss your project and see how we can help.'
                  : 'プロジェクトについて相談し、どのようにお手伝いできるかご確認ください。'
                }
              </p>
              <Link
                to="/contact"
                className="mt-6 md:mt-8 inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-8 md:px-10 py-4 md:py-5 rounded-full font-semibold uppercase tracking-tight text-sm md:text-base hover:scale-[1.02] hover:opacity-90 transition-all min-h-[48px] touch-manipulation"
              >
                {content[language].hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessPage;
