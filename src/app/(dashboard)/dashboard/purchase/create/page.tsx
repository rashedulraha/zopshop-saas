"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  User,
  Plus,
  Trash2,
  DollarSign,
  Percent,
  Calculator,
  CheckCircle2,
  ArrowLeft,
  Truck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/product.store";
import { usePartyStore } from "@/store/party.store";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionItem, TransactionMode } from "@/types";
import { toast } from "sonner";

export default function CreatePurchasePage() {
  const router = useRouter();
  const { products, fetchProducts } = useProductStore();
  const { parties, fetchParties } = usePartyStore();
  const { createTransaction, isLoading: isSubmitting } = useTransactionStore();

  const [supplierId, setSupplierId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // Transport Cost, Payment Mode, Paid Amount, Due Amount
  const [transportCost, setTransportCost] = useState<number>(0);
  const [mode, setMode] = useState<TransactionMode>("CASH");
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [dueAmount, setDueAmount] = useState<number>(0);
  const [note, setNote] = useState("");

  const [items, setItems] = useState<
    (Omit<TransactionItem, "id" | "transactionId" | "productId"> & {
      id: string;
      productId: string;
      productName: string;
      discount: number;
      vat: number;
    })[]
  >([
    {
      id: "item-1",
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      vat: 0,
      totalPrice: 0,
    },
  ]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    totalDiscount: 0,
    totalVat: 0,
    grandTotal: 0,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchProducts({ limit: 500 });
    fetchParties({ type: "SUPPLIER", limit: 500 });
  }, [fetchProducts, fetchParties]);

  // Add a new product row
  const addRow = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        productId: "",
        productName: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        vat: 0,
        totalPrice: 0,
      },
    ]);
  };

  // Remove a product row
  const removeRow = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle product selection & autofill default purchase price
  const handleProductChange = (rowId: string, prodId: string) => {
    const selectedProd = products.find((p) => p.id === prodId);
    setItems(
      items.map((item) => {
        if (item.id === rowId) {
          return {
            ...item,
            productId: prodId,
            productName: selectedProd?.name || "",
            unitPrice: selectedProd?.purchasePrice || 0,
          };
        }
        return item;
      }),
    );
  };

  // Handle inline numeric updates
  const handleCellChange = (
    rowId: string,
    field: "quantity" | "unitPrice" | "discount" | "vat",
    value: number,
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === rowId) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      }),
    );
  };

  // Re-calculate row totals, summary totals, and dues on items, transport, or paid amount change
  useEffect(() => {
    let subtotalAccumulator = 0;
    let discountAccumulator = 0;
    let vatAccumulator = 0;

    const updatedItems = items.map((item) => {
      const grossTotal = item.quantity * item.unitPrice;
      const discountAmount = grossTotal * (item.discount / 100);
      const netTotal = grossTotal - discountAmount;
      const vatAmount = netTotal * (item.vat / 100);
      const finalRowTotal = netTotal + vatAmount;

      subtotalAccumulator += grossTotal;
      discountAccumulator += discountAmount;
      vatAccumulator += vatAmount;

      return {
        ...item,
        totalPrice: finalRowTotal,
      };
    });

    const rowTotalsChanged = updatedItems.some(
      (item, idx) => (item.totalPrice || 0) !== (items[idx].totalPrice || 0),
    );
    if (rowTotalsChanged) {
      setItems(updatedItems);
    }

    const calculatedGrandTotal =
      subtotalAccumulator -
      discountAccumulator +
      vatAccumulator +
      (Number(transportCost) || 0);

    setSummary({
      subtotal: subtotalAccumulator,
      totalDiscount: discountAccumulator,
      totalVat: vatAccumulator,
      grandTotal: calculatedGrandTotal,
    });

    setDueAmount(Math.max(0, calculatedGrandTotal - (Number(paidAmount) || 0)));
  }, [items, transportCost, paidAmount]);

  // Set mode to credit automatically if not fully paid
  useEffect(() => {
    if (dueAmount > 0) {
      setMode("CREDIT");
    } else if (mode === "CREDIT" && dueAmount === 0 && summary.grandTotal > 0) {
      setMode("CASH");
    }
  }, [dueAmount, summary.grandTotal, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNo || items.some((item) => !item.productId)) {
      toast.error(
        "Please fill in all required fields and ensure items have products selected.",
      );
      return;
    }

    if (dueAmount > 0 && !supplierId) {
      toast.error(
        "A supplier must be selected for credit purchases (unpaid balance).",
      );
      return;
    }

    try {
      await createTransaction({
        type: "PURCHASE",
        mode,
        amount: summary.grandTotal,
        netAmount: summary.subtotal,
        discount: summary.totalDiscount,
        tax: summary.totalVat,
        paidAmount,
        partyId: supplierId || null,
        transactionDate: purchaseDate,
        note,
        customData: {
          transportCost,
          invoiceNo,
        },
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      });

      setIsSuccess(true);
      toast.success("Purchase recorded successfully!");

      setTimeout(() => {
        router.push("/dashboard/purchase");
      }, 1500);
    } catch (err) {
      toast.error("Failed to record purchase");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/purchase"
            className="p-1.5 hover:bg-muted border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Create Purchase
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Create a new goods purchase invoice entry
            </p>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md flex items-center gap-3 text-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Purchase Invoice recorded successfully! Redirecting...</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Metadata Box */}
        <div className="border border-border bg-card p-5 rounded-md">
          <div className="border-b border-border pb-3 mb-4 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Invoice Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Supplier Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Supplier
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                >
                  <option value="">Cash Supplier</option>
                  {parties.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoice Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Supplier Invoice Number
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  placeholder="e.g. SUP-2026-1001"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Purchase Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Purchase Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  required
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Items list */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Purchase Items list
            </h3>
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
                  <th className="px-4 py-2 font-medium w-[12%] text-center">
                    Quantity
                  </th>
                  <th className="px-4 py-2 font-medium w-[15%]">
                    Unit Price ($)
                  </th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">
                    Discount (%)
                  </th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">
                    VAT (%)
                  </th>
                  <th className="px-4 py-2 font-medium w-[15%] text-right">
                    Total
                  </th>
                  <th className="px-4 py-2 font-medium w-[8%] text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    {/* Product Selection */}
                    <td className="px-3 py-2">
                      <select
                        required
                        value={item.productId}
                        onChange={(e) =>
                          handleProductChange(item.id, e.target.value)
                        }
                        className="w-full h-8 px-2 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="">Select Product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Stock: {p.stock})
                          </option>
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
                        onChange={(e) =>
                          handleCellChange(
                            item.id,
                            "quantity",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full h-8 px-2 text-center rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </td>

                    {/* Unit Price */}
                    <td className="px-3 py-2">
                      <div className="relative">
                        <DollarSign className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={item.unitPrice || ""}
                          onChange={(e) =>
                            handleCellChange(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0,
                            )
                          }
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
                          onChange={(e) =>
                            handleCellChange(
                              item.id,
                              "discount",
                              parseFloat(e.target.value) || 0,
                            )
                          }
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
                          onChange={(e) =>
                            handleCellChange(
                              item.id,
                              "vat",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full h-8 px-2 pr-5 text-center rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                        <Percent className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-2 font-semibold text-foreground text-right">
                      ${(item.totalPrice || 0).toFixed(2)}
                    </td>

                    {/* Delete Row Action */}
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(item.id)}
                        disabled={items.length === 1}
                        className={cn(
                          "p-1 hover:text-rose-500 hover:bg-rose-500/5 rounded transition-colors text-muted-foreground",
                          items.length === 1 &&
                            "opacity-40 cursor-not-allowed hover:bg-transparent",
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

        {/* Calculations & Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Details Card (Left Col) */}
          <div className="border border-border bg-card p-5 rounded-md flex flex-col gap-4">
            <div className="border-b border-border pb-3 mb-1">
              <h3 className="text-sm font-semibold text-foreground tracking-tight">
                Payment Settlement
              </h3>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Payment Mode
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as TransactionMode)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                >
                  <option value="CASH">Cash</option>
                  <option value="CREDIT">Credit / Unpaid</option>
                  <option value="BANK">Bank / Mobile</option>
                </select>
              </div>
            </div>

            {/* Paid Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Paid Amount ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={paidAmount || ""}
                  onChange={(e) =>
                    setPaidAmount(parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Due Amount (Read-only) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Due Amount ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  readOnly
                  value={dueAmount.toFixed(2)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/10 text-sm font-semibold text-amber-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Purchase Note
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional notes or references"
                  className="w-full h-20 pt-2.5 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Calculations Summary Panel (Right Col) */}
          <div className="border border-border bg-card p-5 rounded-md flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ${summary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Discount</span>
                <span className="font-semibold text-rose-500">
                  -${summary.totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT / Tax</span>
                <span className="font-semibold text-foreground">
                  +${summary.totalVat.toFixed(2)}
                </span>
              </div>

              {/* Transport Cost */}
              <div className="flex justify-between text-sm items-center gap-3">
                <span className="text-muted-foreground flex items-center gap-1 shrink-0">
                  <Truck className="w-3.5 h-3.5 text-muted-foreground" />
                  Transport Cost
                </span>
                <div className="relative max-w-[120px] w-full">
                  <DollarSign className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={transportCost || ""}
                    onChange={(e) =>
                      setTransportCost(parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                    className="w-full h-8 pl-5 pr-2 rounded-md border border-border bg-background text-xs text-right focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-3 pt-3">
              <div className="flex justify-between text-base font-bold mb-4">
                <span className="text-foreground">Grand Total</span>
                <span className="text-primary">
                  ${summary.grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-4 h-4" />
                <span>
                  {isSubmitting ? "Submitting..." : "Submit Purchase Invoice"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
