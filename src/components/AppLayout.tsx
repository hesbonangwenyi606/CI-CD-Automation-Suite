import React from 'react';
import Navbar from './cicd/Navbar';
import HeroSection from './cicd/HeroSection';
import MetricsBar from './cicd/MetricsBar';
import PipelineExamples from './cicd/PipelineExamples';
import FeatureGrid from './cicd/FeatureGrid';
import StatusDashboard from './cicd/StatusDashboard';
import TerminalDemo from './cicd/TerminalDemo';
import TechStack from './cicd/TechStack';
import PricingSection from './cicd/PricingSection';
import IntegrationGrid from './cicd/IntegrationGrid';
import TestimonialsSection from './cicd/TestimonialsSection';
import CTASection from './cicd/CTASection';
import FooterSection from './cicd/FooterSection';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E27] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MetricsBar />
      <PipelineExamples />
      <FeatureGrid />
      <StatusDashboard />
      <TerminalDemo />
      <TechStack />
      <TestimonialsSection />
      <PricingSection />
      <IntegrationGrid />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default AppLayout;
