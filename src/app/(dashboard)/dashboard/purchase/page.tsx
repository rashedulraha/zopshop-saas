"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, CheckCircle, Clock, FileText, Download, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/store/transaction.store";
import { Transaction } from "@/types";
import { getPaymentStatus } from "@/lib/utils/transaction.utils";

export default function PurchaseListPage() {
  const { transactions, fetchTransactions, isLoading } = useTransactionStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetchTransactions({ type: "PURCHASE", limit: 100 });
  }, [fetchTransactions]);

  const stats = useMemo(() => {
    const total = transactions.length;
    const paid = transactions.filter((s) => getPaymentStatus(s.dueAmount, s.amount) === "paid").length;
    const due = transactions.filter((s) => getPaymentStatus(s.dueAmount, s.amount) === "due" || getPaymentStatus(s.dueAmount, s.amount) === "partial").length;
    const totalSpent = transactions.reduce((sum, curr) => sum + curr.amount, 0);

    return { total, paid, due, totalSpent };
  }, [transactions]);

  const filteredPurchases = useMemo(() => {
    return transactions.filter((p) => {
      const pStatus = getPaymentStatus(p.dueAmount, p.amount);
      const matchesSearch =
        p.invoiceNo?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.party?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesStatus = filterStatus === "All" || 
        (filterStatus === "Paid" && pStatus === "paid") ||
        (filterStatus === "Due" && (pStatus === "due" || pStatus === "partial"));
      
      return matchesSearch && matchesStatus;
    });
  }, [transactions, debouncedSearch, filterStatus]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track purchase statements, bulk supplier imports, and invoice payments</p>
        </div>
        <Link
          href="/dashboard/purchase/create"
          scroll={false}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Purchase</span>
        </Link>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Purchase Invoices</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Disbursed</th>
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
                    {stats.total} Orders
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    ${stats.totalSpent.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.paid} Orders
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.due} Orders
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
              placeholder="Search purchases by supplier or PO..."
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
                <th className="px-4 py-2 font-semibold">PO Number</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Supplier Name</th>
                <th className="px-4 py-2 font-semibold">Total Amount</th>
                <th className="px-4 py-2 font-semibold">Paid Amount</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading purchases...</td>
                </tr>
              ) : filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No purchases found.</td>
                </tr>
              ) : (
                filteredPurchases.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground font-mono">{p.invoiceNo || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(p.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{p.party?.name || "Cash Supplier"}</td>
                    <td className="px-4 py-3 font-bold text-foreground font-mono">${p.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-emerald-500 font-bold font-mono">${p.paidAmount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                        getPaymentStatus(p.dueAmount, p.amount) === "paid" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                        (getPaymentStatus(p.dueAmount, p.amount) === "due" || getPaymentStatus(p.dueAmount, p.amount) === "partial") && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          getPaymentStatus(p.dueAmount, p.amount) === "paid" ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        {getPaymentStatus(p.dueAmount, p.amount) === "paid" ? "Paid" : "Due"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="h-7 px-2.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium text-[10px] inline-flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>PDF invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
