"use client";

import { useState } from "react";
import { 
  Truck, Search, Plus, Phone, MapPin, Landmark, 
  ArrowUpRight, ArrowDownRight, DollarSign, Calendar,
  FileText, History, User, Receipt, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LedgerEntry {
  id: string;
  date: string;
  type: "Purchase" | "Payment" | "Opening Balance";
  reference: string;
  debit: number; // Payment paid to supplier (reduces due)
  credit: number; // Bill/Invoice amount (increases due)
  balance: number;
}

interface PurchaseHistoryEntry {
  id: string;
  invoice: string;
  date: string;
  amount: number;
  status: "Received" | "Pending" | "Returned";
}

interface Supplier {
  id: string;
  name: string;
  company: string;
  phone: string;
  address: string;
  dueAmount: number;
  ledger: LedgerEntry[];
  purchaseHistory: PurchaseHistoryEntry[];
}

const initialSuppliers: Supplier[] = [
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
    ],
    purchaseHistory: [
      { id: "PH-1", invoice: "PO-501", date: "12 Oct 2026", amount: 5400, status: "Received" }
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
    ],
    purchaseHistory: [
      { id: "PH-2", invoice: "PO-502", date: "10 Oct 2026", amount: 1200, status: "Pending" }
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
    ],
    purchaseHistory: [
      { id: "PH-3", invoice: "PO-503", date: "08 Oct 2026", amount: 3800, status: "Received" }
    ]
  }
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(initialSuppliers[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Supplier Form States
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openingDue, setOpeningDue] = useState("");

  const selectedSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !phone || !address) return;

    const parsedDue = parseFloat(openingDue) || 0;
    const newSupplier: Supplier = {
      id: `SUPP-00${suppliers.length + 1}`,
      name,
      company,
      phone,
      address,
      dueAmount: parsedDue,
      ledger: [
        { 
          id: `L-new`, 
          date: "Today", 
          type: "Opening Balance", 
          reference: "-", 
          debit: 0, 
          credit: parsedDue, 
          balance: parsedDue 
        }
      ],
      purchaseHistory: []
    };

    setSuppliers([...suppliers, newSupplier]);
    setSelectedSupplierId(newSupplier.id);
    setIsAddOpen(false);
    // Reset Form
    setName("");
    setCompany("");
    setPhone("");
    setAddress("");
    setOpeningDue("");
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.phone.includes(searchQuery)
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage suppliers, purchase accounts, dues, and transaction histories</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Supplier</span>
        </button>
      </div>

      {isAddOpen ? (
        /* Create Supplier Form */
        <div className="border border-border bg-card rounded-md max-w-2xl p-6">
          <div className="border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Add New Supplier</h2>
            <p className="text-sm text-muted-foreground">Add a new vendor or supplier catalog profile.</p>
          </div>
          <form onSubmit={handleAddSupplier} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Person</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company Name</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. TechCorp Inc."
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +880 1600-000000"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Opening Due / Payable ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    value={openingDue}
                    onChange={e => setOpeningDue(e.target.value)}
                    placeholder="e.g. 0"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <textarea
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Factory, Office, City, Zip Code"
                    rows={2}
                    className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
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
                Save Supplier
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Master-Detail Split Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Supplier Selector (List) */}
          <div className="lg:col-span-4 border border-border bg-card rounded-md flex flex-col p-4">
            <div className="relative w-full mb-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {filteredSuppliers.map((supp) => {
                const isSelected = supp.id === selectedSupplierId;
                return (
                  <button
                    key={supp.id}
                    onClick={() => setSelectedSupplierId(supp.id)}
                    className={cn(
                      "flex flex-col items-start text-left p-3 rounded-md border transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5 ring-1 ring-primary" 
                        : "border-transparent bg-transparent hover:bg-muted/50"
                    )}
                  >
                    <span className="font-semibold text-foreground text-sm">{supp.company}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">Contact: {supp.name}</span>
                    <div className="flex items-center justify-between w-full mt-2 text-xs">
                      <span className="text-muted-foreground">Due Amount</span>
                      <span className={cn(
                        "font-semibold",
                        supp.dueAmount > 0 ? "text-amber-500" : "text-emerald-500"
                      )}>${supp.dueAmount.toFixed(2)}</span>
                    </div>
                  </button>
                );
              })}
              {filteredSuppliers.length === 0 && (
                <span className="text-sm text-muted-foreground text-center py-6">No suppliers found</span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Ledger, Details & Purchase History */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Selected Supplier Card Details */}
            <div className="border border-border bg-card p-5 rounded-md flex flex-col">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-foreground">{selectedSupplier.company}</h2>
                  <span className="text-xs text-muted-foreground">Supplier ID: {selectedSupplier.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Contact Person</span>
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    {selectedSupplier.name}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone</span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    {selectedSupplier.phone}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Address</span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {selectedSupplier.address}
                  </span>
                </div>
              </div>

              <div className="border-t border-border mt-5 pt-5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Payable Due Amount</span>
                  <span className={cn(
                    "text-2xl font-bold mt-0.5",
                    selectedSupplier.dueAmount > 0 ? "text-rose-500" : "text-emerald-500"
                  )}>${selectedSupplier.dueAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Account Ledger */}
            <div className="border border-border bg-card rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-primary" />
                  <span>Supplier Account Ledger</span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[220px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                    <tr>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Date</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Type</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Reference</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Debit (Paid)</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Credit (Bill)</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Balance Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {selectedSupplier.ledger.map((entry) => (
                      <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-1.5 whitespace-nowrap text-muted-foreground">{entry.date}</td>
                        <td className="px-4 py-1.5 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full",
                            entry.type === "Purchase" ? "bg-amber-500/10 text-amber-500" :
                            entry.type === "Payment" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                          )}>{entry.type}</span>
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">{entry.reference}</td>
                        <td className="px-4 py-1.5 font-medium text-emerald-500 whitespace-nowrap">{entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : "-"}</td>
                        <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : "-"}</td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap text-right">${entry.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchase History */}
            <div className="border border-border bg-card rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                  <History className="w-4 h-4 text-emerald-500" />
                  <span>Purchase Invoices History</span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[220px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                    <tr>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">PO Date</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">Invoice No</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap">PO Amount</th>
                      <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {selectedSupplier.purchaseHistory.map((ph) => (
                      <tr key={ph.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-1.5 whitespace-nowrap text-muted-foreground">{ph.date}</td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">{ph.invoice}</td>
                        <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">${ph.amount.toFixed(2)}</td>
                        <td className="px-4 py-1.5 whitespace-nowrap text-right">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                            ph.status === "Received" ? "bg-emerald-500/10 text-emerald-500" :
                            ph.status === "Pending" ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"
                          )}>{ph.status}</span>
                        </td>
                      </tr>
                    ))}
                    {selectedSupplier.purchaseHistory.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                          No purchase history entries.
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
