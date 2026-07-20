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
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
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
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
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
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-cyan-50/50 dark:bg-cyan-900/10 blur-[110px]" />
        <div className="absolute top-0 right-0 w-[350px] h-[300px] rounded-full bg-blue-50/50 dark:bg-blue-900/10 blur-[100px]" />
      </div>

      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Our Vision
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
              Empowering every{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                business to grow.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
            >
              <span className="text-slate-900 dark:text-white font-semibold">ZopShop</span> is
              more than software—it&apos;s your digital transformation partner.
              Experience secure and transparent business management.
            </motion.p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 px-4 sm:px-6 max-w-6xl mx-auto">
            {VALUE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:-translate-y-1 overflow-hidden"
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${card.glow}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm border ${card.iconBg} ${card.color}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base font-medium">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Benefits Banner */}
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-slate-50/80 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Key Benefits
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Unlock your true business potential
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-sm font-medium">
                  {BENEFIT_PILLS.map((pill, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                    >
                      <span className={`w-2 h-2 rounded-full ${pill.dot}`} />
                      {pill.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
