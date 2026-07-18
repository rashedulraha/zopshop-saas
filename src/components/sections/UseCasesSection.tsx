"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Wrench,
  Shirt,
  Pill,
  Utensils,
  Store,
  CheckCircle2,
  BarChart2,
  ChevronRight,
} from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { cn } from "@/lib/utils";

const USE_CASES = [
  {
    image: "/Features_img/Grocery-& Super Shops.jpg",
    title: "Grocery & Super Shops",
    subtitle: "Say goodbye to manual stock counting and messy registers.",
    features: [
      "Real-time stock tracking – know exactly what's in your shop",
      "Low-stock auto alerts – never run out of bestsellers",
      "Fast checkout – serve customers 2x faster",
      "Smart expiry alerts – reduce waste and save money",
    ],
    stat: "5,000+ grocery items managed with 99.9% accuracy.",
    icon: <ShoppingCart className="w-5 h-5" />,
    gradient: "from-emerald-400 to-teal-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    statColor: "text-emerald-600 dark:text-emerald-400",
    checkColor: "text-emerald-500",
  },
  {
    image: "/Features_img/Pharmacy-&-Medicine.jpg",
    title: "Pharmacy & Medicine",
    subtitle: "Stop manually checking expiry dates and batch numbers.",
    features: [
      "Batch number tracking – trace every medicine instantly",
      "Expiry date alerts – get notified 15 days before",
      "Secure sales management – protect patient data",
      "Daily sales reports – know your top-selling medicines",
    ],
    stat: "2,300+ medicines tracked with 100% batch traceability.",
    icon: <Pill className="w-5 h-5" />,
    gradient: "from-blue-400 to-cyan-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    statColor: "text-blue-600 dark:text-blue-400",
    checkColor: "text-blue-500",
  },
  {
    image: "/Features_img/ Hardware-&-Sanitary.jpg",
    title: "Hardware & Sanitary",
    subtitle: "Stop losing track of tiny screws and big materials.",
    features: [
      "Manage diverse inventory – from screws to building materials",
      "Category-wise sorting – find anything in seconds",
      "Bulk inventory updates – save hours every week",
      "Smart reorder alerts – never run out of stock",
    ],
    stat: "15,000+ SKUs organized across 10+ categories.",
    icon: <Wrench className="w-5 h-5" />,
    gradient: "from-orange-400 to-amber-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/30",
    iconBg: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    statColor: "text-orange-600 dark:text-orange-400",
    checkColor: "text-orange-500",
  },
  {
    image: "/Features_img/ Fashion&Boutiques.jpg",
    title: "Fashion & Boutiques",
    subtitle: "Stop confusing sizes, colors, and seasonal stock.",
    features: [
      "Auto size & color tracking – manage S, M, L, XL effortlessly",
      "Seasonal stock management – summer, winter, all year round",
      "Style-wise reporting – know what's selling",
      "Smart inventory alerts – never miss a trend",
    ],
    stat: "3,500+ garments managed across 12 sizes and 4 seasons.",
    icon: <Shirt className="w-5 h-5" />,
    gradient: "from-purple-400 to-indigo-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
    statColor: "text-purple-600 dark:text-purple-400",
    checkColor: "text-purple-500",
  },
  {
    image: "/Features_img/ Rod-Cement.jpg",
    title: "Construction Materials",
    subtitle: "Say goodbye to manual stock counting and messy paper records.",
    features: [
      "Track rods, cement, bricks – all in one place",
      "Real-time stock updates – know exactly what's available",
      "Smart reorder alerts – never run out of materials",
      "Job-site tracking – manage multiple projects",
    ],
    stat: "10,000+ construction materials tracked with 100% accuracy.",
    icon: <Store className="w-5 h-5" />,
    gradient: "from-slate-400 to-slate-600",
    lightBg: "bg-slate-50 dark:bg-slate-900/30",
    iconBg: "bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400",
    statColor: "text-slate-600 dark:text-slate-400",
    checkColor: "text-slate-500",
  },
  {
    image: "/Features_img/Modi-Khana.jpg",
    title: "General & Grocery Stores",
    subtitle: "Simplify your daily retail operations effortlessly.",
    features: [
      "Quick item entry – add products to billing fast",
      "Daily profit tracking – see earnings at a glance",
      "Customer ledger – manage store credit seamlessly",
      "Inventory alerts – know when to restock staples",
    ],
    stat: "1,000+ daily items sold with zero calculation errors.",
    icon: <Utensils className="w-5 h-5" />,
    gradient: "from-rose-400 to-pink-500",
    lightBg: "bg-rose-50 dark:bg-rose-950/30",
    iconBg: "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400",
    statColor: "text-rose-600 dark:text-rose-400",
    checkColor: "text-rose-500",
  },
];

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = USE_CASES[activeIndex];

  return (
    <section id="use-cases" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-violet-500/5 dark:bg-violet-500/8 blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 glass-sm rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Who is it for?
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Built for <span className="text-gradient">Every Business</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              No matter what you sell, ZopShop adapts to your unique workflow.
            </motion.p>
          </div>

          {/* Tab Selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {USE_CASES.map((u, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-250 border",
                  activeIndex === i
                    ? "bg-primary text-white border-primary shadow-[0_4px_16px_rgba(79,70,229,0.25)]"
                    : "glass-sm text-muted-foreground border-transparent hover:text-foreground hover:border-white/40 dark:hover:border-white/10",
                )}
              >
                <span className={cn("transition-colors", activeIndex === i ? "text-white" : u.iconBg.split(" ")[1])}>
                  {u.icon}
                </span>
                {u.title}
              </button>
            ))}
          </motion.div>

          {/* Active Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Outer glow */}
            <div className={cn("absolute -inset-2 rounded-[2.5rem] blur-3xl opacity-20 pointer-events-none bg-gradient-to-r", active.gradient)} />

            <div className="relative glass-xl rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent z-10" />

              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="w-full lg:w-[52%] relative aspect-[4/3] lg:aspect-auto shrink-0 overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 z-10", active.gradient)} />
                  <img
                    src={active.image}
                    alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Right fade into content */}
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-white/60 dark:to-slate-900/60 z-20 hidden lg:block" />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", active.iconBg)}>
                      {active.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground leading-snug">{active.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {active.subtitle}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-6">
                    {active.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", active.checkColor)} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stat */}
                  <div className="glass-sm rounded-2xl px-5 py-4 flex items-center gap-3">
                    <BarChart2 className={cn("w-4 h-4 shrink-0", active.statColor)} />
                    <span className={cn("text-sm font-semibold", active.statColor)}>{active.stat}</span>
                  </div>

                  {/* Next business type hint */}
                  <button
                    onClick={() => setActiveIndex((activeIndex + 1) % USE_CASES.length)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors group"
                  >
                    Next: {USE_CASES[(activeIndex + 1) % USE_CASES.length].title}
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
    </section>
  );
}
