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

// Data is loaded from Zustand stores

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

      {/* Getting Started Welcome Card if store has no transactions/products */}
      {!isReportLoading && (!dashboardStats?.todaySales && !dashboardStats?.totalProducts) && (
        <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Welcome to your new store!</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Your store is currently empty. Get started by adding your first product or creating a sale.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </a>
            <a
              href="/dashboard/sales/new"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Create Sale
            </a>
          </div>
        </div>
      )}

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
              `BDT ${(dashboardStats?.todaySales || 0).toLocaleString()}`
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
              `BDT ${(dashboardStats?.totalOutstanding || 0).toLocaleString()}`
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
                trendData={dashboardStats?.salesTrend || []}
                monthlyData={[]}
                expenseData={[]}
                brandData={[]}
                bestSelling={[]}
                inventoryValue={[]}
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
                  {isReportLoading ? (
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    `$${(dashboardStats?.cashBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
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
                  {isReportLoading ? (
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    `$${(dashboardStats?.bankBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
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
                  {isReportLoading ? (
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    `$${(dashboardStats?.customerDue || dashboardStats?.totalOutstanding || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
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
                  {isReportLoading ? (
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    `$${(dashboardStats?.supplierDue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {!isReportLoading && (dashboardStats?.lowStockCount || 0) > 0 ? (
              <LowStockTable data={[]} />
            ) : null}
            <PendingDeliveriesTable data={[]} />
          </div>

          <RecentExpensesTable data={[]} />
          <RecentPurchasesTable data={[]} />
        </div>
      </div>
    </div>
  );
}
