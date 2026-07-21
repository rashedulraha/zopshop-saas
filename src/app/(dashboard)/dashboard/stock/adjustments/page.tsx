"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, CheckCircle, HelpCircle, Layers, Clipboard, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdjustmentRecord {
  id: string;
  date: string;
  productName: string;
  sku: string;
  type: "Addition" | "Subtraction";
  qty: number;
  reason: string;
  user: string;
}

const initialAdjustments: AdjustmentRecord[] = [];

export default function StockAdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<AdjustmentRecord[]>(initialAdjustments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Field States
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [type, setType] = useState<"Addition" | "Subtraction">("Addition");
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");

  const stats = useMemo(() => {
    const total = adjustments.length;
    const additions = adjustments.filter((a) => a.type === "Addition").reduce((sum, curr) => sum + curr.qty, 0);
    const subtractions = adjustments.filter((a) => a.type === "Subtraction").reduce((sum, curr) => sum + curr.qty, 0);
    return { total, additions, subtractions };
  }, [adjustments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !sku || !qty || !reason) return;

    const parsedQty = parseInt(qty) || 0;

    const newRecord: AdjustmentRecord = {
      id: `ADJ-00${adjustments.length + 1}`,
      date: "Today",
      productName,
      sku: sku.toUpperCase(),
      type,
      qty: parsedQty,
      reason,
      user: "Admin User"
    };

    setAdjustments([newRecord, ...adjustments]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setProductName("");
    setSku("");
    setType("Addition");
    setQty("");
    setReason("");
  };

  const filteredAdjustments = useMemo(() => {
    return adjustments.filter(
      (a) =>
        a.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [adjustments, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Stock Adjustments</h1>
          <p className="text-muted-foreground mt-1 text-sm">Correct stock levels manually for damages, thefts, or auditing variations</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Adjustment</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Adjustment Batches</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Total Restocked (Additions)</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Total Written Off (Deductions)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Clipboard className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Logs
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    +{stats.additions} Units
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-rose-500 block tracking-tight font-mono">
                    -{stats.subtractions} Units
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
              placeholder="Search adjustments..."
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
                <th className="px-4 py-2 font-semibold">Adjustment ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Product Name</th>
                <th className="px-4 py-2 font-semibold">SKU Code</th>
                <th className="px-4 py-2 font-semibold text-center">Adjustment Type</th>
                <th className="px-4 py-2 font-semibold text-center">Quantity</th>
                <th className="px-4 py-2 font-semibold">Reason</th>
                <th className="px-4 py-2 font-semibold text-right">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAdjustments.map((a) => (
                <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{a.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{a.productName}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{a.sku}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border",
                      a.type === "Addition"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    )}>
                      {a.type}
                    </span>
                  </td>
                  <td className={cn(
                    "px-4 py-3 text-center font-bold font-mono",
                    a.type === "Addition" ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {a.type === "Addition" ? "+" : "-"}{a.qty}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.reason}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{a.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">Log New Stock Correction</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Product Name</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Sony Headphone"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">SKU Code</label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. SONY-XM5"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Correction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  >
                    <option value="Addition">Addition (+)</option>
                    <option value="Subtraction">Subtraction (-)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Quantity</label>
                  <input
                    type="number"
                    required
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Reason for Adjustment</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Audit variance, damage count"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
