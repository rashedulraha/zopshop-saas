"use client";

import Image from "next/image";
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
    hoverBorder: "hover:border-purple-500/50",
    pillBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Billing System",
    description: "Create invoices quickly and track every payment easily.",
    image: "/Features_img/Billing System – Fast invoicing.jpg",
    hoverBorder: "hover:border-emerald-400/50",
    pillBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    title: "Reports & Analytics",
    description: "View business insights with clear reports and dashboards.",
    image: "/Features_img/Reports & Analytics – Data‑driven insights.jpg",
    hoverBorder: "hover:border-blue-400/50",
    pillBg: "bg-gradient-to-r from-blue-400 to-cyan-500",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Management",
    description: "Manage roles and permissions for your entire team.",
    image: "/Features_img/Team Management – Role‑based access.jpg",
    hoverBorder: "hover:border-violet-500/50",
    pillBg: "bg-gradient-to-r from-violet-400 to-sky-500",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Data",
    description: "Protect your data with secure encrypted storage.",
    image: "/Features_img/Secure Data – Encrypted storage.jpg",
    hoverBorder: "hover:border-pink-500/50",
    pillBg: "bg-gradient-to-r from-pink-400 to-rose-500",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Friendly",
    description: "Access and manage your business from any device.",
    image: "/Features_img/Mobile Friendly – Access from anywhere.jpg",
    hoverBorder: "hover:border-orange-500/50",
    pillBg: "bg-gradient-to-r from-orange-400 to-red-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 lg:py-16 relative z-10 px-4">
      {/* Ambient background orb */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none bg-[radial-gradient(ellipse,rgba(6,182,212,0.07)_0%,transparent_70%)] blur-[60px]"
      />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-20 relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-5 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ZopShop?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to manage your inventory efficiently, wrapped in
            a beautiful, intuitive experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-2.5 rounded-xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${feature.hoverBorder}`}
            >
              {/* Inner Image Box (Top) */}
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border/50 shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              {/* Text & Button (Bottom) */}
              <div className="flex flex-col flex-1 pt-4 pb-1 px-1.5">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Pill Button */}
                <div className="relative mt-auto p-1.5 pl-5 bg-muted border border-border rounded-xl flex items-center justify-between overflow-hidden group/btn cursor-pointer">
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
          ))}
        </div>
      </ResponsiveComponents>
    </section>
  );
}
