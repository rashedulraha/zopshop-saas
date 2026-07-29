"use client";

import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "BDT 250",
    period: "/month",
    description: "Perfect for single-location shops getting started.",
    buttonText: "Start 30-day free trial",
    isPopular: false,
    href: "/register?plan=starter",
    features: [
      "1 Store Location",
      "Up to 5 User Accounts",
      "Real-time Inventory Sync",
      "Standard Invoicing & Receipts",
      "Email & Chat Support",
    ],
  },
  {
    name: "Growth",
    price: "BDT 300",
    period: "/month",
    description: "For growing businesses scaling multi-branch operations.",
    buttonText: "Start 30-day free trial",
    isPopular: true,
    href: "/register?plan=growth",
    features: [
      "Up to 5 Store Locations",
      "Unlimited Team Accounts",
      "Advanced Inventory & Low Stock Alerts",
      "Real-time Analytics & Export",
      "Priority 24/7 Support",
      "Custom Receipt Branding",
    ],
  },
  {
    name: "Enterprise",
    price: "BDT 400",
    period: "/month",
    description: "Maximum security & dedicated infrastructure for enterprise scale.",
    buttonText: "Contact Sales",
    isPopular: false,
    href: "/contact",
    features: [
      "Unlimited Store Locations",
      "Custom Role & Permission ACL",
      "Dedicated Database & SLA",
      "Custom API Integrations",
      "Dedicated Account Manager",
      "Custom Training & Onboarding",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Predictable pricing with zero hidden fees
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            All plans include a 30-day free trial. No credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={`bg-card border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative shadow-sm hover:shadow-md ${
                plan.isPopular
                  ? "border-primary shadow-lg"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-border">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={plan.href}
                className={`w-full text-center text-sm font-semibold py-3 px-4 rounded-xl transition-all ${
                  plan.isPopular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                    : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
