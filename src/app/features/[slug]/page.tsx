"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Package,
  CreditCard,
  BarChart,
  Users,
  Shield,
  Smartphone,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ResponsiveComponents from "@/components/providers/ResponsiveComponents";

interface FeatureDetail {
  title: string;
  description: string;
  image: string;
  pillBg: string;
  icon: any;
  tagline: string;
  stats: { label: string; value: string; desc: string }[];
  steps: { title: string; desc: string }[];
  accentColor: string;
}

const FEATURE_DETAILS: Record<string, FeatureDetail> = {
  "inventory-management": {
    title: "Inventory Management",
    description:
      "Track stock in real-time with instant low-stock alerts, automated purchase ordering, and precise item tagging.",
    image: "/Features_img/Inventory Management – Real‑time stock updates.jpg",
    pillBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    icon: Package,
    accentColor: "from-purple-500 to-indigo-500",
    tagline: "Achieve 100% inventory accuracy with zero manual effort.",
    stats: [
      {
        label: "Stock Accuracy",
        value: "99.9%",
        desc: "Near-perfect stock auditing and ledger tracking.",
      },
      {
        label: "Setup Time",
        value: "< 5 Mins",
        desc: "Bulk import items via CSV or barcode scanning.",
      },
      {
        label: "Shrinkage Saved",
        value: "30%+",
        desc: "Prevent inventory leakages and expirations.",
      },
    ],
    steps: [
      {
        title: "Register Products & SKUs",
        desc: "Easily import existing products or create new items using custom SKUs, barcodes, categories, and purchase prices.",
      },
      {
        title: "Define Safety Stock Thresholds",
        desc: "Set minimum and maximum stock limits for every product to trigger automatic reorder alerts before you run out.",
      },
      {
        title: "Real-Time Stock Auditing",
        desc: "As sales occur through the POS, quantities are immediately updated. Audit adjustments are recorded with clear reasons.",
      },
      {
        title: "Automated Reordering & Suppliers",
        desc: "Generate supplier purchase sheets in one click when items hit safety levels, streamlining your procurement pipeline.",
      },
    ],
  },
  "billing-system": {
    title: "Billing System",
    description:
      "Create invoices quickly, process transactions in seconds, and track cash flow with a fully integrated Point of Sale (POS) system.",
    image: "/Features_img/Billing System – Fast invoicing.jpg",
    pillBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
    icon: CreditCard,
    accentColor: "from-emerald-400 to-teal-500",
    tagline: "Serve customers faster and get paid instantly.",
    stats: [
      {
        label: "Invoice Speed",
        value: "2 Seconds",
        desc: "Lightning fast checkout flow for cashiers.",
      },
      {
        label: "MFS Payments",
        value: "Instant",
        desc: "bkash, Rocket, Nagad integration supported.",
      },
      {
        label: "Receipt Printing",
        value: "All Types",
        desc: "Supports POS thermal, 80mm, and A4 invoices.",
      },
    ],
    steps: [
      {
        title: "Interactive POS Interface",
        desc: "Add items to the shopping cart by tapping on categories, searching, or scanning barcodes directly from the sales screen.",
      },
      {
        title: "Apply Discounts & Taxes",
        desc: "Apply flat or percentage discounts, assign customer profiles, and add predefined VAT/TAX rates in real time.",
      },
      {
        title: "Multiple Payment Modes",
        desc: "Accept split payments using Cash, Credit Cards, or Mobile Financial Services (MFS) with instant digital reconciliation.",
      },
      {
        title: "Instant Invoice & Receipts",
        desc: "Print thermal invoices instantly, send e-receipts directly to customers via SMS or email, and log transaction logs.",
      },
    ],
  },
  "reports-analytics": {
    title: "Reports & Analytics",
    description:
      "View business insights with clear visual reports, daily registers, and comprehensive profit/loss statements.",
    image: "/Features_img/Reports & Analytics – Data‑driven insights.jpg",
    pillBg: "bg-gradient-to-r from-blue-400 to-cyan-500",
    icon: BarChart,
    accentColor: "from-blue-400 to-cyan-500",
    tagline: "Make data-driven decisions that scale your business.",
    stats: [
      {
        label: "Report Sync",
        value: "Real-Time",
        desc: "Dashboards update immediately with every sale.",
      },
      {
        label: "Metrics Tracked",
        value: "50+",
        desc: "Monitor sales, revenue, profit, margins, and taxes.",
      },
      {
        label: "Export Formats",
        value: "PDF & Excel",
        desc: "Generate report downloads for accounting.",
      },
    ],
    steps: [
      {
        title: "Consolidated Daily Register",
        desc: "Monitor opening cash, cash sales, card sales, and cash drawers to prevent discrepancy during shifts.",
      },
      {
        title: "Automated Profit & Loss (P&L)",
        desc: "Calculate gross profit margins and net profits by automatically deducting product costs, discounts, and operating expenses.",
      },
      {
        title: "Visual Trends & Analytics",
        desc: "Visualize business trends over days, months, or years with interactive charts to see when your business performs best.",
      },
      {
        title: "Best-Selling Insights",
        desc: "Identify top-performing products and low-margin items so you can focus inventory on what drives revenue.",
      },
    ],
  },
  "team-management": {
    title: "Team Management",
    description:
      "Manage roles and permissions for cashiers, managers, and partners, keeping your business operations secure.",
    image: "/Features_img/Team Management – Role‑based access.jpg",
    pillBg: "bg-gradient-to-r from-violet-400 to-sky-500",
    icon: Users,
    accentColor: "from-violet-400 to-sky-500",
    tagline: "Collaborate securely with granular, role-based controls.",
    stats: [
      {
        label: "Staff Members",
        value: "Unlimited",
        desc: "Create accounts for your entire workforce.",
      },
      {
        label: "Roles Allowed",
        value: "Fully Custom",
        desc: "Assign specific system accesses per role.",
      },
      {
        label: "Audit Logging",
        value: "100%",
        desc: "Every transaction is tagged to a specific employee.",
      },
    ],
    steps: [
      {
        title: "Create Staff Accounts",
        desc: "Register employees with unique credentials to track individual performance and ensure clear accountability.",
      },
      {
        title: "Assign Predefined Roles",
        desc: "Assign staff to roles like Cashier, Manager, or Admin, instantly enabling or restricting access to the dashboard.",
      },
      {
        title: "Granular Permission Toggles",
        desc: "Fine-tune access privileges to hide wholesale prices, prevent deletion of sales, or restrict settings access.",
      },
      {
        title: "Action Auditing",
        desc: "Track exactly who created an invoice, updated inventory, or processed a refund with detailed audit history logs.",
      },
    ],
  },
  "secure-data": {
    title: "Secure Data",
    description:
      "Protect your customer records, financial ledgers, and inventory data with enterprise-grade encrypted storage and backups.",
    image: "/Features_img/Secure Data – Encrypted storage.jpg",
    pillBg: "bg-gradient-to-r from-pink-400 to-rose-500",
    icon: Shield,
    accentColor: "from-pink-400 to-rose-500",
    tagline: "Your business data is private, secure, and always backed up.",
    stats: [
      {
        label: "Security Encryption",
        value: "AES-256",
        desc: "Bank-grade data encryption in transit and at rest.",
      },
      {
        label: "Cloud Backups",
        value: "Hourly",
        desc: "Automated off-site database backups.",
      },
      {
        label: "Platform Uptime",
        value: "99.99%",
        desc: "Hosted on resilient cloud infrastructure.",
      },
    ],
    steps: [
      {
        title: "Bank-Grade Encryption",
        desc: "All user data, financial records, and settings are encrypted using industry-standard AES-256 bit encryption protocols.",
      },
      {
        title: "Continuous Database Backups",
        desc: "Our system takes automatic snapshots of your database every hour and stores them across multiple geographical cloud sites.",
      },
      {
        title: "Session Guard & 2FA",
        desc: "Protect access with automatic session timeouts, suspicious login flags, and optional two-factor authentication.",
      },
      {
        title: "Zero Data-Loss Guarantee",
        desc: "In case of local hardware failure, your cloud data remains unaffected and can be restored instantly on any new device.",
      },
    ],
  },
  "mobile-friendly": {
    title: "Mobile Friendly",
    description:
      "Manage inventory, run sales, and scan barcodes on-the-go using any mobile device or tablet without extra hardware.",
    image: "/Features_img/Mobile Friendly – Access from anywhere.jpg",
    pillBg: "bg-gradient-to-r from-orange-400 to-red-500",
    icon: Smartphone,
    accentColor: "from-orange-400 to-red-500",
    tagline: "Take your business with you, wherever you go.",
    stats: [
      {
        label: "Responsive Layout",
        value: "100%",
        desc: "Perfect interface optimization on all screens.",
      },
      {
        label: "Device Sync",
        value: "Real-Time",
        desc: "Instantly sync sales between mobile and desktop.",
      },
      {
        label: "Camera Scanning",
        value: "Supported",
        desc: "Use phone camera as a high-speed barcode reader.",
      },
    ],
    steps: [
      {
        title: "Zero Install Experience",
        desc: "Access the full POS and dashboard from Safari, Chrome, or any mobile browser without downloading heavy apps.",
      },
      {
        title: "Mobile Barcode Scanner",
        desc: "Leverage your smartphone's built-in camera to scan item barcodes instantly, adding them to POS cart or updating stock.",
      },
      {
        title: "Real-Time Multi-Device Sync",
        desc: "Run sales on multiple phones concurrently. All transaction details sync to the cloud database instantly.",
      },
      {
        title: "Share E-Receipts Instantly",
        desc: "Email invoice PDFs or generate a link to share receipts via WhatsApp, reducing thermal paper usage.",
      },
    ],
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const feature = FEATURE_DETAILS[slug];

  if (!feature) {
    notFound();
  }

  const FeatureIcon = feature.icon;

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-background">
      <Navbar />

      <main className="flex-1 relative z-10 pt-16">
        <div className="min-h-screen relative overflow-x-hidden pb-16 pt-12">
          {/* Background Orbs */}

          <ResponsiveComponents>
            <div className="container mx-auto px-4 max-w-5xl">
              {/* Back Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <Link
                  href="/#features"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-foreground/50 transition-colors">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  </div>
                  Back to Features
                </Link>
              </motion.div>

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border/60 pb-8">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "p-2.5 rounded-md text-white shadow-lg",
                        feature.pillBg,
                      )}
                    >
                      <FeatureIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                      ZopShop Core Feature
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {feature.title}
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex-shrink-0 md:self-end bg-muted/40 border border-border/85 rounded-md px-5 py-4 backdrop-blur-sm shadow-sm md:max-w-xs"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Key Advantage
                  </p>
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {feature.tagline}
                  </p>
                </motion.div>
              </div>

              {/* Feature Highlight Mockup / Image (Fixed to exactly 16:9 Aspect Ratio) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full rounded-md overflow-hidden border border-border/80 shadow-2xl bg-card mb-12"
              >
                {/* Browser Frame Header */}
                <div className="h-10 border-b border-border/60 bg-muted/30 flex items-center justify-between px-4 shrink-0 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="h-6 w-48 sm:w-64 bg-foreground/5 rounded-md flex items-center justify-center text-[10px] text-muted-foreground border border-border/40 font-mono tracking-tight select-none">
                    zopshop.app/features/{slug}
                  </div>
                  <div className="w-8" /> {/* Spacer */}
                </div>

                <div className="relative w-full aspect-[16/9] bg-muted/10">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    priority
                    className="object-contain w-full h-full"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
              >
                {feature.stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="bg-card hover:bg-muted/10 border border-border/80 rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-3xl font-extrabold text-foreground tracking-tight block mb-1">
                        {stat.value}
                      </span>
                      <span className="text-sm font-bold text-foreground block mb-2">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal border-t border-border/50 pt-3 mt-2">
                      {stat.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Step-by-Step Interactive Timeline */}
              <div className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl font-bold text-foreground mb-8 text-center"
                >
                  How It Works: Step-by-Step
                </motion.h2>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6 max-w-3xl mx-auto relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-border/60"
                >
                  {feature.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="relative flex gap-6 pl-14 group/step"
                    >
                      {/* Step Number Badge */}
                      <div
                        className={cn(
                          "absolute left-0 top-0.5 w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg text-white shadow-md border-2 border-background z-10 transition-transform duration-300 group-hover/step:scale-110",
                          feature.pillBg,
                        )}
                      >
                        {index + 1}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 bg-card border border-border/80 rounded-md p-5 shadow-sm hover:border-foreground/20 transition-all duration-300">
                        <h3 className="font-bold text-base text-foreground mb-1.5 flex items-center gap-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* CTA Footer Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-md overflow-hidden border border-border/80 p-8 sm:p-12 bg-muted/30 backdrop-blur-sm text-center max-w-4xl mx-auto shadow-sm"
              >
                {/* Top decorative glow */}
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full blur-[60px] opacity-20 bg-gradient-to-r",
                    feature.accentColor,
                  )}
                />

                <div className="relative z-10 max-w-2xl mx-auto">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Ready to optimize your {feature.title.toLowerCase()}?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-lg mx-auto">
                    Join thousands of retailers who trust ZopShop to automate
                    their store operations, POS invoices, and inventory checks.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/register"
                      className={cn(
                        "px-6 py-3 rounded-md font-bold text-sm text-white shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300",
                        feature.pillBg,
                      )}
                    >
                      Get Started Free
                    </Link>
                    <Link
                      href="/#pricing"
                      className="px-6 py-3 rounded-md font-bold text-sm border border-border bg-card hover:bg-muted text-foreground transition-all duration-300"
                    >
                      View Pricing Plans
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </ResponsiveComponents>
        </div>
      </main>

      <Footer />
    </div>
  );
}
