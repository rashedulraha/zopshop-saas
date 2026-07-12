"use client";

import ResponsiveComponents from "../providers/ResponsiveComponents";
import { UserPlus, Store, ShoppingBag } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: <UserPlus className="w-6 h-6" />,
    title: "Sign Up Free",
    description:
      "Create your account in seconds — no credit card required. Start with our free 30-day trial.",
    iconContainerClasses: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    badgeClasses: "bg-cyan-400 text-primary-foreground",
    lineClasses: "bg-cyan-400",
  },
  {
    number: "02",
    icon: <Store className="w-6 h-6" />,
    title: "Create Your Store",
    description:
      "Set up your store details, add your branding, and configure your inventory categories.",
    iconContainerClasses: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    badgeClasses: "bg-purple-400 text-primary-foreground",
    lineClasses: "bg-purple-400",
  },
  {
    number: "03",
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Start Selling",
    description:
      "Add products, set prices, and start managing your inventory and sales from day one.",
    iconContainerClasses: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    badgeClasses: "bg-emerald-400 text-primary-foreground",
    lineClasses: "bg-emerald-400",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 lg:py-16 relative z-10 overflow-hidden px-4">
      {/* Background orb */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[80px]"
      />

      {/* Mesh grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-20 relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-5 leading-tight">
            From Setup to <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Scaling</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From signup to your first sale — it takes less than 5 minutes to get
            started with ZopShop.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 left-[18%] right-[18%] h-px pointer-events-none bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className="relative p-8 rounded-xl bg-card border border-border transition-all duration-300 hover:bg-muted hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-center text-center gap-5 group">
                {/* Number badge + icon */}
                <div className="relative z-10">
                  {/* Hexagon style icon container */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 border ${step.iconContainerClasses}`}>
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step.badgeClasses}`}>
                    {step.number}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-3 tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`w-12 h-0.5 rounded-full opacity-50 group-hover:opacity-100 group-hover:w-20 transition-all duration-500 ${step.lineClasses}`} />
              </div>
            ))}
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
