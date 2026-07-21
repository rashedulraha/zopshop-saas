"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Printer,
  Search,
  DollarSign,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/store/transaction.store";
import { useEffect } from "react";

interface ReportRow {
  invoice: string;
  date: string;
  customer: string;
  itemsCount: number;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  paymentMethod: string;
}

const mockReportData: ReportRow[] = [
  { invoice: "INV-2026-001", date: "2026-07-05", customer: "Rahim Islam", itemsCount: 3, subtotal: 5000, discount: 0, vat: 250, total: 5250, paymentMethod: "Cash" },
  { invoice: "INV-2026-002", date: "2026-07-06", customer: "Cash Customer", itemsCount: 1, subtotal: 1200, discount: 100, vat: 55, total: 1155, paymentMethod: "Card" },
  { invoice: "INV-2026-003", date: "2026-07-08", customer: "Karim Uddin", itemsCount: 5, subtotal: 12000, discount: 500, vat: 575, total: 12075, paymentMethod: "Mobile Banking" },
  { invoice: "INV-2026-004", date: "2026-07-12", customer: "Sadia Rahman", itemsCount: 2, subtotal: 8000, discount: 0, vat: 400, total: 8400, paymentMethod: "Cash" },
];

export default function SalesReportPage() {
  const [dateFilter, setDateFilter] = useState("This Month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const { transactions, fetchTransactions, isLoading } = useTransactionStore();

  useEffect(() => {
    fetchTransactions({ type: "sale", limit: 50 });
  }, [fetchTransactions]);

  const reportData: ReportRow[] = transactions.length > 0
    ? transactions.map((t) => ({
        invoice: t.invoiceNo || "N/A",
        date: new Date(t.createdAt || Date.now()).toLocaleDateString(),
        customer: t.party?.name || "Cash Customer",
        itemsCount: t.items?.length || 0,
        subtotal: t.amount,
        discount: t.discount || 0,
        vat: 0,
        total: t.amount,
        paymentMethod: t.mode || "Cash",
      }))
    : mockReportData;

  const triggerExport = (format: string) => {
    setIsExporting(format);
    setTimeout(() => {
      setIsExporting(null);
      // Trigger browser print or download alert
      if (format === "Print") {
        window.print();
      } else {
        alert(`Exporting Sales Report as ${format}...`);
      }
    }, 1000);
  };

  const filteredData = reportData.filter(
    (row) =>
      row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.invoice.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalSales = filteredData.reduce((acc, curr) => acc + curr.total, 0);
  const totalVAT = filteredData.reduce((acc, curr) => acc + curr.vat, 0);
  const totalOrders = filteredData.length;

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Sales Report
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Analyze sales conversions, VAT statements, and export tax summaries
          </p>
        </div>
      </div>

      {/* Control Panel: Filters & Exports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
        {/* Date Filter selector (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Date Scope
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-muted-foreground hover:text-foreground appearance-none"
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Year">This Year</option>
                <option value="Custom">Custom Date Range</option>
              </select>
            </div>
          </div>

          {dateFilter === "Custom" && (
            <>
              <div className="flex flex-col gap-1.5 animate-in slide-in-from-left duration-200">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1.5 animate-in slide-in-from-left duration-200">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-muted-foreground"
                />
              </div>
            </>
          )}
        </div>

        {/* Exports panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Export Reports
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => triggerExport("PDF")}
              disabled={isExporting !== null}
              className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => triggerExport("Excel")}
              disabled={isExporting !== null}
              className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => triggerExport("CSV")}
              disabled={isExporting !== null}
              className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => triggerExport("Print")}
              disabled={isExporting !== null}
              className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-border bg-card hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Diagnostics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Filtered Revenue
            </span>
            <span className="text-2xl font-bold text-foreground mt-1">
              ${totalSales.toFixed(2)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Total VAT Collected
            </span>
            <span className="text-2xl font-bold text-emerald-500 mt-1">
              ${totalVAT.toFixed(2)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Order Volume
            </span>
            <span className="text-2xl font-bold text-foreground mt-1">
              {totalOrders} Invoices
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sales list Search & Table */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoice or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Table layout */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">
                    Invoice
                  </th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center">
                    Items Count
                  </th>
                  <th className="px-4 py-2 font-medium">Subtotal</th>
                  <th className="px-4 py-2 font-medium">Discount</th>
                  <th className="px-4 py-2 font-medium">VAT</th>
                  <th className="px-4 py-2 font-medium">Grand Total</th>
                  <th className="px-4 py-2 font-medium text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredData.map((row) => (
                  <tr
                    key={row.invoice}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">
                      {row.invoice}
                    </td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">
                      {row.customer}
                    </td>
                    <td className="px-4 py-1.5 text-center whitespace-nowrap">
                      {row.itemsCount}
                    </td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                      ${row.subtotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 text-rose-500 whitespace-nowrap">
                      -${row.discount.toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                      +${row.vat.toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 font-bold text-foreground whitespace-nowrap">
                      ${row.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-1.5 text-right whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {row.paymentMethod}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No report logs matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
