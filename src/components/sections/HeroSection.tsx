"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Package, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const STATS = [
  {
    icon: <Package className="w-4 h-4" />,
    value: "0",
    label: "Businesses",
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    value: "0",
    label: "Products Tracked",
  },
  { icon: <Users className="w-4 h-4" />, value: "0%", label: "Uptime" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden z-10 pt-24 pb-12 lg:pt-32 lg:pb-20 flex flex-col items-center text-center min-h-[90vh] justify-center"
    >
      {/* Raw Video Background without Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero_video/flower-field.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/hero_video/flower-field.mp4" type="video/mp4" />
        </video>
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
            🌱 Nurture Your Business Growth
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mb-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight drop-shadow-xl"
          >
            Where{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent drop-shadow-md">
              Business Growth
            </span>
            <br className="hidden sm:block" />
            Meets Simplicity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mb-10 text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md"
          >
            Focus on growing your business while ZopShop handles the heavy
            lifting — real-time inventory, seamless invoicing, and powerful
            analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-2xl border border-white/20 text-white rounded-full px-8 py-6 text-sm font-semibold group transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105"
            >
              Start 30-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-sm font-semibold bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 text-white/90 hover:text-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            >
              How it works
            </Button>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col items-center justify-center gap-4 mb-16"
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1 text-muted-foreground/30">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Trusted by{" "}
                <span className="text-foreground font-semibold">0</span>{" "}
                business owners (Be the first!)
              </p>
            </div>
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
