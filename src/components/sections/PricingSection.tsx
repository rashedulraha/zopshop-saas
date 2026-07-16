"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Crown, Rocket, Sparkles } from "lucide-react";
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
    iconContainerClasses: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    name: "Growth",
    price: "BDT 300",
    period: "/month",
    description: "For growing businesses that need more power.",
    buttonText: "Start Free Trial",
    isPopular: true,
    iconContainerClasses: "bg-primary/10 border-primary/20 text-primary",
  },
  {
    icon: <Crown className="w-5 h-5" />,
    name: "Enterprise",
    price: "BDT 400",
    period: "/month",
    description: "Maximum performance for large scale operations.",
    buttonText: "Contact Sales",
    isPopular: false,
    iconContainerClasses:
      "bg-purple-500/10 border-purple-500/20 text-purple-500",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 overflow-hidden px-4 py-24 lg:py-32 bg-background border-t border-border"
    >
      <ResponsiveComponents>
        {/* Header */}
        <div className="relative z-10 mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-8"
          >
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
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:items-stretch">
          {PLANS.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              key={index}
              className="flex h-full"
            >
              <div
                className={cn(
                  "relative flex flex-col w-full rounded-3xl p-8 bg-card text-foreground transition-all duration-300",
                  plan.isPopular
                    ? "border-2 border-primary md:-mt-4 md:mb-4"
                    : "border border-border",
                )}
              >
                {/* Popular Flat Indicator */}
                {plan.isPopular && (
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-primary" />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Popular Badge */}
                    {plan.isPopular && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                        Most Popular
                      </div>
                    )}

                    {/* Icon & Name */}
                    <div className="mb-6">
                      <div
                        className={cn(
                          "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border",
                          plan.iconContainerClasses,
                        )}
                      >
                        {plan.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl lg:text-5xl font-black tracking-tight text-foreground font-normal">
                          {plan.price}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button
                      size="lg"
                      variant={plan.isPopular ? "default" : "outline"}
                      className={cn(
                        "w-full rounded-xl font-semibold h-12 transition-all duration-300",
                        plan.isPopular
                          ? "bg-primary hover:bg-primary-dark text-white border-none"
                          : "border-border bg-card text-foreground hover:bg-muted hover:border-primary/30",
                      )}
                    >
                      <Link href="/register">{plan.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-border/50 bg-card/10 px-6 py-2.5 text-sm text-muted-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            No credit card required for trial · Cancel anytime
          </div>
        </motion.div>
      </ResponsiveComponents>
    </section>
  );
}
