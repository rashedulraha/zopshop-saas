"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { 
  LayoutDashboard, Package, Boxes, ShoppingCart, Tags,
  Users, Truck, Send, Wallet, FileText, Briefcase, Shield,
  Settings, ChevronDown, X, PanelLeftClose, PanelLeftOpen,
  ChevronsUp, PlusCircle
} from "lucide-react";

export interface SubMenuItem {
  name: string;
  href: string;
}

export interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href?: string;
  subItems?: SubMenuItem[];
}

const defaultItems: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    subItems: [
      { name: "Overview", href: "/dashboard" },
      { name: "Analytics", href: "/dashboard/analytics" },
    ]
  },
  {
    name: "Inventory",
    icon: Package,
    subItems: [
      { name: "Products", href: "/dashboard/inventory/products" },
      { name: "Categories", href: "/dashboard/inventory/categories" },
      { name: "Brands", href: "/dashboard/inventory/brands" },
    ]
  },
  {
    name: "Stock",
    icon: Boxes,
    subItems: [
      { name: "Low Stock Alert", href: "/dashboard/stock/alerts" },
      { name: "Stock Adjustment", href: "/dashboard/stock/adjustments" },
    ]
  },
  {
    name: "Purchase",
    icon: ShoppingCart,
    subItems: [
      { name: "Purchase List", href: "/dashboard/purchase" },
      { name: "Create Purchase", href: "/dashboard/purchase/create" },
      { name: "Purchase Returns", href: "/dashboard/purchase/returns" },
    ]
  },
  {
    name: "Sales",
    icon: Tags,
    subItems: [
      { name: "Sales List", href: "/dashboard/sales" },
      { name: "New Sale", href: "/dashboard/sales/new" },
      { name: "Sales Return", href: "/dashboard/sales/returns" },
      { name: "POS Billing", href: "/dashboard/pos" },
    ]
  },
  {
    name: "Customers",
    icon: Users,
    subItems: [
      { name: "Customer List", href: "/dashboard/customers" },
      { name: "Customer Ledger", href: "/dashboard/customers/ledger" },
      { name: "Customer Due", href: "/dashboard/customers/due" },
    ]
  },
  {
    name: "Suppliers",
    icon: Truck,
    subItems: [
      { name: "Supplier List", href: "/dashboard/suppliers" },
      { name: "Supplier Ledger", href: "/dashboard/suppliers/ledger" },
      { name: "Supplier Due", href: "/dashboard/suppliers/due" },
    ]
  },
  {
    name: "Delivery",
    icon: Send,
    subItems: [
      { name: "Pending Deliveries", href: "/dashboard/delivery/pending" },
      { name: "Completed Deliveries", href: "/dashboard/delivery/completed" },
      { name: "Delivery Vehicles", href: "/dashboard/delivery/vehicles" },
    ]
  },
  {
    name: "Finance",
    icon: Wallet,
    subItems: [
      { name: "Cash Book", href: "/dashboard/finance/cash-book" },
      { name: "Bank Accounts", href: "/dashboard/finance/bank" },
      { name: "Income", href: "/dashboard/finance/income" },
      { name: "Expenses", href: "/dashboard/finance/expenses" },
      { name: "Profit & Loss", href: "/dashboard/finance/pl" },
    ]
  },
  {
    name: "Reports",
    icon: FileText,
    subItems: [
      { name: "Sales Report", href: "/dashboard/reports/sales" },
      { name: "Purchase Report", href: "/dashboard/reports/purchase" },
      { name: "Inventory Report", href: "/dashboard/reports/inventory" },
      { name: "Profit Report", href: "/dashboard/reports/profit" },
      { name: "Due Report", href: "/dashboard/reports/due" },
      { name: "Daily Report", href: "/dashboard/reports/daily" },
      { name: "Monthly Report", href: "/dashboard/reports/monthly" },
      { name: "Yearly Report", href: "/dashboard/reports/yearly" },
    ]
  },
  {
    name: "Employees",
    icon: Briefcase,
    subItems: [
      { name: "Employee List", href: "/dashboard/employees" },
      { name: "Attendance", href: "/dashboard/employees/attendance" },
      { name: "Salary", href: "/dashboard/employees/salary" },
    ]
  },
  {
    name: "Users & Roles",
    icon: Shield,
    subItems: [
      { name: "Users", href: "/dashboard/users" },
      { name: "Roles", href: "/dashboard/roles" },
      { name: "Permissions", href: "/dashboard/permissions" },
    ]
  },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Appearance & Theme", href: "/dashboard/settings/theme" },
      { name: "Business Information", href: "/dashboard/settings/business" },
      { name: "Invoice Settings", href: "/dashboard/settings/invoice" },
      { name: "Tax & VAT", href: "/dashboard/settings/tax" },
      { name: "Backup", href: "/dashboard/settings/backup" },
      { name: "Security", href: "/dashboard/settings/security" },
      { name: "System Settings", href: "/dashboard/settings/system" },
    ]
  },
];

