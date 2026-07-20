"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px]" />
      </div>

      <ResponsiveComponents>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* CTA Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 shadow-2xl shadow-blue-500/20 dark:shadow-indigo-500/20"
          >
            <div className="relative rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden border border-white/10 dark:border-white/5">

              {/* Ambient glows inside card */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none w-[600px] h-[300px] bg-white/10 blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 pointer-events-none w-[350px] h-[350px] bg-cyan-400/20 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 pointer-events-none w-[350px] h-[350px] bg-purple-500/20 blur-[80px]" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  Limited Time Offer
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                >
                  Ready to Get Started?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl max-w-2xl leading-relaxed text-blue-100 dark:text-blue-200 font-medium"
                >
                  Join 10,000+ businesses already using ZopShop. Start your free
                  trial today — no credit card, no commitment.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-6"
                >
                  <Button
                    render={<Link href="/register" />}
                    nativeButton={false}
                    size="lg"
                    className="bg-white hover:bg-slate-50 text-blue-700 rounded-xl px-10 py-6 text-base font-bold group shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Start 30-Day Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    render={<Link href="#features" />}
                    nativeButton={false}
                    size="lg"
                    className="rounded-xl px-10 py-6 text-base font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-300"
                  >
                    See Features
                  </Button>
                </motion.div>

                <p className="text-sm text-blue-200/80 font-medium mt-4">
                  Free for 30 days · No credit card required · Cancel anytime
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
