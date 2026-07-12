"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Package, Users } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const STATS = [
  {
    icon: <Package className="w-4 h-4" />,
    value: "2,400+",
    label: "Businesses",
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    value: "18,000+",
    label: "Products Tracked",
  },
  { icon: <Users className="w-4 h-4" />, value: "99.9%", label: "Uptime" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden z-10 pt-32 pb-12 lg:pt-40 lg:pb-16 flex flex-col items-center text-center px-4">
      {/* Modern SaaS Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Glowing Ambient Orbs */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-full w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-cyan-500/15 sm:bg-cyan-500/10 blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-[-10%] right-1/2 translate-x-full w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-indigo-500/15 sm:bg-indigo-500/10 blur-[80px] sm:blur-[120px]" />
        
        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_100%)] opacity-40 dark:opacity-20" />
      </div>

      <ResponsiveComponents>
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold mb-8 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Smart Inventory Management Platform
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Manage Your Business{" "}
            <span className="bg-gradient-to-br from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
              Smarter
            </span>
            , Not Harder
          </h1>

          {/* Subheading */}
          <p className="max-w-xl mb-10 text-lg text-muted-foreground leading-relaxed">
            ZopShop gives you real-time inventory control, fast invoicing, and
            powerful reports — all in one clean dashboard built for business
            owners.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up mb-20" style={{ animationDelay: "300ms" }}>
            <Button render={<Link href="/register" />} size="lg" className="bg-primary hover:bg-primary-light text-primary-foreground rounded-xl px-8 group">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button render={<Link href="#how-it-works" />} variant="outline" size="lg" className="rounded-xl px-8 bg-card border-border hover:bg-muted text-foreground">
              How it works
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-border w-full max-w-3xl">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  {s.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-base text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
