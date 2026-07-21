"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter",
    price: "BDT 250",
    period: "/month",
    description: "Perfect for small shops just getting started.",
    buttonText: "Start Free Trial",
    isPopular: false,
    features: [
      "1 User Account",
      "Basic Inventory",
      "Daily Reports",
      "Email Support",
    ],
  },
  {
    name: "Growth",
    price: "BDT 300",
    period: "/month",
    description: "For growing businesses that need more power.",
    buttonText: "Start Free Trial",
    isPopular: true,
    features: [
      "5 User Accounts",
      "Advanced Inventory",
      "Real-time Analytics",
      "Priority Support",
      "Custom Invoices",
    ],
  },
  {
    name: "Enterprise",
    price: "BDT 400",
    period: "/month",
    description: "Maximum performance for large scale operations.",
    buttonText: "Contact Sales",
    isPopular: false,
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
    <section id="pricing" className="relative overflow-hidden py-16 lg:py-24 bg-background">
      <ResponsiveComponents>
        <div className="container mx-auto max-w-5xl relative z-10 px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pricing Plans
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Simple pricing.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg font-normal text-muted-foreground leading-relaxed max-w-xl mx-auto"
            >
              Start with our 30-day free trial. Upgrade or downgrade at any time as your business grows.
            </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className={cn(
                  "relative flex flex-col p-8 rounded-2xl border transition-colors duration-300",
                  plan.isPopular
                    ? "bg-primary/5 border-primary shadow-lg shadow-primary/5"
                    : "bg-card border-border hover:border-primary/50"
                )}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                {/* Plan Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm font-normal text-muted-foreground leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm font-normal text-muted-foreground"
                    >
                      <span className="mr-3 font-mono text-primary/60">+</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={plan.buttonText === "Contact Sales" ? "/contact" : "/register"} className="w-full">
                  <Button
                    size="lg"
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full rounded-full font-semibold transition-all duration-300"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-xs font-normal text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              No credit card required for trial &middot; Cancel anytime
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
