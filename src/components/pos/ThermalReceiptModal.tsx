"use client";

import { useRef } from "react";
import { Printer, X, CheckCircle2 } from "lucide-react";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ThermalReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: {
    invoiceNo: string;
    customerName: string;
    items: ReceiptItem[];
    subtotal: number;
    discount: number;
    vat: number;
    total: number;
    paidAmount: number;
    changeAmount: number;
    paymentMethod: string;
    date: string;
  } | null;
}

export function ThermalReceiptModal({
  isOpen,
  onClose,
  invoiceData,
}: ThermalReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !invoiceData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-card border border-border rounded-xl max-w-sm w-full p-5 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4 print:hidden">
          <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Order Completed</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
          <div
            ref={receiptRef}
            id="printable-receipt"
            className="bg-white text-black p-4 font-mono text-xs rounded border border-gray-200 shadow-xs leading-relaxed space-y-3"
          >
            {/* Store Title Header */}
            <div className="text-center border-b border-dashed border-gray-300 pb-3">
              <h2 className="text-base font-extrabold tracking-wider uppercase">
                ZopShop Retail POS
              </h2>
              <p className="text-[10px] text-gray-600">Dhaka Outlet #104</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Date: {invoiceData.date}
              </p>
              <p className="text-[10px] font-bold text-gray-800">
                Invoice #: {invoiceData.invoiceNo}
              </p>
            </div>

            {/* Customer Info */}
            <div className="text-[11px] border-b border-dashed border-gray-300 pb-2">
              <span className="text-gray-500">Customer: </span>
              <span className="font-bold text-gray-900">
                {invoiceData.customerName}
              </span>
            </div>

            {/* Item List Table */}
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-gray-300 text-gray-600 uppercase text-[9px]">
                  <th className="py-1">Item</th>
                  <th className="py-1 text-center">Qty</th>
                  <th className="py-1 text-right">Price</th>
                  <th className="py-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoiceData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1 font-sans text-gray-900 truncate max-w-[100px]">
                      {item.name}
                    </td>
                    <td className="py-1 text-center font-bold">
                      {item.quantity}
                    </td>
                    <td className="py-1 text-right">BDT {item.price}</td>
                    <td className="py-1 text-right font-bold">
                      BDT {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pricing Summary */}
            <div className="border-t border-dashed border-gray-300 pt-2 space-y-1 text-[11px]">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>BDT {invoiceData.subtotal.toFixed(2)}</span>
              </div>
              {invoiceData.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span>- BDT {invoiceData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>VAT (15%):</span>
                <span>+ BDT {invoiceData.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-gray-400 pt-1">
                <span>NET TOTAL:</span>
                <span>BDT {invoiceData.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-dashed border-gray-300 pt-2 space-y-1 text-[10px] text-gray-600">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-bold text-gray-900">
                  {invoiceData.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Paid Amount:</span>
                <span className="font-bold text-gray-900">
                  BDT {invoiceData.paidAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Change Returned:</span>
                <span>BDT {invoiceData.changeAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-dashed border-gray-300 pt-3 text-[9px] text-gray-500 space-y-0.5">
              <p className="font-semibold text-gray-700">
                *** Thank You For Shopping! ***
              </p>
              <p>Powered by ZopShop SaaS Platform</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-border mt-3 print:hidden">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            Close Window
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Print Specific CSS to isolate the thermal receipt on physical printers */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt,
          #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 80mm !important;
            margin: 0 !important;
            padding: 10px !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}
