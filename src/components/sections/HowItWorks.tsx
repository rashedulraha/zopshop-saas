"use client";

import { useState, useEffect } from "react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { UserPlus, LayoutDashboard, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "step-1",
    title: "Sign Up in Seconds",
    description:
      "Create your free account. Access your dashboard instantly without needing a credit card.",
    icon: <UserPlus className="w-6 h-6" />,
    color: "text-primary",
    bg: "bg-primary/10 border border-primary/20",
    glow: "rgba(79,70,229,0.15)",
    num: "01",
  },
  {
    id: "step-2",
    title: "Add Your Products",
    description:
      "Quickly list your stock items, set retail prices, and organize them into clean categories.",
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: "text-violet-500",
    bg: "bg-violet-500/10 border border-violet-500/20",
    glow: "rgba(139,92,246,0.15)",
    num: "02",
  },
  {
    id: "step-3",
    title: "Start Selling & Billing",
    description:
      "Use our instant POS interface to check out customers, print invoices, and track dues in real-time.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10 border border-cyan-500/20",
    glow: "rgba(6,182,212,0.15)",
    num: "03",
  },
];

export function HowItWorks() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-14 lg:py-20 relative overflow-hidden"
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/8 blur-[100px] opacity-80" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-cyan-400/5 dark:bg-cyan-400/8 blur-[80px]" />
      </div>

      {/* Top glass border separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sm border-white/30 dark:border-white/8 text-primary text-sm font-semibold mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                How It Works
              </div>
              <h2 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
                Get started with ZopShop in{" "}
                <span className="text-gradient">3 simple steps</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We&apos;ve simplified the setup process. Just sign up, add your
                items, and start selling immediately with zero configuration
                required.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 w-full relative rounded-3xl overflow-hidden glass-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              {/* Top accent shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20" />

              {/* Video Container */}
              <div className="relative w-full aspect-video bg-black">
                {/* AI Badge */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="flex items-center gap-3 rounded-bl-3xl glass-sm border-t-0 border-r-0 px-5 py-3 backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                    </span>
                    <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-xs font-bold tracking-wide text-transparent">
                      ZopShop Live System
                    </span>
                  </div>
                </div>

                {isMounted ? (
                  <video
                    src="/hero_video/howitwork.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-slate-900 animate-pulse" />
                )}
              </div>
            </motion.div>

            {/* Right Column: Steps */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group"
                >
                  <div className="relative glass-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${step.glow}, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Step number + icon */}
                      <div className="shrink-0 flex flex-col items-center gap-1.5">
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                            step.bg,
                            step.color,
                          )}
                        >
                          {step.icon}
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground/50 tracking-widest">
                          {step.num}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="pt-1">
                        <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  {index !== STEPS.length - 1 && (
                    <div className="flex justify-start pl-[22px] py-1">
                      <div className="w-px h-4 bg-gradient-to-b from-border/60 to-transparent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ResponsiveComponents>

      {/* Bottom glass border separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
