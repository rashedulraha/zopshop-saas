"use client";

import Image from "next/image";
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
    hoverColor: "bg-purple-500/10",
    pillBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Billing System",
    description: "Create invoices quickly and track every payment easily.",
    image: "/Features_img/Billing System – Fast invoicing.jpg",
    hoverColor: "bg-emerald-400/10",
    pillBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    title: "Reports & Analytics",
    description: "View business insights with clear reports and dashboards.",
    image: "/Features_img/Reports & Analytics – Data‑driven insights.jpg",
    hoverColor: "bg-blue-400/10",
    pillBg: "bg-gradient-to-r from-blue-400 to-cyan-500",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Management",
    description: "Manage roles and permissions for your entire team.",
    image: "/Features_img/Team Management – Role‑based access.jpg",
    hoverColor: "bg-violet-500/10",
    pillBg: "bg-gradient-to-r from-violet-400 to-sky-500",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Data",
    description: "Protect your data with secure encrypted storage.",
    image: "/Features_img/Secure Data – Encrypted storage.jpg",
    hoverColor: "bg-pink-500/10",
    pillBg: "bg-gradient-to-r from-pink-400 to-rose-500",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Friendly",
    description: "Access and manage your business from any device.",
    image: "/Features_img/Mobile Friendly – Access from anywhere.jpg",
    hoverColor: "bg-orange-500/10",
    pillBg: "bg-gradient-to-r from-orange-400 to-red-500",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-12 lg:py-20 relative z-10 px-4">
      {/* Ambient background orb */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none bg-[radial-gradient(ellipse,rgba(6,182,212,0.07)_0%,transparent_70%)] blur-[60px]"
      />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-20 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
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
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              ZopShop?
            </span>
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

        {/* Aceternity Hover Effect Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-w-7xl mx-auto py-10">
          {FEATURES.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="relative group block p-2 h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className={`absolute inset-0 h-full w-full rounded-2xl block ${feature.hoverColor} dark:bg-slate-800/[0.8]`}
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 p-3 rounded-xl bg-card border border-border h-full flex flex-col transition-colors duration-300 group-hover:border-transparent">
                {/* Inner Image Box (Top) */}
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/50 shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Text & Button (Bottom) */}
                <div className="flex flex-col flex-1 pt-4 pb-1 px-1.5">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-lg text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {feature.description}
                    </p>
                  </div>

                  {/* Footer Pill Button */}
                  <div className="relative mt-auto p-1.5 pl-5 bg-muted border border-border rounded-xl flex items-center justify-between overflow-hidden group/btn cursor-pointer shadow-sm">
                    <span className="relative z-10 text-xs font-semibold text-muted-foreground group-hover/btn:text-white transition-colors duration-500">
                      View Details
                    </span>

                    {/* Arrow Icon */}
                    <div className="relative z-10 w-9 h-9 flex items-center justify-center text-white transition-transform duration-500 group-hover/btn:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    {/* Expanding Background */}
                    <div
                      className={`absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-lg transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-12px)] opacity-90 group-hover/btn:opacity-100 ${feature.pillBg}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ResponsiveComponents>
    </section>
  );
}
