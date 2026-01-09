import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/mock';

const AboutPage = () => {
  const { language } = useLanguage();
  const about = content[language].about;
  const whyUs = content[language].whyUs;

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32 bg-[#1a1c1b]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="max-w-4xl mb-20">
            <h1 className="font-black text-[#d9fb06] text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight">
              {about.title}
            </h1>
            <p className="mt-8 text-[#d9fb06]/80 text-xl md:text-2xl leading-relaxed">
              {about.intro}
            </p>
            <p className="mt-6 text-[#888680] text-lg leading-relaxed">
              {about.mission}
            </p>
          </div>

          {/* Stats/Locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3f4816]/30 mb-20">
            <div className="bg-[#1a1c1b] p-8 md:p-12">
              <span className="text-[#d9fb06] font-black text-5xl md:text-6xl">2</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-sm">
                {language === 'en' ? 'Offices in Japan' : '日本の拠点'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70">Tokyo · Fukuoka</p>
            </div>
            <div className="bg-[#1a1c1b] p-8 md:p-12">
              <span className="text-[#d9fb06] font-black text-5xl md:text-6xl">100%</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-sm">
                {language === 'en' ? 'Bilingual Team' : 'バイリンガルチーム'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70">EN · JP</p>
            </div>
            <div className="bg-[#1a1c1b] p-8 md:p-12">
              <span className="text-[#d9fb06] font-black text-5xl md:text-6xl">E2E</span>
              <p className="mt-2 text-[#888680] uppercase tracking-wider text-sm">
                {language === 'en' ? 'Production Capability' : '制作体制'}
              </p>
              <p className="mt-1 text-[#d9fb06]/70">
                {language === 'en' ? 'Strategy to Delivery' : '戦略から納品まで'}
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="font-black text-[#d9fb06] text-3xl md:text-4xl uppercase tracking-tight mb-6">
              {about.team}
            </h2>
            <p className="text-[#888680] text-lg max-w-3xl leading-relaxed">
              {about.teamDescription}
            </p>
          </div>

          {/* Why Us Points */}
          <div className="border-t border-[#3f4816]/50 pt-16">
            <h2 className="font-black text-[#d9fb06] text-3xl md:text-4xl uppercase tracking-tight mb-12">
              {whyUs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyUs.points.map((point, idx) => (
                <div key={idx} className="border-l-2 border-[#d9fb06] pl-6">
                  <h3 className="text-[#d9fb06] font-semibold text-xl mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[#888680] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#d9fb06] text-[#1a1c1b] px-10 py-5 rounded-full font-semibold uppercase tracking-tight text-base hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              {content[language].hero.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
