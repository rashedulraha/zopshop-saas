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
    iconBg:
      "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    target: 10,
    suffix: "+ hrs",
    label: "Saved per week on inventory counting and manual billing",
    color: "text-blue-500",
    iconBg:
      "bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50",
    glow: "rgba(59,130,246,0.08)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    target: 1200,
    suffix: "+",
    label: "Active businesses across Bangladesh managing stock with ZopShop",
    color: "text-violet-500",
    iconBg:
      "bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/50",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    target: 99,
    suffix: ".9%",
    label: "Inventory accuracy — vs. 60–70% with manual tracking",
    color: "text-amber-500",
    iconBg:
      "bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/50",
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
    <section
      id="impact"
      className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-emerald-50/50 dark:bg-emerald-900/10 blur-[110px]" />
      </div>

      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* ── Section Header ── */}
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                  Real Results
                </span>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Numbers that{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                speak for themselves
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
            >
              Every number below comes from businesses just like yours — shops
              that switched from notebooks and Excel to ZopShop.
            </motion.p>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24 max-w-7xl mx-auto px-4 sm:px-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden flex flex-col items-center text-center"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                    stat.iconBg,
                    stat.color,
                  )}
                >
                  {stat.icon}
                </div>
                <div
                  className={cn(
                    "text-5xl font-black tracking-tight mb-4",
                    stat.color,
                  )}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
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
            className="max-w-5xl mx-auto px-4 sm:px-6"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                The old way is costing you — every single day
              </h3>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 font-medium">
                See what changes the moment you switch to ZopShop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Old Way */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/40 shadow-xl shadow-red-100/20 dark:shadow-red-900/10 p-8 sm:p-10">
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
                      className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* ZopShop Way */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 shadow-xl shadow-emerald-100/20 dark:shadow-emerald-900/10 p-8 sm:p-10">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />

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
                      className="flex items-start gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
