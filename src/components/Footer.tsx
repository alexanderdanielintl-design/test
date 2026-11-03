import React from 'react';
import { Shield, MapPin, Globe, ExternalLink, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { contactConfig } from '../config/contact';

interface FooterProps {
  language: Language;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenLegal,
  onNavigate,
}) => {
  const t = translations[language].footer;
  const nav = translations[language].nav;
  const isEn = language === 'en';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101010] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-neutral-800">
          {/* Col 1: Wordmark & Consultant Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB0A1E]" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Wendy Goodridge
              </span>
            </div>

            <p className="text-sm font-semibold text-neutral-200">
              Toyota Sales Consultant · North Austin, Texas
            </p>

            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              {isEn
                ? 'Providing personalized, transparent, and bilingual automotive sales guidance for buyers across North Austin and Central Texas.'
                : 'Asesoría automotriz personalizada, transparente y 100% bilingüe para compradores en North Austin y el Centro de Texas.'}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EB0A1E]" />
                <span>North Austin, TX</span>
              </div>
              <span className="text-neutral-500">·</span>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>English / Español</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              {t.quickLinks}
            </h4>
            <ul className="space-y-1 text-xs font-medium text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  {nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vehicles')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  {nav.vehicles}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('why-wendy')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  {nav.whyWendy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tiktok')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  Explore on TikTok
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  {nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Connect (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              {isEn ? 'Social Media' : 'Redes Sociales'}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={contactConfig.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] text-xs font-semibold text-neutral-200 hover:text-[#EB0A1E] transition-colors flex items-center gap-1.5"
              >
                <span>TikTok: @wendy_good24</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Col 4: Legal & Privacy links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              {t.legal}
            </h4>
            <ul className="space-y-1 text-xs text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors underline cursor-pointer flex items-center"
                >
                  {t.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="min-h-[36px] py-1.5 hover:text-white transition-colors underline cursor-pointer flex items-center"
                >
                  {t.termsOfService}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Independent Salesperson Corporate Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
          <p className="font-bold text-white mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#EB0A1E]" />
            <span>{t.disclaimerTitle}</span>
          </p>
          <p>{t.disclaimerText}</p>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Wendy Goodridge. {t.copyright}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-[44px] flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>{isEn ? 'Back to Top' : 'Volver al Inicio'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
