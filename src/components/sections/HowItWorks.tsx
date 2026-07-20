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
      className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-50/50 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <ResponsiveComponents>
        <div className="w-full relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                How It Works
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                We've simplified the setup process. Just sign up, add your
                items, and start selling immediately with zero configuration required.
              </p>
            </motion.div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 1: Tall Card (Left) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1 lg:row-span-2 relative group rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden flex flex-col"
            >
              <div className="p-8 sm:p-10 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide mb-4">
                    Step 1
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Sign Up in Seconds
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Create your free account. Access your dashboard instantly without needing a credit card. Everything is ready out of the box.
                  </p>
                </div>
                
                {/* Visual Area */}
                <div className="mt-auto pt-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-900/20 rounded-2xl" />
                  <div className="relative w-48 h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
                    <UserPlus className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Wide Card (Top Right) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 relative group rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide mb-4 w-fit">
                    Step 2
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Add Your Products
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                    Quickly list your stock items, set retail prices, and organize them into clean categories with bulk import tools.
                  </p>
                </div>
                {/* Visual Area */}
                <div className="p-8 sm:p-10 sm:pl-0 flex items-center justify-center relative min-h-[240px] sm:w-1/2">
                  <div className="absolute inset-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl" />
                  <div className="relative w-full max-w-[200px] aspect-video bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <LayoutDashboard className="w-10 h-10 text-indigo-500" strokeWidth={1.5} />
                    {/* Mock UI lines */}
                    <div className="absolute left-4 top-4 right-4 flex gap-2">
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-full" />
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Wide Card (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 relative group rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row-reverse h-full">
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-wide mb-4 w-fit">
                    Step 3
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Start Selling & Billing
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                    Use our instant POS interface to check out customers, print invoices, and track dues in real-time.
                  </p>
                </div>
                {/* Visual Area */}
                <div className="p-8 sm:p-10 sm:pr-0 flex items-center justify-center relative min-h-[240px] sm:w-1/2">
                  <div className="absolute inset-4 bg-gradient-to-tr from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl" />
                  <div className="relative w-full max-w-[200px] aspect-video bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <BarChart3 className="w-12 h-12 text-purple-500" strokeWidth={1.5} />
                    {/* Mock chart bars */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between px-2 h-12">
                      <div className="w-3 bg-purple-200 dark:bg-purple-900/50 rounded-t h-4" />
                      <div className="w-3 bg-purple-300 dark:bg-purple-800/50 rounded-t h-8" />
                      <div className="w-3 bg-purple-400 dark:bg-purple-700/50 rounded-t h-6" />
                      <div className="w-3 bg-purple-500 rounded-t h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
