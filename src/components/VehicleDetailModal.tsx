import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Fuel, Gauge, Users, Shield, ArrowRight, Info } from 'lucide-react';
import { Vehicle, Language } from '../types';
import { translations } from '../data/translations';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  language: Language;
  onClose: () => void;
  onEnquire: (vehicleModel: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  language,
  onClose,
  onEnquire,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and Escape key listener for accessible modal behavior
  useEffect(() => {
    if (!vehicle) return;

    // Move initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus within dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const t = translations[language].modal;
  const isEn = language === 'en';

  const description = isEn ? vehicle.descriptionEn : vehicle.descriptionEs;
  const highlights = isEn ? vehicle.highlightFeaturesEn : vehicle.highlightFeaturesEs;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-modal-title"
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col focus:outline-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image with responsive height cap for landscape / short viewports */}
        <div className="relative aspect-[16/9] max-h-[35vh] sm:max-h-[45vh] md:max-h-80 w-full bg-neutral-900 overflow-hidden shrink-0">
          <img
            src={vehicle.image}
            alt={vehicle.model}
            width="800"
            height="450"
            decoding="async"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />

          {/* Sample label on modal header */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/80 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-md border border-white/20">
            {isEn ? 'Sample Inventory' : 'Inventario de Muestra'}
          </div>

          {/* Accessible Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="min-h-[44px] min-w-[44px] absolute top-2.5 sm:top-4 right-2.5 sm:right-4 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-6 flex flex-wrap items-end justify-between gap-2 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-300">
                <span>{vehicle.year}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#EB0A1E] font-bold uppercase truncate">{vehicle.popularTrim}</span>
              </div>
              <h2 id="vehicle-modal-title" className="text-xl min-[400px]:text-2xl sm:text-3xl font-extrabold text-white tracking-tight truncate">
                {vehicle.model}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] sm:text-xs text-neutral-300 block">{t.startingMsrpLabel}</span>
              <span className="text-lg sm:text-2xl font-black text-white tabular-nums">
                ${vehicle.startingMsrp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center border-b border-neutral-200 px-4 sm:px-6 pt-2 bg-neutral-50 shrink-0" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`min-h-[44px] px-2 pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors mr-4 sm:mr-6 cursor-pointer flex items-center ${
              activeTab === 'overview'
                ? 'border-[#EB0A1E] text-neutral-950'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.overview}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'specs'}
            onClick={() => setActiveTab('specs')}
            className={`min-h-[44px] px-2 pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center ${
              activeTab === 'specs'
                ? 'border-[#EB0A1E] text-neutral-950'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.specs}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {activeTab === 'overview' ? (
            <div className="space-y-5 sm:space-y-6">
              {/* Full Description */}
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                {description}
              </p>

              {/* Quick specs summary strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-neutral-100 border border-neutral-200">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mb-1">
                    <Gauge className="w-3.5 h-3.5 text-[#EB0A1E]" />
                    <span>{t.horsepower}</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-neutral-950 tabular-nums">
                    {vehicle.horsepower} HP
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mb-1">
                    <Fuel className="w-3.5 h-3.5 text-[#EB0A1E]" />
                    <span>{t.fuelEconomy}</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-neutral-950 tabular-nums">
                    {vehicle.estMpg}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mb-1">
                    <Users className="w-3.5 h-3.5 text-[#EB0A1E]" />
                    <span>{t.seatingCapacity}</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-neutral-950 tabular-nums">
                    {vehicle.seating} {language === 'en' ? 'Seats' : 'Asientos'}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-medium mb-1">
                    <Shield className="w-3.5 h-3.5 text-[#EB0A1E]" />
                    <span>Active Safety</span>
                  </div>
                  <p className="text-xs font-bold text-neutral-950">
                    TSS 3.0 Standard
                  </p>
                </div>
              </div>

              {/* Standard Highlights */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 mb-3">
                  {t.highlights}
                </h3>
                <ul className="space-y-2.5">
                  {highlights.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-[#EB0A1E] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="divide-y divide-neutral-200 border border-neutral-300 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-neutral-100 text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.engine}</span>
                  <span className="font-bold text-neutral-950 text-right">{vehicle.engine}</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-white text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.horsepower}</span>
                  <span className="font-bold text-neutral-950 tabular-nums">{vehicle.horsepower} Net HP</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-neutral-100 text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.transmission}</span>
                  <span className="font-bold text-neutral-950 text-right">{vehicle.transmission}</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-white text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.drivetrain}</span>
                  <span className="font-bold text-neutral-950 text-right">{vehicle.driveType}</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-neutral-100 text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.fuelEconomy}</span>
                  <span className="font-bold text-neutral-950 tabular-nums">{vehicle.estMpg}</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-3.5 bg-white text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-700">{t.seatingCapacity}</span>
                  <span className="font-bold text-neutral-950 tabular-nums">{vehicle.seating} Seats</span>
                </div>
                {vehicle.towingCapacity && (
                  <div className="flex items-center justify-between p-3 sm:p-3.5 bg-neutral-100 text-xs sm:text-sm">
                    <span className="font-semibold text-neutral-700">{t.towing}</span>
                    <span className="font-bold text-neutral-950">{vehicle.towingCapacity}</span>
                  </div>
                )}
                {vehicle.cargoSpace && (
                  <div className="flex items-center justify-between p-3 sm:p-3.5 bg-white text-xs sm:text-sm">
                    <span className="font-semibold text-neutral-700">{t.cargo}</span>
                    <span className="font-bold text-neutral-950">{vehicle.cargoSpace}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Demonstration disclaimer notice */}
          <div className="mt-6 flex items-start gap-2.5 p-3 sm:p-3.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs">
            <Info className="w-4 h-4 text-[#EB0A1E] shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.demoNote}</p>
          </div>
        </div>

        {/* Modal Footer with Actions and responsive button sizing */}
        <div className="p-3.5 sm:p-5 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-bold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-200 rounded-md transition-colors order-2 sm:order-1 cursor-pointer flex items-center justify-center"
          >
            {t.close}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquire(vehicle.model);
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] active:scale-[0.98] rounded-md transition-all shadow-sm flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
          >
            <span>{t.enquireForModel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
