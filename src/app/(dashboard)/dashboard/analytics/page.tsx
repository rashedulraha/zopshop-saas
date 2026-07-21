"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Percent,
  Users,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Calendar,
  Download,
  Activity,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChartWidget,
  AreaChartWidget,
  BarChartWidget,
  DonutChartWidget,
} from "@/components/dashboard/ChartWidgets";

const emptyData = {
  kpis: {
    revenue: { value: 0, change: 0, positive: true },
    orders: { value: 0, change: 0, positive: true },
    aov: { value: 0, change: 0, positive: true },
    conversion: { value: 0, change: 0, positive: true },
    profitMargin: { value: 0, change: 0, positive: true },
  },
  trend: [] as any[],
  categories: [] as any[],
  brands: [] as any[],
  channels: [] as any[],
  payments: [] as any[],
  customers: [] as any[],
};

const ANALYTICS_DATA: Record<string, typeof emptyData> = {
  Today: emptyData,
  "Last 7 Days": emptyData,
  "This Month": emptyData,
  "This Year": emptyData,
};

type ScopeType = "Today" | "Last 7 Days" | "This Month" | "This Year";

export default function AnalyticsPage() {
  const [dateFilter, setDateFilter] = useState<ScopeType>("Last 7 Days");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // Retrieve current active data scope
  const activeData = useMemo(() => {
    return ANALYTICS_DATA[dateFilter] || ANALYTICS_DATA["Last 7 Days"];
  }, [dateFilter]);

  // Filtering Customer Table
  const filteredCustomers = useMemo(() => {
    return activeData.customers.filter(
      (cust) =>
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [activeData, searchQuery]);

  const triggerExport = (format: string) => {
    setIsExporting(format);
    setTimeout(() => {
      setIsExporting(null);
      if (format === "PDF") {
        window.print();
      } else {
        alert(`Exporting ${dateFilter} Analytics Report as ${format}...`);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-sm text-balance">
            Real-time business performance analytics, customer demographics, and
            transactional diagnostic charts.
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          {/* Custom Date Scope Filter */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{dateFilter}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
            </button>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-48 bg-card border border-border rounded-md shadow-lg z-20 divide-y divide-border/50">
                  {(
                    [
                      "Today",
                      "Last 7 Days",
                      "This Month",
                      "This Year",
                    ] as ScopeType[]
                  ).map((scope) => (
                    <button
                      key={scope}
                      onClick={() => {
                        setDateFilter(scope);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm hover:bg-muted/80 transition-colors",
                        dateFilter === scope
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground",
                      )}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export Report */}
          <div className="flex items-center gap-1.5 border border-border rounded-md bg-card p-0.5">
            <button
              onClick={() => triggerExport("CSV")}
              disabled={isExporting !== null}
              className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              CSV
            </button>
            <span className="w-px h-3.5 bg-border" />
            <button
              onClick={() => triggerExport("PDF")}
              disabled={isExporting !== null}
              className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>{isExporting === "PDF" ? "Exporting..." : "PDF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Section as a True Table Card */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[800px] lg:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Revenue
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Orders
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Avg Order Value
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Conversion Rate
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[20%]">
                  Profit Margin
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Revenue */}
                <td className="px-5 py-6 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-8 h-8 rounded-full bg-primary/10 items-center justify-center text-primary mb-2">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    $
                    {activeData.kpis.revenue.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold mt-1",
                      activeData.kpis.revenue.positive
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {activeData.kpis.revenue.positive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {activeData.kpis.revenue.change}%{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      vs prev
                    </span>
                  </span>
                </td>

                {/* Orders Count */}
                <td className="px-5 py-6 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-8 h-8 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-2">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {activeData.kpis.orders.value.toLocaleString()}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold mt-1",
                      activeData.kpis.orders.positive
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {activeData.kpis.orders.positive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {activeData.kpis.orders.change}%{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      vs prev
                    </span>
                  </span>
                </td>

                {/* Average Order Value */}
                <td className="px-5 py-6 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-8 h-8 rounded-full bg-cyan-500/10 items-center justify-center text-cyan-500 mb-2">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    ${activeData.kpis.aov.value.toFixed(2)}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold mt-1",
                      activeData.kpis.aov.positive
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {activeData.kpis.aov.positive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {activeData.kpis.aov.change}%{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      vs prev
                    </span>
                  </span>
                </td>

                {/* Conversion Rate */}
                <td className="px-5 py-6 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-8 h-8 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-2">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {activeData.kpis.conversion.value.toFixed(2)}%
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold mt-1",
                      activeData.kpis.conversion.positive
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {activeData.kpis.conversion.positive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {activeData.kpis.conversion.change}%{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      vs prev
                    </span>
                  </span>
                </td>

                {/* Profit Margin */}
                <td className="px-5 py-6 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-8 h-8 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-2">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {activeData.kpis.profitMargin.value.toFixed(1)}%
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-semibold mt-1",
                      activeData.kpis.profitMargin.positive
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    {activeData.kpis.profitMargin.positive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {activeData.kpis.profitMargin.change}%{" "}
                    <span className="text-muted-foreground font-normal ml-1">
                      vs prev
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales & Profit Trend (Area/Line) - 8 Cols */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AreaChartWidget
              title="Revenue Stream"
              subtitle={`Total sales trend for ${dateFilter}`}
              data={activeData.trend}
              dataKey="sales"
            />
            <LineChartWidget
              title="Net Profit Trend"
              subtitle={`Estimated operating profit for ${dateFilter}`}
              data={activeData.trend}
              dataKey="profit"
              stroke="hsl(var(--primary))"
            />
          </div>

          {/* Brands Bar Chart & Channels breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChartWidget
              title="Sales by Top Brands"
              subtitle="Brand contribution by transaction volume"
              data={activeData.brands}
              dataKeys={["total"]}
              colors={["#8b5cf6"]}
            />

            {/* Sales Channel Breakdown Card */}
            <div className="border border-border bg-card p-5 rounded-md flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  Sales Channels
                </h3>
                <p className="text-xs text-muted-foreground">
                  Breakdown of online vs physical channels
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-5">
                {activeData.channels.map((chan) => (
                  <div key={chan.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                      <span>{chan.name}</span>
                      <span className="text-muted-foreground">
                        $
                        {chan.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}{" "}
                        ({chan.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded transition-all duration-500",
                          chan.name === "Online Store" && "bg-primary",
                          chan.name === "Mobile App" && "bg-cyan-500",
                          chan.name === "POS Terminal" && "bg-purple-500",
                        )}
                        style={{ width: `${chan.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Donut Chart and Payment Methods - 4 Cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <DonutChartWidget
            title="Sales by Category"
            subtitle="Overall category distribution"
            data={activeData.categories}
          />

          {/* Payment Method Transaction Counts & Value */}
          <div className="border border-border bg-card p-5 rounded-md flex flex-col h-full justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Payment Gateways
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Volume & transaction totals per method
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {activeData.payments.map((pm) => (
                <div
                  key={pm.method}
                  className="flex justify-between items-center py-2 border-b border-border/40 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                        pm.method === "Bkash" && "bg-pink-500/10 text-pink-500",
                        pm.method === "Card" && "bg-cyan-500/10 text-cyan-500",
                        pm.method === "Cash" &&
                          "bg-emerald-500/10 text-emerald-500",
                        pm.method === "Bank" &&
                          "bg-purple-500/10 text-purple-500",
                      )}
                    >
                      {pm.method.substring(0, 2)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {pm.method}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {pm.count} transactions
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    $
                    {pm.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Top Performing Customers</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Top purchasing client accounts for the chosen period
            </p>
          </div>

          {/* Search bar inside Card */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Customer ID</th>
                <th className="px-4 py-2 font-semibold">Customer Details</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Items Bought
                </th>
                <th className="px-4 py-2 font-semibold">Total Revenue</th>
                <th className="px-4 py-2 font-semibold text-right">
                  Status Tier
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-muted-foreground">
                    {cust.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {cust.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {cust.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-foreground">
                    {cust.items} units
                  </td>
                  <td className="px-4 py-3 font-bold text-foreground">
                    $
                    {cust.spent.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded text-[10px] font-semibold",
                        cust.level === "VIP" &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                        cust.level === "Gold" &&
                          "bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20",
                        cust.level === "Silver" &&
                          "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20",
                        cust.level === "Bronze" &&
                          "bg-amber-700/10 text-amber-700 dark:text-amber-500 border border-amber-700/20",
                      )}
                    >
                      {cust.level}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No customers match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
