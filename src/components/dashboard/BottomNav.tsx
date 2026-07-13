"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import {
  LayoutDashboard,
  Tags,
  Package,
  Wallet,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Sales",
    icon: Tags,
    href: "/dashboard/sales",
  },
  {
    name: "Inventory",
    icon: Package,
    href: "/dashboard/inventory/products",
  },
  {
    name: "Finance",
    icon: Wallet,
    href: "/dashboard/finance/cash-book",
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { toggle } = useSidebar();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "w-10 h-6 flex items-center justify-center rounded-full transition-all duration-200",
                  isActive ? "bg-primary/10" : "",
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* More button — opens sidebar */}
        <button
          onClick={toggle}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="w-10 h-6 flex items-center justify-center rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span>More</span>
        </button>
      </div>

      {/* safe area spacer for iOS */}
      <div className="h-safe-bottom bg-background/95" />
    </nav>
  );
}
