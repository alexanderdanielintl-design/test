import React from 'react';
import { ExternalLink, Video, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { contactConfig } from '../config/contact';

interface TikTokSectionProps {
  language: Language;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({ language }) => {
  const t = translations[language].tiktok;
  const isEn = language === 'en';
  const tikTokUrl = contactConfig.tiktok.url;

  return (
    <section id="tiktok" className="py-16 sm:py-20 md:py-28 bg-[#101010] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
              <Video className="w-3.5 h-3.5 text-[#EB0A1E]" />
              <span>{t.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">@wendy_good24</span>
            </div>
            <h2
              className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3"
              style={{ textWrap: 'balance' }}
            >
              {t.heading}
            </h2>
            <p className="text-sm min-[380px]:text-base text-neutral-300 font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Follow CTA Button - Full width on narrow mobile */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={tikTokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Wendy Goodridge's TikTok profile at ${tikTokUrl} (opens in new tab)`}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] active:scale-[0.98] rounded-md transition-all shadow-md group cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.32-6.32V8.92a8.16 8.16 0 0 0 4.92 1.62V7.1a4.84 4.84 0 0 1-1-.41Z" />
              </svg>
              <span>{t.followCta}</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* Promotional Still Cards - Grid adjusts smoothly */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.cards.map((video, idx) => (
            <a
              key={idx}
              href={tikTokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${video.title} - View topic on TikTok @wendy_good24 (opens in new tab)`}
              className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between focus:ring-2 focus:ring-[#EB0A1E] focus:outline-hidden"
            >
              {/* Promotional Still Container */}
              <div className="relative aspect-[9/16] bg-neutral-950 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 z-10" />

                <div className="absolute inset-0 opacity-45 mix-blend-luminosity">
                  <img
                    src={
                      idx === 0
                        ? '/images/hero_toyota_suv_1793659735641.jpg'
                        : idx === 1
                        ? '/images/showcase_toyota_camry_1793659736918.jpg'
                        : idx === 2
                        ? '/images/showcase_toyota_tacoma_1793659736887.jpg'
                        : '/images/showcase_toyota_rav4_1793659737791.jpg'
                    }
                    alt={`Promotional still for ${video.title}`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="710"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.src.includes('/src/assets/images/')) {
                        el.src = el.src.replace('/images/', '/src/assets/images/');
                      }
                    }}
                  />
                </div>

                {/* Top: Tag + TikTok handle */}
                <div className="relative z-20 flex items-center justify-between text-xs gap-1">
                  <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2 sm:px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1 truncate">
                    <ImageIcon className="w-3 h-3 text-[#EB0A1E] shrink-0" />
                    <span className="truncate">{video.tag}</span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-neutral-300 shrink-0">
                    @wendy_good24
                  </span>
                </div>

                {/* Middle: Video Topic Link Marker */}
                <div className="relative z-20 self-center my-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-[#EB0A1E] group-hover:border-[#EB0A1E] transition-all duration-300 shadow-xl group-hover:scale-110">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Bottom: Title & Description */}
                <div className="relative z-20">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1 group-hover:text-[#EB0A1E] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-normal">
                    {video.desc}
                  </p>
                  <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] sm:text-xs text-neutral-300 font-semibold">
                    <span className="flex items-center gap-1.5 text-neutral-200">
                      <TrendingUp className="w-3.5 h-3.5 text-[#EB0A1E] shrink-0" />
                      <span>{isEn ? 'Watch Topic on TikTok' : 'Ver en TikTok'}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white shrink-0" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer callout note */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-900 flex items-center justify-center text-center text-xs text-neutral-400">
          <p>{t.channelNote}</p>
        </div>
      </div>
    </section>
  );
};
