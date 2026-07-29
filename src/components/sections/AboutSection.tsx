"use client";

import { Target, Building2, Layers, Lightbulb, Users, Globe } from "lucide-react";

const ABOUT_CARDS = [
  {
    id: "01",
    title: "Our Mission",
    subtitle: "Vision",
    description:
      "ZopShop is your digital transformation partner. We believe every business deserves high-speed SaaS infrastructure and AI-native management access.",
    icon: Target,
    stat: "10K+",
    statLabel: "Active Stores",
  },
  {
    id: "02",
    title: "For Every Business",
    subtitle: "Inclusive",
    description:
      "Grocery, retail, hardware, pharmacy, restaurants—every business type gets instant tailored management workflows with zero code complex setup.",
    icon: Building2,
    stat: "15+",
    statLabel: "Industries Supported",
  },
  {
    id: "03",
    title: "Unified Platform",
    subtitle: "Complete",
    description:
      "Billing, inventory tracking, incident monitoring, and analytics all operating synchronously in one unified dark-themed dashboard.",
    icon: Layers,
    stat: "99.99%",
    statLabel: "Uptime SLA",
  },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: "Simplicity First",
    description: "Complex operational workflows simplified into one-click actions.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Built strictly around real merchant feedback and daily usability needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Multi-currency, multi-location store support out of the box.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            About ZopShop
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built for modern engineering & commerce
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            We are building the fastest, most reliable business infrastructure platform for the next decade.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ABOUT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {card.subtitle}
                    </span>
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{card.statLabel}</span>
                  <span className="text-lg font-bold text-foreground font-mono">{card.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card border border-border rounded-2xl p-8 shadow-sm">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{val.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
