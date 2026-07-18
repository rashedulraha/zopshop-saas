"use client";

import {
  Bell,
  Search,
  Menu,
  Plus,
  AlertTriangle,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  UserMinus,
  Truck,
  Clock,
  X,
  Settings,
  LogOut,
  User,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function Header() {
  const toggleSidebar = useSidebar((state) => state.toggle);
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when mobile search opens
  useEffect(() => {
    if (showMobileSearch && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [showMobileSearch]);

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
      time: "5m ago",
    },
    {
      id: 2,
      type: "New Purchase",
      message: "Purchase order PO-501 has been received from TechCorp Inc.",
      icon: ShoppingBag,
      color: "text-blue-500 bg-blue-500/10",
      time: "15m ago",
    },
    {
      id: 3,
      type: "New Sale",
      message: "Sales Invoice INV-1001 recorded for Olivia Martin ($299.00).",
      icon: ShoppingCart,
      color: "text-primary bg-primary/10",
      time: "32m ago",
    },
    {
      id: 4,
      type: "Payment Received",
      message: "Payment of $1,200 received via bKash from Olivia Martin.",
      icon: DollarSign,
      color: "text-emerald-500 bg-emerald-500/10",
      time: "1h ago",
    },
    {
      id: 5,
      type: "Customer Due",
      message: "Customer Jackson Lee has pending dues of $99.00.",
      icon: UserMinus,
      color: "text-amber-500 bg-amber-500/10",
      time: "3h ago",
    },
    {
      id: 6,
      type: "Supplier Payment",
      message: "Supplier Payable of $5,400 is due for TechCorp Inc.",
      icon: Truck,
      color: "text-indigo-500 bg-indigo-500/10",
      time: "5h ago",
    },
    {
      id: 7,
      type: "Pending Delivery",
      message: "Delivery Invoice INV-1002 is ready for dispatch.",
      icon: Clock,
      color: "text-teal-500 bg-teal-500/10",
      time: "1d ago",
    },
  ];

  // handle signout user
  const handleSignoutUser = async () => {
    await authClient.signOut();
    toast.success("Logout successfull");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Full-Screen Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm md:hidden flex flex-col">
          <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search products, orders, customers..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 px-4 py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
              Quick Links
            </p>
            <div className="flex flex-col gap-1">
              {[
                { label: "Products", href: "/dashboard/inventory/products" },
                { label: "Sales List", href: "/dashboard/sales" },
                { label: "POS Billing", href: "/dashboard/pos" },
                { label: "Customers", href: "/dashboard/customers" },
                { label: "Cash Book", href: "/dashboard/finance/cash-book" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMobileSearch(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-background sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile: hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted/50 text-foreground hover:bg-muted transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Breadcrumb — desktop */}
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

          {/* Desktop search */}
          <div className="relative max-w-md w-full ml-auto sm:ml-4 flex-1 sm:flex-initial hidden md:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3 relative">
          {/* Mobile Search Button */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* New button */}
          <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowAvatarMenu(false);
            }}
            className={cn(
              "w-9 h-9 rounded-md flex items-center justify-center border border-transparent transition-colors relative",
              showNotifications
                ? "bg-muted text-foreground border-border"
                : "text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border",
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden divide-y divide-border/50 max-h-[420px] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 bg-muted/20 flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Notifications
                  </span>
                  <span className="text-[11px] text-primary font-medium hover:underline cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-border/50">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        className="p-4 flex gap-3 hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            notif.color,
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-xs text-foreground uppercase tracking-wider">
                              {notif.type}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAvatarMenu(!showAvatarMenu);
                setShowNotifications(false);
              }}
              className={cn(
                "flex items-center gap-2 border border-border bg-card hover:bg-muted/40 rounded-md px-2.5 py-1 text-xs font-semibold text-foreground transition-all duration-200 outline-none select-none",
                showAvatarMenu && "border-primary/50",
              )}
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary ring-1 ring-primary/20 shrink-0">
                AD
              </div>
              <span className="hidden sm:inline font-medium text-foreground text-xs">
                Admin User
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0" />
            </button>

            {showAvatarMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAvatarMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-150">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          AD
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Admin User
                        </p>
                        <p className="text-xs text-muted-foreground">
                          admin@zopshop.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/dashboard/settings/business"
                      onClick={() => setShowAvatarMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings/system"
                      onClick={() => setShowAvatarMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Settings
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border py-1">
                    <button
                      onClick={handleSignoutUser}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
