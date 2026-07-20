"use client";

import { useState, useEffect } from "react";
import { useReportStore } from "@/store/report.store";
import { useTransactionStore } from "@/store/transaction.store";
import { usePartyStore } from "@/store/party.store";
import { getPaymentStatus } from "@/lib/utils/transaction.utils";
import {
  RecentSalesTable,
  RecentPurchasesTable,
  RecentExpensesTable,
  LowStockTable,
  PendingDeliveriesTable,
} from "@/components/dashboard/DataTables";
import { ChartTabs } from "@/components/dashboard/ChartTabs";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  FileText,
  ChevronDown,
  Wallet,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Truck,
  ArrowRight,
  MoreHorizontal,
  Trash2,
  CheckCircle2,
  Search,
  Bell,
  ChevronRight,
  HelpCircle,
  Mail,
  LogOut,
  ShoppingBag,
  Settings,
  Plus,
  Users,
  Shield,
  Sparkles,
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
  {
    invoice: "INV-1001",
    customer: "Olivia Martin",
    amount: "$299.00",
    status: "Paid",
    date: "Today 10:24 AM",
  },
  {
    invoice: "INV-1002",
    customer: "Jackson Lee",
    amount: "$99.00",
    status: "Due",
    date: "Today 09:12 AM",
  },
  {
    invoice: "INV-1003",
    customer: "Isabella Nguyen",
    amount: "$450.00",
    status: "Paid",
    date: "Yesterday",
  },
  {
    invoice: "INV-1004",
    customer: "William Kim",
    amount: "$15.00",
    status: "Paid",
    date: "Yesterday",
  },
  {
    invoice: "INV-1005",
    customer: "Sofia Davis",
    amount: "$350.00",
    status: "Paid",
    date: "2 days ago",
  },
];

const recentPurchases = [
  {
    supplier: "TechCorp Inc.",
    invoice: "PO-501",
    amount: "$5,400.00",
    status: "Received",
    date: "12 Oct 2026",
  },
  {
    supplier: "Global Supply",
    invoice: "PO-502",
    amount: "$1,200.00",
    status: "Pending",
    date: "10 Oct 2026",
  },
  {
    supplier: "Smart Devices Ltd",
    invoice: "PO-503",
    amount: "$3,800.00",
    status: "Received",
    date: "08 Oct 2026",
  },
];

const recentExpenses = [
  {
    category: "Utilities",
    amount: "$120.00",
    description: "Electricity Bill",
    date: "13 Oct 2026",
  },
  {
    category: "Marketing",
    amount: "$500.00",
    description: "Facebook Ads",
    date: "12 Oct 2026",
  },
  {
    category: "Logistics",
    amount: "$85.00",
    description: "Courier Services",
    date: "11 Oct 2026",
  },
];

const lowStock = [
  { product: "iPhone 15 Case", brand: "Spigen", stock: "5", alert: "Critical" },
  { product: "USB-C Cable 2M", brand: "Anker", stock: "12", alert: "Low" },
  { product: 'MacBook Pro 14"', brand: "Apple", stock: "2", alert: "Critical" },
];

const pendingDeliveries = [
  {
    invoice: "INV-0985",
    customer: "Sofia Davis",
    driver: "John Doe",
    status: "On the way",
  },
  {
    invoice: "INV-0988",
    customer: "Michael Chen",
    driver: "Unassigned",
    status: "Processing",
  },
];

