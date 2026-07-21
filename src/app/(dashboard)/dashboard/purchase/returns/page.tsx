"use client";

import { useState, useMemo } from "react";
import {
  Search,
  RefreshCw,
  AlertTriangle,
  FileText,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseReturn {
  id: string;
  returnNumber: string;
  poNumber: string;
  date: string;
  supplier: string;
  amount: number;
  reason: string;
  status: "Completed" | "Pending";
}

const initialReturns: PurchaseReturn[] = [];

export default function PurchaseReturnsPage() {
  const [returns, setReturns] = useState<PurchaseReturn[]>(initialReturns);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => {
    const total = returns.length;
    const completed = returns.filter((r) => r.status === "Completed").length;
    const pending = returns.filter((r) => r.status === "Pending").length;
    const totalRefunded = returns.reduce((sum, curr) => sum + curr.amount, 0);

    return { total, completed, pending, totalRefunded };
  }, [returns]);

  const filteredReturns = useMemo(() => {
    return returns.filter((r) => {
      const matchesSearch =
        r.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [returns, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Purchase Returns
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor stock returns, refund claims, and credit notes from
            suppliers
          </p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Return Invoices
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Total Refunded Value
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Completed Refunds
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Pending Claims
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Returns
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    ${stats.totalRefunded.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.completed} Claims
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.pending} Claims
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
              placeholder="Search returns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Return ID</th>
                <th className="px-4 py-2 font-semibold">PO Number</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Supplier Name</th>
                <th className="px-4 py-2 font-semibold">Refund Amount</th>
                <th className="px-4 py-2 font-semibold">Reason</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredReturns.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">
                    {r.returnNumber}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {r.poNumber}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {r.supplier}
                  </td>
                  <td className="px-4 py-3 font-bold text-rose-500 font-mono">
                    ${r.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.reason}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                        r.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          r.status === "Completed"
                            ? "bg-emerald-500"
                            : "bg-amber-500",
                        )}
                      />
                      {r.status}
                    </span>
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
