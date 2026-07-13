"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Tags, CheckCircle, Clock, AlertTriangle, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaleInvoice {
  id: string;
  invoice: string;
  date: string;
  customer: string;
  totalAmount: number;
  paidAmount: number;
  status: "Paid" | "Due" | "Cancelled";
}

const initialSales: SaleInvoice[] = [
  { id: "S-1", invoice: "INV-1001", date: "13 Oct 2026", customer: "Olivia Martin", totalAmount: 299, paidAmount: 299, status: "Paid" },
  { id: "S-2", invoice: "INV-1002", date: "13 Oct 2026", customer: "Jackson Lee", totalAmount: 99, paidAmount: 0, status: "Due" },
  { id: "S-3", invoice: "INV-1003", date: "12 Oct 2026", customer: "Isabella Nguyen", totalAmount: 450, paidAmount: 450, status: "Paid" }
];

export default function SalesListPage() {
  const [sales] = useState<SaleInvoice[]>(initialSales);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const stats = useMemo(() => {
    const total = sales.length;
    const paid = sales.filter((s) => s.status === "Paid").length;
    const due = sales.filter((s) => s.status === "Due").length;
    const totalRevenue = sales.reduce((sum, curr) => sum + curr.totalAmount, 0);

    return { total, paid, due, totalRevenue };
  }, [sales]);

  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const matchesSearch =
        s.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || s.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [sales, searchQuery, filterStatus]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Sales Invoices</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review customer sales, print receipts, and track unpaid balances</p>
        </div>
        <Link
          href="/dashboard/sales/new"
          scroll={false}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Sale</span>
        </Link>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Sales Invoices</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Sales Value</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Fully Paid</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Pending Balances</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Invoices
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <Tags className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    ${stats.totalRevenue.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.paid} Invoices
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.due} Invoices
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
              placeholder="Search invoices by invoice # or customer..."
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
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
          </select>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Invoice Number</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Customer Name</th>
                <th className="px-4 py-2 font-semibold">Total Amount</th>
                <th className="px-4 py-2 font-semibold">Paid Amount</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{s.invoice}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{s.customer}</td>
                  <td className="px-4 py-3 font-bold text-foreground font-mono">${s.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-emerald-500 font-bold font-mono">${s.paidAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      s.status === "Paid" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                      s.status === "Due" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                      s.status === "Cancelled" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        s.status === "Paid" ? "bg-emerald-500" : s.status === "Due" ? "bg-amber-500" : "bg-rose-500"
                      )} />
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="h-7 px-2.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium text-[10px] inline-flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>PDF invoice</span>
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
