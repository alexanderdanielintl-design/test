import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateToVehicles: () => void;
  onNavigateToContact: (preferredVehicle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onNavigateToVehicles,
  onNavigateToContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update html lang attribute dynamically for SEO and screen readers
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-neutral-300 py-2.5 sm:py-3'
            : 'bg-white border-b border-neutral-200 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 min-[380px]:gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark (Responsive text sizing from 280px up) */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="text-base min-[360px]:text-lg md:text-xl font-extrabold tracking-tight text-neutral-950 truncate shrink group flex items-center gap-1.5 min-[380px]:gap-2 min-h-[44px]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB0A1E] inline-block shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <span className="truncate">Wendy Goodridge</span>
            </a>

            {/* Zone 2: Navigation Links (hidden below md, comfortable spacing on lg/xl) */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-7 text-xs lg:text-sm font-semibold text-neutral-700 shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.home}
              </a>
              <a
                href="#vehicles"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('vehicles');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.vehicles}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.about}
              </a>
              <a
                href="#why-wendy"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('why-wendy');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.whyWendy}
              </a>
              <a
                href="#tiktok"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('tiktok');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.tiktok}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {t.contact}
              </a>
            </nav>

            {/* Zone 3: Actions (Language toggle + Primary Red CTA) */}
            <div className="flex items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3 shrink-0">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
                aria-label={`Switch language to ${language === 'en' ? 'Spanish' : 'English'}`}
                className="min-h-[44px] flex items-center gap-1 min-[380px]:gap-1.5 px-2 min-[380px]:px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 transition-colors border border-neutral-300 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span className="uppercase">{language === 'en' ? 'ES' : 'EN'}</span>
                <span className="hidden xl:inline text-[11px] font-semibold text-neutral-600">
                  {language === 'en' ? 'Español' : 'English'}
                </span>
              </button>

              {/* Primary Action Button (desktop & tablet) */}
              <button
                type="button"
                onClick={() => onNavigateToContact()}
                className="hidden sm:inline-flex min-h-[44px] items-center justify-center px-3.5 min-[820px]:px-5 py-2 text-xs md:text-sm font-bold text-white bg-[#EB0A1E] rounded-md hover:bg-[#d00819] active:scale-[0.98] transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.cta}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="w-full max-w-[290px] min-[360px]:max-w-xs bg-white h-full shadow-2xl flex flex-col p-5 min-[380px]:p-6 animate-in slide-in-from-right duration-200 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 min-[380px]:pb-6 border-b border-neutral-200 shrink-0">
              <div className="flex items-center gap-2 font-bold text-neutral-950 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB0A1E] shrink-0" />
                <span className="truncate">Wendy Goodridge</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-600 hover:text-neutral-950 rounded-md cursor-pointer shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-3 py-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Toyota Sales Consultant · Austin, TX
              </p>
            </div>

            <nav className="flex flex-col gap-1 py-3 flex-1">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>{t.home}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToVehicles();
                }}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>{t.vehicles}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>{t.about}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('why-wendy')}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>{t.whyWendy}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('tiktok')}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>Explore on TikTok</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="min-h-[44px] flex items-center justify-between py-2 text-left font-semibold text-neutral-800 hover:text-[#EB0A1E] transition-colors cursor-pointer"
              >
                <span>{t.contact}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </nav>

            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2.5 shrink-0 safe-bottom">
              <button
                type="button"
                onClick={() => {
                  onLanguageChange(language === 'en' ? 'es' : 'en');
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-md border border-neutral-300 text-neutral-800 hover:bg-neutral-50 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-neutral-600" />
                <span>{language === 'en' ? 'Cambiar a Español' : 'Switch to English'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToContact();
                }}
                className="w-full min-h-[44px] py-2.5 text-center text-sm font-bold text-white bg-[#EB0A1E] rounded-md hover:bg-[#d00819] shadow-sm cursor-pointer"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
