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
    <section id="features" className="py-14 lg:py-20 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/8 blur-[90px]" />
        <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full bg-cyan-400/4 dark:bg-cyan-400/7 blur-[80px]" />
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-violet-500/4 dark:bg-violet-500/7 blur-[80px]" />
      </div>

      {/* Top glass separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-16 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sm text-indigo-500 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
              Features
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            Why Choose{" "}
            <span className="text-gradient">ZopShop?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to manage your inventory efficiently, wrapped in
            a beautiful, intuitive experience.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {FEATURES.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative glass-md rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)] group-hover:-translate-y-1">
                {/* Inner hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${feature.glow}, transparent 65%)`,
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent" />

                {/* Browser-framed image */}
                <div className="relative w-full rounded-t-2xl overflow-hidden shrink-0 bg-black/5 dark:bg-black/20 flex flex-col">
                  {/* Chrome bar */}
                  <div className="h-8 flex items-center justify-between px-4 shrink-0 border-b border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="h-1.5 w-20 bg-foreground/8 rounded-full" />
                    <div className="w-10" />
                  </div>

                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                <div className="relative z-10 flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl border ${feature.iconBg} ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* Footer button */}
                  <Link
                    href={`/features/${feature.slug}`}
                    className="mt-4 relative p-1.5 pl-4 glass-sm rounded-xl flex items-center justify-between overflow-hidden group/btn cursor-pointer transition-all duration-300 hover:shadow-sm"
                  >
                    <span className="relative z-10 text-xs font-semibold text-muted-foreground group-hover/btn:text-white transition-colors duration-500">
                      View Details
                    </span>
                    <div className="relative z-10 w-8 h-8 flex items-center justify-center text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    {/* Expanding gradient fill */}
                    <div
                      className={`absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-lg transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-12px)] ${feature.pillBg}`}
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ResponsiveComponents>

      {/* Bottom glass separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
