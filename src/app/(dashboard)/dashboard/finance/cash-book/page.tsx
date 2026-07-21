"use client";

import { useState, useMemo } from "react";
import { Search, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CashRecord {
  id: string;
  date: string;
  type: "Debit" | "Credit"; // Debit: income received, Credit: cash spent
  reference: string;
  description: string;
  amount: number;
  balance: number;
}

const initialCashBook: CashRecord[] = [];

export default function CashBookPage() {
  const [records] = useState<CashRecord[]>(initialCashBook);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => {
    const totalDebit = records
      .filter((r) => r.type === "Debit")
      .reduce((sum, curr) => sum + curr.amount, 0);
    const totalCredit = records
      .filter((r) => r.type === "Credit")
      .reduce((sum, curr) => sum + curr.amount, 0);
    const currentCash = records.length > 0 ? records[0].balance : 0;

    return { totalDebit, totalCredit, currentCash };
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [records, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Cash Book
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor daily physical cash flows, debits, credits, and cash in hand
          </p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">
                  Cash in Hand
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">
                  Total Debits (Cash In)
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">
                  Total Credits (Cash Out)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.currentCash.toFixed(2)}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    ${stats.totalDebit.toFixed(2)}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-rose-500 block tracking-tight font-mono">
                    ${stats.totalCredit.toFixed(2)}
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
              placeholder="Search reference or details..."
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
                <th className="px-4 py-2 font-semibold">Transaction ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Entry Type</th>
                <th className="px-4 py-2 font-semibold">Reference</th>
                <th className="px-4 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold text-right">
                  Cash Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">
                    {r.id}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex px-1.5 py-0.5 text-[10px] font-semibold border rounded",
                        r.type === "Debit"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/20",
                      )}>
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">
                    {r.reference}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.description}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-3 font-bold font-mono",
                      r.type === "Debit" ? "text-emerald-500" : "text-rose-500",
                    )}>
                    {r.type === "Debit" ? "+" : "-"}${r.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-bold text-foreground font-mono text-right">
                    ${r.balance.toFixed(2)}
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
