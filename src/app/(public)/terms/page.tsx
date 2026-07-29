import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ZopShop SaaS",
  description: "Terms of service and user agreements for ZopShop Business Management & POS platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen pt-28 pb-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mb-8">
          Last Updated: July 30, 2026
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-6 text-foreground text-sm leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to ZopShop SaaS. By accessing or using our website, POS mobile application, and cloud management services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">2. Account Registration & Multi-Tenant Stores</h2>
            <p className="text-muted-foreground">
              You must provide accurate, complete information when creating a store account. As a store owner, you are responsible for maintaining the security of your cashier credentials, employee access levels, and POS terminal credentials.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">3. Subscription Billing & Payments</h2>
            <p className="text-muted-foreground">
              ZopShop provides Free, Pro, and Enterprise subscription plans. Billing is processed on a monthly or annual recurring basis. Payments made through local gateways (bKash, Nagad) or international credit cards are subject to processing terms.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">4. Data Ownership & Security</h2>
            <p className="text-muted-foreground">
              Your store transaction data, inventory logs, and customer ledgers belong entirely to you. We employ industry-standard encryption, SSL protocols, and automated cloud backups to safeguard your business information.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">5. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate accounts that violate our security policies or engage in illegal commercial activities. You may export your store data and cancel your subscription at any time from your account settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
