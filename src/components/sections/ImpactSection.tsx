"use client";

import { Shield, TrendingUp, Clock, Users, CheckCircle2 } from "lucide-react";

const STATS = [
  {
    value: "45%",
    label: "Average Revenue Growth",
    description: "Merchants see immediate sales increase after switching to ZopShop.",
    icon: TrendingUp,
  },
  {
    value: "3x",
    label: "Faster Checkout Speed",
    description: "Process customer queues in seconds with optimized POS workflows.",
    icon: Clock,
  },
  {
    value: "99.99%",
    label: "Guaranteed Uptime",
    description: "Cloud infrastructure engineered for continuous zero-downtime execution.",
    icon: Shield,
  },
  {
    value: "10,000+",
    label: "Active Stores Worldwide",
    description: "Trusted by top engineering and commerce teams globally.",
    icon: Users,
  },
];

const FEATURES_LIST = [
  "Instant receipt generation via SMS & WhatsApp",
  "Offline-first POS transaction sync",
  "Real-time low-stock inventory alerts",
  "Multi-branch management from single dashboard",
];

export function ImpactSection() {
  return (
    <section id="impact" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            Proven Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Engineered for measurable business growth
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Real data from thousands of stores running on ZopShop infrastructure.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-4xl font-extrabold text-foreground font-mono tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-foreground mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to accelerate your store operations?
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Join thousands of businesses that trust ZopShop for daily checkout, inventory, and automated reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            {FEATURES_LIST.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-muted/60 border border-border px-3.5 py-2 rounded-xl text-xs text-foreground font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
