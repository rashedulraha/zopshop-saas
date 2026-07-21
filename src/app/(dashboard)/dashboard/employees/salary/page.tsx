"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Filter,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  X,
  Briefcase,
  Activity,
  CreditCard,
  Layers,
  FileText,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SalarySlip {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  allowance: number;
  deduction: number;
  netPayable: number;
  status: "Paid" | "Pending";
  paymentDate: string;
}

const initialSalarySlips: SalarySlip[] = [];

export default function SalaryPage() {
  const [salaries, setSalaries] = useState<SalarySlip[]>(initialSalarySlips);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null);
  const [payrollMonth, setPayrollMonth] = useState("October 2026");

  // Payment Receipt State
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Aggregate Stats
  const stats = useMemo(() => {
    const totalPayroll = salaries.reduce((sum, curr) => sum + curr.netPayable, 0);
    const paidAmount = salaries.filter((s) => s.status === "Paid").reduce((sum, curr) => sum + curr.netPayable, 0);
    const pendingAmount = salaries.filter((s) => s.status === "Pending").reduce((sum, curr) => sum + curr.netPayable, 0);
    const paidStaff = salaries.filter((s) => s.status === "Paid").length;
    const pendingStaff = salaries.filter((s) => s.status === "Pending").length;

    return { totalPayroll, paidAmount, pendingAmount, paidStaff, pendingStaff };
  }, [salaries]);

  const handleDisburseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlip) return;

    setSalaries(
      salaries.map((s) =>
        s.id === selectedSlip.id
          ? {
              ...s,
              status: "Paid",
              paymentDate: "Today"
            }
          : s
      )
    );

    showNotification(`Salary of $${selectedSlip.netPayable.toFixed(2)} successfully disbursed to ${selectedSlip.name}!`);
    setSelectedSlip(null);
    setReference("");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const filteredSalaries = useMemo(() => {
    return salaries.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [salaries, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Staff Payroll</h1>
          <p className="text-muted-foreground mt-1 text-sm">Disburse employee base salaries, track allowances, and record tax statements</p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={payrollMonth}
              onChange={(e) => setPayrollMonth(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary w-40 text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Disbursed Notification Toast */}
      {notification && (
        <div className="fixed top-5 right-5 z-[60] bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[750px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Billed Payroll</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Salaries Disbursed</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Pending Dues</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Status Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Payroll Budget */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.totalPayroll.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Salaries Disbursed */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Pending Salaries */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Status Count */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-slate-500/10 items-center justify-center text-slate-500 mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base font-bold text-foreground block tracking-tight mt-1">
                    {stats.paidStaff} Paid / {stats.pendingStaff} Unpaid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary sheet log list */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Disbursement Worksheet</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Summary sheet of employee base earnings, allowances, deductions, and pay statuses.</p>
          </div>

          {/* Search bar inside Card */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Salary table list */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Staff Name</th>
                <th className="px-4 py-2 font-semibold">Base Earnings</th>
                <th className="px-4 py-2 font-semibold">Allowances / Bonuses</th>
                <th className="px-4 py-2 font-semibold">Deductions / Taxes</th>
                <th className="px-4 py-2 font-semibold">Net Payable</th>
                <th className="px-4 py-2 font-semibold text-center">Payment Status</th>
                <th className="px-4 py-2 font-semibold">Disbursed On</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredSalaries.map((slip) => (
                <tr key={slip.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px] uppercase shrink-0">
                        {slip.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs">{slip.name}</span>
                        <span className="text-[9px] text-muted-foreground">{slip.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-foreground font-mono">
                    ${slip.baseSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-emerald-500 font-mono">
                    +${slip.allowance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-rose-500 font-mono">
                    -${slip.deduction.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-foreground font-mono">
                    ${slip.netPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      slip.status === "Paid" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                      slip.status === "Pending" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    )}>
                      <span className={cn(
                        "w-1 h-1 rounded-full",
                        slip.status === "Paid" ? "bg-emerald-500" : "bg-amber-500"
                      )} />
                      {slip.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{slip.paymentDate}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedSlip(slip)}
                      disabled={slip.status === "Paid"}
                      className={cn(
                        "h-7 px-3 rounded font-semibold text-[10px] inline-flex items-center gap-1 transition-colors",
                        slip.status === "Paid"
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      )}
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>{slip.status === "Paid" ? "Paid Statement" : "Disburse Pay"}</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSalaries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No salary statements match search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Disbursement Modal Dialog */}
      {selectedSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedSlip(null)}
          />

          {/* Modal Container */}
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">Disburse Salary Statement</h3>
                <span className="text-[10px] text-muted-foreground mt-0.5">Disburse net payroll funds for {selectedSlip.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSlip(null)}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDisburseSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Employee Details</span>
                <div className="text-sm font-semibold text-foreground px-3 py-1.5 rounded-md bg-muted/40 border border-border/60">
                  {selectedSlip.name} • {selectedSlip.role}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Base Salary</span>
                  <span className="text-xs font-semibold text-foreground px-3 py-1.5 rounded-md bg-muted/30 border border-border/40 font-mono">
                    ${selectedSlip.baseSalary.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-semibold">Net Payable</span>
                  <span className="text-sm font-bold text-emerald-500 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 font-mono">
                    ${selectedSlip.netPayable.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Disbursement Channel</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                >
                  <option value="Bank Transfer">Direct Bank Transfer</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Cash">Cash Handout</option>
                  <option value="Card">Corporate Card</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Disbursement Transaction ID / Note</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. Reference code or TXN Hash..."
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedSlip(null)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                >
                  Confirm Disbursement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
