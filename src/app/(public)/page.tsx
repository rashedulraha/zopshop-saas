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

        {/* 1. Show them exactly how it solves their problem first */}
        <HowItWorks />

        {/* 2. Deep dive into the capabilities */}
        <FeaturesSection />

        {/* 3. Show them it's built for their specific industry */}
        <UseCasesSection />

        {/* 4. Massive social proof right before pricing to build trust */}
        <Testimonials />

        {/* 5. The cost */}
        <PricingSection />

        {/* 6. Address any lingering doubts */}
        <FAQSection />

        {/* 7. Brand story / Mission (Good to have before the final push) */}
        <AboutSection />

        {/* 8. Final push to convert */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
