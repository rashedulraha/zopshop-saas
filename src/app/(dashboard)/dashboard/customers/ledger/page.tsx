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

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Olivia Martin",
    phone: "+880 1712-345678",
    address: "House 45, Road 11, Banani, Dhaka",
    previousDue: 1200,
    currentDue: 299,
    totalPurchases: 4500,
    ledger: [
      {
        id: "L-1",
        date: "01 Oct 2026",
        type: "Opening Balance",
        reference: "-",
        debit: 1200,
        credit: 0,
        balance: 1200,
      },
      {
        id: "L-2",
        date: "05 Oct 2026",
        type: "Payment",
        reference: "TXN-9081",
        debit: 0,
        credit: 1200,
        balance: 0,
      },
      {
        id: "L-3",
        date: "13 Oct 2026",
        type: "Sale",
        reference: "INV-1001",
        debit: 299,
        credit: 0,
        balance: 299,
      },
    ],
  },
  {
    id: "CUST-002",
    name: "Jackson Lee",
    phone: "+880 1819-876543",
    address: "Sector 4, Uttara, Dhaka",
    previousDue: 0,
    currentDue: 99,
    totalPurchases: 1800,
    ledger: [
      {
        id: "L-4",
        date: "01 Oct 2026",
        type: "Opening Balance",
        reference: "-",
        debit: 0,
        credit: 0,
        balance: 0,
      },
      {
        id: "L-5",
        date: "13 Oct 2026",
        type: "Sale",
        reference: "INV-1002",
        debit: 99,
        credit: 0,
        balance: 99,
      },
    ],
  },
  {
    id: "CUST-003",
    name: "Isabella Nguyen",
    phone: "+880 1911-223344",
    address: "Mirpur DOHS, Dhaka",
    previousDue: 500,
    currentDue: 0,
    totalPurchases: 3200,
    ledger: [
      {
        id: "L-6",
        date: "01 Oct 2026",
        type: "Opening Balance",
        reference: "-",
        debit: 500,
        credit: 0,
        balance: 500,
      },
      {
        id: "L-7",
        date: "08 Oct 2026",
        type: "Payment",
        reference: "TXN-8802",
        debit: 0,
        credit: 500,
        balance: 0,
      },
      {
        id: "L-8",
        date: "12 Oct 2026",
        type: "Sale",
        reference: "INV-1003",
        debit: 450,
        credit: 0,
        balance: 450,
      },
      {
        id: "L-9",
        date: "12 Oct 2026",
        type: "Payment",
        reference: "TXN-8812",
        debit: 0,
        credit: 450,
        balance: 0,
      },
    ],
  },
  {
    id: "CUST-004",
    name: "William Kim",
    phone: "+880 1515-555666",
    address: "Dhanmondi 27, Dhaka",
    previousDue: 0,
    currentDue: 15,
    totalPurchases: 850,
    ledger: [
      {
        id: "L-10",
        date: "01 Oct 2026",
        type: "Opening Balance",
        reference: "-",
        debit: 0,
        credit: 0,
        balance: 0,
      },
      {
        id: "L-11",
        date: "10 Oct 2026",
        type: "Sale",
        reference: "INV-0980",
        debit: 150,
        credit: 0,
        balance: 150,
      },
      {
        id: "L-12",
        date: "10 Oct 2026",
        type: "Payment",
        reference: "TXN-7711",
        debit: 0,
        credit: 150,
        balance: 0,
      },
      {
        id: "L-13",
        date: "12 Oct 2026",
        type: "Sale",
        reference: "INV-1004",
        debit: 15,
        credit: 0,
        balance: 15,
      },
    ],
  },
  {
    id: "CUST-005",
    name: "Sofia Davis",
    phone: "+880 1616-112233",
    address: "Gulshan 2, Dhaka",
    previousDue: 800,
    currentDue: 350,
    totalPurchases: 2500,
    ledger: [
      {
        id: "L-14",
        date: "01 Oct 2026",
        type: "Opening Balance",
        reference: "-",
        debit: 800,
        credit: 0,
        balance: 800,
      },
      {
        id: "L-15",
        date: "03 Oct 2026",
        type: "Payment",
        reference: "TXN-6601",
        debit: 0,
        credit: 800,
        balance: 0,
      },
      {
        id: "L-16",
        date: "10 Oct 2026",
        type: "Sale",
        reference: "INV-0985",
        debit: 350,
        credit: 0,
        balance: 350,
      },
    ],
  },
];

export default function CustomerLedgerPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    mockCustomers[0].id,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId) || customers[0];
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
