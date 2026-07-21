"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";

const TRUST_BADGES = [
  { icon: CheckCircle2, label: "No credit card" },
  { icon: Zap, label: "30-day free" },
  { icon: Star, label: "4.9/5 rating" },
];

const FLOATING_ELEMENTS = [
  {
    icon: Rocket,
    top: "15%",
    left: "8%",
    delay: 0,
    color: "text-primary/15",
    size: "w-10 h-10",
  },
  {
    icon: TrendingUp,
    top: "70%",
    left: "5%",
    delay: 1,
    color: "text-cyan-500/15",
    size: "w-8 h-8",
  },
  {
    icon: Users,
    top: "20%",
    right: "8%",
    delay: 2,
    color: "text-violet-500/15",
    size: "w-10 h-10",
  },
  {
    icon: Star,
    bottom: "20%",
    right: "10%",
    delay: 3,
    color: "text-amber-500/15",
    size: "w-8 h-8",
  },
];

function FloatingElement({
  element,
}: {
  element: (typeof FLOATING_ELEMENTS)[0];
}) {
  const Icon = element.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: element.delay * 0.3 }}
      className={`absolute hidden lg:block ${element.color}`}
      style={{
        top: element.top,
        left: element.left,
        right: element.right,
        bottom: element.bottom,
      }}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
        transition={{
          duration: 5 + element.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className={element.size} strokeWidth={1.2} />
      </motion.div>
    </motion.div>
  );
}

export function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* ===== CREATIVE BACKGROUND ===== */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      {/* Large ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating decorative elements */}
      {FLOATING_ELEMENTS.map((element, i) => (
        <FloatingElement key={i} element={element} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== MAIN CTA CARD ===== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="relative group"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

          {/* Card container */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/80 backdrop-blur-xl shadow-2xl">
            {/* Inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            {/* Animated top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="inline-flex h-2.5 w-2.5 rounded-full bg-primary"
                />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
              >
                Ready to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                    get started?
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
                      transition={{ duration: 0.8, delay: 0.6 }}
                      d="M2 8C50 2 150 2 198 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
              >
                Join <span className="text-foreground font-bold">10,000+</span>{" "}
                businesses already using ZopShop. Start your free trial today —
                no credit card, no commitment.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-10 py-7 text-base font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="#features" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-10 py-7 text-base font-bold border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all duration-300 group"
                  >
                    Explore Features
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                {TRUST_BADGES.map((badge, i) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm"
                    >
                      <BadgeIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
          <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
          <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl" />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
