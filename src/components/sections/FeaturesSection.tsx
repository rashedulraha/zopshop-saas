"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import {
  Package,
  CreditCard,
  BarChart,
  Users,
  Shield,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Package className="w-5 h-5" />,
    title: "Inventory Management",
    description: "Track stock in real-time with instant low-stock alerts.",
    image: "/Features_img/Inventory Management – Real‑time stock updates.jpg",
    color: "text-indigo-500",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    pillBg: "bg-gradient-to-r from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.12)",
    slug: "inventory-management",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Billing System",
    description: "Create invoices quickly and track every payment easily.",
    image: "/Features_img/Billing System – Fast invoicing.jpg",
    color: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    pillBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
    glow: "rgba(16,185,129,0.12)",
    slug: "billing-system",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    title: "Reports & Analytics",
    description: "View business insights with clear reports and dashboards.",
    image: "/Features_img/Reports & Analytics – Data‑driven insights.jpg",
    color: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    pillBg: "bg-gradient-to-r from-blue-400 to-cyan-500",
    glow: "rgba(59,130,246,0.12)",
    slug: "reports-analytics",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Management",
    description: "Manage roles and permissions for your entire team.",
    image: "/Features_img/Team Management – Role‑based access.jpg",
    color: "text-violet-500",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    pillBg: "bg-gradient-to-r from-violet-400 to-sky-500",
    glow: "rgba(139,92,246,0.12)",
    slug: "team-management",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Data",
    description: "Protect your data with secure encrypted storage.",
    image: "/Features_img/Secure Data – Encrypted storage.jpg",
    color: "text-rose-500",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    pillBg: "bg-gradient-to-r from-rose-400 to-pink-500",
    glow: "rgba(244,63,94,0.12)",
    slug: "secure-data",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Friendly",
    description: "Access and manage your business from any device.",
    image: "/Features_img/Mobile Friendly – Access from anywhere.jpg",
    color: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    pillBg: "bg-gradient-to-r from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.12)",
    slug: "mobile-friendly",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-50/50 dark:bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 relative z-10 flex flex-col items-center max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                Features
              </span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              ZopShop?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
          >
            Everything you need to manage your inventory efficiently, wrapped in
            a beautiful, intuitive experience.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              key={index}
              className="relative group h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden h-full flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                
                {/* Browser-framed image */}
                <div className="relative w-full overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-950 flex flex-col border-b border-slate-100 dark:border-slate-800">
                  {/* Chrome bar */}
                  <div className="h-10 flex items-center justify-between px-5 shrink-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>

                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Card body */}
                <div className="relative z-10 flex flex-col flex-1 p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white transition-colors duration-200">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {feature.description}
                  </p>

                  {/* Footer button */}
                  <Link
                    href={`/features/${feature.slug}`}
                    className="mt-auto group/btn flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ResponsiveComponents>
    </section>
  );
}
