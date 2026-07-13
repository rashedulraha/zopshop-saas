"use client";

import { useState, useMemo } from "react";
import { Users, Search, Phone, DollarSign, CheckCircle, AlertTriangle, X, CreditCard, Activity, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SupplierDue {
  id: string;
  company: string;
  name: string;
  phone: string;
  totalPurchased: number;
  dueAmount: number;
  ageingDays: number;
  lastPaymentDate: string;
}

const initialDues: SupplierDue[] = [
  { id: "SUPP-001", company: "TechCorp Inc.", name: "John Doe", phone: "+880 1612-990011", totalPurchased: 5400, dueAmount: 5400, ageingDays: 14, lastPaymentDate: "—" },
  { id: "SUPP-002", company: "Global Supply", name: "Alex Mercer", phone: "+880 1819-556677", totalPurchased: 1200, dueAmount: 1200, ageingDays: 3, lastPaymentDate: "—" }
];

export default function SupplierDuePage() {
  const [dues, setDues] = useState<SupplierDue[]>(initialDues);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDue, setSelectedDue] = useState<SupplierDue | null>(null);

  // Pay Modal State
  const [payAmount, setPayAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalDues = dues.reduce((sum, curr) => sum + curr.dueAmount, 0);
    const activeDebts = dues.filter((d) => d.dueAmount > 0).length;
    const avgAgeing = dues.length > 0 ? Math.round(dues.reduce((sum, curr) => sum + curr.ageingDays, 0) / dues.length) : 0;
    return { totalDues, activeDebts, avgAgeing };
  }, [dues]);

  const handlePayDisburseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDue || !payAmount) return;

    const amount = parseFloat(payAmount);
    if (isNaN(amount) || amount <= 0) return;

    setDues(
      dues.map((d) =>
        d.id === selectedDue.id
          ? {
              ...d,
              dueAmount: Math.max(0, d.dueAmount - amount),
              lastPaymentDate: "Today"
            }
          : d
      ).filter((d) => d.dueAmount > 0)
    );

    showNotification(`Payment of $${amount.toFixed(2)} disbursed to ${selectedDue.company}!`);
    setSelectedDue(null);
    resetPaymentForm();
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const resetPaymentForm = () => {
    setPayAmount("");
    setPaymentMethod("Bank Transfer");
    setReference("");
  };

  const filteredDues = useMemo(() => {
    return dues.filter((d) =>
      d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery)
    );
  }, [dues, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Supplier Dues</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor outstanding accounts payable to vendors and process payments</p>
        </div>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Accounts Payable</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Active Creditors</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Avg Ageing Overdue</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.totalDues.toFixed(2)}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.activeDebts} Vendors
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.avgAgeing} Days
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
              placeholder="Search supplier..."
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
                <th className="px-4 py-2 font-semibold">Vendor Company</th>
                <th className="px-4 py-2 font-semibold">Contact Person</th>
                <th className="px-4 py-2 font-semibold">Phone Number</th>
                <th className="px-4 py-2 font-semibold">Total Purchased</th>
                <th className="px-4 py-2 font-semibold text-center">Ageing status</th>
                <th className="px-4 py-2 font-semibold">Last Paid On</th>
                <th className="px-4 py-2 font-semibold">Outstanding Due</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredDues.map((debtor) => (
                <tr key={debtor.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{debtor.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">{debtor.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{debtor.phone}</td>
                  <td className="px-4 py-3 font-medium text-foreground">${debtor.totalPurchased.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border",
                      debtor.ageingDays >= 10 ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : "bg-slate-500/10 text-slate-600 border-slate-500/20"
                    )}>
                      Overdue {debtor.ageingDays}d
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{debtor.lastPaymentDate}</td>
                  <td className="px-4 py-3 font-bold text-rose-500">
                    ${debtor.dueAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedDue(debtor)}
                      className="h-7 px-2.5 rounded bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-[10px] inline-flex items-center gap-1"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Disburse Pay</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedDue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedDue(null)} />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">Disburse Vendor Payment</h3>
              <button onClick={() => setSelectedDue(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handlePayDisburseSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Supplier Company</span>
                <span className="text-sm font-semibold text-foreground px-3 py-1.5 rounded-md bg-muted/40 border border-border/60">
                  {selectedDue.company}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Outstanding Dues</span>
                <span className="text-sm font-bold text-rose-500 px-3 py-1.5 rounded-md bg-rose-500/5 border border-rose-500/10">
                  ${selectedDue.dueAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Pay Amount ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    max={selectedDue.dueAmount}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Payment Method</label>
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
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Reference ID / Check Number</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. TXN-8902 or Memo..."
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedDue(null)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
