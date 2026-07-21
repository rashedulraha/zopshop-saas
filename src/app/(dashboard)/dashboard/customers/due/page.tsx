"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Phone,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Bell,
  X,
  CreditCard,
  Layers,
  Activity,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerDue {
  id: string;
  name: string;
  phone: string;
  totalPurchased: number;
  currentDue: number;
  ageingDays: number;
  lastPaymentDate: string;
}

const initialDues: CustomerDue[] = [];

export default function CustomerDuePage() {
  const [dues, setDues] = useState<CustomerDue[]>(initialDues);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDue, setSelectedDue] = useState<CustomerDue | null>(null);

  // Payment Form States
  const [payAmount, setPayAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const [reference, setReference] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Aggregate Outstanding Stats
  const stats = useMemo(() => {
    const totalDues = dues.reduce((sum, curr) => sum + curr.currentDue, 0);
    const debtors = dues.filter((d) => d.currentDue > 0).length;
    const avgAgeing =
      dues.length > 0
        ? Math.round(
            dues.reduce((sum, curr) => sum + curr.ageingDays, 0) / dues.length,
          )
        : 0;
    const collectionTarget = 1500; // Mock target

    return { totalDues, debtors, avgAgeing, collectionTarget };
  }, [dues]);

  const handlePayReceiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDue || !payAmount) return;

    const amount = parseFloat(payAmount);
    if (isNaN(amount) || amount <= 0) return;

    setDues(
      dues
        .map((d) =>
          d.id === selectedDue.id
            ? {
                ...d,
                currentDue: Math.max(0, d.currentDue - amount),
                lastPaymentDate: "Today",
              }
            : d,
        )
        .filter((d) => d.currentDue > 0), // Hide if paid in full
    );

    showNotification(
      `Payment of $${amount.toFixed(2)} received from ${selectedDue.name}!`,
    );
    setSelectedDue(null);
    resetPaymentForm();
  };

  const sendReminder = (customer: CustomerDue) => {
    showNotification(
      `SMS & Email payment reminders successfully dispatched to ${customer.name}!`,
    );
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const resetPaymentForm = () => {
    setPayAmount("");
    setPaymentMethod("Bkash");
    setReference("");
  };

  // Search Filter
  const filteredDues = useMemo(() => {
    return dues.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.phone.includes(searchQuery),
    );
  }, [dues, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Customer Dues
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor outstanding customer debt, ageing, and receive payments
          </p>
        </div>
      </div>

      {/* Dues Notifications alerts toast */}
      {notification && (
        <div className="fixed top-5 right-5 z-[60] bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Outstanding Balance
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Active Debtors
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Avg Ageing Overdue
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">
                  Collection Target
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Outstanding Balance */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.01]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    ${stats.totalDues.toFixed(2)}
                  </span>
                </td>

                {/* Active Debtors */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.debtors} Client{stats.debtors !== 1 && "s"}
                  </span>
                </td>

                {/* Avg Ageing Overdue */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.avgAgeing} Days
                  </span>
                </td>

                {/* Collection Target */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    ${stats.collectionTarget.toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Due Ledger Table */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Outstanding Due Accounts</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              List of active debtor profiles with due payment records.
            </p>
          </div>

          {/* Search bar inside Card */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search debtor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Debtor Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Debtor Name</th>
                <th className="px-4 py-2 font-semibold">Phone Number</th>
                <th className="px-4 py-2 font-semibold">Total Purchased</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Ageing status
                </th>
                <th className="px-4 py-2 font-semibold">Last Paid On</th>
                <th className="px-4 py-2 font-semibold">Amount Due</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredDues.map((debtor) => (
                <tr
                  key={debtor.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {debtor.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    {debtor.phone}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    ${debtor.totalPurchased.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border",
                        debtor.ageingDays >= 20 &&
                          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                        debtor.ageingDays >= 10 &&
                          debtor.ageingDays < 20 &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                        debtor.ageingDays < 10 &&
                          "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
                      )}
                    >
                      Overdue {debtor.ageingDays}d
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {debtor.lastPaymentDate}
                  </td>
                  <td className="px-4 py-3 font-bold text-rose-500">
                    ${debtor.currentDue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => sendReminder(debtor)}
                        className="h-7 px-2.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium text-[10px] inline-flex items-center gap-1 transition-colors"
                      >
                        <Bell className="w-3 h-3" />
                        <span>Remind</span>
                      </button>
                      <button
                        onClick={() => setSelectedDue(debtor)}
                        className="h-7 px-2.5 rounded bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-[10px] inline-flex items-center gap-1 transition-colors"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Pay Receive</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDues.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No outstanding due accounts match search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Receive Modal Dialog */}
      {selectedDue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setSelectedDue(null);
              resetPaymentForm();
            }}
          />

          {/* Modal Container */}
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Collect Due Payment
                </h3>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  Collect outstanding cash for {selectedDue.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedDue(null);
                  resetPaymentForm();
                }}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePayReceiveSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Customer Name
                </span>
                <span className="text-sm font-semibold text-foreground px-3 py-1.5 rounded-md bg-muted/40 border border-border/60">
                  {selectedDue.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Outstanding Dues
                </span>
                <span className="text-sm font-bold text-rose-500 px-3 py-1.5 rounded-md bg-rose-500/5 border border-rose-500/10">
                  ${selectedDue.currentDue.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Collect Amount ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    max={selectedDue.currentDue}
                    placeholder="e.g. 150.00"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Payment Channel
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Bkash">Bkash</option>
                  <option value="Card">Card Gateway</option>
                  <option value="Cash">Direct Cash</option>
                  <option value="Bank">Bank Deposit</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Reference Note
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. Transaction code or memo..."
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDue(null);
                    resetPaymentForm();
                  }}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                >
                  Receive Cash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
