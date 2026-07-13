"use client";

import { useState, useMemo } from "react";
import { Plus, Search, CheckCircle, DollarSign, Activity, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IncomeRecord {
  id: string;
  date: string;
  source: string;
  category: string;
  amount: number;
  paymentMethod: string;
  description: string;
}

const initialIncome: IncomeRecord[] = [
  { id: "INC-01", date: "12 Oct 2026", source: "Asset Sale", category: "Salvage Disposal", amount: 1500, paymentMethod: "Bank Transfer", description: "Disposed old inventory racks" },
  { id: "INC-02", date: "10 Oct 2026", source: "Sub-lease Rent", category: "Rental Income", amount: 800, paymentMethod: "Cash", description: "Sub-lease floor rent" },
  { id: "INC-03", date: "05 Oct 2026", source: "Delivery Service Fee", category: "Logistics Profit", amount: 250, paymentMethod: "Bkash", description: "Outstation delivery charges" }
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<IncomeRecord[]>(initialIncome);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("Rental Income");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [description, setDescription] = useState("");

  const stats = useMemo(() => {
    const total = incomes.length;
    const totalIncome = incomes.reduce((sum, curr) => sum + curr.amount, 0);
    return { total, totalIncome };
  }, [incomes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) return;

    const newRecord: IncomeRecord = {
      id: `INC-0${incomes.length + 1}`,
      date: "Today",
      source,
      category,
      amount: parseFloat(amount) || 0,
      paymentMethod,
      description
    };

    setIncomes([...incomes, newRecord]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSource("");
    setCategory("Rental Income");
    setAmount("");
    setPaymentMethod("Bank Transfer");
    setDescription("");
  };

  const filteredIncomes = useMemo(() => {
    return incomes.filter(
      (inc) =>
        inc.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [incomes, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Other Income</h1>
          <p className="text-muted-foreground mt-1 text-sm">Log miscellaneous income streams (rents, logistics, salvage exports) outside retail sales</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Income</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[50%]">Income Records</th>
                <th className="px-5 py-3 font-semibold text-center w-[50%]">Total Income Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Batches
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    ${stats.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
              placeholder="Search income logs..."
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
                <th className="px-4 py-2 font-semibold">Income ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Source Name</th>
                <th className="px-4 py-2 font-semibold">Category</th>
                <th className="px-4 py-2 font-semibold">Payment Channel</th>
                <th className="px-4 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 font-semibold text-right">Amount Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredIncomes.map((inc) => (
                <tr key={inc.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{inc.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inc.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{inc.source}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inc.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inc.paymentMethod}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inc.description}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-500 font-mono">
                    +${inc.amount.toFixed(2)}
                  </td>
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
              <h3 className="text-base font-semibold text-foreground">Log Other Income</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Income Source Name</label>
                <input
                  type="text"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Sub-lease rent, Rack salvage"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Income Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  >
                    <option value="Rental Income">Rental Income</option>
                    <option value="Salvage Disposal">Salvage Disposal</option>
                    <option value="Logistics Profit">Logistics Profit</option>
                    <option value="Other Misc">Other Misc</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Amount Received ($)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Payment Gateway</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Description Notes</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Rent payment from client..."
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
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold"
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
