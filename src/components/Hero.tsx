import React from 'react';
import { ArrowDown, ChevronRight, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { contactConfig } from '../config/contact';

interface HeroProps {
  language: Language;
  onExploreVehicles: () => void;
  onContactWendy: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreVehicles,
  onContactWendy,
}) => {
  const t = translations[language].hero;
  const isEn = language === 'en';

  return (
    <section id="home" className="relative bg-[#101010] text-white overflow-hidden w-full">
      {/* Background Vehicle Image with high fetch priority and responsive object positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_toyota_suv_1793659735641.jpg"
          alt="Toyota SUV in Austin Texas"
          fetchPriority="high"
          decoding="async"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[65%_center] sm:object-center brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.includes('/src/assets/images/')) {
              el.src = '/src/assets/images/hero_toyota_suv_1793659735641.jpg';
            }
          }}
        />
        {/* Responsive, smooth gradient overlays ensuring high contrast across all orientations */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 sm:to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/20 to-black/50" />
      </div>

      {/* Hero Content Container - Fluid padding for small mobile through ultra-wide 4K */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 min-[400px]:pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-24 md:pb-32 min-h-[82vh] sm:min-h-[85vh] flex flex-col justify-between">
        <div className="max-w-2xl pt-2 sm:pt-4">
          {/* Consultant Trust Kicker */}
          <div className="flex flex-wrap items-center gap-1.5 min-[380px]:gap-2 text-xs md:text-sm font-semibold tracking-wide text-neutral-300 uppercase mb-3 sm:mb-4">
            <span className="text-[#EB0A1E] font-bold">Toyota</span>
            <span aria-hidden="true">·</span>
            <span>North Austin, TX</span>
            <span aria-hidden="true" className="hidden min-[400px]:inline">·</span>
            <span className="text-neutral-300">{t.consultantBadge}</span>
          </div>

          {/* Main Headline - Fluid typography */}
          <h1
            className="text-3xl min-[360px]:text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.1] mb-4 sm:mb-6"
            style={{ textWrap: 'balance' }}
          >
            {t.headline}
          </h1>

          {/* Supporting Statement */}
          <p className="text-sm min-[380px]:text-base sm:text-lg md:text-xl text-neutral-200 font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {t.supporting}
          </p>

          {/* Wendy Goodridge Profile Lockup */}
          <div className="mb-6 sm:mb-8 p-3 min-[380px]:p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 max-w-md w-full">
            <div className="flex items-center gap-3">
              {contactConfig.portrait.url && contactConfig.portrait.isApproved ? (
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#EB0A1E] shrink-0 bg-neutral-800">
                  <img
                    src={contactConfig.portrait.url}
                    alt="Wendy Goodridge portrait"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border-2 border-[#EB0A1E] flex items-center justify-center shrink-0 shadow-md text-white font-extrabold text-xs sm:text-sm tracking-wider"
                  title="Official portrait pending delivery by Wendy Goodridge"
                  aria-label="Wendy Goodridge monogram emblem"
                >
                  WG
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="text-sm sm:text-base font-bold text-white tracking-tight truncate">Wendy Goodridge</p>
                  <span className="text-[10px] bg-red-950/80 text-red-200 border border-red-800/80 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                    {isEn ? 'Toyota Consultant' : 'Consultora Toyota'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-300 mt-0.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#EB0A1E] shrink-0" />
                  <span className="truncate">North Austin, Texas</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-400 whitespace-nowrap">EN / ES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Stacks gracefully on narrow screens (<440px), inline on tablet/desktop */}
          <div className="flex flex-col min-[440px]:flex-row items-stretch min-[440px]:items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onExploreVehicles}
              className="min-h-[46px] px-6 py-3 text-sm font-bold text-white bg-[#EB0A1E] rounded-md hover:bg-[#d00819] active:scale-[0.98] transition-all shadow-lg shadow-black/40 flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer text-center"
            >
              <span>{t.exploreCta}</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onContactWendy}
              className="min-h-[46px] px-6 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] rounded-md transition-all border border-white/25 backdrop-blur-xs whitespace-nowrap cursor-pointer text-center flex items-center justify-center"
            >
              {t.contactCta}
            </button>
          </div>
        </div>

        {/* Bottom Bar: Trust Indicators & Subtle Scroll Indicator */}
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 border-t border-white/15">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-neutral-200 font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EB0A1E] shrink-0" />
              <span>Transparent & Pressure-Free</span>
            </div>
            <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-600" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span>Hablo Español</span>
            </div>
            <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-600" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span>Sample Demonstration Inventory</span>
            </div>
          </div>

          {/* Subtle Scroll Indicator */}
          <button
            type="button"
            onClick={onExploreVehicles}
            className="min-h-[44px] flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors group cursor-pointer self-end sm:self-auto"
          >
            <span>{t.scrollPrompt}</span>
            <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center group-hover:border-[#EB0A1E] transition-colors shrink-0">
              <ArrowDown className="w-3.5 h-3.5 text-neutral-200 group-hover:text-[#EB0A1E] transition-transform duration-300 group-hover:translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
