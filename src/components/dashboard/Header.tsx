"use client";

import { Bell, Search, Menu, Plus } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const toggleSidebar = useSidebar((state) => state.toggle);
  const pathname = usePathname();

  // Simple breadcrumb logic
  const paths = pathname.split("/").filter(Boolean);
  const isDashboardRoot = paths.length === 1 && paths[0] === "dashboard";

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

      <div className="flex items-center gap-3 shrink-0 ml-4">
        <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>
        <button className="w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-border transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border shrink-0 hover:ring-2 hover:ring-primary/20 transition-all">
          <span className="text-xs font-medium text-muted-foreground">AD</span>
        </button>
      </div>
    </header>
  );
}
