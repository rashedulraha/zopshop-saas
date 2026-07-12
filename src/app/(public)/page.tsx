import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutSection } from "@/components/sections/AboutSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-background">
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <Testimonials />
        <AboutSection />
        <UseCasesSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
