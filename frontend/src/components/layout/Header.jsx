import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const CALENDLY_URL = 'https://calendly.com/jackson-streetshowproduction/discovery-meeting';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const nav = content[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/work', label: nav.work },
    { to: '/services', label: nav.services },
    { to: '/about', label: nav.about },
    { to: '/process', label: nav.process },
    { to: '/contact', label: nav.contact },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a1c1b]/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-[#d9fb06] font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            STREETSHOW
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-[#d9fb06]'
                    : 'text-[#d9fb06]/70 hover:text-[#d9fb06]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#d9fb06]/70 hover:text-[#d9fb06] transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'JP' : 'EN'}</span>
            </button>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d9fb06] text-[#1a1c1b] px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-tight hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              {content[language].hero.cta}
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-[#d9fb06]/70"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'JP' : 'EN'}</span>
            </button>
            
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-[#d9fb06]"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1c1b] border-[#3f4816] w-full max-w-sm">
                <div className="flex flex-col h-full pt-12">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 text-lg font-medium transition-colors ${
                          isActive(link.to)
                            ? 'text-[#d9fb06] bg-[#3f4816]/30'
                            : 'text-[#d9fb06]/70 hover:text-[#d9fb06] hover:bg-[#3f4816]/20'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full bg-[#d9fb06] text-[#1a1c1b] px-6 py-3 rounded-full text-center font-semibold uppercase tracking-tight"
                    >
                      {content[language].hero.cta}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
