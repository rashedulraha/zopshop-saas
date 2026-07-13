"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Crown, Rocket, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    icon: <Rocket className="w-5 h-5" />,
    name: "Starter",
    price: "BDT 500",
    period: "/month",
    description: "Perfect for small shops just getting started.",
    buttonText: "Start Free Trial",
    isPopular: false,
    cardClasses: "border-border/50 bg-card/50 backdrop-blur-sm",
    iconContainerClasses: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    priceGradient: "from-white to-cyan-100",
    features: [
      "Up to 1,000 products",
      "Basic sales analytics",
      "1 Store location",
      "2 Staff accounts",
      "Email support",
    ],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    name: "Growth",
    price: "BDT 1,200",
    period: "/month",
    description: "For growing businesses that need more power.",
    buttonText: "Start Free Trial",
    isPopular: true,
    cardClasses:
      "border-primary/50 bg-gradient-to-b from-card via-card to-primary/5 shadow-[0_0_40px_-15px_rgba(6,182,212,0.3)] relative overflow-hidden",
    iconContainerClasses: "bg-primary/20 border-primary/40 text-primary",
    priceGradient: "from-white to-cyan-400",
    features: [
      "Unlimited products",
      "Advanced reporting & AI insights",
      "Up to 3 Store locations",
      "10 Staff accounts",
      "Custom invoice branding",
      "Priority 24/7 WhatsApp support",
    ],
  },
  {
    icon: <Crown className="w-5 h-5" />,
    name: "Enterprise",
    price: "BDT 3,000",
    period: "/month",
    description: "Maximum performance for large scale operations.",
    buttonText: "Contact Sales",
    isPopular: false,
    cardClasses: "border-border/50 bg-card/50 backdrop-blur-sm",
    iconContainerClasses:
      "bg-purple-500/10 border-purple-500/20 text-purple-400",
    priceGradient: "from-white to-purple-200",
    features: [
      "Everything in Growth",
      "Unlimited Store locations",
      "Unlimited Staff accounts",
      "Dedicated Account Manager",
      "API Access & Integrations",
      "Custom Feature Development",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 overflow-hidden px-4 py-24 lg:py-32 bg-background"
    >
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <ResponsiveComponents>
        {/* Header */}
        <div className="relative z-10 mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3" />
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
                  "relative flex flex-col w-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  plan.cardClasses,
                  plan.isPopular ? "md:-mt-4 md:mb-4 border-2" : "border",
                )}
              >
                {/* Popular Glow Effect */}
                {plan.isPopular && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30">
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
                  <div className="mb-8 pb-8 border-b border-border/50">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          "bg-gradient-to-br bg-clip-text text-4xl lg:text-5xl font-black tracking-tight text-transparent",
                          plan.priceGradient,
                        )}
                      >
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mb-10 space-y-4 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto pt-6">
                    <Button
                      size="lg"
                      variant={plan.isPopular ? "default" : "outline"}
                      className={cn(
                        "w-full rounded-xl font-semibold h-12 transition-all duration-300",
                        plan.isPopular
                          ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 text-primary-foreground border-none"
                          : "border-border/50 bg-card/50 text-foreground hover:bg-muted hover:border-primary/30",
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
          <div className="flex items-center gap-3 rounded-full border border-border/50 bg-card/30 backdrop-blur-md px-6 py-2.5 text-sm text-muted-foreground shadow-sm">
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
