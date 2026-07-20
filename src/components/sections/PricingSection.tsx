"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Crown, Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PLANS = [
  {
    icon: <Rocket className="w-5 h-5" />,
    name: "Starter",
    price: "BDT 250",
    period: "/month",
    description: "Perfect for small shops just getting started.",
    buttonText: "Start Free Trial",
    isPopular: false,
    iconBg:
      "bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    features: [
      "1 User Account",
      "Basic Inventory",
      "Daily Reports",
      "Email Support",
    ],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    name: "Growth",
    price: "BDT 300",
    period: "/month",
    description: "For growing businesses that need more power.",
    buttonText: "Start Free Trial",
    isPopular: true,
    iconBg:
      "bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400",
    features: [
      "5 User Accounts",
      "Advanced Inventory",
      "Real-time Analytics",
      "Priority Support",
      "Custom Invoices",
    ],
  },
  {
    icon: <Crown className="w-5 h-5" />,
    name: "Enterprise",
    price: "BDT 400",
    period: "/month",
    description: "Maximum performance for large scale operations.",
    buttonText: "Contact Sales",
    isPopular: false,
    iconBg:
      "bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400",
    features: [
      "Unlimited Users",
      "Multi-branch Support",
      "API Access",
      "24/7 Dedicated Support",
      "Custom Integrations",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-950/50"
    >
      {/* Ambient orbs (Matching Contact/FAQ theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <ResponsiveComponents>
        <div className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
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
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
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
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Start with our 30-day free trial. No credit card required. Upgrade
              or downgrade at any time as your business grows.
            </motion.p>
          </div>

          {/* Unified Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden bg-white dark:bg-slate-900">
              <CardContent className="p-0">
                {/* Grid Layout for Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
                  {PLANS.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={cn(
                        "relative flex flex-col p-8 lg:p-10 transition-colors duration-300",
                        plan.isPopular
                          ? "bg-blue-50/30 dark:bg-blue-900/10"
                          : "bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
                      )}
                    >
                      {/* Popular Badge */}
                      {plan.isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25">
                          Most Popular
                        </div>
                      )}

                      {/* Icon & Name */}
                      <div className="mb-6">
                        <div
                          className={cn(
                            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm border",
                            plan.iconBg,
                          )}
                        >
                          {plan.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-3 mb-10 flex-1">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

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
                        <Link href="/register">{plan.buttonText}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              No credit card required for trial · Cancel anytime
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
