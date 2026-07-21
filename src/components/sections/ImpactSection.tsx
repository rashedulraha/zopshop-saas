"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import {
  Shield,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ──────────── Animated counter ──────────── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, duration, delay]);

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
    target: 45,
    suffix: "%",
    label: "Average revenue growth reported in 6 months",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    glowColor: "shadow-emerald-500/20",
  },
  {
    target: 10,
    suffix: "+ hrs",
    label: "Saved per week on inventory and manual billing",
    icon: Clock,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    glowColor: "shadow-blue-500/20",
  },
  {
    target: 1200,
    suffix: "+",
    label: "Active businesses managing stock with ZopShop",
    icon: Users,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-800",
    iconColor: "text-violet-600 dark:text-violet-400",
    glowColor: "shadow-violet-500/20",
  },
  {
    target: 99,
    suffix: ".9%",
    label: "Inventory accuracy vs manual tracking",
    icon: Shield,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconColor: "text-amber-600 dark:text-amber-400",
    glowColor: "shadow-amber-500/20",
  },
];

const OLD_WAY = [
  "Manual stock counts take hours daily",
  "Paper ledgers get lost or miscalculated",
  "No visibility into remote sales",
  "Billing mistakes cause disputes",
  "Zero visibility into profit per product",
  "Month-end accounts take days",
];

const NEW_WAY = [
  "Real-time stock updates automatically",
  "Cloud-backed digital records",
  "Live sales data from any device",
  "One-tap accurate billing",
  "Instant profit reports per day",
  "Auto-generated monthly reports",
];

export function ImpactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse delay-2000" />

        {/* Premium grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 hidden xl:block animate-float"></div>
      <div className="absolute bottom-20 left-10 hidden xl:block animate-float-delayed"></div>

      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* ── Premium Section Header ── */}
          <div className="text-center mb-16 flex flex-col items-center max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-primary shadow-lg shadow-primary/5"
            >
              <span>Real Results</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span className="text-muted-foreground font-normal">
                Trusted by thousands
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Numbers that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  speak for themselves
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    d="M2 8C50 2 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg font-normal text-muted-foreground leading-relaxed"
            >
              Every number comes from businesses just like yours — shops that
              switched from notebooks and Excel to ZopShop.
            </motion.p>
          </div>

          {/* ── Premium Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24 max-w-6xl mx-auto px-4 sm:px-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative group bg-card border ${stat.borderColor} rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-2xl ${stat.glowColor} hover:-translate-y-1 transition-all duration-500 overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  {/* Icon with premium styling */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5 mb-5 shadow-lg ${stat.glowColor}`}
                  >
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5" />
                      <Icon
                        className={`w-6 h-6 ${stat.iconColor} relative z-10`}
                      />
                    </div>
                  </motion.div>

                  {/* Counter with premium styling */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                    className={`text-4xl sm:text-5xl font-bold tracking-tighter mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      delay={i * 200}
                    />
                  </motion.div>

                  <p className="text-sm font-normal text-muted-foreground leading-relaxed relative z-10">
                    {stat.label}
                  </p>

                  {/* Premium bottom indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Premium Before / After Comparison ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-4 sm:px-6"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-border/50 bg-background/40 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-muted-foreground shadow-sm"
              >
                <span>Before & After</span>
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                The old way vs{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ZopShop
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Way - Premium Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative rounded-2xl bg-card border border-border p-8 shadow-sm hover:shadow-xl hover:border-destructive/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 flex items-center justify-between relative z-10">
                  <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    The Old Way
                  </span>
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <span className="text-destructive font-bold text-lg">
                      ×
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 relative z-10">
                  {OLD_WAY.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start text-sm font-normal text-muted-foreground group-hover:text-muted-foreground/80 transition-colors"
                    >
                      <span className="mr-3 font-mono text-destructive/60 text-lg leading-none">
                        −
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* ZopShop Way - Premium Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative rounded-2xl bg-card border border-primary/20 p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="mb-6 flex items-center justify-between relative z-10">
                  <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                    With ZopShop
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <ul className="space-y-4 relative z-10">
                  {NEW_WAY.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start text-sm font-normal text-foreground group-hover:text-foreground/90 transition-colors"
                    >
                      <span className="mr-3 font-mono text-primary/60 text-lg leading-none">
                        +
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Premium bottom glow */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 group cursor-pointer shadow-lg shadow-primary/5"
              >
                <span className="text-sm font-semibold text-foreground">
                  Ready to transform your business?
                </span>
                <span className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  Join Now
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
