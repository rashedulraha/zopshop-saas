"use client";

import { useState } from "react";
import { DollarSign, CheckCircle, FileText, Package, ArrowRight } from "lucide-react";

export default function InventoryReportPage() {
  const [stockVal] = useState([
    { id: "P-1", name: "iPhone 15 Case Pro", code: "IPH15-SPG", stock: 45, price: 15, assetValue: 675 },
    { id: "P-2", name: "USB-C to C Cable 2M", code: "USBC-ANK-2", stock: 30, price: 12, assetValue: 360 },
    { id: "P-3", name: "Sony WH-1000XM5", code: "SONY-XM5", stock: 15, price: 350, assetValue: 5250 }
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Inventory Report</h1>
          <p className="text-muted-foreground mt-1 text-sm">Calculate current asset valuation, units in hand, and SKU codes mapping</p>
        </div>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Registered SKUs</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Asset Valuation</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Total Stock Units</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">3 SKUs</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block font-mono">$6,285.00</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block font-mono">90 units</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight">Active Stock Valuation</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">SKU Code</th>
                <th className="px-4 py-2 font-semibold">Product Name</th>
                <th className="px-4 py-2 font-semibold text-center">Unit Price</th>
                <th className="px-4 py-2 font-semibold text-center">Stock Count</th>
                <th className="px-4 py-2 font-semibold text-right">Asset Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {stockVal.map((v) => (
                <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{v.code}</td>
                  <td className="px-4 py-3 text-foreground font-semibold">{v.name}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground font-mono">${v.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center text-foreground font-bold font-mono">{v.stock} units</td>
                  <td className="px-4 py-3 text-right font-bold text-foreground font-mono">${v.assetValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
