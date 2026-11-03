import React from 'react';
import { MapPin, Globe, MessageCircle, ArrowRight, Camera } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { contactConfig } from '../config/contact';

interface AboutWendyProps {
  language: Language;
  onContactWendy: () => void;
}

export const AboutWendy: React.FC<AboutWendyProps> = ({
  language,
  onContactWendy,
}) => {
  const t = translations[language].about;
  const isEn = language === 'en';

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-white text-[#171717] border-t border-neutral-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Portrait Placeholder / Approved Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 text-white flex flex-col justify-between p-4 min-[380px]:p-6">
              {contactConfig.portrait.url && contactConfig.portrait.isApproved ? (
                <img
                  src={contactConfig.portrait.url}
                  alt="Wendy Goodridge, Toyota Sales Consultant in North Austin"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  {/* Subtle architectural background texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black opacity-90" />
                  <div className="absolute inset-0 bg-[radial-gradient(#EB0A1E_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Top Badge: Authentic Portrait Status */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-wider text-neutral-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                      {isEn ? 'Personal Portfolio' : 'Portafolio Personal'}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EB0A1E] shrink-0" />
                  </div>

                  {/* Center: Monogram Crest & Professional Stance */}
                  <div className="relative z-10 flex flex-col items-center text-center my-auto py-4 sm:py-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-800 border-2 border-[#EB0A1E] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white tracking-widest shadow-2xl mb-3 sm:mb-4">
                      WG
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Wendy Goodridge
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#EB0A1E] mt-0.5 sm:mt-1">
                      Toyota Sales Consultant
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                      North Austin, Texas
                    </p>

                    {/* Transparent notice */}
                    <div className="mt-4 sm:mt-6 p-2.5 sm:p-3 rounded-lg bg-neutral-800/80 border border-neutral-700/80 text-left max-w-xs text-[11px] sm:text-xs text-neutral-300 flex items-start gap-2 sm:gap-2.5">
                      <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        {isEn
                          ? 'Official portrait to be provided upon verified launch. Wendy assists Austin car buyers in English & Spanish.'
                          : 'Fotografía oficial por incorporar en el lanzamiento verificado. Wendy atiende en inglés y español.'}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom Card: Location & Language info */}
              <div className="relative z-10 p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-neutral-200 text-neutral-900">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-neutral-700 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#EB0A1E] shrink-0" />
                    <span className="truncate">North Austin & Round Rock</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600 shrink-0">
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                    <span>EN / ES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Copy & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
              <span>{t.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-700 font-semibold">North Austin, TX</span>
            </div>

            <h2
              className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.15] mb-4 sm:mb-6"
              style={{ textWrap: 'balance' }}
            >
              {t.heading}
            </h2>

            <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-neutral-800 leading-relaxed font-normal mb-6 sm:mb-8">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
              <p>{t.paragraph3}</p>
            </div>

            {/* Austin Service Territory Notice */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-100 border border-neutral-300 mb-6 sm:mb-8 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#EB0A1E] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
                {t.austinCommitment}
              </p>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-neutral-50">
                <span className="text-sm font-bold text-neutral-950 block">
                  {t.experienceYears}
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  {t.experienceYearsSub}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-neutral-50">
                <span className="text-sm font-bold text-[#EB0A1E] block">
                  {t.languages}
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  {t.languagesSub}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-neutral-50">
                <span className="text-sm font-bold text-neutral-950 block">
                  {t.locationServed}
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  {t.locationServedSub}
                </span>
              </div>
            </div>

            {/* CTA button with responsive sizing */}
            <div>
              <button
                type="button"
                onClick={onContactWendy}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-sm font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] active:scale-[0.98] rounded-md transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Connect With Wendy' : 'Hablar Con Wendy'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
