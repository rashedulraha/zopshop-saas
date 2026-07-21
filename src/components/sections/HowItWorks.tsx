"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LogIn,
  Settings2,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Sign In",
    subtitle: "Account",
    description:
      "Create your free account in seconds. No credit card required. Get instant access to your complete POS management dashboard.",
    icon: LogIn,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "02",
    title: "Configure Your Business",
    subtitle: "Setup",
    description:
      "Customize your store profile, add products, set pricing, and organize inventory. Our smart templates adapt to your industry automatically.",
    icon: Settings2,
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "03",
    title: "Manage Your Business",
    subtitle: "Operations",
    description:
      "Process sales, track inventory, generate reports, and grow revenue. Real-time analytics keep you in control of every transaction.",
    icon: BarChart3,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-800",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Connection line to next step (hidden on last item and mobile) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-border via-border to-transparent" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/20 origin-left"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2"
          >
            <ArrowRight className="w-4 h-4 text-primary/40" />
          </motion.div>
        </div>
      )}

      {/* Card */}
      <div
        className={`relative p-8 rounded-3xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group-hover:border-primary/30`}
      >
        {/* Step number badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-background/80 border ${step.borderColor}`}
          >
            <span
              className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
            >
              {step.id}
            </span>
            <span className="text-muted-foreground">{step.subtitle}</span>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.2 + 0.4,
              type: "spring",
            }}
          >
            <CheckCircle2 className="w-5 h-5 text-primary/30" />
          </motion.div>
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 shadow-lg shadow-primary/20`}
        >
          <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
            <Icon className={`w-6 h-6 ${step.iconColor}`} />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {step.title}
        </h3>
        <p className="font-normal text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <span>How It Works</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Start selling in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                three steps
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  d="M2 8C50 2 150 2 198 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-lg font-normal text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Zero configuration required. Sign up, configure your business, and
            start managing operations in under three minutes.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-semibold text-primary transition-all duration-1000`}
          >
            <span className="text-foreground font-semibold">
              Ready to transform your business?
            </span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
