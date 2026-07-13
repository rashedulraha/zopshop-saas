"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, AlertTriangle, Users } from "lucide-react";

export default function DueReportPage() {
  const [duesLogs] = useState([
    { id: "C-1", name: "Olivia Martin", type: "Customer", due: 299, ageing: "14 Days", status: "Active" },
    { id: "C-2", name: "Jackson Lee", type: "Customer", due: 99, ageing: "7 Days", status: "Active" },
    { id: "V-1", name: "TechCorp Inc.", type: "Supplier", due: 5400, ageing: "14 Days", status: "Active" },
    { id: "V-2", name: "Global Supply", type: "Supplier", due: 1200, ageing: "3 Days", status: "Active" }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Due Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review outstanding receivables (customers) and payables (suppliers) ageing schedules</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Customer Dues</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Supplier Dues</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Outstanding</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Debtors Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$398.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-rose-500 block font-mono">$6,600.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">$6,998.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-indigo-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">4 Accounts</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Accounts Outstanding Ageing</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Account ID</th>
                <th className="px-4 py-2 font-semibold">Account Name</th>
                <th className="px-4 py-2 font-semibold">Profile Type</th>
                <th className="px-4 py-2 font-semibold text-center">Overdue Ageing</th>
                <th className="px-4 py-2 font-semibold text-right">Balance Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {duesLogs.map((d) => (
                <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{d.id}</td>
                  <td className="px-4 py-3 text-foreground font-semibold">{d.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground font-mono">{d.ageing}</td>
                  <td className="px-4 py-3 text-right font-bold text-rose-500 font-mono">${d.due.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