export default function DashboardPage() {
  const {
    dashboardStats,
    fetchDashboardStats,
    isLoading: isReportLoading,
  } = useReportStore();
  const {
    transactions,
    fetchTransactions,
    isLoading: isTransactionsLoading,
  } = useTransactionStore();

  useEffect(() => {
    fetchDashboardStats();
    fetchTransactions({ limit: 10 });
  }, [fetchDashboardStats, fetchTransactions]);

  // Real Dashboard state
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ranges = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "This Month",
    "This Year",
  ];

  return (
    <div className="relative flex flex-col gap-6 md:gap-8 pb-12">
      {/* Premium Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Overview
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Real-time statistics & business diagnostics
            </p>
          </div>
        </div>

        {/* Date Selector & Action buttons (Only show for Real Dashboard) */}
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
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
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
                        timeRange === range
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground",
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
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-primary/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              Today&apos;s Sales
            </span>
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {isReportLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              `$${(dashboardStats?.todaySales || 0).toLocaleString()}`
            )}
          </span>
        </div>

        <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-amber-500/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              Today&apos;s Outstanding
            </span>
            <div className="w-7 h-7 rounded-full bg-amber-50/10 flex items-center justify-center shrink-0">
              <ArrowDownRight className="w-3.5 h-3.5 text-amber-550" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {isReportLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              `$${(dashboardStats?.totalOutstanding || 0).toLocaleString()}`
            )}
          </span>
        </div>

        <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-indigo-500/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              Total Products
            </span>
            <div className="w-7 h-7 rounded-full bg-indigo-50/10 flex items-center justify-center shrink-0">
              <Package className="w-3.5 h-3.5 text-indigo-500" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {isReportLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              (dashboardStats?.totalProducts || 0).toLocaleString()
            )}
          </span>
        </div>

        <div className="flex flex-col p-4 bg-card border border-border rounded-md hover:border-blue-500/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              Total Parties
            </span>
            <div className="w-7 h-7 rounded-full bg-blue-50/10 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {isReportLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              (dashboardStats?.totalParties || 0).toLocaleString()
            )}
          </span>
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          <div className="border border-border bg-card p-5 rounded-md">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                Business Diagnostics
              </h2>
              <span className="text-xs text-muted-foreground">
                Updated 2m ago
              </span>
            </div>
            {isReportLoading ? (
              <div className="h-[350px] w-full bg-muted animate-pulse rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">
                  Loading chart data...
                </span>
              </div>
            ) : (
              <ChartTabs
                trendData={dashboardStats?.salesTrend || trendData}
                monthlyData={monthlyData}
                expenseData={expenseData}
                brandData={brandData}
                bestSelling={bestSelling}
                inventoryValue={inventoryValue}
              />
            )}
          </div>

          {isTransactionsLoading ? (
            <div className="h-[400px] w-full bg-muted animate-pulse rounded-md" />
          ) : (
            <RecentSalesTable
              data={transactions.map((t) => ({
                invoice: t.invoiceNo || "INV",
                customer: t.party?.name || "Cash Customer",
                amount: `$${t.amount}`,
                status: getPaymentStatus(t.dueAmount, t.amount) === "paid" ? "Paid" : "Due",
                date: new Date(t.createdAt || Date.now()).toLocaleDateString(),
              }))}
            />
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
          <div className="border border-border bg-card p-5 rounded-md flex flex-col">
            <div className="border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-semibold text-foreground tracking-tight">
                Financial Accounts
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Current Cash
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  $6,500.00
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-indigo-50/10 flex items-center justify-center text-indigo-500">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Bank Account
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  $32,840.00
                </span>
              </div>

              <hr className="border-border/50" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-amber-50/10 flex items-center justify-center text-amber-550">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Customer Due
                  </span>
                </div>
                <span className="text-sm font-semibold text-amber-550">
                  $4,320.00
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-rose-50/10 flex items-center justify-center text-rose-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Supplier Due
                  </span>
                </div>
                <span className="text-sm font-semibold text-rose-500">
                  $2,150.00
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {!isReportLoading && (dashboardStats?.lowStockCount || 0) > 0 ? (
              <LowStockTable data={lowStock} />
            ) : null}
            <PendingDeliveriesTable data={pendingDeliveries} />
          </div>

          <RecentExpensesTable data={recentExpenses} />
          <RecentPurchasesTable data={recentPurchases} />
        </div>
      </div>
    </div>
  );
}
