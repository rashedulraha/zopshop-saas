"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  ShoppingBag,
  Check,
  Settings2,
  Play,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Lock,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import DemoDashboard from "../dmeoDashboard/DemoDashboard";

// Business Configurations
const BUSINESS_CONFIGS = {
  retail: {
    label: "Retail",
    icon: "🏪",
    features: ["Inventory", "Sales", "Customers", "Reports"],
    stats: { revenue: "$12,487", orders: "142", customers: "89" },
    color: "from-blue-500 to-indigo-600",
  },
  pharmacy: {
    label: "Pharmacy",
    icon: "💊",
    features: ["Inventory", "Expiry", "Sales", "Customers"],
    stats: { revenue: "$8,234", orders: "98", customers: "56" },
    color: "from-emerald-500 to-teal-600",
  },
  restaurant: {
    label: "Restaurant",
    icon: "🍽️",
    features: ["Orders", "Tables", "Inventory", "Waste"],
    stats: { revenue: "$15,678", orders: "234", customers: "145" },
    color: "from-rose-500 to-pink-600",
  },
  hardware: {
    label: "Hardware",
    icon: "🔧",
    features: ["Inventory", "Credit", "Transport", "Sales"],
    stats: { revenue: "$9,876", orders: "67", customers: "34" },
    color: "from-orange-500 to-amber-600",
  },
};

export function HeroSection() {
  const [activeBusiness, setActiveBusiness] = useState("retail");
  const [isMounted, setIsMounted] = useState(false);

  const currentConfig =
    BUSINESS_CONFIGS[activeBusiness as keyof typeof BUSINESS_CONFIGS];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      {/* Clean Background with Top Blue Glow */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-blue-100/50 via-blue-50/10 to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent pointer-events-none" />

      {/* Central Concentric Ring & Blur */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-[100%] border-[1.5px] border-white dark:border-slate-800 shadow-[0_0_80px_inset_rgba(59,130,246,0.05)] pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 mb-12">
        {/* Badge */}

        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
            World's First Agentic POS Stack
          </span>
        </div>

        {/* Heading with Gradient Text */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-slate-900 dark:text-white">One POS System</span>
          <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            For Every Business
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Configure your POS for any industry in seconds.
          <span className="text-slate-900 dark:text-slate-200 font-semibold">
            {" "}
            No code changes.
          </span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold">
            {" "}
            No complex setup.
          </span>
        </p>

        {/* CTA with Gradient */}
        <div>
          <Button
            size="default"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_40px_rgb(37,99,235,0.5)] hover:-translate-y-1 hover:scale-[1.02]"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            ✓ No credit card required ✓ 14-day free trial
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <DemoDashboard />
      </div>
    </section>
  );
}
