"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, ArrowRight, BarChart2 } from "lucide-react";

export default function ProfitReportPage() {
  const [profitLogs] = useState([
    { id: "P-1", name: "iPhone 15 Case Pro", revenue: 675, cogs: 300, profit: 375, margin: "55.6%" },
    { id: "P-2", name: "USB-C to C Cable 2M", revenue: 360, cogs: 180, profit: 180, margin: "50.0%" },
    { id: "P-3", name: "Sony WH-1000XM5", revenue: 5250, cogs: 3500, profit: 1750, margin: "33.3%" }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Profit Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Analyze gross revenues, cost of goods sold (COGS), and operating profit margins</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Gross Revenues</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Cost of Goods (COGS)</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Gross Profit</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$6,285.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$3,980.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block font-mono">$2,305.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-indigo-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <BarChart2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">36.7%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Product profit summary</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Product Name</th>
                <th className="px-4 py-2 font-semibold text-center">Gross Revenue</th>
                <th className="px-4 py-2 font-semibold text-center">COGS</th>
                <th className="px-4 py-2 font-semibold text-center">Net Profit</th>
                <th className="px-4 py-2 font-semibold text-right">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {profitLogs.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-center text-foreground font-mono">${p.revenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-rose-500 font-mono">${p.cogs.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-emerald-500 font-bold font-mono">${p.profit.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-bold text-foreground font-mono">{p.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
