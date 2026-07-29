"use client";

import { LogIn, Settings2, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Sign In & Create Account",
    subtitle: "Account",
    description:
      "Create your free account in seconds with zero credit card required. Get instant access to your complete SaaS management dashboard.",
    icon: LogIn,
  },
  {
    id: "02",
    title: "Configure Your Business",
    subtitle: "Setup",
    description:
      "Customize store profiles, add catalog items, set automated billing rates, and organize inventory with smart pre-configured templates.",
    icon: Settings2,
  },
  {
    id: "03",
    title: "Manage Operations",
    subtitle: "Scale",
    description:
      "Process transactions, monitor real-time incident logs, generate automatic reports, and scale revenue with absolute control.",
    icon: BarChart3,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            <span>How It Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Start operating in three simple steps
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed max-w-xl mx-auto">
            Zero complex setups. Sign up, configure your workspace, and start executing operations in under three minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all group relative flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      STEP {step.id}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-medium text-primary gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
