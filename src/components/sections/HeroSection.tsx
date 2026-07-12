"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Package, Users } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const STATS = [
  {
    icon: <Package className="w-4 h-4" />,
    value: "2,400+",
    label: "Businesses",
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    value: "18,000+",
    label: "Products Tracked",
  },
  { icon: <Users className="w-4 h-4" />, value: "99.9%", label: "Uptime" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden z-10 pt-24 pb-12 lg:pt-32 lg:pb-20 flex flex-col items-center text-center px-4 min-h-[90vh] justify-center">
      {/* Modern SaaS Background - Aceternity Spotlight Style */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glowing Spotlight Orbs */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-full w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-cyan-500/20 sm:bg-cyan-500/15 blur-[80px] sm:blur-[120px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute top-[-10%] right-1/2 translate-x-full w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-primary/20 sm:bg-primary/15 blur-[80px] sm:blur-[120px] animate-pulse"
          style={{ animationDuration: "12s" }}
        />

        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_100%)] opacity-40 dark:opacity-20" />
      </div>

      <ResponsiveComponents>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-8 bg-primary/10 border border-primary/20 text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Smart Inventory Management Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mb-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight"
          >
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Business
            </span>
            ,<br className="hidden sm:block" />
            Digitized & Simplified.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mb-10 text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            ZopShop gives you real-time inventory control, fast invoicing, and
            powerful reports — all in one clean dashboard built for business
            owners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button
              render={<Link href="/register" />}
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground rounded-xl px-8 py-6 text-sm font-semibold group"
            >
              Start 30-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              variant="outline"
              size="lg"
              className="rounded-xl px-8 py-6 text-sm font-semibold bg-card border-border hover:bg-muted text-foreground"
            >
              How it works
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 pt-8 border-t border-border w-full max-w-3xl"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-2 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  {s.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
