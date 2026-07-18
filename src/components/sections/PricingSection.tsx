"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Crown, Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    icon: <Rocket className="w-5 h-5" />,
    name: "Starter",
    price: "BDT 250",
    period: "/month",
    description: "Perfect for small shops just getting started.",
    features: ["Up to 500 products", "1 store location", "Basic reports", "Email support"],
    buttonText: "Start Free Trial",
    isPopular: false,
    iconBg: "bg-cyan-500/10 border border-cyan-500/20 text-cyan-500",
    accentColor: "text-cyan-500",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    name: "Growth",
    price: "BDT 300",
    period: "/month",
    description: "For growing businesses that need more power.",
    features: ["Unlimited products", "3 store locations", "Advanced analytics", "Priority support"],
    buttonText: "Start Free Trial",
    isPopular: true,
    iconBg: "bg-primary/10 border border-primary/20 text-primary",
    accentColor: "text-primary",
  },
  {
    icon: <Crown className="w-5 h-5" />,
    name: "Enterprise",
    price: "BDT 400",
    period: "/month",
    description: "Maximum performance for large scale operations.",
    features: ["Unlimited everything", "Unlimited locations", "Custom reports", "Dedicated support"],
    buttonText: "Contact Sales",
    isPopular: false,
    iconBg: "bg-purple-500/10 border border-purple-500/20 text-purple-500",
    accentColor: "text-purple-500",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-14 lg:py-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-cyan-400/4 blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-500/4 blur-[80px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        {/* Header */}
        <div className="relative z-10 mb-16 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sm text-primary text-xs font-semibold mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Pricing Plans
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            Simple pricing for{" "}
            <span className="text-gradient">every stage.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            Start with our 30-day free trial. No credit card required. Upgrade
            or downgrade at any time as your business grows.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              key={index}
              className="flex h-full"
            >
              <div
                className={cn(
                  "relative flex flex-col w-full rounded-3xl p-8 text-foreground transition-all duration-300",
                  plan.isPopular
                    ? "glass-xl shadow-[0_25px_60px_rgba(79,70,229,0.18)] dark:shadow-[0_25px_60px_rgba(79,70,229,0.25)] md:-mt-5 md:mb-5 ring-1 ring-primary/30"
                    : "bg-white/95 dark:bg-slate-800/80 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:-translate-y-1",
                )}
              >
                {/* Top shimmer accent */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-px rounded-t-3xl",
                  plan.isPopular
                    ? "bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                    : "bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent"
                )} />

                {/* Popular gradient top bar */}
                {plan.isPopular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-indigo-400 to-cyan-400 rounded-t-3xl" />
                )}

                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-indigo-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Icon & Name */}
                <div className="mb-6">
                  <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-2xl", plan.iconBg)}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/20 dark:border-white/5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.accentColor)} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={cn(
                    "w-full rounded-xl font-semibold h-12 transition-all duration-300",
                    plan.isPopular
                      ? "bg-primary hover:bg-primary-dark text-white shadow-[0_8px_25px_rgba(79,70,229,0.3)]"
                      : "glass-sm hover:bg-white/30 dark:hover:bg-slate-950/25 text-foreground border-white/30 dark:border-white/8",
                  )}
                >
                  <Link href="/register">{plan.buttonText}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full glass-sm px-6 py-2.5 text-sm text-muted-foreground shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            No credit card required for trial · Cancel anytime
          </div>
        </motion.div>
      </ResponsiveComponents>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
