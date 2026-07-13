"use client";

import { useState } from "react";
import { Settings, FileText, Hash, Calendar, Layers, CheckCircle } from "lucide-react";

export default function InvoiceSettingsPage() {
  const [prefix, setPrefix] = useState("INV-");
  const [startNumber, setStartNumber] = useState("1001");
  const [paymentTerms, setPaymentTerms] = useState("Due on Receipt");
  const [logoAlignment, setLogoAlignment] = useState("Left");
  const [footerNotes, setFooterNotes] = useState("Thank you for your business! For inquiries regarding this statement, please contact us at support@zopshop.com.");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Invoice configurations successfully updated!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Invoice Settings</h1>
        <p className="text-muted-foreground mt-2">Configure invoice prefixes, numbering, layout rules, and default terms sheets.</p>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      <div className="border border-border bg-card rounded-md p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Invoice Prefix */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice Prefix</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. INV-"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Starting Invoice Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Starting Number</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  required
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                  placeholder="e.g. 1001"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Default Payment Terms */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Payment Terms</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="Due on Receipt">Due on Receipt</option>
                  <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                  <option value="Net 15">Net 15 Days</option>
                  <option value="Net 30">Net 30 Days</option>
                </select>
              </div>
            </div>

            {/* Logo Alignment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logo Alignment</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={logoAlignment}
                  onChange={(e) => setLogoAlignment(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="Left">Left Aligned</option>
                  <option value="Center">Center Aligned</option>
                  <option value="Right">Right Aligned</option>
                </select>
              </div>
            </div>

            {/* Invoice Footer Notes */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Invoice Footer / Disclaimer</label>
              <div className="relative">
                <Settings className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <textarea
                  required
                  rows={3}
                  value={footerNotes}
                  onChange={(e) => setFooterNotes(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5 mt-6">
            <button
              type="submit"
              className="px-5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
