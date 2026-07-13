"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 lg:py-20 relative z-10 overflow-hidden px-4">
      <ResponsiveComponents>
        <div className="relative rounded-xl overflow-hidden p-12 md:p-20 text-center bg-card backdrop-blur-3xl border border-border max-w-6xl mx-auto">
          {/* Top gloss line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"
          />

          {/* Ambient center glow behind button */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none w-[500px] h-[250px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.18)_0%,transparent_70%)] blur-[60px]"
          />

          {/* Top-left ambient */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -left-20 pointer-events-none w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-[60px]"
          />

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Limited Time Offer
            </span>

            <h2 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              Ready to Get Started?
            </h2>

            <p className="text-lg max-w-xl leading-relaxed text-muted-foreground">
              Join 10,000+ businesses already using ZopShop. Start your free
              trial today — no credit card, no commitment.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                size="lg"
                className="bg-primary hover:bg-primary-light text-primary-foreground rounded-xl px-10 py-6 text-base group"
              >
                Start 30-Day Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                render={<Link href="#features" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="rounded-xl px-10 py-6 text-base bg-card border-border hover:bg-muted text-foreground"
              >
                See Features
              </Button>
            </div>

            <p className="text-xs mt-2 text-muted-foreground font-medium">
              Free for 30 days · No credit card required · Cancel anytime
            </p>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
