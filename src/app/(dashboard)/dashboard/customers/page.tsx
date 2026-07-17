"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  FileText,
  History,
  User,
  Receipt,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LedgerEntry {
  id: string;
  date: string;
  type: "Sale" | "Payment" | "Opening Balance";
  reference: string;
  debit: number; // Invoice amount
  credit: number; // Payment received
  balance: number;
}

interface PaymentHistoryEntry {
  id: string;
  date: string;
  method: string;
  amount: number;
  reference: string;
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
  paymentHistory: PaymentHistoryEntry[];
}

const initialCustomers: Customer[] = [
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
    paymentHistory: [
      {
        id: "P-1",
        date: "05 Oct 2026",
        method: "Bkash",
        amount: 1200,
        reference: "TXN-9081",
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
    paymentHistory: [],
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
    paymentHistory: [
      {
        id: "P-2",
        date: "08 Oct 2026",
        method: "Bank Transfer",
        amount: 500,
        reference: "TXN-8802",
      },
      {
        id: "P-3",
        date: "12 Oct 2026",
        method: "Cash",
        amount: 450,
        reference: "TXN-8812",
      },
    ],
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    initialCustomers[0].id,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Customer Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [prevDue, setPrevDue] = useState("");

  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const parsedDue = parseFloat(prevDue) || 0;
    const newCustomer: Customer = {
      id: `CUST-00${customers.length + 1}`,
      name,
      phone,
      address,
      previousDue: parsedDue,
      currentDue: parsedDue,
      totalPurchases: 0,
      ledger: [
        {
          id: `L-new`,
          date: "Today",
          type: "Opening Balance",
          reference: "-",
          debit: parsedDue,
          credit: 0,
          balance: parsedDue,
        },
      ],
      paymentHistory: [],
    };

    setCustomers([...customers, newCustomer]);
    setSelectedCustomerId(newCustomer.id);
    setIsAddOpen(false);
    // Reset Form
    setName("");
    setPhone("");
    setAddress("");
    setPrevDue("");
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Customers
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage client details, ledger records, and payment history
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer</span>
        </button>
      </div>

      {isAddOpen ? (
        /* Create Customer Form */
        <div className="border border-border bg-card rounded-md max-w-2xl p-6">
          <div className="border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Add New Customer
            </h2>
            <p className="text-sm text-muted-foreground">
              Register a new customer profile in the system.
            </p>
          </div>
          <form onSubmit={handleAddCustomer} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Olivia Martin"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1700-000000"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, Road, City, Zip Code"
                    rows={2}
                    className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Previous / Opening Due ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    value={prevDue}
                    onChange={(e) => setPrevDue(e.target.value)}
                    placeholder="e.g. 0"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Master-Detail Split Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Customer Selector (List) */}
          <div className="lg:col-span-4 border border-border bg-card rounded-md flex flex-col p-4">
            <div className="relative w-full mb-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {filteredCustomers.map((cust) => {
                const isSelected = cust.id === selectedCustomerId;
                return (
                  <button
                    key={cust.id}
                    onClick={() => setSelectedCustomerId(cust.id)}
                    className={cn(
                      "flex flex-col items-start text-left p-3 rounded-md border transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-transparent bg-transparent hover:bg-muted/50",
                    )}
                  >
                    <span className="font-semibold text-foreground text-sm">
                      {cust.name}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {cust.phone}
                    </span>
                    <div className="flex items-center justify-between w-full mt-2 text-xs">
                      <span className="text-muted-foreground">Due Amount</span>
                      <span
                        className={cn(
                          "font-semibold",
                          cust.currentDue > 0
                            ? "text-amber-500"
                            : "text-emerald-500",
                        )}
                      >
                        ${cust.currentDue.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );
              })}
              {filteredCustomers.length === 0 && (
                <span className="text-sm text-muted-foreground text-center py-6">
                  No customers found
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Ledger, Details & Payment History */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Selected Customer Card Details */}
            <div className="border border-border bg-card p-5 rounded-md flex flex-col">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {selectedCustomer.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedCustomer.name}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    ID: {selectedCustomer.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Phone
                  </span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    {selectedCustomer.phone}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 sm:col-span-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Address
                  </span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {selectedCustomer.address}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-border mt-5 pt-5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Previous Due
                  </span>
                  <span className="text-lg font-semibold text-foreground mt-0.5">
                    ${selectedCustomer.previousDue.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Current Due
                  </span>
                  <span
                    className={cn(
                      "text-lg font-semibold mt-0.5",
                      selectedCustomer.currentDue > 0
                        ? "text-amber-500"
                        : "text-emerald-500",
                    )}
                  >
                    ${selectedCustomer.currentDue.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Total Purchases
                  </span>
                  <span className="text-lg font-semibold text-primary mt-0.5">
                    ${selectedCustomer.totalPurchases.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ledger Records Table */}
            <div className="border border-border bg-card rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-primary" />
                  <span>Account Ledger</span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[220px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                    <tr>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Type
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Reference
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Debit (Sale)
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Credit (Pay)
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {selectedCustomer.ledger.map((entry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-1.5 whitespace-nowrap text-muted-foreground">
                          {entry.date}
                        </td>
                        <td className="px-4 py-1.5 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full",
                              entry.type === "Sale"
                                ? "bg-amber-500/10 text-amber-500"
                                : entry.type === "Payment"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-muted text-muted-foreground",
                            )}
                          >
                            {entry.type}
                          </span>
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">
                          {entry.reference}
                        </td>
                        <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">
                          {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : "-"}
                        </td>
                        <td className="px-4 py-1.5 font-medium text-emerald-500 whitespace-nowrap">
                          {entry.credit > 0
                            ? `$${entry.credit.toFixed(2)}`
                            : "-"}
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap text-right">
                          ${entry.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="border border-border bg-card rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                  <History className="w-4 h-4 text-emerald-500" />
                  <span>Payment History</span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[220px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                    <tr>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Receipt Date
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Payment Method
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">
                        Txn Reference
                      </th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">
                        Amount Received
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {selectedCustomer.paymentHistory.map((pmt) => (
                      <tr
                        key={pmt.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-1.5 whitespace-nowrap text-muted-foreground">
                          {pmt.date}
                        </td>
                        <td className="px-4 py-1.5 whitespace-nowrap font-medium text-foreground">
                          {pmt.method}
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">
                          {pmt.reference}
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-emerald-500 whitespace-nowrap text-right">
                          ${pmt.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {selectedCustomer.paymentHistory.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-muted-foreground"
                        >
                          No payment receipts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
