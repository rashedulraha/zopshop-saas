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
  },
  {
    id: "step-2",
    title: "Add Your Products",
    description:
      "Quickly list your stock items, set retail prices, and organize them into clean categories.",
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: "text-accent",
    bg: "bg-accent/10 border border-accent/20",
  },
  {
    id: "step-3",
    title: "Start Selling & Billing",
    description:
      "Use our instant POS interface to check out customers, print invoices, and track dues in real-time.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10 border border-cyan-500/20",
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
      className="py-16 lg:py-24 relative bg-background overflow-hidden border-t border-border"
    >
      <ResponsiveComponents>
        <div className="w-full relative z-10">
          {/* Top Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                How It Works
              </div>
              <h2 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
                Get started with ZopShop in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400">
                  3 simple steps
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've simplified the setup process. Just sign up, add your
                items, and start selling immediately with zero configuration
                required.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Video Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 w-full relative rounded-2xl overflow-hidden border border-border flex flex-col bg-card"
            >
              {/* Video Container (Strict 16:9) */}
              <div className="relative w-full aspect-video bg-black">
                {/* AI Badge to cover Watermark */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="flex items-center gap-3.5 rounded-bl-[32px] border-b border-l border-border bg-background/80 px-7 py-4.5 backdrop-blur-3xl">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    </span>

                    <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-xs sm:text-sm font-extrabold tracking-wide text-transparent">
                      ZopShop Inventory Management System
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
                  <div className="absolute inset-0 w-full h-full bg-slate-900" />
                )}
              </div>
            </motion.div>

            {/* Right Column: Steps as a Stepper (No Cards) */}
            <div className="lg:col-span-5 flex flex-col lg:pl-4">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-6 relative group pb-10 last:pb-0"
                >
                  {/* Connecting Line */}
                  {index !== STEPS.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-[2px] bg-border" />
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105",
                      step.bg,
                      step.color,
                    )}
                  >
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
