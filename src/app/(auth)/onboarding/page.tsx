import { OnboardingForm } from "@/app/components/auth/OnboardingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set Up Your Store - ZopShop",
  description: "Complete your store setup and start selling online in minutes.",
};

export default function OnboardingPage() {
  return <OnboardingForm />;
}
