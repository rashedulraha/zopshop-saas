"use client";

import { cn } from "@/lib/utils";

// 1. Generic Table Wrapper
function TableWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card rounded-md flex flex-col">
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
      </div>
      <div className="overflow-x-auto max-h-[280px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left relative">
          {children}
        </table>
      </div>
    </div>
  );
}

// 2. Recent Sales Table
export function RecentSalesTable({ data }: { data: any[] }) {
  return (
    <TableWrapper title="Recent Sales">
      <thead className="text-xs text-muted-foreground uppercase sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
        <tr>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Invoice No</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Customer</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Amount</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Payment Status</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{row.invoice}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">{row.customer}</td>
            <td className="px-4 py-1.5 font-medium whitespace-nowrap">{row.amount}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", 
                row.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>{row.status}</span>
            </td>
            <td className="px-4 py-1.5 text-right text-muted-foreground whitespace-nowrap">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

// 3. Recent Purchases Table
export function RecentPurchasesTable({ data }: { data: any[] }) {
  return (
    <TableWrapper title="Recent Purchases">
      <thead className="text-xs text-muted-foreground uppercase sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
        <tr>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Supplier</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Invoice</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Amount</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Status</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{row.supplier}</td>
            <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{row.invoice}</td>
            <td className="px-4 py-1.5 font-medium whitespace-nowrap">{row.amount}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", 
                row.status === "Received" ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-500"
              )}>{row.status}</span>
            </td>
            <td className="px-4 py-1.5 text-right text-muted-foreground whitespace-nowrap">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

// 4. Recent Expenses Table
export function RecentExpensesTable({ data }: { data: any[] }) {
  return (
    <TableWrapper title="Recent Expenses">
      <thead className="text-xs text-muted-foreground uppercase sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
        <tr>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Category</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Amount</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Description</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{row.category}</td>
            <td className="px-4 py-1.5 font-medium text-rose-500 whitespace-nowrap">{row.amount}</td>
            <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">{row.description}</td>
            <td className="px-4 py-1.5 text-right text-muted-foreground whitespace-nowrap">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

// 5. Low Stock Products Table
export function LowStockTable({ data }: { data: any[] }) {
  return (
    <TableWrapper title="Low Stock Products">
      <thead className="text-xs text-muted-foreground uppercase sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
        <tr>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Product</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Brand</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Remaining Stock</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Alert Level</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{row.product}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">{row.brand}</td>
            <td className="px-4 py-1.5 font-medium text-rose-500 whitespace-nowrap">{row.stock}</td>
            <td className="px-4 py-1.5 text-right whitespace-nowrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500">
                {row.alert}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

// 6. Pending Deliveries Table
export function PendingDeliveriesTable({ data }: { data: any[] }) {
  return (
    <TableWrapper title="Pending Deliveries">
      <thead className="text-xs text-muted-foreground uppercase sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
        <tr>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Invoice</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Customer</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap">Driver</th>
          <th className="px-4 py-1.5 font-medium whitespace-nowrap text-right">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap">{row.invoice}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">{row.customer}</td>
            <td className="px-4 py-1.5 whitespace-nowrap">{row.driver}</td>
            <td className="px-4 py-1.5 text-right whitespace-nowrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
