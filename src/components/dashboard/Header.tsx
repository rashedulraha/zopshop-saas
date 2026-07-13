"use client";

import { 
  Bell, Search, Menu, Plus, AlertTriangle, ShoppingBag, 
  ShoppingCart, DollarSign, UserMinus, Truck, Clock 
} from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const toggleSidebar = useSidebar((state) => state.toggle);
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  // Simple breadcrumb logic
  const paths = pathname.split("/").filter(Boolean);
  const isDashboardRoot = paths.length === 1 && paths[0] === "dashboard";

  const notifications = [
    {
      id: 1,
      type: "Low Stock",
      message: "iPhone 15 Case has reached critical stock level (5 remaining).",
      icon: AlertTriangle,
      color: "text-rose-500 bg-rose-500/10",
      time: "5m ago"
    },
    {
      id: 2,
      type: "New Purchase",
      message: "Purchase order PO-501 has been received from TechCorp Inc.",
      icon: ShoppingBag,
      color: "text-blue-500 bg-blue-500/10",
      time: "15m ago"
    },
    {
      id: 3,
      type: "New Sale",
      message: "Sales Invoice INV-1001 recorded for Olivia Martin ($299.00).",
      icon: ShoppingCart,
      color: "text-primary bg-primary/10",
      time: "32m ago"
    },
    {
      id: 4,
      type: "Payment Received",
      message: "Payment of $1,200 received via bKash from Olivia Martin.",
      icon: DollarSign,
      color: "text-emerald-500 bg-emerald-500/10",
      time: "1h ago"
    },
    {
      id: 5,
      type: "Customer Due",
      message: "Customer Jackson Lee has pending dues of $99.00.",
      icon: UserMinus,
      color: "text-amber-500 bg-amber-500/10",
      time: "3h ago"
    },
    {
      id: 6,
      type: "Supplier Payment",
      message: "Supplier Payable of $5,400 is due for TechCorp Inc.",
      icon: Truck,
      color: "text-indigo-500 bg-indigo-500/10",
      time: "5h ago"
    },
    {
      id: 7,
      type: "Pending Delivery",
      message: "Delivery Invoice INV-1002 is ready for dispatch.",
      icon: Clock,
      color: "text-teal-500 bg-teal-500/10",
      time: "1d ago"
    }
  ];

  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-background sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted/50 text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          {!isDashboardRoot && paths.length > 1 && (
            <>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground font-medium capitalize">
                {paths[paths.length - 1]}
              </span>
            </>
          )}
        </div>

        <div className="relative max-w-md w-full ml-auto sm:ml-4 flex-1 sm:flex-initial hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-4 relative">
        <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className={cn(
            "w-9 h-9 rounded-md flex items-center justify-center border border-transparent transition-colors relative",
            showNotifications 
              ? "bg-muted text-foreground border-border" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border"
          )}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        {showNotifications && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden divide-y divide-border/50 max-h-[420px] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 bg-muted/20 flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">Notifications</span>
                <span className="text-[11px] text-primary font-medium hover:underline cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-border/50">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div key={notif.id} className="p-4 flex gap-3 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", notif.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs text-foreground uppercase tracking-wider">{notif.type}</span>
                          <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{notif.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border shrink-0 hover:ring-2 hover:ring-primary/20 transition-all">
          <span className="text-xs font-medium text-muted-foreground">AD</span>
        </button>
      </div>
    </header>
  );
}
