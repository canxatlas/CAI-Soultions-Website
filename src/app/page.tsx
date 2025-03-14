import HeroSection from './components/home/HeroSection';
import FeaturesSection from './components/home/FeaturesSection';
import DemoSection from './components/home/DemoSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import PricingSection from './components/home/PricingSection';
import ContactSection from './components/home/ContactSection';
import { ConnectionsSection } from '@/app/components/home/ConnectionsSection';
import { PricingEstimator } from '@/app/components/home/PricingEstimator';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <ConnectionsSection />
      <TestimonialsSection />
      <PricingEstimator />
      <PricingSection />
      <ContactSection />
    </>
  );
}
