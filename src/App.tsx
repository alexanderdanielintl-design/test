/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleShowcase } from './components/VehicleShowcase';
import { AboutWendy } from './components/AboutWendy';
import { WhyChooseWendy } from './components/WhyChooseWendy';
import { TikTokSection } from './components/TikTokSection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { LegalModal } from './components/LegalModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [preselectedVehicle, setPreselectedVehicle] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireVehicle = (vehicleModel: string) => {
    setPreselectedVehicle(vehicleModel);
    scrollToSection('contact');
  };

  const handleCustomSearch = () => {
    setPreselectedVehicle('Custom Inventory Allocation Search');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans selection:bg-[#EB0A1E]/15 selection:text-[#EB0A1E] w-full overflow-x-hidden min-w-[280px]">
      {/* Sticky Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onNavigateToVehicles={() => scrollToSection('vehicles')}
        onNavigateToContact={() => scrollToSection('contact')}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          language={language}
          onExploreVehicles={() => scrollToSection('vehicles')}
          onContactWendy={() => scrollToSection('contact')}
        />

        {/* 2. Vehicle Discovery Showcase */}
        <VehicleShowcase
          language={language}
          onEnquireVehicle={handleEnquireVehicle}
          onRequestCustomSearch={handleCustomSearch}
        />

        {/* 3. About Wendy Section */}
        <AboutWendy
          language={language}
          onContactWendy={() => scrollToSection('contact')}
        />

        {/* 4. Why Choose Wendy Section */}
        <WhyChooseWendy language={language} />

        {/* 5. TikTok Integration Section */}
        <TikTokSection language={language} />

        {/* 6. Customer Testimonials Placeholders */}
        <Testimonials language={language} />

        {/* 7. Contact & Lead Generation Section */}
        <ContactSection
          language={language}
          preselectedVehicle={preselectedVehicle}
          onClearPreselectedVehicle={() => setPreselectedVehicle('')}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenLegal={setLegalModalType}
        onNavigate={scrollToSection}
      />

      {/* Floating Action CTA */}
      <FloatingCTA
        language={language}
        onContactClick={() => scrollToSection('contact')}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        language={language}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
