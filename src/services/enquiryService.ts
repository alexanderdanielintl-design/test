/**
 * Enquiry Submission Service
 * 
 * Handles field validation, duplicate detection, and submission to real backend endpoints.
 * Never claims an enquiry was delivered if the endpoint is not configured or fails.
 */

import { EnquirySubmission, Language } from '../types';
import { contactConfig } from '../config/contact';

export interface SubmissionResult {
  success: boolean;
  status: 'delivered' | 'demo_stored' | 'duplicate_blocked' | 'endpoint_error' | 'validation_error';
  message: string;
  enquiry?: EnquirySubmission;
  httpStatus?: number;
}

// In-memory cache of recent submission fingerprints to prevent accidental duplicates
const recentSubmissionHashes = new Set<string>();

function generateFingerprint(data: Partial<EnquirySubmission>): string {
  return `${data.email?.toLowerCase().trim()}_${data.preferredVehicle?.trim()}_${data.phone?.replace(/\D/g, '')}`;
}

export async function submitEnquiry(
  payload: Omit<EnquirySubmission, 'id' | 'submittedAt'>,
  language: Language
): Promise<SubmissionResult> {
  const isEn = language === 'en';

  // 1. Validation
  if (!payload.fullName?.trim()) {
    return {
      success: false,
      status: 'validation_error',
      message: isEn ? 'Full name is required.' : 'El nombre completo es obligatorio.',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    return {
      success: false,
      status: 'validation_error',
      message: isEn ? 'A valid email address is required.' : 'Se requiere un correo electrónico válido.',
    };
  }

  const digits = payload.phone?.replace(/\D/g, '') || '';
  if (digits.length < 10) {
    return {
      success: false,
      status: 'validation_error',
      message: isEn ? 'A valid 10-digit phone number is required.' : 'Se requiere un número de teléfono válido de 10 dígitos.',
    };
  }

  // 2. Duplicate Submission Prevention
  const fingerprint = generateFingerprint(payload);
  if (recentSubmissionHashes.has(fingerprint)) {
    return {
      success: false,
      status: 'duplicate_blocked',
      message: isEn
        ? 'A vehicle enquiry with this email and phone was already submitted moments ago. To submit changes, please wait 60 seconds.'
        : 'Ya se envió una consulta con este correo y teléfono hace unos momentos. Por favor espera 60 segundos para enviar otra.',
    };
  }

  const enquiry: EnquirySubmission = {
    id: `enquiry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...payload,
    submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
  };

  // 3. Real Endpoint Dispatch
  const endpointUrl = contactConfig.endpoint.url || '/api/enquiries';
  const hasRealEndpoint = contactConfig.endpoint.isConfigured;

  if (hasRealEndpoint) {
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        let errDetails = '';
        try {
          const errJson = await response.json();
          errDetails = errJson.message || errJson.error || '';
        } catch {
          // ignore non-json
        }

        return {
          success: false,
          status: 'endpoint_error',
          httpStatus: response.status,
          message: isEn
            ? `Submission delivery failed (HTTP ${response.status}${errDetails ? `: ${errDetails}` : ''}). The enquiry was NOT delivered.`
            : `El envío de la consulta falló (HTTP ${response.status}${errDetails ? `: ${errDetails}` : ''}). La consulta NO fue entregada.`,
        };
      }

      // Mark duplicate fingerprint only on successful dispatch
      recentSubmissionHashes.add(fingerprint);
      setTimeout(() => recentSubmissionHashes.delete(fingerprint), 60000);

      // Save locally as backup
      storeLocalDemoLead(enquiry);

      return {
        success: true,
        status: 'delivered',
        enquiry,
        message: isEn
          ? 'Your vehicle enquiry has been securely transmitted to Wendy Goodridge.'
          : 'Tu consulta ha sido transmitida de manera segura a Wendy Goodridge.',
      };
    } catch (netErr: any) {
      return {
        success: false,
        status: 'endpoint_error',
        message: isEn
          ? `Network error while contacting delivery endpoint (${netErr?.message || 'Connection refused'}). Your enquiry was NOT delivered.`
          : `Error de red al conectar con el servidor (${netErr?.message || 'Conexión rechazada'}). Tu consulta NO fue entregada.`,
      };
    }
  }

  // 4. Demonstration Mode (No Real Endpoint Configured)
  // In accordance with audit requirements: NEVER claim it was delivered when endpoint is not configured!
  recentSubmissionHashes.add(fingerprint);
  setTimeout(() => recentSubmissionHashes.delete(fingerprint), 60000);
  storeLocalDemoLead(enquiry);

  return {
    success: true,
    status: 'demo_stored',
    enquiry,
    message: isEn
      ? 'Demonstration Test Recorded: Stored locally in your browser demo inbox. Note: This website does not have a live CRM or email endpoint configured yet, so this was NOT dispatched to Wendy.'
      : 'Prueba de Demostración Registrada: Guardada localmente en la bandeja demo de tu navegador. Nota: El sitio web aún no tiene un CRM o correo configurado, por lo que NO fue enviada a Wendy.',
  };
}

function storeLocalDemoLead(lead: EnquirySubmission) {
  try {
    const existing = localStorage.getItem('wendy_demo_leads');
    const list: EnquirySubmission[] = existing ? JSON.parse(existing) : [];
    const updated = [lead, ...list];
    localStorage.setItem('wendy_demo_leads', JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.warn('Unable to store demo lead in localStorage', err);
  }
}
