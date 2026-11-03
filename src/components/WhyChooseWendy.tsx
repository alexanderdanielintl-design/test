import React from 'react';
import { Compass, Car, HeartHandshake, Globe2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhyChooseWendyProps {
  language: Language;
}

export const WhyChooseWendy: React.FC<WhyChooseWendyProps> = ({ language }) => {
  const t = translations[language].whyChoose;

  const icons = [
    <Compass className="w-6 h-6 text-[#EB0A1E]" />,
    <Car className="w-6 h-6 text-[#EB0A1E]" />,
    <HeartHandshake className="w-6 h-6 text-[#EB0A1E]" />,
    <Globe2 className="w-6 h-6 text-[#EB0A1E]" />,
  ];

  return (
    <section id="why-wendy" className="py-16 sm:py-20 md:py-28 bg-[#101010] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
            <span>{t.badge}</span>
          </div>
          <h2
            className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.heading}
          </h2>
          <p className="text-sm min-[380px]:text-base sm:text-lg text-neutral-200 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Feature Columns / Bento Cards - Fully responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-5 min-[380px]:p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform duration-300 shrink-0">
                  {icons[idx]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB0A1E]" />
                <span>Priority Service</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
