import { OnboardingClient } from "@/components/auth/OnboardingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set Up Your Store - ZopShop",
  description: "Complete your store setup and start selling online in minutes.",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden relative">
      {/* Form Container */}
      <main className="flex-1 w-full flex items-center justify-center relative z-10 p-6 pt-32 pb-20">
        <OnboardingClient />
      </main>
    </div>
  );
}
