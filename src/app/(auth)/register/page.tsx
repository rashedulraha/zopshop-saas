import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - ZopShop",
  description: "Create a new ZopShop account for a 30-day free trial.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