interface SidebarProps {
  items?: SidebarItem[];
  className?: string;
}

export function Sidebar({ items = defaultItems, className }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, close, isCollapsed, toggleCollapse } = useSidebar();
  
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newExpanded = { ...expanded };
    items.forEach(item => {
      if (item.subItems) {
        const isChildActive = item.subItems.some(sub => pathname === sub.href);
        if (isChildActive) {
          newExpanded[item.name] = true;
        }
      }
    });
    setExpanded(newExpanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleExpand = (name: string) => {
    if (isCollapsed) {
      toggleCollapse(); // Auto-expand sidebar if clicking a menu while collapsed
      setExpanded(prev => ({ ...prev, [name]: true }));
    } else {
      setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const SidebarContent = () => (
    <>
      <div className={cn(
        "h-14 flex items-center border-b border-border shrink-0 transition-all duration-300",
        isCollapsed ? "justify-center px-0" : "justify-between px-6"
      )}>
        <Link 
          href="/dashboard" 
          className={cn("flex items-center gap-2", isCollapsed && "hidden md:flex")}
          onClick={close}
        >
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-xs">Z</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-foreground tracking-tight whitespace-nowrap">ZopShop</span>
          )}
        </Link>

        {/* Mobile close button */}
        <button onClick={close} className="md:hidden p-1 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        {/* Desktop collapse toggle */}
        {!isCollapsed && (
          <button onClick={toggleCollapse} className="hidden md:flex p-1 text-muted-foreground hover:text-foreground">
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Internal Navbar / Shortcuts */}
      {!isCollapsed && (
        <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between shrink-0 bg-muted/10">
          <div className="flex items-center gap-1">
            <button title="New Sale" className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
              <Tags className="w-4 h-4" />
            </button>
            <button title="Add Product" className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={() => setExpanded({})}
            title="Collapse All Menus" 
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <ChevronsUp className="w-3.5 h-3.5" />
            <span>Collapse All</span>
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
        {items.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expanded[item.name] && !isCollapsed;
          const isSingleActive = !hasSubItems && pathname === item.href;
          const isChildActive = hasSubItems && item.subItems!.some(sub => pathname === sub.href);
          
          const isActiveVisual = isSingleActive || (isCollapsed && isChildActive);

          return (
            <div key={item.name} className="flex flex-col">
              {hasSubItems ? (
                <button
                  onClick={() => toggleExpand(item.name)}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center rounded-md text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground w-full",
                    isCollapsed ? "justify-center py-2.5 px-0" : "justify-between px-3 py-2",
                    isActiveVisual && isCollapsed && "bg-primary/10 text-primary"
                  )}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 shrink-0", isExpanded && "rotate-180")} />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={close}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center rounded-md text-sm font-medium transition-colors",
                    isCollapsed ? "justify-center py-2.5 px-0" : "gap-3 px-3 py-2",
                    isSingleActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </Link>
              )}

              {/* Sub items dropdown */}
              {hasSubItems && isExpanded && !isCollapsed && (
                <div className="flex flex-col mt-1 ml-9 space-y-1 border-l border-border/50 pl-2 overflow-hidden">
                  {item.subItems!.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={close}
                        className={cn(
                          "px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap",
                          isSubActive
                            ? "font-medium text-foreground bg-muted"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className={cn("p-4 border-t border-border shrink-0 flex flex-col gap-4 transition-all duration-300", isCollapsed && "items-center px-2")}>
        {isCollapsed && (
           <button onClick={toggleCollapse} className="hidden md:flex p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mx-auto">
             <PanelLeftOpen className="w-5 h-5" />
           </button>
        )}
        <div className={cn("flex items-center rounded-md hover:bg-muted transition-colors cursor-pointer", isCollapsed ? "justify-center p-0" : "gap-3 px-3 py-2")}>
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-muted-foreground">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-foreground truncate">Admin User</span>
              <span className="text-xs text-muted-foreground truncate">admin@zopshop.com</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

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
          className
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
