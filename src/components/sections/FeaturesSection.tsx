"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const FEATURES_ROW_1 = [
  {
    category: "Store Inventory",
    title: "Real-time Stock Alerts",
    description: "Track inventory across branches. Auto-receive alerts when items run low.",
    slug: "inventory-management",
  },
  {
    category: "SaaS Billing",
    title: "Instant Invoicing",
    description: "Issue digital bills to SMS & WhatsApp immediately after checkout.",
    slug: "billing-system",
  },
  {
    category: "Business Analytics",
    title: "Live Sales Dashboard",
    description: "Monitor branch revenues, transaction totals, and top-selling items.",
    slug: "reports-analytics",
  },
  {
    category: "Security",
    title: "End-to-End Encryption",
    description: "Store data securely in encrypted cloud storage with automatic backups.",
    slug: "secure-data",
  },
];

const FEATURES_ROW_2 = [
  {
    category: "Staff Control",
    title: "Role-based Permissions",
    description: "Configure cashier access levels, store manager controls, and audit logs.",
    slug: "team-management",
  },
  {
    category: "POS Hardware",
    title: "Barcode Scanner Sync",
    description: "Seamlessly connect physical scanners, receipt printers, and cash drawers.",
    slug: "mobile-friendly",
  },
  {
    category: "Enterprise Scale",
    title: "Multi-branch Network",
    description: "Connect hundreds of outlets under one unified central headquarters admin.",
    slug: "reports-analytics",
  },
  {
    category: "Offline Mode",
    title: "Local Transaction Cache",
    description: "Continue scanning and sales checkout offline. Sync automatically when back online.",
    slug: "mobile-friendly",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20 lg:py-28 border-b border-border overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything built into ZopShop
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Explore our features organized in an interactive auto-sliding marquee grid.
          </p>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden mb-6 flex">
        {/* Gradient overlays to blur sides */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee py-2 flex">
          {[...FEATURES_ROW_1, ...FEATURES_ROW_1, ...FEATURES_ROW_1].map((feat, idx) => (
            <Link
              key={idx}
              href={`/features/${feat.slug}`}
              className="bg-card border border-border rounded-2xl p-6 min-w-[280px] sm:min-w-[320px] max-w-[320px] mx-3 flex flex-col justify-between shadow-sm hover:border-primary/40 hover:shadow-md transition-all group shrink-0"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {feat.category}
                </span>
                <h3 className="text-base font-bold text-foreground mt-4 mb-1 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  View details &rarr;
                </span>
                <CheckCircle2 className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative w-full overflow-hidden flex">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse py-2 flex">
          {[...FEATURES_ROW_2, ...FEATURES_ROW_2, ...FEATURES_ROW_2].map((feat, idx) => (
            <Link
              key={idx}
              href={`/features/${feat.slug}`}
              className="bg-card border border-border rounded-2xl p-6 min-w-[280px] sm:min-w-[320px] max-w-[320px] mx-3 flex flex-col justify-between shadow-sm hover:border-primary/40 hover:shadow-md transition-all group shrink-0"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {feat.category}
                </span>
                <h3 className="text-base font-bold text-foreground mt-4 mb-1 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  View details &rarr;
                </span>
                <CheckCircle2 className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
