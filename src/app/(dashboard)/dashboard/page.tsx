"use client";

import { useState } from "react";
import { 
  RecentSalesTable, RecentPurchasesTable, RecentExpensesTable, 
  LowStockTable, PendingDeliveriesTable 
} from "@/components/dashboard/DataTables";
import { ChartTabs } from "@/components/dashboard/ChartTabs";
import { 
  ShoppingCart, DollarSign, TrendingUp, AlertTriangle, 
  Calendar, FileText, ChevronDown, Wallet, Landmark,
  ArrowUpRight, ArrowDownRight, Package, Truck, ArrowRight,
  MoreHorizontal, Trash2, CheckCircle2, Search, Bell, 
  ChevronRight, HelpCircle, Mail, LogOut, ShoppingBag,
  Settings, Plus, Users, Shield, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// MOCK DATA for Charts
const trendData = [
  { name: "Mon", sales: 4000, purchase: 2400, profit: 1600, customers: 12 },
  { name: "Tue", sales: 3000, purchase: 1398, profit: 1602, customers: 18 },
  { name: "Wed", sales: 2000, purchase: 9800, profit: -7800, customers: 5 },
  { name: "Thu", sales: 2780, purchase: 3908, profit: -1128, customers: 22 },
  { name: "Fri", sales: 1890, purchase: 4800, profit: -2910, customers: 14 },
  { name: "Sat", sales: 2390, purchase: 3800, profit: -1410, customers: 30 },
  { name: "Sun", sales: 3490, purchase: 4300, profit: -810, customers: 25 },
];

const monthlyData = [
  { name: "Jan", revenue: 40000, expense: 24000 },
  { name: "Feb", revenue: 30000, expense: 13980 },
  { name: "Mar", revenue: 20000, expense: 18000 },
  { name: "Apr", revenue: 27800, expense: 19080 },
  { name: "May", revenue: 18900, expense: 14800 },
  { name: "Jun", revenue: 33900, expense: 23800 },
];

const expenseData = [
  { name: "Salaries", value: 14000 },
  { name: "Marketing", value: 8000 },
  { name: "Rent", value: 5000 },
  { name: "Utilities", value: 2780 },
  { name: "Logistics", value: 4890 },
];

const brandData = [
  { name: "Apple", value: 45 },
  { name: "Samsung", value: 25 },
  { name: "Sony", value: 15 },
  { name: "LG", value: 15 },
];

const bestSelling = [
  { name: "iPhone 15", total: 1400 },
  { name: "MacBook Air", total: 950 },
  { name: "AirPods Pro", total: 800 },
  { name: "Galaxy S24", total: 600 },
  { name: "Sony WH", total: 450 },
];

const inventoryValue = [
  { name: "Jan", value: 150000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 160000 },
  { name: "Apr", value: 155000 },
  { name: "May", value: 170000 },
  { name: "Jun", value: 180000 },
];

// MOCK DATA for Tables
const recentSales = [
  { invoice: "INV-1001", customer: "Olivia Martin", amount: "$299.00", status: "Paid", date: "Today 10:24 AM" },
  { invoice: "INV-1002", customer: "Jackson Lee", amount: "$99.00", status: "Due", date: "Today 09:12 AM" },
  { invoice: "INV-1003", customer: "Isabella Nguyen", amount: "$450.00", status: "Paid", date: "Yesterday" },
  { invoice: "INV-1004", customer: "William Kim", amount: "$15.00", status: "Paid", date: "Yesterday" },
  { invoice: "INV-1005", customer: "Sofia Davis", amount: "$350.00", status: "Paid", date: "2 days ago" },
];

const recentPurchases = [
  { supplier: "TechCorp Inc.", invoice: "PO-501", amount: "$5,400.00", status: "Received", date: "12 Oct 2026" },
  { supplier: "Global Supply", invoice: "PO-502", amount: "$1,200.00", status: "Pending", date: "10 Oct 2026" },
  { supplier: "Smart Devices Ltd", invoice: "PO-503", amount: "$3,800.00", status: "Received", date: "08 Oct 2026" },
];

const recentExpenses = [
  { category: "Utilities", amount: "$120.00", description: "Electricity Bill", date: "13 Oct 2026" },
  { category: "Marketing", amount: "$500.00", description: "Facebook Ads", date: "12 Oct 2026" },
  { category: "Logistics", amount: "$85.00", description: "Courier Services", date: "11 Oct 2026" },
];

const lowStock = [
  { product: "iPhone 15 Case", brand: "Spigen", stock: "5", alert: "Critical" },
  { product: "USB-C Cable 2M", brand: "Anker", stock: "12", alert: "Low" },
  { product: "MacBook Pro 14\"", brand: "Apple", stock: "2", alert: "Critical" },
];

const pendingDeliveries = [
  { invoice: "INV-0985", customer: "Sofia Davis", driver: "John Doe", status: "On the way" },
  { invoice: "INV-0988", customer: "Michael Chen", driver: "Unassigned", status: "Processing" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"real" | "demo">("real");
  const [demoTab, setDemoTab] = useState("overview");

  // Real Dashboard state
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ranges = ["Today", "Yesterday", "Last 7 Days", "This Month", "This Year"];

  // POS Checkout State (for Demo Dashboard)
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

  // Settings State (for Demo Dashboard)
  const [shopName, setShopName] = useState("ZopShop Retail Store");
  const [taxRate, setTaxRate] = useState("5.0");
  const [currency, setCurrency] = useState("USD ($)");
  const [receiptHeader, setReceiptHeader] = useState("Thank you for shopping with us!");

  return (
    <div className="relative flex flex-col gap-6 md:gap-8 pb-12">
      
      {/* Background design consistency - soft top gradient glow and arches for Demo */}
      {activeTab === "demo" && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden -m-4 md:-m-6 lg:-m-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-sky-300/10 dark:bg-indigo-500/5 blur-[80px]" />
          
          {/* Concentric Arches radiating from top-center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-[0.2] dark:opacity-[0.08] text-sky-400 dark:text-indigo-500">
            <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none">
              <circle cx="500" cy="-100" r="250" stroke="currentColor" strokeWidth="1" />
              <circle cx="500" cy="-100" r="350" stroke="currentColor" strokeWidth="1" />
              <circle cx="500" cy="-100" r="450" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx="500" cy="-100" r="550" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      )}

      {/* Premium Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1 text-sm">Real-time statistics & business diagnostics</p>
          </div>

          {/* Tab Switcher (Real vs Demo) */}
          <div className="flex items-center bg-muted/60 dark:bg-slate-900/60 border border-border/60 p-1 rounded-md text-xs font-semibold select-none shadow-2xs">
            <button
              onClick={() => setActiveTab("real")}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer",
                activeTab === "real" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Real Dashboard
            </button>
            <button
              onClick={() => setActiveTab("demo")}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer",
                activeTab === "demo" 
                  ? "bg-card text-[#0066ff] shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Demo Dashboard
            </button>
          </div>
        </div>
        
        {/* Date Selector & Action buttons (Only show for Real Dashboard) */}
        {activeTab === "real" && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Custom Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{timeRange}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-1.5 w-40 bg-card border border-border rounded-md shadow-lg z-20 divide-y divide-border/50">
                    {ranges.map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm hover:bg-muted/80 transition-colors",
                          timeRange === range ? "text-primary font-medium bg-primary/5" : "text-muted-foreground"
                        )}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        )}
      </div>

      {activeTab === "real" ? (
        <>
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground leading-tight">Today&apos;s Sales</span>
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">$3,240</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-500 mt-1.5">
                <ArrowUpRight className="w-3 h-3" /> +12.5% vs yesterday
              </span>
            </div>

            <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-emerald-500/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground leading-tight">Net Profit</span>
                <div className="w-7 h-7 rounded-full bg-emerald-50/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">$1,450</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-500 mt-1.5">
                <ArrowUpRight className="w-3 h-3" /> +8.2% vs yesterday
              </span>
            </div>

            <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-indigo-500/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground leading-tight">Capital</span>
                <div className="w-7 h-7 rounded-full bg-indigo-50/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-3.5 h-3.5 text-indigo-500" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">$39.3K</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-rose-500 mt-1.5">
                <ArrowDownRight className="w-3 h-3" /> -1.8% vs yesterday
              </span>
            </div>

            <div className="flex flex-col p-4 bg-rose-500/[0.03] border border-rose-500/20 rounded-md hover:border-rose-500/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground leading-tight">Alerts</span>
                <div className="w-7 h-7 rounded-full bg-rose-50/10 flex items-center justify-center shrink-0 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">3 Tasks</span>
              <span className="inline-flex items-center text-[10px] font-bold text-rose-500 mt-1.5 uppercase tracking-wide">
                Action Required
              </span>
            </div>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
              <div className="border border-border bg-card p-5 rounded-md">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                  <h2 className="text-lg font-semibold text-foreground tracking-tight">Business Diagnostics</h2>
                  <span className="text-xs text-muted-foreground">Updated 2m ago</span>
                </div>
                <ChartTabs
                  trendData={trendData}
                  monthlyData={monthlyData}
                  expenseData={expenseData}
                  brandData={brandData}
                  bestSelling={bestSelling}
                  inventoryValue={inventoryValue}
                />
              </div>

              <RecentSalesTable data={recentSales} />
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
              <div className="border border-border bg-card p-5 rounded-md flex flex-col">
                <div className="border-b border-border pb-3 mb-4">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight">Financial Accounts</h3>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Current Cash</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">$6,500.00</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-50/10 flex items-center justify-center text-indigo-500">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Bank Account</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">$32,840.00</span>
                  </div>

                  <hr className="border-border/50" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-50/10 flex items-center justify-center text-amber-550">
                        <ArrowDownRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Customer Due</span>
                    </div>
                    <span className="text-sm font-semibold text-amber-550">$4,320.00</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-rose-50/10 flex items-center justify-center text-rose-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Supplier Due</span>
                    </div>
                    <span className="text-sm font-semibold text-rose-500">$2,150.00</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <LowStockTable data={lowStock} />
                <PendingDeliveriesTable data={pendingDeliveries} />
              </div>

              <RecentExpensesTable data={recentExpenses} />
              <RecentPurchasesTable data={recentPurchases} />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full rounded-2xl p-[1px] pt-[2.5px] bg-gradient-to-b from-[#0066ff]/35 via-[#0066ff]/10 to-[#0066ff]/01 dark:from-blue-500/20 dark:via-blue-500/05 dark:to-transparent transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <div className="flex h-[560px] rounded-[14px] overflow-hidden bg-card/20 dark:bg-slate-950/15 backdrop-blur-xl relative z-10 animate-fade-in text-foreground">
          {/* Sub Navigation Sidebar synced with actual dashboard layout */}
          <div className="w-48 border-r border-white/10 dark:border-white/5 flex flex-col justify-between p-3.5 bg-card/25 dark:bg-slate-950/10 backdrop-blur-lg overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3.5 text-xs font-semibold text-muted-foreground">
                
                {/* Group: Main */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black px-2.5 mb-1 select-none">Main</span>
                  <button
                    onClick={() => setDemoTab("overview")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "overview" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn("w-1.5 h-1.5 rounded-full", demoTab === "overview" ? "bg-primary" : "bg-transparent")} />
                      <span>Overview</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setDemoTab("features")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "features" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Key Features</span>
                    </div>
                  </button>
                </div>

                {/* Group: Operations */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black px-2.5 mb-1 select-none">Operations</span>
                  <button
                    onClick={() => setDemoTab("product")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "product" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5" />
                      <span>Product</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDemoTab("orders")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "orders" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Orders</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDemoTab("checkout")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "checkout" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Checkout</span>
                    </div>
                    <span className="w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                      {cart.length}
                    </span>
                  </button>
                </div>

                {/* Group: Finance & Reports */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black px-2.5 mb-1 select-none">Finance & Reports</span>
                  <button
                    onClick={() => setDemoTab("finance")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "finance" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Finance</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDemoTab("reports")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "reports" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Reports</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>

                {/* Group: Admin */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-black px-2.5 mb-1 select-none">Admin</span>
                  <button
                    onClick={() => setDemoTab("employees")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "employees" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>Employees</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDemoTab("roles")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "roles" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Users & Roles</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <button
                    onClick={() => setDemoTab("setting")}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 text-left cursor-pointer",
                      demoTab === "setting" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5" />
                      <span>Settings</span>
                    </div>
                  </button>
                </div>

              </div>
            </div>
            
            <div className="flex flex-col gap-1 text-[11px] font-semibold text-muted-foreground border-t border-border/50 pt-3">
              <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-foreground cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Help Centre</span>
              </div>
            </div>
          </div>

          {/* Right Main Demo Content - Soft Glassmorphism */}
          <div className="flex-1 bg-white/05 dark:bg-slate-950/05 p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
            
            {demoTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs text-foreground">
                {/* Card 1 */}
                <div className="bg-white/40 dark:bg-slate-955/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-[#0066ff]" />
                    </div>
                    <h4 className="font-bold text-foreground">
                      Sales & Profit Tracking
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Accurate daily, weekly, or monthly sales records with
                    real-time profit tracking for your business.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white/40 dark:bg-slate-955/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-[#0066ff]" />
                    </div>
                    <h4 className="font-bold text-foreground">
                      Customer Ledger & Debt Tracking
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Ditch paper registers and digitize customer accounts,
                    credits, and invoices seamlessly.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white/40 dark:bg-slate-955/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#0066ff]" />
                    </div>
                    <h4 className="font-bold text-foreground">
                      Business Insights & Reports
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Understand business trends with interactive graphs and
                    analytics to make data-driven decisions.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white/40 dark:bg-slate-955/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#0066ff]" />
                    </div>
                    <h4 className="font-bold text-foreground">
                      Multi-User Access
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Separate role-based access control for owners, managers, and
                    staff to run operations securely.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white/40 dark:bg-slate-955/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col gap-2 hover:border-[#0066ff]/20 transition-all duration-300 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-[#0066ff]" />
                    </div>
                    <h4 className="font-bold text-foreground">
                      Secure Cloud Data
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Never worry about data loss; all store records are securely
                    backed up in the cloud, accessible anytime, anywhere.
                  </p>
                </div>
              </div>
            )}

            {demoTab === "overview" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-black text-foreground">
                        89,935
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-center">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#0066ff]" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      Total sales
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1.5">
                      <TrendingUp className="w-3 h-3" /> +1.0% this week
                    </span>
                  </div>

                  <div className="bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-black text-foreground">
                        23,283.5
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-center">
                        <Package className="w-3.5 h-3.5 text-[#0066ff]" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      Total products
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1.5">
                      <TrendingUp className="w-3 h-3" /> +0.49% this week
                    </span>
                  </div>

                  <div className="bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-black text-foreground">
                        46,827
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-center">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#0066ff]" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      Total users
                    </div>
                    <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5 mt-1.5">
                      <span className="transform rotate-45 inline-block text-[11px] font-black">
                        ↓
                      </span>{" "}
                      -0.91% this week
                    </span>
                  </div>

                  <div className="bg-white/45 dark:bg-slate-950/20 p-4 rounded-md border border-white/40 dark:border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-black text-foreground">
                        124,854
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-[#0066ff]" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      Refunded
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1.5">
                      <TrendingUp className="w-3 h-3" /> +1.51% this week
                    </span>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white/45 dark:bg-slate-950/20 rounded-md border border-white/40 dark:border-white/5 overflow-hidden backdrop-blur-md">
                  <div className="px-4 py-3 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Recent Transactions
                    </span>
                  </div>
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">ID</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Customer Name</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-foreground">
                      <tr>
                        <td className="py-2.5 px-3">1</td>
                        <td className="py-2.5 px-3 font-semibold text-[#0066ff]">
                          #12594
                        </td>
                        <td className="py-2.5 px-3">Dec 1, 2026</td>
                        <td className="py-2.5 px-3 font-medium">Frank Murlo</td>
                        <td className="py-2.5 px-3 font-bold">$847.69</td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-1 text-emerald-600 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                            New Order
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">2</td>
                        <td className="py-2.5 px-3 font-semibold text-[#0066ff]">
                          #12593
                        </td>
                        <td className="py-2.5 px-3">Nov 30, 2026</td>
                        <td className="py-2.5 px-3 font-medium">
                          Olivia Martin
                        </td>
                        <td className="py-2.5 px-3 font-bold">$299.00</td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-1 text-emerald-600 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                            New Order
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {demoTab === "product" && (
              <div className="bg-white/45 dark:bg-slate-950/20 p-5 rounded-md border border-white/40 dark:border-white/5 animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="relative w-48">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter products..."
                      disabled
                      className="w-full bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md pl-8 pr-2.5 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <button className="flex items-center gap-1 bg-[#0066ff] text-white px-3 py-1.5 rounded-md text-xs font-bold">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>

                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">Product Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Stock</th>
                      <th className="py-2.5 px-3">Price</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-foreground">
                    <tr>
                      <td className="py-2.5 px-3 font-medium">SKU-8219</td>
                      <td className="py-2.5 px-3 font-semibold">
                        iPhone 15 Case
                      </td>
                      <td className="py-2.5 px-3">Accessories</td>
                      <td className="py-2.5 px-3 font-bold">150</td>
                      <td className="py-2.5 px-3 font-bold">$19.99</td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                          In Stock
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">SKU-9382</td>
                      <td className="py-2.5 px-3 font-semibold">
                        MacBook Pro 14"
                      </td>
                      <td className="py-2.5 px-3">Electronics</td>
                      <td className="py-2.5 px-3 font-bold text-rose-500">2</td>
                      <td className="py-2.5 px-3 font-bold">$1,999.00</td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-rose-600 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />{" "}
                          Critical
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">SKU-1029</td>
                      <td className="py-2.5 px-3 font-semibold">
                        USB-C Cable 2M
                      </td>
                      <td className="py-2.5 px-3">Accessories</td>
                      <td className="py-2.5 px-3 font-bold">200</td>
                      <td className="py-2.5 px-3 font-bold">$12.99</td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                          In Stock
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {demoTab === "orders" && (
              <div className="bg-white/45 dark:bg-slate-950/20 p-5 rounded-md border border-white/40 dark:border-white/5 animate-fade-in text-xs flex flex-col gap-3 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-3">
                  <span className="font-bold text-foreground">
                    Invoice List
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between p-3 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 text-xs">
                    <div>
                      <div className="font-bold text-foreground">INV-1001</div>
                      <div className="text-[10px] text-muted-foreground">
                        Customer: Olivia Martin | Date: Today 10:24 AM
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">$299.00</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-55/20 px-2 py-0.5 rounded-md">
                        Paid
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 text-xs">
                    <div>
                      <div className="font-bold text-foreground">INV-1002</div>
                      <div className="text-[10px] text-muted-foreground">
                        Customer: Jackson Lee | Date: Today 09:12 AM
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">$99.00</span>
                      <span className="text-[10px] font-bold text-amber-605 dark:text-amber-400 bg-amber-55/20 px-2 py-0.5 rounded-md">
                        Due
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {demoTab === "checkout" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in text-xs">
                <div className="lg:col-span-7 bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-5 rounded-md flex flex-col gap-3 backdrop-blur-md">
                  <h4 className="font-bold text-foreground border-b border-white/10 dark:border-white/5 pb-2">
                    Shopping Cart
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5"
                      >
                        <div>
                          <div className="font-bold text-foreground">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#0066ff]">
                            ${item.price} each
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-white/20 dark:border-white/10 rounded bg-white/30 dark:bg-slate-950/40 text-xs">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="px-2 py-0.5 hover:bg-white/10"
                            >
                              -
                            </button>
                            <span className="px-2.5 font-bold">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="px-2 py-0.5 hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-5 rounded-md flex flex-col justify-between gap-4 backdrop-blur-md">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-foreground border-b border-white/10 dark:border-white/5 pb-2">
                      Billing Summary
                    </h4>
                    <div className="flex justify-between text-muted-foreground font-semibold">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-semibold">
                      <span>Tax ({taxRate}%)</span>
                      <span>${cartTax.toFixed(2)}</span>
                    </div>
                    <hr className="border-white/10 dark:border-white/5" />
                    <div className="flex justify-between font-black text-foreground text-sm">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white py-2 rounded-md font-bold cursor-pointer">
                    Process Payment
                  </button>
                </div>
              </div>
            )}

            {demoTab === "finance" && (
              <div className="flex flex-col gap-6 animate-fade-in text-xs text-foreground">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-4 rounded-md flex items-center justify-between backdrop-blur-md">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                        Cash Book
                      </span>
                      <span className="text-base font-extrabold text-foreground">
                        $6,500.00
                      </span>
                    </div>
                    <Wallet className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-4 rounded-md flex items-center justify-between backdrop-blur-md">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                        Bank Account
                      </span>
                      <span className="text-base font-extrabold text-foreground">
                        $32,840.00
                      </span>
                    </div>
                    <Landmark className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-4 rounded-md flex items-center justify-between backdrop-blur-md">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                        Daily Expenses
                      </span>
                      <span className="text-base font-extrabold text-rose-500">
                        $705.00
                      </span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-rose-500 transform rotate-180" />
                  </div>
                </div>

                <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 rounded-md overflow-hidden backdrop-blur-md">
                  <div className="px-4 py-3 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Expenses Tracker
                    </span>
                  </div>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-foreground">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Marketing</td>
                        <td className="py-2.5 px-3 text-muted-foreground">
                          Facebook Page Ads
                        </td>
                        <td className="py-2.5 px-3 font-bold text-rose-500">
                          $500.00
                        </td>
                        <td className="py-2.5 px-3">12 Oct 2026</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Utilities</td>
                        <td className="py-2.5 px-3 text-muted-foreground">
                          Electricity Bill
                        </td>
                        <td className="py-2.5 px-3 font-bold text-rose-500">
                          $120.00
                        </td>
                        <td className="py-2.5 px-3">13 Oct 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {demoTab === "reports" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in">
                <div className="lg:col-span-2 bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-4 rounded-md backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2 mb-3 text-xs">
                    <span className="font-bold text-foreground">
                      Orders Analytics
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold">
                      <span className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full" />{" "}
                        Offline
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 bg-amber-400" /> Online
                      </span>
                    </div>
                  </div>
                  <div className="h-32 flex items-end justify-between px-2 pt-4 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
                      <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end w-10">
                      <div className="w-3 bg-slate-350 dark:bg-slate-800 rounded-t h-[60%]" />
                      <span className="text-[9px] text-muted-foreground font-semibold">
                        Jan
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end w-10">
                      <div className="w-3 bg-slate-350 dark:bg-slate-800 rounded-t h-[45%]" />
                      <span className="text-[9px] text-muted-foreground font-semibold">
                        Feb
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end w-10">
                      <div className="w-3 bg-slate-350 dark:bg-slate-800 rounded-t h-[75%]" />
                      <span className="text-[9px] text-muted-foreground font-semibold">
                        Mar
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end w-10 relative">
                      <div className="absolute -top-4 bg-slate-900 text-white text-[8px] px-1 py-0.5 rounded font-black">
                        $59,492
                      </div>
                      <div className="w-3 bg-[#0066ff] rounded-t h-[90%]" />
                      <span className="text-[9px] text-foreground font-extrabold">
                        Apr
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end w-10">
                      <div className="w-3 bg-slate-350 dark:bg-slate-800 rounded-t h-[55%]" />
                      <span className="text-[9px] text-muted-foreground font-semibold">
                        May
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-4 rounded-md flex flex-col justify-between backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2 text-xs">
                    <span className="font-bold text-foreground">Earnings</span>
                  </div>
                  <div className="h-24 w-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800/40"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray="251"
                        strokeDashoffset="75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {demoTab === "employees" && (
              <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-5 rounded-md animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-3">
                  <span className="font-bold text-foreground">
                    Staff Roster & Payroll
                  </span>
                </div>

                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-505 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Attendance</th>
                      <th className="py-2.5 px-3">Salary</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-foreground">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">John Doe</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        Store Manager
                      </td>
                      <td className="py-2.5 px-3 font-bold">98%</td>
                      <td className="py-2.5 px-3 font-bold">$1,200.00</td>
                      <td className="py-2.5 px-3">
                        <span className="bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-semibold">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Jane Smith</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        Cashier
                      </td>
                      <td className="py-2.5 px-3 font-bold">95%</td>
                      <td className="py-2.5 px-3 font-bold">$800.00</td>
                      <td className="py-2.5 px-3">
                        <span className="bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-semibold">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {demoTab === "roles" && (
              <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-5 rounded-md animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/5">
                  <span className="font-bold text-foreground">
                    Users & Associated Roles
                  </span>
                  <button className="flex items-center gap-1 bg-[#0066ff] text-white px-3 py-1.5 rounded-md text-xs font-bold">
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>

                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/10 dark:bg-slate-950/10 text-slate-500 dark:text-slate-400 font-bold border-b border-white/10 dark:border-white/5">
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Email</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Permissions Scope</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-foreground">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Alex</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        alex@zopshop.com
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold">
                          Owner / Admin
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        Full Access (All Modules)
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">John Doe</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        john@zopshop.com
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold">
                          Manager
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        Inventory, Sales, Analytics
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Jane Smith</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        jane@zopshop.com
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-md font-bold">
                          Cashier
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        POS Billing Checkout Only
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {demoTab === "setting" && (
              <div className="bg-white/45 dark:bg-slate-950/20 border border-white/40 dark:border-white/5 p-5 rounded-md animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted-foreground text-[11px]">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-xs text-foreground font-medium outline-none focus:border-[#0066ff]/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted-foreground text-[11px]">
                      VAT / Tax Rate (%)
                    </label>
                    <input
                      type="text"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-xs text-foreground font-medium outline-none focus:border-[#0066ff]/50"
                    />
                  </div>
                </div>
                <div className="border-t border-white/10 dark:border-white/5 pt-4 flex justify-end">
                  <button className="bg-[#0066ff] text-white px-4 py-2 rounded-md font-bold cursor-pointer flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Save Configuration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
