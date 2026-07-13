"use client";

import { useState, useMemo } from "react";
import { Truck, Search, Phone, MapPin, DollarSign, Calendar, Download, Receipt, TrendingDown, TrendingUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LedgerEntry {
  id: string;
  date: string;
  type: "Purchase" | "Payment" | "Opening Balance";
  reference: string;
  debit: number; // Payment paid to supplier (reduces balance)
  credit: number; // Bill/Invoice from supplier (increases balance)
  balance: number;
}

interface Supplier {
  id: string;
  name: string;
  company: string;
  phone: string;
  address: string;
  dueAmount: number;
  ledger: LedgerEntry[];
}

const mockSuppliers: Supplier[] = [
  {
    id: "SUPP-001",
    name: "John Doe",
    company: "TechCorp Inc.",
    phone: "+880 1612-990011",
    address: "Plot 12, Sector 7, Uttara, Dhaka",
    dueAmount: 5400,
    ledger: [
      { id: "L-1", date: "01 Oct 2026", type: "Opening Balance", reference: "-", debit: 0, credit: 0, balance: 0 },
      { id: "L-2", date: "12 Oct 2026", type: "Purchase", reference: "PO-501", debit: 0, credit: 5400, balance: 5400 }
    ]
  },
  {
    id: "SUPP-002",
    name: "Alex Mercer",
    company: "Global Supply",
    phone: "+880 1819-556677",
    address: "Road 4, Dhanmondi, Dhaka",
    dueAmount: 1200,
    ledger: [
      { id: "L-3", date: "01 Oct 2026", type: "Opening Balance", reference: "-", debit: 0, credit: 1200, balance: 1200 }
    ]
  },
  {
    id: "SUPP-003",
    name: "Jane Smith",
    company: "Smart Devices Ltd",
    phone: "+880 1911-332211",
    address: "DIT Road, Rampura, Dhaka",
    dueAmount: 0,
    ledger: [
      { id: "L-4", date: "01 Oct 2026", type: "Opening Balance", reference: "-", debit: 0, credit: 2000, balance: 2000 },
      { id: "L-5", date: "05 Oct 2026", type: "Payment", reference: "PAY-1092", debit: 2000, credit: 0, balance: 0 },
      { id: "L-6", date: "08 Oct 2026", type: "Purchase", reference: "PO-503", debit: 0, credit: 3800, balance: 3800 },
      { id: "L-7", date: "08 Oct 2026", type: "Payment", reference: "PAY-1100", debit: 3800, credit: 0, balance: 0 }
    ]
  }
];

export default function SupplierLedgerPage() {
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(mockSuppliers[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedSupplier = useMemo(() => {
    return suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
  }, [suppliers, selectedSupplierId]);

  // Aggregate Ledger Stats
  const ledgerStats = useMemo(() => {
    const totalDebit = selectedSupplier.ledger.reduce((sum, curr) => sum + curr.debit, 0);
    const totalCredit = selectedSupplier.ledger.reduce((sum, curr) => sum + curr.credit, 0);
    const netBalance = selectedSupplier.dueAmount;

    return { totalDebit, totalCredit, netBalance };
  }, [selectedSupplier]);

  const filteredLedger = useMemo(() => {
    return selectedSupplier.ledger.filter((entry) => {
      const matchesType = filterType === "All" || entry.type === filterType;
      const matchesSearch =
        entry.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedSupplier, filterType, searchQuery]);

  const handleExport = (format: string) => {
    if (format === "Print") {
      window.print();
    } else {
      alert(`Exporting Account Ledger for ${selectedSupplier.company} as ${format}...`);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Supplier Ledger</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review full statement logs, purchases bills, and payments history per vendor</p>
        </div>

        {/* Supplier Selector */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 h-9 px-3 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span>{selectedSupplier.company}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-56 bg-card border border-border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto custom-scrollbar divide-y divide-border/50">
                  {suppliers.map((sup) => (
                    <button
                      key={sup.id}
                      onClick={() => {
                        setSelectedSupplierId(sup.id);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors",
                        selectedSupplierId === sup.id ? "text-primary font-medium bg-primary/5" : "text-muted-foreground"
                      )}
                    >
                      <div className="font-semibold">{sup.company}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{sup.name} • Dues: ${sup.dueAmount}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 border border-border rounded-md bg-card p-0.5 h-9">
            <button onClick={() => handleExport("CSV")} className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground">
              CSV
            </button>
            <span className="w-px h-3.5 bg-border" />
            <button onClick={() => handleExport("Print")} className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Supplier Profile & Stats Table Card */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[700px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[30%]">Vendor Profile</th>
                <th className="px-5 py-3 font-semibold text-center w-[23%]">Total Billed (Credits)</th>
                <th className="px-5 py-3 font-semibold text-center w-[23%]">Total Paid (Debits)</th>
                <th className="px-5 py-3 font-semibold text-center w-[24%]">Balance Outstanding</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 hover:bg-muted/10 transition-colors">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-foreground">{selectedSupplier.company}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {selectedSupplier.phone}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> {selectedSupplier.address}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-bold text-foreground block tracking-tight font-mono">
                    ${ledgerStats.totalCredit.toFixed(2)}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-lg font-bold text-foreground block tracking-tight font-mono">
                    ${ledgerStats.totalDebit.toFixed(2)}
                  </span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-amber-500/[0.01]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className={cn(
                    "text-lg font-bold block tracking-tight font-mono",
                    ledgerStats.netBalance > 0 ? "text-amber-500" : "text-emerald-500"
                  )}>
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
            <p className="text-xs text-muted-foreground mt-0.5">Chronological transactions logs representing debits, credits, and run balances.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-8 px-3 rounded-md border border-border bg-card text-xs text-muted-foreground focus:outline-none"
            >
              <option value="All">All Transactions</option>
              <option value="Purchase">Purchase Bills</option>
              <option value="Payment">Payments Disbursed</option>
              <option value="Opening Balance">Opening Balance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Transaction Date</th>
                <th className="px-4 py-2 font-semibold">Entry Type</th>
                <th className="px-4 py-2 font-semibold">Reference</th>
                <th className="px-4 py-2 font-semibold">Credit (Purchased)</th>
                <th className="px-4 py-2 font-semibold">Debit (Disbursed)</th>
                <th className="px-4 py-2 font-semibold text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLedger.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{entry.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border",
                      entry.type === "Purchase" && "bg-rose-500/10 text-rose-600 border-rose-500/20",
                      entry.type === "Payment" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                      entry.type === "Opening Balance" && "bg-zinc-500/10 text-zinc-600 border-zinc-500/20"
                    )}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{entry.reference}</td>
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">
                    {entry.credit > 0 ? `+$${entry.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-500 font-mono">
                    {entry.debit > 0 ? `-$${entry.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—"}
                  </td>
                  <td className="px-4 py-3 font-bold text-foreground font-mono text-right">
                    ${entry.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
