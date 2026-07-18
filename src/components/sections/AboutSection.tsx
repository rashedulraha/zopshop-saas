"use client";

import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";

const VALUE_CARDS = [
  {
    title: "For All Businesses",
    description:
      "Every small and medium business deserves smart technology access, just like large corporations.",
    color: "text-primary",
    iconBg: "bg-primary/10 border border-primary/15",
    glow: "rgba(79,70,229,0.1)",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Comprehensive Solutions",
    description:
      "Grocery stores, hardware shops, accounting, stock management—all seamlessly managed in one place.",
    color: "text-cyan-500",
    iconBg: "bg-cyan-500/10 border border-cyan-500/15",
    glow: "rgba(6,182,212,0.1)",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
];

const BENEFIT_PILLS = [
  { label: "Eliminate paperwork", dot: "bg-emerald-400" },
  { label: "Faster decisions", dot: "bg-blue-400" },
  { label: "Accurate insights", dot: "bg-purple-400" },
  { label: "Secure transactions", dot: "bg-rose-400" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-14 lg:py-20 relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-cyan-400/4 dark:bg-cyan-400/7 blur-[90px]" />
        <div className="absolute top-0 right-0 w-[350px] h-[300px] rounded-full bg-primary/4 dark:bg-primary/7 blur-[80px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                Our Vision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Empowering every{" "}
              <span className="text-gradient">business to grow.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              <span className="text-foreground font-semibold">ZopShop</span> is
              more than software—it&apos;s your digital transformation partner.
              Experience secure and transparent business management.
            </motion.p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {VALUE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group relative glass-md rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${card.glow}, transparent 70%)`,
                  }}
                />
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent rounded-t-2xl" />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${card.iconBg} ${card.color}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Benefits Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-md rounded-2xl p-6 relative overflow-hidden"
          >
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Key Benefits</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Unlock your true business potential</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
                {BENEFIT_PILLS.map((pill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 glass-sm px-3 py-1.5 rounded-full text-xs"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${pill.dot}`} />
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
