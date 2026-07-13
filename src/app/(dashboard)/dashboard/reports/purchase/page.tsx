"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, Download, Calendar, ArrowRight } from "lucide-react";

export default function PurchaseReportPage() {
  const [invoices] = useState([
    { invoice: "PO-501", supplier: "TechCorp Inc.", date: "12 Oct 2026", items: 45, amount: 5400, status: "Received" },
    { invoice: "PO-502", supplier: "Global Supply", date: "10 Oct 2026", items: 12, amount: 1200, status: "Pending" },
    { invoice: "PO-503", supplier: "Smart Devices Ltd", date: "08 Oct 2026", items: 20, amount: 3800, status: "Received" }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Purchase Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Analyze procurement billing, item counts, and pending supplier orders</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Billed Orders</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Procurement</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Procured Items</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Pending Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">3 POs</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block font-mono">$10,400.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">77 items</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">1 Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Procured Batches Summary</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">PO Number</th>
                <th className="px-4 py-2 font-semibold">Supplier</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold text-center">Items Count</th>
                <th className="px-4 py-2 font-semibold">Total Amount</th>
                <th className="px-4 py-2 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoices.map((inv) => (
                <tr key={inv.invoice} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{inv.invoice}</td>
                  <td className="px-4 py-3 text-foreground font-semibold">{inv.supplier}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-center text-foreground font-mono">{inv.items} items</td>
                  <td className="px-4 py-3 font-bold text-foreground font-mono">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
