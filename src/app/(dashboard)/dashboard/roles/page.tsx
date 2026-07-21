"use client";

import { useState, useMemo } from "react";
import { Plus, Shield, Edit2, Trash2, X, CheckCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const initialRoles: Role[] = [];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  const allPermissions = ["Sales", "Purchase", "Inventory", "Finance", "Reports", "Users", "Settings", "POS", "Delivery", "Employees"];

  const openAdd = () => {
    setEditingRole(null);
    setName(""); setDescription(""); setSelectedPerms([]);
    setIsModalOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setName(role.name); setDescription(role.description); setSelectedPerms([...role.permissions]);
    setIsModalOpen(true);
  };

  const togglePerm = (perm: string) => {
    setSelectedPerms((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (editingRole) {
      setRoles(roles.map((r) => r.id === editingRole.id ? { ...r, name, description, permissions: selectedPerms } : r));
    } else {
      const newRole: Role = {
        id: `ROLE-${roles.length + 1}`,
        name, description,
        userCount: 0,
        permissions: selectedPerms
      };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Roles Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create and manage staff roles with granular permission sets</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Role</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[50%]">Total Roles Defined</th>
                <th className="px-5 py-3 font-semibold text-center w-[50%]">Total Staff Assigned</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">{roles.length} Roles</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">{roles.reduce((s, r) => s + r.userCount, 0)} Staff</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="border border-border bg-card rounded-md p-5 flex flex-col gap-4 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{role.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => openEdit(role)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(role.id)} className="p-1.5 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/50">
              {role.permissions.map((perm) => (
                <span key={perm} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-[10px] font-semibold text-primary">
                  <CheckCircle className="w-2.5 h-2.5" />
                  {perm}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-muted-foreground font-mono">
              {role.userCount} user{role.userCount !== 1 ? "s" : ""} assigned
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-base font-semibold text-foreground">{editingRole ? "Edit Role" : "Create New Role"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Role Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Inventory Manager" className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Role Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Manages warehouse stock" className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Module Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {allPermissions.map((perm) => (
                    <button
                      key={perm}
                      type="button"
                      onClick={() => togglePerm(perm)}
                      className={cn(
                        "px-2.5 py-1 rounded text-[10px] font-semibold border transition-colors",
                        selectedPerms.includes(perm)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/30 text-muted-foreground border-border hover:border-primary/50"
                      )}
                    >
                      {perm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-1.5 border border-border bg-card rounded-md text-sm hover:bg-muted/50">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-semibold">{editingRole ? "Save Changes" : "Create Role"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
