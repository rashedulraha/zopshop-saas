"use client";

import { Building2, Search, Filter, MoreVertical, Store, Plus } from "lucide-react";

export default function SuperadminStoresPage() {
  const stores = [
    { id: "S101", name: "Tech Haven", type: "ELECTRONICS", owner: "John Doe", status: "Active", revenue: "$14k", date: "2026-07-20" },
    { id: "S102", name: "Fresh Groceries", type: "GROCERY", owner: "Sarah Smith", status: "Active", revenue: "$8k", date: "2026-07-18" },
    { id: "S103", name: "Fashion Boutique", type: "CLOTHING", owner: "Emma Wilson", status: "Suspended", revenue: "$0k", date: "2026-07-15" },
    { id: "S104", name: "Build It Hardware", type: "HARDWARE", owner: "Mike Johnson", status: "Active", revenue: "$24k", date: "2026-07-10" },
    { id: "S105", name: "Daily Needs Supermarket", type: "SUPERMARKET", owner: "David Lee", status: "Pending", revenue: "$0k", date: "2026-07-21" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-rose-600" /> All Stores
          </h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all tenant stores on the platform.</p>
        </div>
        <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add New Store
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search stores..." 
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-sm font-medium rounded-md transition-colors text-foreground">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Store Info</th>
                <th className="px-6 py-4 font-semibold">Business Type</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Monthly Rev</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center border border-border shrink-0">
                        <Store className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{store.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {store.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs font-medium tracking-wider">{store.type}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{store.owner}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{store.revenue}</td>
                  <td className="px-6 py-4 text-muted-foreground">{store.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      store.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                      store.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <span>Showing 1 to 5 of 142 entries</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted bg-rose-500/10 text-rose-600 border-rose-200">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">2</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
