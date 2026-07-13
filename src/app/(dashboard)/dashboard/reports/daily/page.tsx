"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, Calendar, ArrowRight } from "lucide-react";

export default function DailyReportPage() {
  const [dailyLogs] = useState([
    { time: "10:24 AM", ref: "INV-1001", customer: "Olivia Martin", amount: 299, payment: "Bkash", status: "Paid" },
    { time: "09:12 AM", ref: "INV-1002", customer: "Jackson Lee", amount: 99, payment: "Cash", status: "Due" }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Daily Sales Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review today's transaction logs, received cash channels, and pending collection dues</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Today's Invoices</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Today's Sales</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Cash Received</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Dues Incurred</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">2 Invoices</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block font-mono">$398.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$299.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-rose-500 block font-mono">$99.00</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Today's Transactions Journal</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Time</th>
                <th className="px-4 py-2 font-semibold">Invoice Number</th>
                <th className="px-4 py-2 font-semibold">Customer</th>
                <th className="px-4 py-2 font-semibold">Payment Channel</th>
                <th className="px-4 py-2 font-semibold">Total Amount</th>
                <th className="px-4 py-2 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dailyLogs.map((log) => (
                <tr key={log.ref} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground font-mono">{log.time}</td>
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{log.ref}</td>
                  <td className="px-4 py-3 text-foreground font-semibold">{log.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{log.payment}</td>
                  <td className="px-4 py-3 font-bold text-foreground font-mono">${log.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
