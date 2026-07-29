"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, Store, ShoppingCart } from "lucide-react";

export function HeroSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section
      id="home"
      className="relative bg-background pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-border transition-colors duration-300"
    >
      {/* Subtle tech dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* ===== LEFT COLUMN: Headline & CTA ===== */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12] mb-6">
              POS & Business management <br className="hidden sm:inline" />
              designed for 2026
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed mb-8 max-w-xl">
              AI-native business management with built-in billing, inventory,
              on-call, and status pages in one beautifully made product.
            </p>

            {/* Email form inline */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col sm:flex-row gap-2.5 mb-6"
            >
              <input
                type="email"
                placeholder="Your work e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-card border border-border text-foreground placeholder-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <span>Start for free</span>
              </button>
            </form>

            {/* Enterprise Link */}
            <p className="text-sm text-muted-foreground">
              Looking for an enterprise solution?{" "}
              <Link
                href="/contact"
                className="text-foreground underline hover:text-primary font-medium transition-colors"
              >
                Book a demo
              </Link>
            </p>
          </div>

          {/* ===== RIGHT COLUMN: Real Dashboard & Mobile POS Demo ===== */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* MAIN DESKTOP DASHBOARD MOCKUP */}
              <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xl relative z-10 transition-colors">
                {/* Window Topbar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span>admin.zopshop.com/store-overview</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-3.5">
                  {/* Status & Store Header Banner */}
                  <div className="bg-muted/50 dark:bg-[#181a28] border border-border rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Store className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground">
                        Dhaka Main Store · Terminal #01
                      </span>
                    </div>
                    <span className="text-[11px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded font-mono font-medium">
                      ● Active & Synced
                    </span>
                  </div>

                  {/* Real Dashboard KPI Cards Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-background dark:bg-[#0e1017] border border-border rounded-xl p-2.5">
                      <div className="text-[10px] text-muted-foreground font-medium mb-0.5">
                        Today's Revenue
                      </div>
                      <div className="text-sm font-bold text-foreground font-mono">
                        BDT 48,250
                      </div>
                      <div className="text-[10px] text-[#10b981] font-mono">
                        +14.2% today
                      </div>
                    </div>
                    <div className="bg-background dark:bg-[#0e1017] border border-border rounded-xl p-2.5">
                      <div className="text-[10px] text-muted-foreground font-medium mb-0.5">
                        Total Orders
                      </div>
                      <div className="text-sm font-bold text-foreground font-mono">
                        148 sales
                      </div>
                      <div className="text-[10px] text-primary font-mono">
                        Avg BDT 325
                      </div>
                    </div>
                    <div className="bg-background dark:bg-[#0e1017] border border-border rounded-xl p-2.5">
                      <div className="text-[10px] text-muted-foreground font-medium mb-0.5">
                        Inventory Status
                      </div>
                      <div className="text-sm font-bold text-foreground font-mono">
                        1,840 items
                      </div>
                      <div className="text-[10px] text-[#f59e0b] font-mono">
                        2 Low Stock
                      </div>
                    </div>
                  </div>

                  {/* Live POS Sales Log Table */}
                  <div className="bg-background dark:bg-[#0e1017] border border-border rounded-xl p-3 font-mono text-xs text-muted-foreground space-y-2">
                    <div className="flex justify-between text-muted-foreground border-b border-border pb-1 font-semibold text-[11px]">
                      <span>Order ID</span>
                      <span>Item Qty</span>
                      <span>Total / Status</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-foreground font-medium">
                        INV-9042 · Retail
                      </span>
                      <span className="text-muted-foreground">2 items</span>
                      <span className="text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded font-semibold">
                        BDT 2,400 Paid
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-foreground font-medium">
                        INV-9041 · Wholesale
                      </span>
                      <span className="text-muted-foreground">5 items</span>
                      <span className="text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded font-semibold">
                        BDT 7,850 Paid
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-foreground font-medium">
                        INV-9040 · Online
                      </span>
                      <span className="text-muted-foreground">1 item</span>
                      <span className="text-[#f59e0b] bg-[#f59e0b]/10 px-1.5 py-0.5 rounded font-semibold">
                        BDT 1,200 Syncing
                      </span>
                    </div>
                  </div>

                  {/* Store POS Terminal Sync Log */}
                  <div className="bg-muted/40 dark:bg-[#090a0e] border border-border rounded-xl p-2.5 font-mono text-[11px] text-muted-foreground space-y-1">
                    <div className="text-[#10b981]">
                      $ zopshop pos --store-id dhaka-main
                    </div>
                    <div className="text-foreground">
                      ✔ Barcode scanner & receipt printer active
                    </div>
                    <div className="text-muted-foreground">
                      ✔ 148 transactions synced with cloud database
                    </div>
                  </div>
                </div>
              </div>

              {/* OVERLAPPING MOBILE POS APP MOCKUP */}
              <div className="absolute -bottom-10 -left-4 sm:-left-8 w-64 sm:w-72 bg-card border border-border rounded-2xl p-3 shadow-2xl z-20 hidden sm:block transition-colors">
                {/* Mobile Topbar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-bold text-foreground">
                      ZopShop Mobile POS
                    </span>
                  </div>
                  <span className="text-[9px] text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-full font-mono font-medium">
                    ● Live Scanner
                  </span>
                </div>

                {/* Mobile POS Checkout Content */}
                <div className="bg-muted/30 dark:bg-[#13151f] rounded-xl p-2.5 space-y-2 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3 text-primary" />
                      Quick Checkout
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Cart (2)
                    </span>
                  </div>

                  <div className="bg-background dark:bg-[#090a0e] p-2 rounded-lg text-[10px] space-y-1 border border-border">
                    <div className="flex justify-between text-foreground font-medium">
                      <span>Wireless Mouse x1</span>
                      <span className="font-mono">BDT 1,200</span>
                    </div>
                    <div className="flex justify-between text-foreground font-medium">
                      <span>USB-C Adapter x1</span>
                      <span className="font-mono">BDT 650</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 dark:bg-[#181a28] p-2 rounded-lg text-[11px] flex justify-between items-center border border-border">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="text-foreground font-bold font-mono">
                      BDT 1,850
                    </span>
                  </div>

                  <div className="bg-primary text-primary-foreground text-[11px] font-semibold py-1.5 px-3 rounded-lg text-center shadow-sm">
                    Complete Sale & Print Receipt
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TRUSTED BY BRAND LOGOS BANNER ===== */}
        <div className="pt-12 border-t border-border">
          <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-8">
            Relied on by the world's best engineering teams
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              AMETEK
            </span>
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              redis
            </span>
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              Octopus Deploy
            </span>
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              accenture
            </span>
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              Raspberry Pi
            </span>
            <span className="text-sm font-extrabold tracking-widest text-muted-foreground uppercase font-mono">
              brave
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
