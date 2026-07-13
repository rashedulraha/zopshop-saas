"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, Calendar, ArrowRight } from "lucide-react";

export default function MonthlyReportPage() {
  const [monthlyLogs] = useState([
    { week: "Week 1", revenue: 1500, expenses: 800, netProfit: 700, margin: "46.7%" },
    { week: "Week 2", revenue: 2200, expenses: 1100, netProfit: 1100, margin: "50.0%" },
    { week: "Week 3", revenue: 1800, expenses: 900, netProfit: 900, margin: "50.0%" }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Monthly Sales Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Analyze monthly sales trends, operating expenditures, and profit indicators</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Billed Month</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Gross Revenue</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Expenses</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Net Operating Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground block">October 2026</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block font-mono">$5,500.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$2,800.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-indigo-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$2,700.00</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Weekly Performance breakdown</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Weekly Period</th>
                <th className="px-4 py-2 font-semibold text-center">Gross Revenue</th>
                <th className="px-4 py-2 font-semibold text-center">Total Expenses</th>
                <th className="px-4 py-2 font-semibold text-center">Net Operating Profit</th>
                <th className="px-4 py-2 font-semibold text-right">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {monthlyLogs.map((log) => (
                <tr key={log.week} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{log.week}</td>
                  <td className="px-4 py-3 text-center text-foreground font-mono">${log.revenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-rose-500 font-mono">${log.expenses.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-emerald-500 font-bold font-mono">${log.netProfit.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-bold text-foreground font-mono">{log.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
