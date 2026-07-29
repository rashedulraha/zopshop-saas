import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ZopShop SaaS",
  description: "Privacy policy detailing data collection, security, and store owner protection at ZopShop.",
};

export default function PrivacyPage() {
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
          <Lock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mb-8">
          Last Updated: July 30, 2026
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-6 text-foreground text-sm leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Data We Collect</h2>
            <p className="text-muted-foreground">
              We collect information necessary to operate your business POS platform, including account email, store details, inventory records, sales transactions, and cashier activity logs.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">2. How We Use Your Data</h2>
            <p className="text-muted-foreground">
              Your business data is strictly used to provide POS transaction processing, calculate sales reports, generate inventory alerts, and process subscription renewals. We NEVER sell or share your store sales data to third parties.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">3. Security & Cloud Backups</h2>
            <p className="text-muted-foreground">
              We utilize PostgreSQL database encryption, HTTPS SSL transport layer security, and multi-tenant isolation to ensure store data remains confidential and protected against unauthorized access.
            </p>
          </section>

          <section className="space-y-2 border-t border-border pt-4">
            <h2 className="text-lg font-bold text-foreground">4. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or your store data rights, please contact our support team at <span className="font-semibold text-primary">support@zopshop.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
