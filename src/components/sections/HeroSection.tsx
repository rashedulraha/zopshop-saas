"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Bell,
  ChevronDown,
  ShoppingBag,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  HelpCircle,
  Mail,
  LogOut,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash2,
  CheckCircle2,
  Store,
  Wallet,
  Users,
  Shield,
  Sparkles,
  Landmark,
  FileText,
} from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";
import DemoDashboard from "../dmeoDashboard/DemoDashboard";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [mockupTab, setMockupTab] = useState("overview");

  // POS Checkout State
  const [cart, setCart] = useState([
    { id: 1, name: "iPhone 15 Case", qty: 1, price: 19.99 },
    { id: 2, name: "USB-C Cable 2M", qty: 2, price: 12.99 },
    { id: 3, name: "Logitech G Pro Mouse", qty: 1, price: 120.0 },
  ]);

  const updateCartQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      }),
    );
  };

  const removeCartItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const cartTax = cartSubtotal * 0.05;
  const cartTotal = cartSubtotal + cartTax;

  // Settings State
  const [shopName, setShopName] = useState("ZopShop Retail Store");
  const [taxRate, setTaxRate] = useState("5.0");
  const [currency, setCurrency] = useState("USD ($)");
  const [receiptHeader, setReceiptHeader] = useState(
    "Thank you for shopping with us!",
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden z-10 pt-24 pb-8 lg:pt-28 lg:pb-16 flex flex-col items-center justify-center min-h-screen"
    >
      {/* Alterx-style Concentric Arcs Sky Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-[#e0f2fe]/45 via-[#f0f9ff]/20 to-background dark:from-indigo-950/20 dark:via-background dark:to-background transition-colors duration-300">
        {/* Soft atmospheric gradient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-sky-400/20 dark:bg-indigo-500/10 blur-[100px] opacity-70" />

        {/* Concentric Arches radiating from top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] opacity-[0.4] dark:opacity-[0.15] text-sky-400 dark:text-indigo-500">
          <svg className="w-full h-full" viewBox="0 0 1400 700" fill="none">
            <circle
              cx="700"
              cy="-100"
              r="350"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="700"
              cy="-100"
              r="500"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="700"
              cy="-100"
              r="650"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6,6"
            />
            <circle
              cx="700"
              cy="-100"
              r="800"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="700"
              cy="-100"
              r="950"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="700"
              cy="-100"
              r="1100"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6,6"
            />
          </svg>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <ResponsiveComponents>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-10 px-4 text-center">
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold mb-6 bg-blue-50 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Join +1000 scaling businesses →
          </div>

          <h1 className="max-w-4xl mb-5 text-4xl sm:text-5xl lg:text-[60px] font-semibold tracking-tight text-slate-700 dark:text-slate-200 leading-[1.12] transition-colors duration-300">
            Smarter POS Solutions for
            <br />
            Better Sales Outcomes
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mb-10 text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors duration-300">
            The smarter way to manage sales starts with using tools that
            streamline every step of the process.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up">
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-md px-8 py-6 text-sm font-semibold group transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(0,102,255,0.3)]"
            >
              Get Started for Free →
            </Button>
            <Button
              render={<Link href="#demo-dashboard" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="rounded-md px-8 py-6 text-sm font-semibold bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-300 shadow-xs"
            >
              Book A Free Demo →
            </Button>
          </div>
        </div>
        <DemoDashboard />
        {/* Dashboard Preview Section (Alterx Design Mockup) */}
      </ResponsiveComponents>
    </section>
  );
}
