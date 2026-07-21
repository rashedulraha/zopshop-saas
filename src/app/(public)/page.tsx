import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { AboutSection } from "@/components/sections/AboutSection";

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-background text-foreground">
      <Navbar />
      <main className="flex-1 relative z-10 flex flex-col pb-24">
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <AboutSection />
        <ImpactSection />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
