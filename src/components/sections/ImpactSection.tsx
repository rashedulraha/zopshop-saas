"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  XCircle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { cn } from "@/lib/utils";

/* ──────────── Animated counter ──────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────── Data ──────────── */
const STATS = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    target: 45,
    suffix: "%",
    label: "Average revenue growth reported by our users in 6 months",
    color: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    target: 10,
    suffix: "+ hrs",
    label: "Saved per week on inventory counting and manual billing",
    color: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50",
    glow: "rgba(59,130,246,0.08)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    target: 1200,
    suffix: "+",
    label: "Active businesses across Bangladesh managing stock with ZopShop",
    color: "text-violet-500",
    iconBg: "bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/50",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    target: 99,
    suffix: ".9%",
    label: "Inventory accuracy — vs. 60–70% with manual tracking",
    color: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/50",
    glow: "rgba(245,158,11,0.08)",
  },
];

const OLD_WAY = [
  "Manual stock counts take 2–3 hours every day",
  "Paper ledgers get lost, torn, or miscalculated",
  "No way to check sales from home or on your phone",
  "Billing mistakes cause customer disputes",
  "Zero visibility into which products make profit",
  "Month-end accounts take days to reconcile",
];

const NEW_WAY = [
  "Real-time stock updates in seconds, automatically",
  "Cloud-backed digital records, safe and searchable",
  "Check live sales & inventory from any device, anywhere",
  "One-tap accurate billing with digital receipts",
  "Instant profit reports per product, per day",
  "Auto-generated monthly reports in one click",
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-14 lg:py-20 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/8 blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-400/4 dark:bg-emerald-400/7 blur-[90px]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="relative z-10 w-full">

          {/* ── Section Header ── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 glass-sm rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Real Results
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Numbers that <span className="text-gradient">speak for themselves</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Every number below comes from businesses just like yours — shops
              that switched from notebooks and Excel to ZopShop.
            </motion.p>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative glass-md rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${stat.glow}, transparent 70%)` }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/15 to-transparent" />

                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110", stat.iconBg, stat.color)}>
                  {stat.icon}
                </div>
                <div className={cn("text-4xl font-black tracking-tight mb-3", stat.color)}>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Before / After Comparison ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground">
                The old way is costing you — every single day
              </h3>
              <p className="mt-2 text-muted-foreground">
                See what changes the moment you switch to ZopShop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Old Way */}
              <div className="relative rounded-2xl overflow-hidden bg-red-50/80 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 backdrop-blur-sm p-7">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 dark:via-red-700/30 to-transparent" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-bold text-red-600 dark:text-red-400 text-sm uppercase tracking-wider">
                    The Old Way
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {OLD_WAY.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* ZopShop Way */}
              <div className="relative rounded-2xl overflow-hidden bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 backdrop-blur-sm p-7">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 dark:via-emerald-700/30 to-transparent" />
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-60" />

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wider">
                    With ZopShop
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {NEW_WAY.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-foreground font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </ResponsiveComponents>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
    </section>
  );
}
