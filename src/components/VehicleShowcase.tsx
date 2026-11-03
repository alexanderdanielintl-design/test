import React, { useState, useRef } from 'react';
import { ArrowRight, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { Vehicle, VehicleCategory, Language } from '../types';
import { vehicles } from '../data/vehicles';
import { translations } from '../data/translations';
import { VehicleDetailModal } from './VehicleDetailModal';

interface VehicleShowcaseProps {
  language: Language;
  onEnquireVehicle: (vehicleModel: string) => void;
  onRequestCustomSearch: () => void;
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
  language,
  onEnquireVehicle,
  onRequestCustomSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('all');
  const [activeModalVehicle, setActiveModalVehicle] = useState<Vehicle | null>(null);

  // Ref to restore focus when modal closes
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const t = translations[language].showcase;
  const isEn = language === 'en';

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory === 'all') return true;
    return v.category === selectedCategory;
  });

  const categories: { key: VehicleCategory; label: string }[] = [
    { key: 'all', label: t.categories.all },
    { key: 'suv', label: t.categories.suv },
    { key: 'sedan', label: t.categories.sedan },
    { key: 'truck', label: t.categories.truck },
    { key: 'hybrid', label: t.categories.hybrid },
  ];

  const handleOpenModal = (vehicle: Vehicle, triggerEl: HTMLButtonElement) => {
    lastTriggerRef.current = triggerEl;
    setActiveModalVehicle(vehicle);
  };

  const handleCloseModal = () => {
    setActiveModalVehicle(null);
    setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 50);
  };

  return (
    <section id="vehicles" className="py-16 sm:py-20 md:py-28 bg-[#F4F4F4] text-[#171717] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
            <span>{t.badge}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-700">North Austin, TX</span>
          </div>
          <h2 className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight mb-3 sm:mb-4">
            {t.title}
          </h2>
          <p className="text-sm min-[380px]:text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Clear Demonstration Inventory Notice */}
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl bg-white border border-neutral-300 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
            <span className="font-bold text-neutral-950">
              {isEn ? 'Demonstration Notice:' : 'Aviso de Demostración:'}
            </span>{' '}
            {t.demoDisclaimer}
          </p>
        </div>

        {/* Interactive Category Filter Tabs - Smooth horizontal scroll on all displays */}
        <div className="relative mb-8 sm:mb-10">
          <div
            className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-neutral-200 rounded-xl overflow-x-auto no-scrollbar scroll-smooth"
            role="tablist"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid - Responsive 1 -> 2 -> 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle) => {
            const description = isEn ? vehicle.descriptionEn : vehicle.descriptionEs;

            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Vehicle Image Container with Performance Attributes */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden shrink-0">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="450"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.src.includes('/src/assets/images/') && el.src.includes('/images/')) {
                        el.src = el.src.replace('/images/', '/src/assets/images/');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70" />

                  {/* Year, Trim & SAMPLE Label */}
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/85 text-white text-[10px] min-[360px]:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
                    <span>{vehicle.year}</span>
                    <span className="text-[#EB0A1E]">·</span>
                    <span className="truncate max-w-[110px] sm:max-w-none">{vehicle.popularTrim}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-amber-400 uppercase">SAMPLE</span>
                  </div>

                  {/* Starting MSRP overlay */}
                  <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-black/85 text-white text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md tabular-nums border border-white/15">
                    <span className="text-[10px] sm:text-[11px] text-neutral-300 font-normal mr-1">
                      {isEn ? 'From' : 'Desde'}
                    </span>
                    ${vehicle.startingMsrp.toLocaleString()}
                  </div>
                </div>

                {/* Card Content - Responsive padding */}
                <div className="p-4 min-[380px]:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Model Title */}
                    <div className="mb-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight group-hover:text-[#EB0A1E] transition-colors">
                        {vehicle.model}
                      </h3>
                      <p className="text-xs text-neutral-600 font-semibold mt-0.5">
                        {vehicle.driveType}
                      </p>
                    </div>

                    {/* Uncut Description */}
                    <p className="text-xs sm:text-sm text-neutral-700 mb-4 leading-relaxed font-normal min-h-[44px]">
                      {description}
                    </p>

                    {/* Spec Indicators */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2.5 sm:py-3 border-y border-neutral-200 text-neutral-700 mb-5">
                      <div className="flex flex-col">
                        <span className="text-[10px] min-[360px]:text-[11px] text-neutral-600 uppercase font-bold">
                          {t.card.hp}
                        </span>
                        <span className="text-xs font-extrabold text-neutral-950 tabular-nums">
                          {vehicle.horsepower} HP
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] min-[360px]:text-[11px] text-neutral-600 uppercase font-bold">
                          {t.card.mpg}
                        </span>
                        <span className="text-xs font-extrabold text-neutral-950 tabular-nums">
                          {vehicle.estMpg.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] min-[360px]:text-[11px] text-neutral-600 uppercase font-bold">
                          {t.card.seats}
                        </span>
                        <span className="text-xs font-extrabold text-neutral-950 tabular-nums">
                          {vehicle.seating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Gracefully switches between 1 and 2 columns on small mobile */}
                  <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(vehicle, e.currentTarget)}
                      className="w-full min-h-[44px] py-2.5 px-3 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] rounded-md transition-all text-center cursor-pointer whitespace-nowrap border border-neutral-300 flex items-center justify-center"
                    >
                      {t.card.viewDetails}
                    </button>

                    <button
                      type="button"
                      onClick={() => onEnquireVehicle(vehicle.model)}
                      className="w-full min-h-[44px] py-2.5 px-3 text-xs font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] active:scale-[0.98] rounded-md transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      <span>{t.card.enquire}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concierge Callout: CTA Banner */}
        <div className="mt-10 sm:mt-14 p-5 min-[380px]:p-6 sm:p-8 rounded-2xl bg-[#101010] text-white border border-neutral-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EB0A1E] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EB0A1E]" />
              <span>{isEn ? 'Austin Inventory Concierge' : 'Asesoría de Inventario en Austin'}</span>
            </div>
            <h3 className="text-lg min-[360px]:text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              {t.concierge.heading}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              {t.concierge.subheading}
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestCustomSearch}
            className="w-full md:w-auto min-h-[44px] px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-white hover:bg-neutral-100 active:scale-[0.98] rounded-md transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#EB0A1E]" />
            <span>{t.concierge.cta}</span>
          </button>
        </div>
      </div>

      {/* Modal View for Detailed Specs */}
      <VehicleDetailModal
        vehicle={activeModalVehicle}
        language={language}
        onClose={handleCloseModal}
        onEnquire={(model) => onEnquireVehicle(model)}
      />
    </section>
  );
};
