"use client";

import { useEffect, useState } from "react";
import { Users, Search, Filter, ShieldAlert, CheckCircle2, Ban, UserX } from "lucide-react";
import { useAdminStore } from "@/store/admin.store";

export default function SuperadminUsersPage() {
  const { users, isLoading, fetchUsers, updateUserStatus, updateUserSubscription } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((u) => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> All Users
          </h1>
          <p className="text-muted-foreground mt-1">Manage global user accounts across the entire platform.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-sm font-medium rounded-md transition-colors text-foreground">
              <Filter className="w-4 h-4" /> Filter Role
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-semibold">User Info</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Store Associated</th>
                  <th className="px-6 py-4 font-semibold">Subscription</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">No users found.</td>
                  </tr>
                ) : filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-xs">{(user.name || "U").substring(0,2).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded border text-[10px] font-bold tracking-wider ${
                        user.isSuperAdmin ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30' : 
                        'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30'
                      }`}>
                        {user.isSuperAdmin ? "SUPERADMIN" : "OWNER"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.store?.name || "-"}</td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-semibold">{user.subscriptionPlan}</span>
                       <br />
                       <span className={`text-[10px] ${user.subscriptionStatus === 'CANCELLED' ? 'text-red-500' : 'text-emerald-500'}`}>
                         {user.subscriptionStatus}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        user.status === 'SUSPENDED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.status !== 'ACTIVE' ? (
                          <button 
                            onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                            title="Activate User"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => updateUserStatus(user.id, 'SUSPENDED')}
                            title="Suspend User"
                            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md transition-colors"
                          >
                            <ShieldAlert className="w-4 h-4" />
                          </button>
                        )}
                        
                        {user.status !== 'BANNED' && (
                          <button 
                            onClick={() => updateUserStatus(user.id, 'BANNED')}
                            title="Ban User"
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}

                        {user.subscriptionStatus === 'ACTIVE' && (
                           <button 
                             onClick={() => updateUserSubscription(user.id, user.subscriptionPlan, 'CANCELLED')}
                             title="Cancel Subscription"
                             className="p-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                           >
                             <UserX className="w-4 h-4" />
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
