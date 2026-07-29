"use client";

import { useState } from "react";
import { MessageSquare, X, PhoneCall, Send } from "lucide-react";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "+8801700000000"; // Store owner support WhatsApp number
    const text = encodeURIComponent(
      `Hello ZopShop Support! I need help regarding: ${message || "General Inquiry"}`,
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          title="Contact Customer Support"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap pr-1">
            Need Help? Chat with us
          </span>
        </button>
      )}

      {/* Support Popover Card */}
      {isOpen && (
        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xl max-w-xs w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-foreground">
                ZopShop Customer Support
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground rounded p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Have questions about store setup, POS hardware, or subscription plans? Our team is online!
          </p>

          <form onSubmit={handleWhatsAppSend} className="space-y-3">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </button>
          </form>

          <div className="border-t border-border pt-3 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-primary" /> +880 1700-000000
            </span>
            <span>24/7 Priority Support</span>
          </div>
        </div>
      )}
    </div>
  );
}
