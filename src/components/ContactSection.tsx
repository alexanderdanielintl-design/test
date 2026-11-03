import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  ExternalLink,
  Inbox,
  X,
  Trash2,
  Download,
  Settings,
  Car,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Language, EnquirySubmission } from '../types';
import { translations } from '../data/translations';
import { vehicles } from '../data/vehicles';
import { contactConfig } from '../config/contact';
import { submitEnquiry, SubmissionResult } from '../services/enquiryService';

interface ContactSectionProps {
  language: Language;
  preselectedVehicle?: string;
  onClearPreselectedVehicle?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  preselectedVehicle,
  onClearPreselectedVehicle,
}) => {
  const t = translations[language].contact;
  const isEn = language === 'en';

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredVehicle, setPreferredVehicle] = useState(preselectedVehicle || '');
  const [estimatedBudget, setEstimatedBudget] = useState('30k-40k');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'phone' | 'text' | 'email' | 'whatsapp'>('text');
  const [timeframe, setTimeframe] = useState('this-month');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Status & Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<SubmissionResult | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // CRM Demo Inbox Drawer State
  const [showCrmInbox, setShowCrmInbox] = useState(false);
  const [savedLeads, setSavedLeads] = useState<EnquirySubmission[]>([]);

  // Sync preselected vehicle if updated from parent
  useEffect(() => {
    if (preselectedVehicle) {
      setPreferredVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Load existing test submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wendy_demo_leads');
      if (stored) {
        setSavedLeads(JSON.parse(stored));
      } else {
        const seedLead: EnquirySubmission = {
          id: 'demo-lead-1',
          fullName: 'Carlos Mendoza',
          email: 'carlos.m@example.com',
          phone: '(512) 555-0182',
          preferredVehicle: 'Toyota RAV4 Hybrid',
          estimatedBudget: '$30,000 – $40,000',
          preferredContactMethod: 'whatsapp',
          timeframe: 'Within 30 days',
          message: 'Hola Wendy, busco una RAV4 Hybrid XSE para mi familia en North Austin. ¿Tienen unidades en tránsito para este mes?',
          submittedAt: 'Today at 2:15 PM',
          language: 'es',
        };
        setSavedLeads([seedLead]);
        localStorage.setItem('wendy_demo_leads', JSON.stringify([seedLead]));
      }
    } catch (e) {
      console.warn('Storage read failed', e);
    }
  }, []);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = t.errors.nameRequired;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = t.errors.emailInvalid;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errs.phone = t.errors.phoneInvalid;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredVehicle: preferredVehicle.trim() || 'General Toyota Inquiry',
      estimatedBudget: t.budgetOptions.find((b) => b.value === estimatedBudget)?.label || estimatedBudget,
      preferredContactMethod,
      timeframe: t.timeframeOptions.find((tf) => tf.value === timeframe)?.label || timeframe,
      message: message.trim() || (isEn ? 'Requested personalized inventory advice.' : 'Solicitó asesoría de inventario personalizada.'),
      language,
    };

    const result = await submitEnquiry(payload, language);

    setIsSubmitting(false);
    setSubmissionFeedback(result);

    if (result.success) {
      try {
        const stored = localStorage.getItem('wendy_demo_leads');
        if (stored) setSavedLeads(JSON.parse(stored));
      } catch (err) {
        console.warn('Storage read error', err);
      }

      setShowSuccessModal(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      if (onClearPreselectedVehicle) onClearPreselectedVehicle();
    }
  };

  const clearDemoLeads = () => {
    setSavedLeads([]);
    localStorage.removeItem('wendy_demo_leads');
  };

  const exportLeadsCsv = () => {
    if (savedLeads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Vehicle', 'Budget', 'Method', 'Message'];
    const rows = savedLeads.map((l) => [
      l.id,
      `"${l.submittedAt}"`,
      `"${l.fullName}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.preferredVehicle}"`,
      `"${l.estimatedBudget}"`,
      `"${l.preferredContactMethod}"`,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wendy_Goodridge_Toyota_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-white text-[#171717] border-t border-neutral-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
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

        {/* Independent Salesperson Disclaimer */}
        <div className="mb-8 sm:mb-10 p-3.5 sm:p-4 rounded-xl bg-neutral-100 border border-neutral-300 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-[#EB0A1E] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
            {t.contactDisclaimer}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Consultation Channels */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <div className="p-4 min-[380px]:p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-300">
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                {t.directTitle}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal mb-5 sm:mb-6">
                {t.directText}
              </p>

              {/* Working Contact Links with Verification State Notices */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Telephone */}
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#EB0A1E] shrink-0" />
                      <span>{isEn ? 'Telephone (Call / Text)' : 'Teléfono (Llamada / SMS)'}</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                      {contactConfig.phone.isVerified ? 'Verified' : 'Placeholder'}
                    </span>
                  </div>
                  {contactConfig.phone.isVerified ? (
                    <a
                      href={`tel:${contactConfig.phone.tel}`}
                      className="text-xs sm:text-sm font-bold text-[#EB0A1E] hover:underline"
                    >
                      {contactConfig.phone.display}
                    </a>
                  ) : (
                    <div>
                      <p className="text-xs text-neutral-600 font-medium">
                        {isEn ? contactConfig.phone.noticeEn : contactConfig.phone.noticeEs}
                      </p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#EB0A1E] shrink-0" />
                      <span>{isEn ? 'Direct Email' : 'Correo Directo'}</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                      {contactConfig.email.isVerified ? 'Verified' : 'Placeholder'}
                    </span>
                  </div>
                  {contactConfig.email.isVerified ? (
                    <a
                      href={`mailto:${contactConfig.email.address}`}
                      className="text-xs sm:text-sm font-bold text-[#EB0A1E] hover:underline truncate block"
                    >
                      {contactConfig.email.address}
                    </a>
                  ) : (
                    <div>
                      <p className="text-xs text-neutral-600 font-medium">
                        {isEn ? contactConfig.email.noticeEn : contactConfig.email.noticeEs}
                      </p>
                    </div>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>WhatsApp</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                      {contactConfig.whatsapp.isVerified ? 'Verified' : 'Placeholder'}
                    </span>
                  </div>
                  {contactConfig.whatsapp.isVerified ? (
                    <a
                      href={`https://wa.me/${contactConfig.whatsapp.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <span>{contactConfig.whatsapp.display}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div>
                      <p className="text-xs text-neutral-600 font-medium">
                        {isEn ? contactConfig.whatsapp.noticeEn : contactConfig.whatsapp.noticeEs}
                      </p>
                    </div>
                  )}
                </div>

                {/* TikTok Profile Link */}
                <div className="p-3 rounded-xl bg-white border border-neutral-200">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <svg className="w-4 h-4 fill-[#EB0A1E] shrink-0" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.32-6.32V8.92a8.16 8.16 0 0 0 4.92 1.62V7.1a4.84 4.84 0 0 1-1-.41Z" />
                      </svg>
                      <span>TikTok Profile</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active & Verified
                    </span>
                  </div>
                  <a
                    href={contactConfig.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-[#EB0A1E] hover:underline flex items-center gap-1"
                  >
                    <span>@wendy_good24</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-neutral-200 space-y-2.5 text-xs text-neutral-700 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#EB0A1E] shrink-0" />
                  <span>{t.dealershipArea}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#EB0A1E] shrink-0" />
                  <span>{t.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Demonstration System Notice & Simulated CRM Button */}
            <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                <Settings className="w-3.5 h-3.5 text-[#EB0A1E]" />
                <span>{isEn ? 'Sales Concept Demonstration' : 'Demostración de Ventas'}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {t.demoNotice}
              </p>

              <button
                type="button"
                onClick={() => setShowCrmInbox(true)}
                className="w-full min-h-[44px] py-2.5 px-4 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] rounded-md transition-all border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Inbox className="w-4 h-4 text-[#EB0A1E]" />
                <span>{t.viewInboxBtn}</span>
                {savedLeads.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#EB0A1E] font-bold">
                    {savedLeads.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Lead Capture Form - Fully responsive sizing */}
          <div className="lg:col-span-7 bg-white p-4 min-[380px]:p-6 sm:p-8 rounded-2xl border border-neutral-300 shadow-sm w-full">
            {preselectedVehicle && (
              <div className="mb-5 sm:mb-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between text-xs text-[#EB0A1E]">
                <div className="flex items-center gap-2 font-medium truncate">
                  <Car className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {isEn ? 'Selected for Enquiry:' : 'Seleccionado para Consulta:'}{' '}
                    <strong>{preselectedVehicle}</strong>
                  </span>
                </div>
                {onClearPreselectedVehicle && (
                  <button
                    type="button"
                    onClick={onClearPreselectedVehicle}
                    aria-label="Clear selected vehicle"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-neutral-900 font-bold text-base cursor-pointer shrink-0"
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Error banner for duplicate or network delivery errors */}
            {submissionFeedback && !submissionFeedback.success && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-start gap-3"
              >
                <ShieldAlert className="w-5 h-5 text-[#EB0A1E] shrink-0 mt-0.5" />
                <p className="font-semibold leading-relaxed">
                  {submissionFeedback.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="user_work_title"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Full Name */}
              <div>
                <label htmlFor="input-full-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  {t.nameLabel} <span className="text-[#EB0A1E]">*</span>
                </label>
                <input
                  id="input-full-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder={t.namePlaceholder}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border transition-colors bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E] ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                  }`}
                />
                {errors.fullName && (
                  <p id="error-full-name" role="alert" className="mt-1 text-xs text-red-700 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                    {t.emailLabel} <span className="text-[#EB0A1E]">*</span>
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder={t.emailPlaceholder}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border transition-colors bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E] ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                    }`}
                  />
                  {errors.email && (
                    <p id="error-email" role="alert" className="mt-1 text-xs text-red-700 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="input-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                    {t.phoneLabel} <span className="text-[#EB0A1E]">*</span>
                  </label>
                  <input
                    id="input-phone"
                    type="tel"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder={t.phonePlaceholder}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border transition-colors bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E] ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && (
                    <p id="error-phone" role="alert" className="mt-1 text-xs text-red-700 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Vehicle of Interest */}
              <div>
                <label htmlFor="select-vehicle" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  {t.vehicleLabel}
                </label>
                <div className="relative">
                  <select
                    id="select-vehicle"
                    value={preferredVehicle}
                    onChange={(e) => setPreferredVehicle(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E]"
                  >
                    <option value="">{t.vehiclePlaceholder}</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.model}>
                        {v.year} {v.model} ({v.popularTrim})
                      </option>
                    ))}
                    <option value="General Inventory Inquiry">
                      {isEn ? 'Other Toyota / General Inquiry' : 'Otro Toyota / Consulta General'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 4: Budget & Contact Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="select-budget" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                    {t.budgetLabel}
                  </label>
                  <select
                    id="select-budget"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E]"
                  >
                    {t.budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                    {t.contactMethodLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-lg">
                    {(['text', 'phone', 'email', 'whatsapp'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContactMethod(method)}
                        className={`min-h-[40px] py-2 px-1.5 text-[11px] min-[360px]:text-xs font-bold rounded-md transition-colors text-center cursor-pointer whitespace-nowrap truncate ${
                          preferredContactMethod === method
                            ? 'bg-white text-neutral-950 shadow-xs border border-neutral-300'
                            : 'text-neutral-700 hover:text-neutral-950'
                        }`}
                      >
                        {t.contactMethodOptions[method]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Purchase Timeframe - Responsive 1 -> 2 -> 4 columns */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  {t.timeframeLabel}
                </label>
                <div className="grid grid-cols-1 min-[340px]:grid-cols-2 sm:grid-cols-4 gap-2">
                  {t.timeframeOptions.map((tf) => (
                    <button
                      key={tf.value}
                      type="button"
                      onClick={() => setTimeframe(tf.value)}
                      className={`min-h-[44px] py-2 px-2.5 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer truncate ${
                        timeframe === tf.value
                          ? 'border-[#EB0A1E] bg-red-50 text-[#EB0A1E] font-bold'
                          : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Additional Message */}
              <div>
                <label htmlFor="textarea-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  {t.messageLabel}
                </label>
                <textarea
                  id="textarea-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#EB0A1E]/30 focus:border-[#EB0A1E]"
                />
              </div>

              {/* Clear Warning BEFORE submit button */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {contactConfig.endpoint.isConfigured
                    ? t.endpointConfiguredNotice
                    : t.demoWarning}
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 px-6 text-sm font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] active:scale-[0.99] disabled:opacity-75 rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal - Fluid sizing */}
      {showSuccessModal && submissionFeedback?.enquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-8 shadow-2xl border border-neutral-200 text-center max-h-[90vh] overflow-y-auto"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-emerald-200">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 id="success-modal-title" className="text-lg sm:text-2xl font-extrabold text-neutral-900 mb-2">
              {t.success.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-5 sm:mb-6 font-medium">
              {submissionFeedback.message}
            </p>

            <div className="bg-neutral-50 rounded-xl p-3.5 sm:p-4 text-left border border-neutral-200 text-xs space-y-2 mb-5 sm:mb-6">
              <span className="font-bold uppercase tracking-wider text-neutral-500 block pb-1 border-b border-neutral-200 text-[10px] sm:text-xs">
                {t.success.receiptLabel}
              </span>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-600 font-medium shrink-0">{t.nameLabel}:</span>
                <span className="font-bold text-neutral-900 truncate">{submissionFeedback.enquiry.fullName}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-600 font-medium shrink-0">{t.vehicleLabel}:</span>
                <span className="font-bold text-neutral-900 truncate">{submissionFeedback.enquiry.preferredVehicle}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-neutral-600 font-medium shrink-0">{t.contactMethodLabel}:</span>
                <span className="font-bold text-neutral-900 uppercase shrink-0">{submissionFeedback.enquiry.preferredContactMethod}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowCrmInbox(true);
                }}
                className="w-full min-h-[44px] py-2.5 px-4 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors flex items-center justify-center"
              >
                {isEn ? 'Preview This Lead in Demonstration Inbox' : 'Ver Este Prospecto en la Bandeja Demo'}
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full min-h-[44px] py-2.5 px-4 text-sm font-bold text-white bg-[#EB0A1E] hover:bg-[#d00819] rounded-md transition-colors flex items-center justify-center"
              >
                {t.success.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated CRM Lead Inbox Drawer - Fluid responsive modal */}
      {showCrmInbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inbox-modal-title"
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
          >
            <div className="p-3.5 sm:p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EB0A1E] flex items-center justify-center text-white shrink-0">
                  <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 id="inbox-modal-title" className="text-sm sm:text-base font-bold text-white truncate">
                    {isEn ? 'Wendy Goodridge · Client Inquiries (Demonstration Inbox)' : 'Wendy Goodridge · Consultas de Clientes (Bandeja Demo)'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                    {isEn
                      ? 'Demonstrating how website enquiries are captured & organized in real time'
                      : 'Demostración de cómo se capturan y organizan las consultas web'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCrmInbox(false)}
                aria-label="Close demonstration inbox"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white rounded-md shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 sm:p-4 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <span className="text-xs font-semibold text-neutral-700">
                {isEn ? `Total Inquiries: ${savedLeads.length}` : `Consultas Totales: ${savedLeads.length}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportLeadsCsv}
                  disabled={savedLeads.length === 0}
                  className="min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{isEn ? 'Export CSV' : 'Exportar CSV'}</span>
                </button>
                <button
                  type="button"
                  onClick={clearDemoLeads}
                  disabled={savedLeads.length === 0}
                  className="min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-neutral-300 text-red-700 hover:bg-red-50 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Clear' : 'Borrar'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-3 sm:space-y-4">
              {savedLeads.length === 0 ? (
                <div className="py-10 text-center text-neutral-500 text-xs sm:text-sm">
                  {isEn ? 'No test inquiries yet. Submit the form above to see one appear here!' : 'No hay consultas aún. ¡Envía el formulario arriba para ver una aquí!'}
                </div>
              ) : (
                savedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 sm:p-4 rounded-xl border border-neutral-200 bg-white hover:border-[#EB0A1E]/40 transition-colors shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="font-bold text-neutral-900 text-xs sm:text-sm">{lead.fullName}</span>
                        <span className="text-xs text-neutral-400">·</span>
                        <span className="text-xs font-semibold text-[#EB0A1E] bg-red-50 px-2 py-0.5 rounded-sm">
                          {lead.preferredVehicle}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-neutral-500 tabular-nums">
                        {lead.submittedAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-700 mb-2.5 bg-neutral-50 p-2 sm:p-2.5 rounded-lg border border-neutral-100">
                      <div>
                        <span className="text-neutral-500 font-semibold block text-[10px]">Email:</span>
                        <span className="font-medium text-neutral-900 truncate block">{lead.email}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold block text-[10px]">Phone:</span>
                        <span className="font-medium text-neutral-900">{lead.phone}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-semibold block text-[10px]">Contact Via / Time:</span>
                        <span className="font-medium text-neutral-900 uppercase">{lead.preferredContactMethod} · {lead.timeframe}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-800 italic bg-white border-l-2 border-[#EB0A1E] pl-2.5 py-1">
                      "{lead.message}"
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 sm:p-4 bg-neutral-50 border-t border-neutral-200 text-right shrink-0">
              <button
                type="button"
                onClick={() => setShowCrmInbox(false)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2 text-xs font-bold text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 rounded-md cursor-pointer flex items-center justify-center"
              >
                {isEn ? 'Close Inbox' : 'Cerrar Bandeja'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
