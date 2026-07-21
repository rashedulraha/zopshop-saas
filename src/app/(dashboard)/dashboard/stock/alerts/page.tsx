"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Search, Filter, ShoppingCart, CheckCircle, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface LowStockItem {
  id: string;
  name: string;
  code: string;
  category: string;
  stock: number;
  threshold: number;
  status: "Critical" | "Low";
}

const initialAlerts: LowStockItem[] = [];

export default function LowStockAlertPage() {
  const [alerts, setAlerts] = useState<LowStockItem[]>(initialAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const stats = useMemo(() => {
    const total = alerts.length;
    const critical = alerts.filter((a) => a.status === "Critical").length;
    const low = alerts.filter((a) => a.status === "Low").length;
    return { total, critical, low };
  }, [alerts]);

  const handleOrderMore = (name: string) => {
    alert(`Reorder purchase draft successfully created for: ${name}`);
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [alerts, searchQuery, filterStatus]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Low Stock Alerts</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor items with stock quantities dropping below trigger levels</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Alert Items</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Critical Level</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Low Level</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Products
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/15 items-center justify-center text-rose-600 mb-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-rose-600 block tracking-tight font-mono">
                    {stats.critical} Critical
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.low} Warnings
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search alert product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-8 px-3 rounded-md border border-border bg-card text-xs text-muted-foreground focus:outline-none"
          >
            <option value="All">All Severity</option>
            <option value="Critical">Critical Level Only</option>
            <option value="Low">Low Warning Only</option>
          </select>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Product Name</th>
                <th className="px-4 py-2 font-semibold">SKU Code</th>
                <th className="px-4 py-2 font-semibold">Category</th>
                <th className="px-4 py-2 font-semibold text-center">Alert Status</th>
                <th className="px-4 py-2 font-semibold text-center">Current Stock</th>
                <th className="px-4 py-2 font-semibold text-center">Threshold Level</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAlerts.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{item.code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      item.status === "Critical"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-rose-500 font-mono">{item.stock} items</td>
                  <td className="px-4 py-3 text-center text-muted-foreground font-mono">{item.threshold} items</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleOrderMore(item.name)}
                      className="h-7 px-3 rounded bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-[10px] inline-flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Reorder Now</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
