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
  FileText
} from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [mockupTab, setMockupTab] = useState("overview");

  // POS Checkout State
  const [cart, setCart] = useState([
    { id: 1, name: "iPhone 15 Case", qty: 1, price: 19.99 },
    { id: 2, name: "USB-C Cable 2M", qty: 2, price: 12.99 },
    { id: 3, name: "Logitech G Pro Mouse", qty: 1, price: 120.00 }
  ]);

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeCartItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartTax = cartSubtotal * 0.05;
  const cartTotal = cartSubtotal + cartTax;

  // Settings State
  const [shopName, setShopName] = useState("ZopShop Retail Store");
  const [taxRate, setTaxRate] = useState("5.0");
  const [currency, setCurrency] = useState("USD ($)");
  const [receiptHeader, setReceiptHeader] = useState("Thank you for shopping with us!");

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
            <circle cx="700" cy="-100" r="350" stroke="currentColor" strokeWidth="1" />
            <circle cx="700" cy="-100" r="500" stroke="currentColor" strokeWidth="1" />
            <circle cx="700" cy="-100" r="650" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
            <circle cx="700" cy="-100" r="800" stroke="currentColor" strokeWidth="1" />
            <circle cx="700" cy="-100" r="950" stroke="currentColor" strokeWidth="1" />
            <circle cx="700" cy="-100" r="1100" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
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

          <h1
            className="max-w-4xl mb-5 text-4xl sm:text-5xl lg:text-[60px] font-semibold tracking-tight text-slate-700 dark:text-slate-200 leading-[1.12] transition-colors duration-300"
          >
            Smarter POS Solutions for
            <br />
            Better Sales Outcomes
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-2xl mb-10 text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors duration-300"
          >
            The smarter way to manage sales starts with using tools that streamline every step of the process.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
          >
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-md px-8 py-6 text-sm font-semibold group transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(0,102,255,0.3)]"
            >
              Get Started for Free →
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="rounded-md px-8 py-6 text-sm font-semibold bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-300 shadow-xs"
            >
              Book A Free Demo →
            </Button>
          </div>
        </div>

        {/* Dashboard Preview Section (Alterx Design Mockup) */}
        <div className="relative w-full max-w-[1100px] mx-auto px-4 mt-4 animate-fade-in-up">
          
          {/* Gradient border wrapper */}
          <div className="w-full rounded-2xl p-[1px] pt-[2.5px] bg-gradient-to-b from-indigo-300/60 via-indigo-200/20 to-transparent shadow-[0_24px_60px_rgba(99,102,241,0.12)] dark:shadow-[0_24px_60px_rgba(99,102,241,0.2)]">

            {/* Browser Window — solid clean background */}
            <div className="w-full bg-[#eef2ff] dark:bg-[#141e3a] rounded-[14px] overflow-hidden">
            
            {/* Browser Control Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 dark:border-white/8 bg-white/70 dark:bg-[#1a2444]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div className="flex items-center gap-1 ml-4 text-[10px] text-slate-400">
                  <span>‹</span>
                  <span>›</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-md px-14 py-0.5 text-[10px] text-slate-500 dark:text-slate-400 text-center select-none font-medium">
                zopshop.com
              </div>

              <div className="w-12" />
            </div>

            {/* Browser Content Area */}
            <div className="flex h-[530px] overflow-hidden">

              {/* Sidebar — solid white, no transparency */}
              <div className="w-48 border-r border-slate-200 dark:border-white/8 flex flex-col p-3.5 bg-white dark:bg-[#1a2444] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-4">
                  {/* Logo - Removed Z Logo block, kept only text */}
                  <div className="flex items-center gap-2 px-2 pb-1">
                    <span className="font-bold text-slate-800 dark:text-white text-sm tracking-tight">ZopShop</span>
                  </div>

                  {/* Sidebar Navigation grouped like actual dashboard */}
                  <div className="flex flex-col gap-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {/* Group: Main */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none">Main</span>
                      <button
                        onClick={() => setMockupTab("overview")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "overview"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${mockupTab === "overview" ? "bg-[#0066ff]" : "bg-transparent"}`} />
                          <span>Overview</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setMockupTab("features")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "features"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Key Features</span>
                        </div>
                      </button>
                    </div>

                    {/* Group: Operations */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none">Operations</span>
                      <button
                        onClick={() => setMockupTab("product")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "product"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5" />
                          <span>Product</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setMockupTab("orders")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "orders"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Orders</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setMockupTab("checkout")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "checkout"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Checkout</span>
                        </div>
                        <span className="w-4 h-4 bg-rose-550/80 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                          {cart.length}
                        </span>
                      </button>
                    </div>

                    {/* Group: Finance & Reports */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none">Finance & Reports</span>
                      <button
                        onClick={() => setMockupTab("finance")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "finance"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Wallet className="w-3.5 h-3.5" />
                          <span>Finance</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setMockupTab("reports")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "reports"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Reports</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>

                    {/* Group: Admin */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none">Admin</span>
                      <button
                        onClick={() => setMockupTab("employees")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "employees"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>Employees</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setMockupTab("roles")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "roles"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5" />
                          <span>Users & Roles</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setMockupTab("setting")}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                          mockupTab === "setting"
                            ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400"
                            : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5" />
                          <span>Settings</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main panel — solid light background */}
              <div className="flex-1 bg-[#f5f7ff] dark:bg-[#111827] overflow-y-auto p-5 flex flex-col gap-5 custom-scrollbar">
                
                {/* Panel Top Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">
                      {mockupTab === "overview" && "Welcome Back, Alex"}
                      {mockupTab === "features" && "Core System Modules"}
                      {mockupTab === "product" && "Inventory Management"}
                      {mockupTab === "orders" && "Orders Manager"}
                      {mockupTab === "checkout" && "Point of Sale (POS) Checkout"}
                      {mockupTab === "finance" && "Financial Cash Book"}
                      {mockupTab === "reports" && "Business Insights & Reports"}
                      {mockupTab === "employees" && "Employee Management"}
                      {mockupTab === "roles" && "Users & Role Permissions"}
                      {mockupTab === "setting" && "Store Settings"}
                    </h3>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400">
                      {mockupTab === "overview" && "Here is the information about all your orders"}
                      {mockupTab === "features" && "Core tools designed to scale your retail business"}
                      {mockupTab === "product" && "Add, update and monitor your business inventory"}
                      {mockupTab === "orders" && "Search, review and track customer invoice statuses"}
                      {mockupTab === "checkout" && "Instantly invoice and check out store orders"}
                      {mockupTab === "finance" && "Track daily operations, cash flows, and operating expenses"}
                      {mockupTab === "reports" && "Diagnose sales performance and company profitability"}
                      {mockupTab === "employees" && "Manage staff details, attendance records, and pay summaries"}
                      {mockupTab === "roles" && "Configure user accounts, roles, and granular system access"}
                      {mockupTab === "setting" && "Modify currency, tax rates and custom headers"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-slate-400 cursor-pointer" />
                    <Bell className="w-4 h-4 text-slate-400 cursor-pointer" />
                    <div className="flex items-center gap-1.5 border border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-950/20 rounded-md px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-[8px] font-bold text-blue-600 dark:text-blue-400">JD</div>
                      <span>Alex</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* DYNAMIC CONTENT SWITCHER */}
                {mockupTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs">
                    {/* Card 1 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col gap-2 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4 text-[#0066ff]" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Sales & Profit Tracking</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        Accurate daily, weekly, or monthly sales records with real-time profit tracking for your business.
                      </p>
                    </div>

                    {/* Card 2 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col gap-2 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                          <Wallet className="w-4 h-4 text-[#0066ff]" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Customer Ledger & Debt Tracking</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        Ditch paper registers and digitize customer accounts, credits, and invoices seamlessly.
                      </p>
                    </div>

                    {/* Card 3 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col gap-2 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-[#0066ff]" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Business Insights & Reports</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        Understand business trends with interactive graphs and analytics to make data-driven decisions.
                      </p>
                    </div>

                    {/* Card 4 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col gap-2 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#0066ff]" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Multi-User Access</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        Separate role-based access control for owners, managers, and staff to run operations securely.
                      </p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white/40 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-305 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-[#0066ff]" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white">Secure Cloud Data</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        Never worry about data loss; all store records are securely backed up in the cloud, accessible anytime, anywhere.
                      </p>
                    </div>
                  </div>
                )}

                {mockupTab === "overview" && (
                  <div className="flex flex-col gap-5 animate-fade-in">
                    {/* Stat Cards (4 Columns) - Soft Glassmorphism */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Stat Card 1 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl font-black text-slate-800 dark:text-white">89,935</span>
                          <div className="w-6 h-6 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                            <ShoppingCart className="w-3 h-3 text-[#0066ff]" />
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Total sales</div>
                        <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                          <TrendingUp className="w-2.5 h-2.5" /> +1.0% this week
                        </span>
                      </div>

                      {/* Stat Card 2 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl font-black text-slate-800 dark:text-white">23,283.5</span>
                          <div className="w-6 h-6 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                            <Package className="w-3 h-3 text-[#0066ff]" />
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Total products</div>
                        <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                          <TrendingUp className="w-2.5 h-2.5" /> +0.49% this week
                        </span>
                      </div>

                      {/* Stat Card 3 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl font-black text-slate-800 dark:text-white">46,827</span>
                          <div className="w-6 h-6 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                            <ShoppingCart className="w-3 h-3 text-[#0066ff]" />
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Total users</div>
                        <span className="text-[9px] font-bold text-rose-500 flex items-center gap-0.5 mt-1">
                          <span className="transform rotate-45 inline-block text-[10px] font-black">↓</span> -0.91% this week
                        </span>
                      </div>

                      {/* Stat Card 4 */}
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-white/8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl font-black text-slate-800 dark:text-white">124,854</span>
                          <div className="w-6 h-6 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                            <TrendingUp className="w-3 h-3 text-[#0066ff]" />
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Refunded</div>
                        <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                          <TrendingUp className="w-2.5 h-2.5" /> +1.51% this week
                        </span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Recent Transactions</span>
                      </div>
                      <table className="w-full text-left border-collapse text-[10px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
                            <th className="py-2.5 px-3">No</th>
                            <th className="py-2.5 px-3">ID</th>
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">Customer Name</th>
                            <th className="py-2.5 px-3">Location</th>
                            <th className="py-2.5 px-3">Amount</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                          <tr>
                            <td className="py-2.5 px-3">1</td>
                            <td className="py-2.5 px-3 font-semibold text-[#0066ff] dark:text-blue-400">#12594</td>
                            <td className="py-2.5 px-3">Dec 1, 2026</td>
                            <td className="py-2.5 px-3 font-medium">Frank Murlo</td>
                            <td className="py-2.5 px-3 text-slate-450 dark:text-slate-400">312 S Wilmette Ave</td>
                            <td className="py-2.5 px-3 font-bold">$847.69</td>
                            <td className="py-2.5 px-3">
                              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> New Order
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3">2</td>
                            <td className="py-2.5 px-3 font-semibold text-[#0066ff] dark:text-blue-400">#12593</td>
                            <td className="py-2.5 px-3">Nov 30, 2026</td>
                            <td className="py-2.5 px-3 font-medium">Olivia Martin</td>
                            <td className="py-2.5 px-3 text-slate-450 dark:text-slate-400">82 Park Place</td>
                            <td className="py-2.5 px-3 font-bold">$299.00</td>
                            <td className="py-2.5 px-3">
                              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> New Order
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {mockupTab === "product" && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-48">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Filter products..." 
                            disabled 
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-md pl-8 pr-2.5 py-1 text-[10px] outline-none"
                          />
                        </div>
                        <button className="flex items-center gap-1 bg-[#0066ff] text-white px-2.5 py-1 rounded-md text-[10px] font-bold">
                          <Plus className="w-3.5 h-3.5" /> Add Product
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
                              <th className="py-2 px-3">SKU</th>
                              <th className="py-2 px-3">Product Name</th>
                              <th className="py-2 px-3">Category</th>
                              <th className="py-2 px-3">Stock</th>
                              <th className="py-2 px-3">Price</th>
                              <th className="py-2 px-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                            <tr>
                              <td className="py-2 px-3 font-medium">SKU-8219</td>
                              <td className="py-2 px-3 font-semibold">iPhone 15 Case</td>
                              <td className="py-2 px-3">Accessories</td>
                              <td className="py-2 px-3 font-bold">150</td>
                              <td className="py-2 px-3 font-bold">$19.99</td>
                              <td className="py-2 px-3">
                                <span className="flex items-center gap-1 text-emerald-600 font-semibold"><span className="w-1 h-1 rounded-full bg-emerald-500" /> In Stock</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3 font-medium">SKU-9382</td>
                              <td className="py-2 px-3 font-semibold">MacBook Pro 14"</td>
                              <td className="py-2 px-3">Electronics</td>
                              <td className="py-2 px-3 font-bold text-rose-500">2</td>
                              <td className="py-2 px-3 font-bold">$1,999.00</td>
                              <td className="py-2 px-3">
                                <span className="flex items-center gap-1 text-rose-600 font-semibold"><span className="w-1 h-1 rounded-full bg-rose-500" /> Critical</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3 font-medium">SKU-1029</td>
                              <td className="py-2 px-3 font-semibold">USB-C Cable 2M</td>
                              <td className="py-2 px-3">Accessories</td>
                              <td className="py-2 px-3 font-bold">200</td>
                              <td className="py-2 px-3 font-bold">$12.99</td>
                              <td className="py-2 px-3">
                                <span className="flex items-center gap-1 text-emerald-600 font-semibold"><span className="w-1 h-1 rounded-full bg-emerald-500" /> In Stock</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {mockupTab === "orders" && (
                  <div className="flex flex-col gap-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 p-4">
                      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-3 mb-3">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Invoice List</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">2 Paid</span>
                          <span className="w-2.5 h-2.5 rounded bg-amber-500 ml-2" />
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">1 Due</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between p-3 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 text-xs">
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">INV-1001</div>
                            <div className="text-[9px] text-slate-500 dark:text-slate-400">Customer: Olivia Martin | Date: Today 10:24 AM</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-800 dark:text-white">$299.00</span>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">Paid</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 text-xs">
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">INV-1002</div>
                            <div className="text-[9px] text-slate-500 dark:text-slate-400">Customer: Jackson Lee | Date: Today 09:12 AM</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-800 dark:text-white">$99.00</span>
                            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md">Due</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mockupTab === "checkout" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in text-xs">
                    {/* Cart Items */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 p-4 flex flex-col gap-3">
                      <h4 className="font-bold text-slate-800 dark:text-white border-b border-white/10 dark:border-white/5 pb-2 mb-1">Shopping Cart</h4>
                      <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/8">
                            <div>
                              <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">{item.name}</div>
                              <div className="text-[9px] text-[#0066ff]">${item.price} each</div>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <div className="flex items-center border border-white/20 dark:border-white/10 rounded bg-white/30 dark:bg-slate-950/40 text-[10px]">
                                <button onClick={() => updateCartQty(item.id, -1)} className="px-1.5 py-0.5">-</button>
                                <span className="px-2 font-bold">{item.qty}</span>
                                <button onClick={() => updateCartQty(item.id, 1)} className="px-1.5 py-0.5">+</button>
                              </div>
                              <button onClick={() => removeCartItem(item.id)} className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 p-4 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2.5">
                        <h4 className="font-bold text-slate-800 dark:text-white border-b border-white/10 dark:border-white/5 pb-2 mb-1">Billing Summary</h4>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400 font-semibold text-[10px]">
                          <span>Subtotal</span>
                          <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 dark:text-slate-400 font-semibold text-[10px]">
                          <span>Tax ({taxRate}%)</span>
                          <span>${cartTax.toFixed(2)}</span>
                        </div>
                        <hr className="border-white/10 dark:border-white/5" />
                        <div className="flex justify-between font-black text-slate-800 dark:text-white text-sm">
                          <span>Total</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white py-2 rounded-md font-bold text-[10px] shadow-xs cursor-pointer">
                        Process Payment
                      </button>
                    </div>
                  </div>
                )}

                {mockupTab === "finance" && (
                  <div className="flex flex-col gap-4 animate-fade-in text-xs">
                    {/* Finance balances */}
                    <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-100 dark:border-white/8 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold block">Cash Book</span>
                          <span className="text-sm font-extrabold text-slate-800 dark:text-white">$6,500.00</span>
                        </div>
                        <Wallet className="w-4 h-4 text-emerald-500" />
                      </div>
                    <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-100 dark:border-white/8 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold block">Bank Account</span>
                          <span className="text-sm font-extrabold text-slate-800 dark:text-white">$32,840.00</span>
                        </div>
                        <Landmark className="w-4 h-4 text-indigo-500" />
                      </div>
                    <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-100 dark:border-white/8 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold block">Daily Expense</span>
                          <span className="text-sm font-extrabold text-slate-805 dark:text-white text-rose-500">$705.00</span>
                        </div>
                        <TrendingUp className="w-4 h-4 text-rose-500 transform rotate-180" />
                      </div>
                    </div>

                    {/* Expense ledger */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-white/8 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Expenses Tracker</span>
                      </div>
                      <table className="w-full text-left border-collapse text-[10px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
                            <th className="py-2 px-3">Category</th>
                            <th className="py-2 px-3">Description</th>
                            <th className="py-2 px-3">Amount</th>
                            <th className="py-2 px-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
                          <tr>
                            <td className="py-2 px-3 font-semibold">Marketing</td>
                            <td className="py-2 px-3 text-slate-450 dark:text-slate-400">Facebook Page Ads</td>
                            <td className="py-2 px-3 font-bold text-rose-500">$500.00</td>
                            <td className="py-2 px-3">12 Oct 2026</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold">Utilities</td>
                            <td className="py-2 px-3 text-slate-450 dark:text-slate-400">Electricity Bill</td>
                            <td className="py-2 px-3 font-bold text-rose-500">$120.00</td>
                            <td className="py-2 px-3">13 Oct 2026</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold">Logistics</td>
                            <td className="py-2 px-3 text-slate-450 dark:text-slate-400">Courier Services</td>
                            <td className="py-2 px-3 font-bold text-rose-500">$85.00</td>
                            <td className="py-2 px-3">11 Oct 2026</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {mockupTab === "reports" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
                    {/* Orders Analytics */}
                    <div className="lg:col-span-2 bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md">
                      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2 mb-3">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Orders Analytics</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                          <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" /> Offline</span>
                          <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Online</span>
                        </div>
                      </div>
                      <div className="h-32 flex items-end justify-between px-2 pt-4 relative">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                          <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
                          <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[60%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">Jan</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[45%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">Feb</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[75%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">Mar</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8 relative">
                          <div className="absolute -top-3 bg-slate-900 text-white text-[7px] px-1 py-0.5 rounded font-black">$59,492</div>
                          <div className="w-2 bg-[#0066ff] rounded-t h-[90%]" />
                          <span className="text-[8px] text-slate-800 dark:text-slate-200 font-extrabold">Apr</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[55%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">May</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[65%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">Jun</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 h-full justify-end w-8">
                          <div className="w-2 bg-slate-350 dark:bg-slate-800 rounded-t h-[50%]" />
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold">Jul</span>
                        </div>
                      </div>
                    </div>

                    {/* Earnings ring */}
                    <div className="bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 flex flex-col justify-between backdrop-blur-md">
                      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Profit Target</span>
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="h-24 w-full flex items-center justify-center relative">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800/40" />
                          <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray="251" strokeDashoffset="75" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800/40" />
                          <circle cx="50" cy="50" r="30" stroke="#ef4444" strokeWidth="6" fill="transparent" strokeDasharray="188.4" strokeDashoffset="45" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800/40" />
                          <circle cx="50" cy="50" r="20" stroke="#0066ff" strokeWidth="6" fill="transparent" strokeDasharray="125.6" strokeDashoffset="30" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="grid grid-cols-3 text-[8px] text-slate-500 dark:text-slate-400 font-semibold gap-1 text-center">
                        <span className="flex items-center justify-center gap-0.5"><span className="w-1 h-1 bg-[#ef4444] rounded-full" /> Offline</span>
                        <span className="flex items-center justify-center gap-0.5"><span className="w-1 h-1 bg-[#10b981] rounded-full" /> Online</span>
                        <span className="flex items-center justify-center gap-0.5"><span className="w-1 h-1 bg-[#0066ff] rounded-full" /> Trade</span>
                      </div>
                    </div>
                  </div>
                )}

                {mockupTab === "employees" && (
                  <div className="bg-white/45 dark:bg-slate-950/20 rounded-md border border-white/40 dark:border-white/5 p-4 animate-fade-in text-xs backdrop-blur-md">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 dark:border-white/5">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Staff Payroll & Roster</span>
                    </div>

                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Role</th>
                          <th className="py-2 px-3">Attendance</th>
                          <th className="py-2 px-3">Salary</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
                        <tr>
                          <td className="py-2 px-3 font-semibold">John Doe</td>
                          <td className="py-2 px-3 text-slate-450 dark:text-slate-400">Store Manager</td>
                          <td className="py-2 px-3 font-bold">98%</td>
                          <td className="py-2 px-3 font-bold">$1,200.00</td>
                          <td className="py-2 px-3">
                            <span className="bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Jane Smith</td>
                          <td className="py-2 px-3 text-slate-450 dark:text-slate-400">Cashier</td>
                          <td className="py-2 px-3 font-bold">95%</td>
                          <td className="py-2 px-3 font-bold">$800.00</td>
                          <td className="py-2 px-3">
                            <span className="bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Frank Miller</td>
                          <td className="py-2 px-3 text-slate-455 dark:text-slate-400">Sales Clerk</td>
                          <td className="py-2 px-3 font-bold">92%</td>
                          <td className="py-2 px-3 font-bold">$650.00</td>
                          <td className="py-2 px-3">
                            <span className="bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md font-bold">Due</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {mockupTab === "roles" && (
                  <div className="bg-white/45 dark:bg-slate-950/20 rounded-md border border-white/40 dark:border-white/5 p-4 animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-md">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/5">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Users & Associated Roles</span>
                      <button className="flex items-center gap-1 bg-[#0066ff] text-white px-2.5 py-1 rounded-md text-[10px] font-bold">
                        <Plus className="w-3.5 h-3.5" /> Add User
                      </button>
                    </div>

                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Email</th>
                          <th className="py-2 px-3">Role</th>
                          <th className="py-2 px-3">Permissions Scope</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Alex</td>
                          <td className="py-2.5 px-3 text-slate-450 dark:text-slate-400">alex@zopshop.com</td>
                          <td className="py-2.5 px-3">
                            <span className="bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold">Owner / Admin</span>
                          </td>
                          <td className="py-2.5 px-3 font-medium">Full Access (All Modules)</td>
                          <td className="py-2.5 px-3">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">John Doe</td>
                          <td className="py-2.5 px-3 text-slate-455 dark:text-slate-400">john@zopshop.com</td>
                          <td className="py-2.5 px-3">
                            <span className="bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold">Manager</span>
                          </td>
                          <td className="py-2.5 px-3 font-medium">Inventory, Sales, Analytics</td>
                          <td className="py-2.5 px-3">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold">Jane Smith</td>
                          <td className="py-2.5 px-3 text-slate-455 dark:text-slate-400">jane@zopshop.com</td>
                          <td className="py-2.5 px-3">
                            <span className="bg-purple-50/50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-md font-bold">Cashier</span>
                          </td>
                          <td className="py-2.5 px-3 font-medium">POS Billing Checkout Only</td>
                          <td className="py-2.5 px-3">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {mockupTab === "setting" && (
                  <div className="bg-white/45 dark:bg-slate-950/20 rounded-md border border-white/40 dark:border-white/5 p-4 flex flex-col gap-4 animate-fade-in text-xs backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px]">Shop Name</label>
                        <input 
                          type="text" 
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px]">VAT / Tax Rate (%)</label>
                        <input 
                          type="text" 
                          value={taxRate}
                          onChange={(e) => setTaxRate(e.target.value)}
                          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px]">Currency Selector</label>
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50"
                        >
                          <option>USD ($)</option>
                          <option>BDT (৳)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px]">Receipt Footer Header</label>
                        <input 
                          type="text" 
                          value={receiptHeader}
                          onChange={(e) => setReceiptHeader(e.target.value)}
                          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50"
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/10 dark:border-white/5 pt-3 flex justify-end">
                      <button className="bg-[#0066ff] text-white px-4 py-2 rounded-md font-bold text-[10px] shadow-xs cursor-pointer flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Save Configuration
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </ResponsiveComponents>
    </section>
  );
}
