"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingCart, Calendar, FileText, User, Plus, Trash2,
  DollarSign, Percent, Calculator, CheckCircle2, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  rate: number;
  discount: number; // in percentage
  vat: number; // in percentage
  total: number;
}

const mockProducts = [
  { id: "PROD-001", name: "iPhone 15 Pro", rate: 999 },
  { id: "PROD-002", name: "Wireless Charger Pad", rate: 15 },
  { id: "PROD-003", name: "Ergonomic Office Chair", rate: 350 },
  { id: "PROD-004", name: "USB-C Cable 2M", rate: 10 }
];

const mockSuppliers = [
  { id: "SUPP-001", company: "TechCorp Inc." },
  { id: "SUPP-002", company: "Global Supply" },
  { id: "SUPP-003", company: "Smart Devices Ltd" }
];

export default function CreatePurchasePage() {
  const [supplierId, setSupplierId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [items, setItems] = useState<PurchaseItem[]>([
    {
      id: "item-1",
      productId: "",
      productName: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      vat: 0,
      total: 0
    }
  ]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    totalDiscount: 0,
    totalVat: 0,
    grandTotal: 0
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Add a new product row
  const addRow = () => {
    const newItem: PurchaseItem = {
      id: `item-${Date.now()}`,
      productId: "",
      productName: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      vat: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  // Remove a product row
  const removeRow = (id: string) => {
    if (items.length === 1) return; // Keep at least one row
    setItems(items.filter(item => item.id !== id));
  };

  // Handle product selection & autofill default rate
  const handleProductChange = (rowId: string, prodId: string) => {
    const selectedProd = mockProducts.find(p => p.id === prodId);
    setItems(items.map(item => {
      if (item.id === rowId) {
        return {
          ...item,
          productId: prodId,
          productName: selectedProd?.name || "",
          rate: selectedProd?.rate || 0
        };
      }
      return item;
    }));
  };

  // Handle inline numeric updates
  const handleCellChange = (rowId: string, field: "quantity" | "rate" | "discount" | "vat", value: number) => {
    setItems(items.map(item => {
      if (item.id === rowId) {
        return {
          ...item,
          [field]: value
        };
      }
      return item;
    }));
  };

  // Re-calculate row totals and summary totals on items change
  useEffect(() => {
    let subtotalAccumulator = 0;
    let discountAccumulator = 0;
    let vatAccumulator = 0;

    const updatedItems = items.map(item => {
      const grossTotal = item.quantity * item.rate;
      const discountAmount = grossTotal * (item.discount / 100);
      const netTotal = grossTotal - discountAmount;
      const vatAmount = netTotal * (item.vat / 100);
      const finalRowTotal = netTotal + vatAmount;

      subtotalAccumulator += grossTotal;
      discountAccumulator += discountAmount;
      vatAccumulator += vatAmount;

      return {
        ...item,
        total: finalRowTotal
      };
    });

    // Prevent infinite loop by checking if values actually changed
    const rowTotalsChanged = updatedItems.some((item, idx) => item.total !== items[idx].total);
    if (rowTotalsChanged) {
      setItems(updatedItems);
    }

    setSummary({
      subtotal: subtotalAccumulator,
      totalDiscount: discountAccumulator,
      totalVat: vatAccumulator,
      grandTotal: subtotalAccumulator - discountAccumulator + vatAccumulator
    });
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierId || !invoiceNumber || items.some(item => !item.productId)) return;
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      // Reset form
      setSupplierId("");
      setInvoiceNumber("");
      setItems([
        {
          id: "item-1",
          productId: "",
          productName: "",
          quantity: 1,
          rate: 0,
          discount: 0,
          vat: 0,
          total: 0
        }
      ]);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/purchase" className="p-1.5 hover:bg-muted border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Create Purchase</h1>
            <p className="text-muted-foreground mt-1 text-sm">Create a new goods purchase invoice entry</p>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md flex items-center gap-3 text-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Purchase Invoice recorded successfully! Redirecting or clearing form...</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Invoice Metadata Box */}
        <div className="border border-border bg-card p-5 rounded-md">
          <div className="border-b border-border pb-3 mb-4">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">Purchase Invoice Details</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Supplier Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Supplier</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  required
                  value={supplierId}
                  onChange={e => setSupplierId(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                >
                  <option value="">Select Supplier</option>
                  {mockSuppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.company}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoice Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice Number</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. PUR-2026-900"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Purchase Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Purchase Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  required
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Items list */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">Invoice Products list</h3>
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-medium rounded-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Row</span>
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left table-fixed min-w-[750px]">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
                <tr>
                  <th className="px-4 py-2 font-medium w-[40%]">Product</th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">Quantity</th>
                  <th className="px-4 py-2 font-medium w-[15%]">Rate ($)</th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">Discount (%)</th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">VAT (%)</th>
                  <th className="px-4 py-2 font-medium w-[15%] text-right">Total</th>
                  <th className="px-4 py-2 font-medium w-[8%] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                    {/* Product Selection */}
                    <td className="px-3 py-2">
                      <select
                        required
                        value={item.productId}
                        onChange={e => handleProductChange(item.id, e.target.value)}
                        className="w-full h-8 px-2 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="">Select Product</option>
                        {mockProducts.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </td>

                    {/* Quantity */}
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={e => handleCellChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                        className="w-full h-8 px-2 text-center rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </td>

                    {/* Rate */}
                    <td className="px-3 py-2">
                      <div className="relative">
                        <DollarSign className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={item.rate || ""}
                          onChange={e => handleCellChange(item.id, "rate", parseFloat(e.target.value) || 0)}
                          className="w-full h-8 pl-5 pr-2 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="px-3 py-2 text-center">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.discount || ""}
                          onChange={e => handleCellChange(item.id, "discount", parseFloat(e.target.value) || 0)}
                          className="w-full h-8 px-2 pr-5 text-center rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                        <Percent className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      </div>
                    </td>

                    {/* VAT */}
                    <td className="px-3 py-2 text-center">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.vat || ""}
                          onChange={e => handleCellChange(item.id, "vat", parseFloat(e.target.value) || 0)}
                          className="w-full h-8 px-2 pr-5 text-center rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                        <Percent className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-2 font-semibold text-foreground text-right">
                      ${item.total.toFixed(2)}
                    </td>

                    {/* Delete Row Action */}
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(item.id)}
                        disabled={items.length === 1}
                        className={cn(
                          "p-1 hover:text-rose-500 hover:bg-rose-500/5 rounded transition-colors text-muted-foreground",
                          items.length === 1 && "opacity-40 cursor-not-allowed hover:bg-transparent"
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation Summary Footer Panel */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="text-xs text-muted-foreground bg-muted/10 p-3 rounded-md border border-border/50 max-w-md">
            <span>Note: Calculations are computed automatically. Subtotal is the sum of items before discount and VAT. VAT is calculated on the net discounted price.</span>
          </div>

          <div className="border border-border bg-card p-5 rounded-md min-w-[280px] self-end flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                Total Discount
              </span>
              <span className="font-semibold text-rose-500">-${summary.totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">VAT / Tax</span>
              <span className="font-semibold text-foreground">+${summary.totalVat.toFixed(2)}</span>
            </div>
            
            <hr className="border-border" />
            
            <div className="flex justify-between text-base font-bold">
              <span className="text-foreground">Grand Total</span>
              <span className="text-primary">${summary.grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold transition-colors mt-3 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Record Purchase Invoice</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
