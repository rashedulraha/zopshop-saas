"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Download,
  Receipt,
  FileText,
  TrendingDown,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LedgerEntry {
  id: string;
  date: string;
  type: "Sale" | "Payment" | "Opening Balance" | "Refund";
  reference: string;
  debit: number; // Sale/Invoice amount
  credit: number; // Payment received
  balance: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  previousDue: number;
  currentDue: number;
  totalPurchases: number;
  ledger: LedgerEntry[];
}

const mockCustomers: Customer[] = [];

export default function CustomerLedgerPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId) || customers[0] || {
      id: "", name: "", phone: "", address: "", previousDue: 0, currentDue: 0, totalPurchases: 0, ledger: []
    };
  }, [customers, selectedCustomerId]);

  // Aggregate Ledger Stats
  const ledgerStats = useMemo(() => {
    const totalDebit = selectedCustomer.ledger.reduce(
      (sum, curr) => sum + curr.debit,
      0,
    );
    const totalCredit = selectedCustomer.ledger.reduce(
      (sum, curr) => sum + curr.credit,
      0,
    );
    const netBalance = selectedCustomer.currentDue;

    return { totalDebit, totalCredit, netBalance };
  }, [selectedCustomer]);

  // Filtered Ledger Entries
  const filteredLedger = useMemo(() => {
    return selectedCustomer.ledger.filter((entry) => {
      const matchesType = filterType === "All" || entry.type === filterType;
      const matchesSearch =
        entry.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedCustomer, filterType, searchQuery]);

  const handleExport = (format: string) => {
    if (format === "Print") {
      window.print();
    } else {
      alert(
        `Exporting Account Ledger for ${selectedCustomer.name} as ${format}...`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Customer Ledger
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review full statement logs, receipts, and invoices per customer
          </p>
        </div>

        {/* Customer Selector dropdown & exports */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 h-9 px-3 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{selectedCustomer.name}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
            </button>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-56 bg-card border border-border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto custom-scrollbar divide-y divide-border/50">
                  {customers.map((cust) => (
                    <button
                      key={cust.id}
                      onClick={() => {
                        setSelectedCustomerId(cust.id);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors",
                        selectedCustomerId === cust.id
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground",
                      )}
                    >
                      <div className="font-semibold">{cust.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {cust.id} • Dues: ${cust.currentDue}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 border border-border rounded-md bg-card p-0.5 h-9">
            <button
              onClick={() => handleExport("CSV")}
              className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              CSV
            </button>
            <span className="w-px h-3.5 bg-border" />
            <button
              onClick={() => handleExport("Print")}
              className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Profile & Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[30%]">
                  Client Profile
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[23%]">
                  Total Billed (Debits)
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[23%]">
                  Total Paid (Credits)
                </th>
                <th className="px-5 py-3 font-semibold text-center w-[24%]">
                  Balance Outstanding
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Client Profile details */}
                <td className="px-5 py-5 hover:bg-muted/10 transition-colors">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {selectedCustomer.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {selectedCustomer.phone}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />{" "}
                      {selectedCustomer.address}
                    </span>
                  </div>
                </td>

                {/* Total Debits */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-bold text-foreground block tracking-tight">
                    ${ledgerStats.totalDebit.toFixed(2)}
                  </span>
                </td>

                {/* Total Credits */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-bold text-foreground block tracking-tight">
                    ${ledgerStats.totalCredit.toFixed(2)}
                  </span>
                </td>

                {/* Net Balance / Current Due */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.01]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={cn(
                      "text-lg font-bold block tracking-tight",
                      ledgerStats.netBalance > 0
                        ? "text-amber-500"
                        : "text-emerald-500",
                    )}
                  >
                    ${ledgerStats.netBalance.toFixed(2)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Ledger Records List */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
              <Receipt className="w-4 h-4 text-primary" />
              <span>Statement Transactions</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Chronological transactions logs representing debits, credits, and
              run balances.
            </p>
          </div>

          {/* Table search & filter inputs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-8 px-3 rounded-md border border-border bg-card text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all hover:text-foreground"
            >
              <option value="All">All Transactions</option>
              <option value="Sale">Sale / Invoices</option>
              <option value="Payment">Payment Receipts</option>
              <option value="Opening Balance">Opening Balance</option>
            </select>
          </div>
        </div>

        {/* Ledger Entries Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Transaction Date</th>
                <th className="px-4 py-2 font-semibold">Entry Type</th>
                <th className="px-4 py-2 font-semibold">Reference</th>
                <th className="px-4 py-2 font-semibold">Debit (Sales)</th>
                <th className="px-4 py-2 font-semibold">Credit (Received)</th>
                <th className="px-4 py-2 font-semibold text-right">
                  Running Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLedger.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{entry.date}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border",
                        entry.type === "Sale" &&
                          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
                        entry.type === "Payment" &&
                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                        entry.type === "Opening Balance" &&
                          "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
                        entry.type === "Refund" &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                      )}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    {entry.reference}
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    {entry.debit > 0
                      ? `$${entry.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-500 whitespace-nowrap">
                    {entry.credit > 0
                      ? `-$${entry.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap text-right">
                    $
                    {entry.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
              {filteredLedger.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No statement records match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
