"use client";

import { useState, useMemo } from "react";
import { Plus, Search, CheckCircle, Clock, Landmark, DollarSign, Activity, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  balance: number;
  status: "Active" | "Inactive";
}

const initialAccounts: BankAccount[] = [
  { id: "ACC-01", accountName: "ZopShop Operating Account", accountNumber: "122-333-44555", bankName: "Brac Bank Ltd", branch: "Banani Branch", balance: 25000, status: "Active" },
  { id: "ACC-02", accountName: "Corporate Backup Savings", accountNumber: "009-887-11223", bankName: "City Bank PLC", branch: "Gulshan Branch", balance: 50000, status: "Active" },
  { id: "ACC-03", accountName: "Employee Petty Cash Fund", accountNumber: "445-112-99081", bankName: "Dutch-Bangla Bank", branch: "Uttara Branch", balance: 500, status: "Inactive" }
];

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const stats = useMemo(() => {
    const total = accounts.length;
    const active = accounts.filter((a) => a.status === "Active").length;
    const totalBalance = accounts.reduce((sum, curr) => sum + curr.balance, 0);
    return { total, active, totalBalance };
  }, [accounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !accountNumber || !bankName || !balance) return;

    const newAccount: BankAccount = {
      id: `ACC-0${accounts.length + 1}`,
      accountName,
      accountNumber,
      bankName,
      branch: branch || "Main Branch",
      balance: parseFloat(balance) || 0,
      status
    };

    setAccounts([...accounts, newAccount]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setAccountName("");
    setAccountNumber("");
    setBankName("");
    setBranch("");
    setBalance("");
    setStatus("Active");
  };

  const filteredAccounts = useMemo(() => {
    return accounts.filter(
      (a) =>
        a.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.accountNumber.includes(searchQuery) ||
        a.bankName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [accounts, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Bank Accounts</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage bank accounts, deposits, statements, and track corporate liquidity</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Registered Accounts</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Active Accounts</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Total Liquidity Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Landmark className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Accounts
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">
                    {stats.active} Active
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    ${stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
              placeholder="Search account by bank name or number..."
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
                <th className="px-4 py-2 font-semibold">Account ID</th>
                <th className="px-4 py-2 font-semibold">Account Title</th>
                <th className="px-4 py-2 font-semibold">Account Number</th>
                <th className="px-4 py-2 font-semibold">Bank Name</th>
                <th className="px-4 py-2 font-semibold">Branch Location</th>
                <th className="px-4 py-2 font-semibold text-center">Liquidity Balance</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAccounts.map((a) => (
                <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{a.id}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{a.accountName}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{a.accountNumber}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.bankName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.branch}</td>
                  <td className="px-4 py-3 text-center font-bold text-foreground font-mono">
                    ${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      a.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    )}>
                      <span className={cn(
                        "w-1 h-1 rounded-full",
                        a.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                      )} />
                      {a.status}
                    </span>
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
              <h3 className="text-base font-semibold text-foreground">Add New Bank Account</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Account Name</label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g. ZopShop Operating"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Account Number</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="e.g. 122-333-44555"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Bank Name</label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. Brac Bank"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Branch Location</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Banani"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Opening Balance ($)</label>
                  <input
                    type="number"
                    required
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
