import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Testimonials } from "../components/sections/Testimonials";
import { PricingSection } from "../components/sections/PricingSection";
import { CTASection } from "../components/sections/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
