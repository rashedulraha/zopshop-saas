import { AboutSection } from "@/components/sections/AboutSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { CTASection } from "@/components/sections/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About Us | ZopShop",
  description: "Learn more about our vision, mission, and the team behind ZopShop.",
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-24 bg-background">
      <Navbar />
      <main className="flex-1 w-full">
        <AboutSection />
        <div className="py-8 bg-background">
          <ImpactSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
