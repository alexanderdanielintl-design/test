import React from 'react';
import { Quote, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const t = translations[language].testimonials;
  const isEn = language === 'en';

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#F4F4F4] text-[#171717] border-t border-neutral-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
            <span>{t.badge}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-700">North Austin, TX</span>
          </div>
          <h2
            className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 mb-3 sm:mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.heading}
          </h2>
          <p className="text-sm min-[380px]:text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Single Honest Placeholder Card */}
        <div className="max-w-3xl mx-auto p-5 min-[380px]:p-7 sm:p-10 rounded-2xl bg-white border border-neutral-300 shadow-sm relative text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 text-[#EB0A1E] flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-red-100 shrink-0">
            <Quote className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h3 className="text-lg min-[360px]:text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight mb-2 sm:mb-3">
            {t.singlePlaceholderTitle}
          </h3>

          <p className="text-xs min-[360px]:text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl mx-auto mb-5 sm:mb-6 font-normal">
            {t.singlePlaceholderText}
          </p>

          <div className="pt-4 sm:pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-neutral-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#EB0A1E] shrink-0" />
              <span>{isEn ? '100% Verified Buyer Stories Only' : 'Solo Reseñas Verificadas de Compradores'}</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#EB0A1E] shrink-0" />
              <span>{isEn ? 'North Austin & Round Rock Drivers' : 'Conductores de North Austin y Round Rock'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
