"use client";

import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 lg:py-20 relative bg-background overflow-hidden border-t border-border"
    >
      {/* Subtle ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.05)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <ResponsiveComponents>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                business to grow.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              <span className="text-foreground font-semibold">ZopShop</span> is
              more than software—it's your digital transformation partner.
              Experience secure and transparent business management.
            </motion.p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border p-8 rounded-2xl transition-colors hover:border-primary/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
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
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                For All Businesses
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every small and medium business deserves smart technology
                access, just like large corporations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card border border-border p-8 rounded-2xl transition-colors hover:border-cyan-500/50"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6">
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
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Comprehensive Solutions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Grocery stores, hardware shops, accounting, stock management—all
                seamlessly managed in one place.
              </p>
            </motion.div>
          </div>

          {/* Key Benefits Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-transparent p-1 rounded-2xl border border-primary/20"
          >
            <div className="bg-background rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
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
                  <h4 className="font-bold text-foreground">Key Benefits</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unlock your true business potential
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                  Eliminate paperwork
                </span>
                <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{" "}
                  Faster decisions
                </span>
                <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>{" "}
                  Accurate insights
                </span>
                <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>{" "}
                  Secure transactions
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
