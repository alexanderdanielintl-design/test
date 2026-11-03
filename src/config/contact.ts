/**
 * Wendy Goodridge Contact & Integration Configuration
 * 
 * IMPORTANT: In accordance with professional sales compliance, 
 * unverified placeholder data is never presented as authentic contact information.
 * When Wendy provides verified phone/email/WhatsApp details, set `isVerified: true`
 * and update the respective numbers.
 */

export interface ContactConfig {
  name: string;
  role: string;
  dealershipRegion: string;
  phone: {
    display: string;
    tel: string;
    isVerified: boolean;
    noticeEn: string;
    noticeEs: string;
  };
  email: {
    address: string;
    isVerified: boolean;
    noticeEn: string;
    noticeEs: string;
  };
  whatsapp: {
    number: string;
    display: string;
    isVerified: boolean;
    noticeEn: string;
    noticeEs: string;
  };
  tiktok: {
    handle: string;
    url: string;
    isVerified: boolean;
  };
  endpoint: {
    url: string;
    isConfigured: boolean;
  };
  portrait: {
    url: string | null;
    isApproved: boolean;
  };
}

export const contactConfig: ContactConfig = {
  name: 'Wendy Goodridge',
  role: 'Toyota Sales Consultant',
  dealershipRegion: 'North Austin, Texas',
  
  phone: {
    display: '(512) 555-0199', // Configuration placeholder
    tel: '+15125550199',
    isVerified: false,
    noticeEn: 'Direct phone number pending verification. Connect via TikTok @wendy_good24 or submit an enquiry below.',
    noticeEs: 'Número telefónico pendiente de verificación. Contáctanos por TikTok @wendy_good24 o envía una consulta abajo.',
  },

  email: {
    address: 'wendy.goodridge@dealership-preview.com', // Configuration placeholder
    isVerified: false,
    noticeEn: 'Direct email pending dealership verification. Please use the enquiry form below or message on TikTok.',
    noticeEs: 'Correo pendiente de confirmación de concesionario. Por favor usa el formulario o TikTok.',
  },

  whatsapp: {
    number: '15125550199', // Configuration placeholder
    display: '+1 (512) 555-0199',
    isVerified: false,
    noticeEn: 'Direct WhatsApp link pending verification. Please submit an enquiry to request WhatsApp follow-up.',
    noticeEs: 'Enlace de WhatsApp pendiente de verificación. Solicita seguimiento por WhatsApp en el formulario.',
  },

  tiktok: {
    handle: '@wendy_good24',
    url: 'https://www.tiktok.com/@wendy_good24',
    isVerified: true,
  },

  endpoint: {
    // Check if an external endpoint is configured via Vite env var (e.g. VITE_ENQUIRY_ENDPOINT)
    url: typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENQUIRY_ENDPOINT
      ? import.meta.env.VITE_ENQUIRY_ENDPOINT
      : '',
    isConfigured: Boolean(typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENQUIRY_ENDPOINT),
  },

  portrait: {
    // Do not use synthetic AI-generated face as real Wendy
    url: null,
    isApproved: false,
  },
};
