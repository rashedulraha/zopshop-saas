"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  DollarSign,
  CheckCircle,
  Tag,
  Layers,
  X,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThermalReceiptModal } from "@/components/pos/ThermalReceiptModal";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Cement Bag (Lafarge)",
    code: "CEM-001",
    price: 520,
    stock: 120,
    category: "Construction",
  },
  {
    id: "prod-2",
    name: "Steel Rod 12mm (AKS)",
    code: "STL-012",
    price: 920,
    stock: 85,
    category: "Steel",
  },
  {
    id: "prod-3",
    name: "Paint Can White 5L",
    code: "PNT-005",
    price: 1850,
    stock: 30,
    category: "Paints",
  },
  {
    id: "prod-4",
    name: "PVC Pipe 4 inch",
    code: "PIP-004",
    price: 420,
    stock: 200,
    category: "Plumbing",
  },
  {
    id: "prod-5",
    name: "Bricks (Grade A)",
    code: "BRK-001",
    price: 12,
    stock: 5000,
    category: "Construction",
  },
];

import { useProductStore } from "@/store/product.store";
import { useEffect } from "react";

export default function POSBillingPage() {
  const { products: storeProducts, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const products: Product[] =
    storeProducts.length > 0
      ? storeProducts.map((p: any) => ({
          id: p.id || p._id,
          name: p.name,
          code: p.sku || "",
          price: p.price,
          stock: p.stock || p.stockQuantity || 0,
          category: p.category?.name || "Uncategorized",
        }))
      : mockProducts;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discount, setDiscount] = useState("0");
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Customer");

  // Pay Modal & Thermal Receipt State
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [completedInvoice, setCompletedInvoice] = useState<any>(null);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Cannot add more! Stock limit reached.");
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
      return;
    }
    const target = cart.find((item) => item.id === id);
    if (target && qty > target.stock) {
      alert("Cannot exceed stock limits!");
      return;
    }
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Cart pricing totals
  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discVal = parseFloat(discount) || 0;
    const vatVal = subtotal * 0.15; // 15% VAT
    const netTotal = Math.max(0, subtotal - discVal + vatVal);

    return { subtotal, discVal, vatVal, netTotal };
  }, [cart, discount]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const received = parseFloat(receivedAmount) || 0;
    if (received < totals.netTotal) {
      alert(
        `Paid amount cannot be less than Net Payable: BDT ${totals.netTotal.toFixed(2)}`,
      );
      return;
    }

    const change = received - totals.netTotal;
    const invoice = {
      invoiceNo: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: selectedCustomer,
      items: cart.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: totals.subtotal,
      discount: totals.discVal,
      vat: totals.vatVal,
      total: totals.netTotal,
      paidAmount: received,
      changeAmount: change,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    setCompletedInvoice(invoice);
    setIsPayOpen(false);
    setIsReceiptOpen(true);
    showNotification(
      `Invoice successfully generated! Change return: BDT ${change.toFixed(2)}`,
    );
    setCart([]);
    setDiscount("0");
    setReceivedAmount("");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            POS Terminal
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Real-time checkout terminal, billing sheets, and retail checkout
            payments
          </p>
        </div>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* POS Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product Selection Grid */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name or barcode SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto custom-scrollbar pr-1">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stock <= 0}
                className={cn(
                  "flex flex-col items-start text-left p-4 bg-card border border-border rounded-md hover:border-primary/50 transition-all shadow-sm group",
                  p.stock <= 0 &&
                    "opacity-50 cursor-not-allowed hover:border-border",
                )}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs uppercase mb-3 shrink-0">
                  {p.name.charAt(0)}
                </div>
                <span className="font-semibold text-foreground text-xs leading-tight line-clamp-2 min-h-[32px]">
                  {p.name}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {p.code}
                </span>

                <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs font-bold text-foreground font-mono">
                    ${p.price}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                      p.stock <= 5
                        ? "bg-rose-500/10 text-rose-600"
                        : "bg-emerald-500/10 text-emerald-600",
                    )}
                  >
                    {p.stock} units
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Cart Statement Panel */}
        <div className="lg:col-span-5 border border-border bg-card rounded-md flex flex-col p-5 shadow-sm gap-5">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span>Checkout Cart</span>
            </h2>
            <span className="text-xs text-muted-foreground font-semibold font-mono">
              {cart.length} items
            </span>
          </div>

          {/* Customer select & parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">
                Customer profile
              </span>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="h-8 px-2 rounded-md border border-border bg-background text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Walk-in Customer">Walk-in Customer</option>
                <option value="Olivia Martin">Olivia Martin</option>
                <option value="Jackson Lee">Jackson Lee</option>
                <option value="Isabella Nguyen">Isabella Nguyen</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">
                Discount Value ($)
              </span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                className="h-8 px-3 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Cart list table items */}
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto custom-scrollbar border border-border/50 rounded-md p-2 bg-muted/10">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-card border border-border p-2 rounded-md gap-3 shadow-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                    ${item.price} • Stock: {item.stock}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="p-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-foreground font-mono w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="p-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <span className="text-xs text-muted-foreground text-center py-8">
                Select products to begin checkout billing
              </span>
            )}
          </div>

          {/* Payment summary parameters */}
          <div className="border-t border-border pt-4 flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-rose-500">
              <span>Discount</span>
              <span>-${totals.discVal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>VAT / TAX (15%)</span>
              <span>+${totals.vatVal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
              <span>Net Payable</span>
              <span>${totals.netTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (cart.length === 0) return;
              setReceivedAmount(totals.netTotal.toFixed(2));
              setIsPayOpen(true);
            }}
            disabled={cart.length === 0}
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CreditCard className="w-4 h-4" />
            <span>Process Payment</span>
          </button>
        </div>
      </div>

      {/* Pay Modal Dialog */}
      {isPayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsPayOpen(false)}
          />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">
                Receive Retail Cash
              </h3>
              <button
                onClick={() => setIsPayOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Net Amount Billed
                </span>
                <span className="text-base font-bold text-foreground font-mono bg-muted/50 border border-border p-2.5 rounded-md">
                  ${totals.netTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">
                  Paid Cash Received ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    min={totals.netTotal}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">
                  Payment Gateway
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                >
                  <option value="Cash">Cash Handout</option>
                  <option value="Card">Visa/Mastercard Terminal</option>
                  <option value="Bkash">Bkash mobile pay</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setIsPayOpen(false)}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold"
                >
                  Checkout POS Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Thermal Receipt Modal */}
      <ThermalReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        invoiceData={completedInvoice}
      />
    </div>
  );
}
