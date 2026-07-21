"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  HelpCircle,
  FileText,
  Landmark,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  category: string;
  type: "Revenue" | "Expense";
  amount: number;
}

const mockTransactions: Transaction[] = [
  { id: "tx-001", category: "Sales Revenue", type: "Revenue", amount: 152000 },
  {
    id: "tx-002",
    category: "Returns & Refunds",
    type: "Expense",
    amount: 4500,
  },
  {
    id: "tx-003",
    category: "Cost of Goods Sold (COGS)",
    type: "Expense",
    amount: 89000,
  },
  { id: "tx-004", category: "Store Rent", type: "Expense", amount: 15000 },
  {
    id: "tx-005",
    category: "Employee Salaries",
    type: "Expense",
    amount: 18000,
  },
  {
    id: "tx-006",
    category: "Electricity & Utility Bills",
    type: "Expense",
    amount: 3500,
  },
  { id: "tx-007", category: "Marketing & Ads", type: "Expense", amount: 5000 },
  {
    id: "tx-008",
    category: "Other Income (Service Fees)",
    type: "Revenue",
    amount: 2500,
  },
];

export default function ProfitLossPage() {
  const [txns] = useState<Transaction[]>(mockTransactions);
  const [reportingPeriod, setReportingPeriod] = useState("October 2026");

  const plSummary = useMemo(() => {
    const totalRev = txns
      .filter((t) => t.type === "Revenue")
      .reduce((sum, curr) => sum + curr.amount, 0);
    const totalExp = txns
      .filter((t) => t.type === "Expense")
      .reduce((sum, curr) => sum + curr.amount, 0);
    const netProfit = totalRev - totalExp;
    const margin =
      totalRev > 0 ? ((netProfit / totalRev) * 100).toFixed(1) : "0.0";

    return { totalRev, totalExp, netProfit, margin };
  }, [txns]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Profit & Loss
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review gross revenues, itemized operational expenses, and net profit
            margins
          </p>
        </div>

        <select
          value={reportingPeriod}
          onChange={(e) => setReportingPeriod(e.target.value)}
          className="h-9 px-3 rounded-md border border-border bg-card text-sm text-muted-foreground focus:outline-none"
        >
          <option value="October 2026">October 2026</option>
          <option value="Q3 2026">Third Quarter (Q3 2026)</option>
          <option value="Year 2026">Yearly Statement (2026)</option>
        </select>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[750px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Gross Revenues
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Total Expenses
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Net Operating Profit
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Net Profit Margin
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Gross Revenues */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    $
                    {plSummary.totalRev.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>

                {/* Total Expenses */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    $
                    {plSummary.totalExp.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>

                {/* Net Operating Profit */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={cn(
                      "text-xl font-bold block tracking-tight font-mono",
                      plSummary.netProfit >= 0
                        ? "text-emerald-500"
                        : "text-rose-500",
                    )}
                  >
                    $
                    {plSummary.netProfit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>

                {/* Margin */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-indigo-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <BarChart2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {plSummary.margin}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ledger Accounts items breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Ledger Card */}
        <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-emerald-500 tracking-tight flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            <span>Revenue Accounts Ledger</span>
          </h3>
          <div className="flex flex-col divide-y divide-border/60">
            {txns
              .filter((t) => t.type === "Revenue")
              .map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2 text-xs font-mono"
                >
                  <span className="text-muted-foreground">{t.category}</span>
                  <span className="text-emerald-500 font-bold">
                    +${t.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            <div className="flex items-center justify-between pt-3 text-xs font-bold font-mono text-foreground border-t border-border">
              <span>Total Operating Revenue</span>
              <span>${plSummary.totalRev.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Expenses Ledger Card */}
        <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-rose-500 tracking-tight flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>Expense Accounts Ledger</span>
          </h3>
          <div className="flex flex-col divide-y divide-border/60">
            {txns
              .filter((t) => t.type === "Expense")
              .map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2 text-xs font-mono"
                >
                  <span className="text-muted-foreground">{t.category}</span>
                  <span className="text-rose-500 font-bold">
                    -${t.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            <div className="flex items-center justify-between pt-3 text-xs font-bold font-mono text-foreground border-t border-border">
              <span>Total Operating Expenses</span>
              <span>-${plSummary.totalExp.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
