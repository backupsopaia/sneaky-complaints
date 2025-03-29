
import React from 'react';
import PricingTable from '@/components/PricingTable';
import HeroSection from '@/components/landing/HeroSection';
import TrustedBySection from '@/components/landing/TrustedBySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import FaqSection from '@/components/landing/FaqSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
        <PricingTable />
        <FaqSection />
      </main>
    </div>
  );
};

export default Index;
