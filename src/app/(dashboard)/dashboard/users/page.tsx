"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Shield, CheckCircle, AlertTriangle, X, User, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Suspended";
  lastLogin: string;
}

const initialUsers: SystemUser[] = [];

export default function UsersPage() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Cashier");
  const [status, setStatus] = useState<"Active" | "Suspended">("Active");

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const suspended = users.filter((u) => u.status === "Suspended").length;
    return { total, active, suspended };
  }, [users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const newUser: SystemUser = {
      id: `USR-00${users.length + 1}`,
      name,
      email,
      role,
      status,
      lastLogin: "—"
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setName(""); setEmail(""); setRole("Cashier"); setStatus("Active");
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">System Users</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage staff accounts, system access levels, and login permissions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Total System Users</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Active Accounts</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Suspended Accounts</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">{stats.total} Users</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">{stats.active} Active</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-rose-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 items-center justify-center text-rose-500 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">{stats.suspended} Suspended</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-4 rounded-md border border-border bg-card text-xs focus:outline-none"
          />
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">User ID</th>
                <th className="px-4 py-2 font-semibold">Full Name</th>
                <th className="px-4 py-2 font-semibold">Email Address</th>
                <th className="px-4 py-2 font-semibold">Assigned Role</th>
                <th className="px-4 py-2 font-semibold">Last Login</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{u.id}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.lastLogin}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      u.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    )}>
                      <span className={cn("w-1 h-1 rounded-full", u.status === "Active" ? "bg-emerald-500" : "bg-rose-500")} />
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">Add System User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Karim Khan" className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. karim@zopshop.com" className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Assigned Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none">
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Delivery Staff">Delivery Staff</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Account Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none">
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
