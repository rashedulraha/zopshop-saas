"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  ShieldAlert,
  ChevronDown,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
} from "lucide-react";

export function SuperadminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isOpen, close, isCollapsed, toggleCollapse } = useSidebar();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sidebarGroups = [
    {
      label: "Main",
      items: [
        { name: "Overview", icon: LayoutDashboard, href: "/superadmin" },
      ],
    },
    {
      label: "Management",
      items: [
        { name: "All Stores", icon: Building2, href: "/superadmin/stores" },
        { name: "All Users", icon: Users, href: "/superadmin/users" },
      ],
    },
    {
      label: "System",
      items: [
        { name: "Platform Settings", icon: Settings, href: "/superadmin/settings" },
        { name: "Security", icon: ShieldAlert, href: "/superadmin/security" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-background transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 md:h-screen md:sticky md:top-0 custom-scrollbar",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-[72px]" : "w-64",
          className,
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "h-14 flex items-center border-b border-border shrink-0 transition-all duration-300",
            isCollapsed ? "justify-center px-0" : "justify-between px-6",
          )}
        >
          <Link
            href="/superadmin"
            className={cn(
              "flex items-center gap-2",
              isCollapsed && "hidden md:flex",
            )}
            onClick={close}
          >
            <div className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">SA</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-foreground tracking-tight whitespace-nowrap">
                ZopShop Admin
              </span>
            )}
          </Link>

          <button onClick={close} className="md:hidden p-1 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 overflow-x-hidden">
          {sidebarGroups.map((group, groupIdx) => (
            <div key={group.label} className={cn("flex flex-col", groupIdx > 0 && "mt-4")}>
              {!isCollapsed && (
                <div className="px-3 mb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {group.label}
                  </span>
                </div>
              )}
              {isCollapsed && groupIdx > 0 && (
                <div className="border-t border-border/40 my-2 mx-2" />
              )}
              <div className="flex flex-col space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href || "#"}
                      onClick={close}
                      className={cn(
                        "flex items-center rounded-md text-sm font-medium transition-colors",
                        isCollapsed ? "justify-center py-2.5 px-0" : "gap-3 px-3 py-2",
                        isActive
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Area */}
        <div className="p-3 border-t border-border shrink-0 flex items-center justify-center">
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4.5 h-4.5" />
            ) : (
              <PanelLeftClose className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
