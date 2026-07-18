"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary/6 dark:bg-primary/9 blur-[120px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="relative max-w-5xl mx-auto">
          {/* CTA Glass Card with shimmer border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-glow-border rounded-[2.5rem] overflow-hidden"
          >
            <div className="relative glass-xl rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden">
              {/* Top gloss line */}
              <div className="absolute top-0 left-[5%] right-[5%] h-px pointer-events-none bg-gradient-to-r from-transparent via-white/80 dark:via-white/25 to-transparent" />

              {/* Ambient glows inside card */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none w-[500px] h-[280px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.12)_0%,transparent_70%)] blur-[60px]" />
              <div className="absolute -top-24 -left-24 pointer-events-none w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[60px]" />
              <div className="absolute -top-24 -right-24 pointer-events-none w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(79,70,229,0.08)_0%,transparent_70%)] blur-[60px]" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sm text-indigo-500 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                  </span>
                  Limited Time Offer
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
                >
                  Ready to Get Started?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg max-w-xl leading-relaxed text-muted-foreground"
                >
                  Join 10,000+ businesses already using ZopShop. Start your free
                  trial today — no credit card, no commitment.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-2"
                >
                  <Button
                    render={<Link href="/register" />}
                    nativeButton={false}
                    size="lg"
                    className="bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl px-10 py-6 text-base group shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)] transition-all duration-300"
                  >
                    Start 30-Day Free Trial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    render={<Link href="#features" />}
                    nativeButton={false}
                    size="lg"
                    className="rounded-xl px-10 py-6 text-base glass-sm hover:bg-white/35 dark:hover:bg-slate-950/30 text-foreground transition-all duration-300"
                  >
                    See Features
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground font-medium">
                  Free for 30 days · No credit card required · Cancel anytime
                </p>
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
