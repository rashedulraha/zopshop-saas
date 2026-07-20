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
    buttonText: "Contact Sales",
    isPopular: false,
    iconBg: "bg-purple-500/10 border border-purple-500/20 text-purple-500",
    accentColor: "text-purple-500",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-950/50">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px]" />
      </div>

      <ResponsiveComponents>
        {/* Header */}
        <div className="relative z-10 mb-16 md:mb-24 flex flex-col items-center text-center max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Pricing Plans
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Simple pricing for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              every stage.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
          >
            Start with our 30-day free trial. No credit card required. Upgrade
            or downgrade at any time as your business grows.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:gap-8 md:grid-cols-3 md:items-stretch px-4 sm:px-6">
          {PLANS.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              key={index}
              className="flex h-full"
            >
              <div
                className={cn(
                  "relative flex flex-col w-full rounded-3xl p-8 sm:p-10 transition-all duration-300",
                  plan.isPopular
                    ? "bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 border-2 border-blue-500 dark:border-blue-400 md:-mt-5 md:mb-5 z-20"
                    : "bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-2xl hover:-translate-y-1 z-10",
                )}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25">
                    Most Popular
                  </div>
                )}

                {/* Icon & Name */}
                <div className="mb-6">
                  <div
                    className={cn(
                      "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm border",
                      plan.iconBg,
                    )}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                {/* CTA Button */}
                <Button
                  size="lg"
                  className={cn(
                    "w-full rounded-xl font-semibold h-12 transition-all duration-300 mt-auto",
                    plan.isPopular
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-0",
                  )}
                >
                  <Link href="/register" className="w-full h-full flex items-center justify-center">{plan.buttonText}</Link>
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
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            No credit card required for trial · Cancel anytime
          </div>
        </motion.div>
      </ResponsiveComponents>
    </section>
  );
}
