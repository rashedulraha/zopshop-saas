"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";

const FEATURES = [
  {
    title: "Inventory Management",
    description: "Track stock in real-time with instant low-stock alerts.",
    image: "/Features_img/Inventory Management – Real‑time stock updates.jpg",
    slug: "inventory-management",
  },
  {
    title: "Billing System",
    description: "Create invoices quickly and track every payment easily.",
    image: "/Features_img/Billing System – Fast invoicing.jpg",
    slug: "billing-system",
  },
  {
    title: "Reports & Analytics",
    description: "View business insights with clear reports and dashboards.",
    image: "/Features_img/Reports & Analytics – Data‑driven insights.jpg",
    slug: "reports-analytics",
  },
  {
    title: "Team Management",
    description: "Manage roles and permissions for your entire team.",
    image: "/Features_img/Team Management – Role‑based access.jpg",
    slug: "team-management",
  },
  {
    title: "Secure Data",
    description: "Protect your data with secure encrypted storage.",
    image: "/Features_img/Secure Data – Encrypted storage.jpg",
    slug: "secure-data",
  },
  {
    title: "Mobile Friendly",
    description: "Access and manage your business from any device.",
    image: "/Features_img/Mobile Friendly – Access from anywhere.jpg",
    slug: "mobile-friendly",
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="py-16 lg:py-24 relative overflow-hidden bg-background"
    >
      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-16 relative z-10 flex flex-col items-center max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Features
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Everything you need.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-normal text-muted-foreground leading-relaxed"
          >
            Manage your entire business efficiently, wrapped in a minimal,
            intuitive experience.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={index}
              className="relative group h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative bg-card border border-border rounded-xl shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md hover:border-border-hover hover:bg-card-hover transition-all duration-300">
                {/* Browser-framed image */}
                <div className="relative w-full overflow-hidden shrink-0 bg-muted flex flex-col border-b border-border">
                  <div className="h-8 flex items-center px-4 shrink-0 bg-card border-b border-border gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>

                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Card body */}
                <div className="relative z-10 flex flex-col flex-1 p-6">
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-normal text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {feature.description}
                  </p>

                  {/* Footer link (text only) */}
                  <Link
                    href={`/features/${feature.slug}`}
                    className="mt-auto text-sm font-medium text-foreground hover:text-primary transition-colors inline-block"
                  >
                    View details &rarr;
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
