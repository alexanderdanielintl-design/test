import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FloatingCTAProps {
  language: Language;
  onContactClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  language,
  onContactClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language].floatingCta;

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling 400px past top hero
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 right-3 min-[400px]:bottom-4 min-[400px]:right-4 z-40 max-w-[calc(100vw-24px)] sm:max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
      <button
        type="button"
        onClick={onContactClick}
        aria-label="Contact Wendy Goodridge for Toyota sales consultation in North Austin"
        className="min-h-[44px] flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#EB0A1E] text-white rounded-full shadow-xl hover:bg-[#d00819] active:scale-[0.97] transition-all border border-white/20 group cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-tight truncate">
          {t.contactWendy}
        </span>
        <span className="text-[10px] sm:text-[11px] bg-black/30 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold hidden min-[360px]:inline shrink-0">
          {t.bilingual}
        </span>
        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </button>
    </div>
  );
};
