import { LoginForm } from "@/app/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ZopShop",
  description: "Sign in to your ZopShop account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
