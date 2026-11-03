import React, { useEffect, useRef } from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { Language } from '../types';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  language: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, language, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!type) return;

    const timer = setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isEn = language === 'en';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] overflow-y-auto p-4 min-[380px]:p-6 sm:p-8 shadow-2xl border border-neutral-300 focus:outline-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-300 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-[#EB0A1E] shrink-0" />
            ) : (
              <FileText className="w-5 h-5 text-[#EB0A1E] shrink-0" />
            )}
            <h3 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-neutral-950 truncate">
              {type === 'privacy'
                ? isEn
                  ? 'Privacy Policy'
                  : 'Política de Privacidad'
                : isEn
                ? 'Terms and Conditions'
                : 'Términos y Condiciones'}
            </h3>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-600 hover:text-neutral-950 rounded-md cursor-pointer shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          {type === 'privacy' ? (
            <>
              <p className="font-bold text-neutral-950">
                {isEn ? 'Last updated: 2026' : 'Última actualización: 2026'}
              </p>
              <p>
                {isEn
                  ? 'This Privacy Policy explains how Wendy Goodridge, independent Toyota Sales Consultant in North Austin, Texas, handles personal information collected through this website.'
                  : 'Esta Política de Privacidad explica cómo Wendy Goodridge, consultora independiente de ventas Toyota en North Austin, Texas, gestiona la información personal recopilada a través de este sitio web.'}
              </p>
              <h4 className="font-bold text-neutral-950 text-sm mt-3 sm:mt-4">
                {isEn ? '1. Information We Collect' : '1. Información que Recopilamos'}
              </h4>
              <p>
                {isEn
                  ? 'When you submit an enquiry through our contact form, we collect your name, email address, phone number, vehicle interest, budget range, and any message you provide.'
                  : 'Cuando envías una consulta a través de nuestro formulario de contacto, recopilamos tu nombre, correo electrónico, número de teléfono, vehículo de interés, rango de presupuesto y cualquier mensaje que proporciones.'}
              </p>
              <h4 className="font-bold text-neutral-950 text-sm mt-3 sm:mt-4">
                {isEn ? '2. How Information Is Used' : '2. Cómo se Utiliza la Información'}
              </h4>
              <p>
                {isEn
                  ? 'Your information is used solely to respond to your automotive inquiry, schedule vehicle test drives, answer pricing and inventory questions, and provide personalized sales assistance.'
                  : 'Tu información se utiliza exclusivamente para responder a tu consulta automotriz, coordinar pruebas de manejo, responder preguntas de precios e inventario y brindarte asesoría de ventas personalizada.'}
              </p>
              <h4 className="font-bold text-neutral-950 text-sm mt-3 sm:mt-4">
                {isEn ? '3. No Sale of Personal Data' : '3. No Venta de Datos Personales'}
              </h4>
              <p>
                {isEn
                  ? 'We do not sell, rent, or trade your personal data with third-party marketers or advertisers.'
                  : 'No vendemos, alquilamos ni comercializamos tus datos personales con terceros comercializadores ni anunciantes.'}
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-neutral-950">
                {isEn ? 'Terms & Disclaimers' : 'Términos y Descargos de Responsabilidad'}
              </p>
              <p>
                {isEn
                  ? 'By accessing and utilizing this personal automotive sales website, you acknowledge and agree to the following terms and guidelines.'
                  : 'Al acceder y utilizar este sitio web personal de ventas automotrices, reconoces y aceptas los siguientes términos y pautas.'}
              </p>
              <h4 className="font-bold text-neutral-950 text-sm mt-3 sm:mt-4">
                {isEn ? '1. Independent Salesperson Status' : '1. Estado de Asesor de Ventas Independiente'}
              </h4>
              <p>
                {isEn
                  ? 'Wendy Goodridge is an independent automotive sales professional serving customers in North Austin, Texas. This website is a personal portfolio and inquiry generation platform. It is not owned, operated, or endorsed by Toyota Motor Sales, U.S.A., Inc. or Toyota Motor Corporation.'
                  : 'Wendy Goodridge es una profesional independiente de ventas automotrices que asesora a clientes en North Austin, Texas. Este sitio web es un portafolio personal y una plataforma de consultas. No es propiedad, ni está operado ni respaldado por Toyota Motor Sales, U.S.A., Inc. ni Toyota Motor Corporation.'}
              </p>
              <h4 className="font-bold text-neutral-950 text-sm mt-3 sm:mt-4">
                {isEn ? '2. Demonstration Inventory' : '2. Inventario de Demostración'}
              </h4>
              <p>
                {isEn
                  ? 'All vehicle specifications, MSRP estimates, images, and feature descriptions are provided for illustrative purposes only. They do not constitute an offer to sell a specific VIN or guaranteed inventory availability. Exact prices and vehicle specifications must be verified in person at the dealership.'
                  : 'Todas las especificaciones, estimaciones de precios MSRP, imágenes y descripciones de características se proporcionan únicamente con fines ilustrativos. No constituyen una oferta de venta de un número VIN específico ni garantizan disponibilidad de inventario. Los precios y especificaciones exactas deben verificarse en el concesionario.'}
              </p>
            </>
          )}
        </div>

        <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-300 text-right">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer flex items-center justify-center"
          >
            {isEn ? 'Close Window' : 'Cerrar Ventana'}
          </button>
        </div>
      </div>
    </div>
  );
};
