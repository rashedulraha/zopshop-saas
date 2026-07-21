"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Layers,
  Zap,
  ArrowRight,
  Target,
  Sparkles,
  TrendingUp,
  Globe,
  Users,
  Lightbulb,
} from "lucide-react";

const ABOUT_STEPS = [
  {
    id: "01",
    title: "Our Mission",
    subtitle: "Vision",
    description:
      "ZopShop is more than software—it's your digital transformation partner. We believe every small and medium business deserves smart technology access, just like large corporations.",
    icon: Target,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient:
      "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    borderColor: "border-blue-200/60 dark:border-blue-800/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    stat: "10K+",
    statLabel: "Active Stores",
  },
  {
    id: "02",
    title: "For All Businesses",
    subtitle: "Inclusive",
    description:
      "Grocery stores, hardware shops, restaurants, salons—every business type gets tailored POS solutions. No industry is too small or too complex for our platform.",
    icon: Building2,
    gradient: "from-indigo-500 to-violet-500",
    bgGradient:
      "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30",
    borderColor: "border-indigo-200/60 dark:border-indigo-800/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    stat: "15+",
    statLabel: "Industries",
  },
  {
    id: "03",
    title: "Comprehensive Solutions",
    subtitle: "Complete",
    description:
      "Accounting, stock management, invoicing, analytics—all seamlessly managed in one place. Eliminate paperwork and make faster decisions with accurate insights.",
    icon: Layers,
    gradient: "from-violet-500 to-purple-500",
    bgGradient:
      "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    borderColor: "border-violet-200/60 dark:border-violet-800/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    stat: "99.9%",
    statLabel: "Uptime",
  },
];

const BENEFIT_PILLS = [
  {
    label: "Eliminate paperwork",
    icon: Zap,
    color: "from-emerald-400 to-green-500",
  },
  {
    label: "Faster decisions",
    icon: Lightbulb,
    color: "from-blue-400 to-cyan-500",
  },
  {
    label: "Accurate insights",
    icon: TrendingUp,
    color: "from-violet-400 to-purple-500",
  },
  {
    label: "Secure transactions",
    icon: Globe,
    color: "from-rose-400 to-pink-500",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof ABOUT_STEPS)[0];
  index: number;
}) {
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
      {index < ABOUT_STEPS.length - 1 && (
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
        className={`relative h-full overflow-hidden rounded-3xl border ${step.borderColor} bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group-hover:border-primary/30`}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative z-10 p-8 sm:p-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            {/* Step badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-background/80 border ${step.borderColor}`}
            >
              <span
                className={`bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
              >
                {step.id}
              </span>
              <span className="text-muted-foreground">{step.subtitle}</span>
            </div>

            {/* Stat badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="text-right"
            >
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
              >
                {step.stat}
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {step.statLabel}
              </div>
            </motion.div>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.2 + 0.2,
              type: "spring",
            }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-[2px] mb-6 shadow-lg shadow-primary/20`}
          >
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <Icon className={`w-6 h-6 ${step.iconColor}`} />
            </div>
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Background pattern */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03]">
          <Icon className="w-full h-full" strokeWidth={0.5} />
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 text-sm font-semibold text-primary"
          >
            <Sparkles className="w-4 h-4" />
            <span>About Us</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Empowering every{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                business
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

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            We believe in democratizing technology for businesses of all sizes.
            Experience secure, transparent, and powerful management.
          </p>
        </motion.div>

        {/* Steps Grid - Same style as HowItWorks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {ABOUT_STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Bottom Benefits Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-lg">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

            <div className="relative z-10 p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left side */}
                <div className="flex items-center gap-5">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px] shadow-lg shadow-primary/20 shrink-0">
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground">
                      Why Choose ZopShop?
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Trusted by thousands of businesses worldwide
                    </p>
                  </div>
                </div>

                {/* Right side - Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                  {BENEFIT_PILLS.map((pill, i) => {
                    const PillIcon = pill.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group flex items-center gap-2.5 bg-background border border-border hover:border-primary/30 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-br ${pill.color} flex items-center justify-center shadow-sm`}
                        >
                          <PillIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {pill.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
