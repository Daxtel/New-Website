import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';

const EMAIL = 'admin@streetshowproduction.com';

const Footer = () => {
  const { language } = useLanguage();
  const footer = content[language].footer;

  return (
    <footer className="bg-[#1a1c1b] border-t border-[#3f4816]/50">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-[#d9fb06] font-bold text-xl md:text-2xl tracking-tight">
              STREETSHOW
            </Link>
            <p className="mt-3 md:mt-4 text-[#888680] text-sm md:text-base max-w-md">
              {footer.tagline}
            </p>
            <p className="mt-2 text-[#888680] text-sm md:text-base">
              {footer.locations}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#d9fb06] font-semibold mb-3 md:mb-4 uppercase text-xs md:text-sm tracking-wider">
              {language === 'en' ? 'Navigation' : 'ナビゲーション'}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/work" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
                {footer.links.work}
              </Link>
              <Link to="/services" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
                {footer.links.services}
              </Link>
              <Link to="/about" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
                {footer.links.about}
              </Link>
              <Link to="/contact" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
                {footer.links.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#d9fb06] font-semibold mb-4 uppercase text-sm tracking-wider">
              {language === 'en' ? 'Contact' : 'お問い合わせ'}
            </h4>
            <div className="flex flex-col gap-3 text-[#888680]">
              <span>Tokyo · Fukuoka</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#3f4816]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#888680] text-sm">
            {footer.copyright}
          </p>
          <a 
            href={`mailto:${EMAIL}`}
            className="text-[#888680]/70 text-sm hover:text-[#888680] transition-colors"
          >
            {language === 'en' ? 'Contact' : 'お問い合わせ'}: {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
