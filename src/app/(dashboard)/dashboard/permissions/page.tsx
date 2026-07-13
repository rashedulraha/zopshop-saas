"use client";

import { useState, useMemo } from "react";
import { Shield, CheckCircle, X, Save } from "lucide-react";
import { cn } from "@/lib/utils";

type PermissionKey =
  | "view_sales" | "create_sale" | "edit_sale" | "delete_sale"
  | "view_purchase" | "create_purchase" | "edit_purchase" | "delete_purchase"
  | "view_inventory" | "create_product" | "edit_product" | "delete_product"
  | "view_reports" | "export_reports"
  | "view_users" | "create_user" | "edit_user" | "delete_user"
  | "view_settings" | "edit_settings";

interface RolePermission {
  role: string;
  permissions: Record<PermissionKey, boolean>;
}

const MODULES: { label: string; perms: { key: PermissionKey; label: string }[] }[] = [
  {
    label: "Sales",
    perms: [
      { key: "view_sales", label: "View" },
      { key: "create_sale", label: "Create" },
      { key: "edit_sale", label: "Edit" },
      { key: "delete_sale", label: "Delete" }
    ]
  },
  {
    label: "Purchase",
    perms: [
      { key: "view_purchase", label: "View" },
      { key: "create_purchase", label: "Create" },
      { key: "edit_purchase", label: "Edit" },
      { key: "delete_purchase", label: "Delete" }
    ]
  },
  {
    label: "Inventory",
    perms: [
      { key: "view_inventory", label: "View" },
      { key: "create_product", label: "Add Product" },
      { key: "edit_product", label: "Edit Product" },
      { key: "delete_product", label: "Delete Product" }
    ]
  },
  {
    label: "Reports",
    perms: [
      { key: "view_reports", label: "View" },
      { key: "export_reports", label: "Export" }
    ]
  },
  {
    label: "Users & Roles",
    perms: [
      { key: "view_users", label: "View Users" },
      { key: "create_user", label: "Create User" },
      { key: "edit_user", label: "Edit User" },
      { key: "delete_user", label: "Delete User" }
    ]
  },
  {
    label: "Settings",
    perms: [
      { key: "view_settings", label: "View" },
      { key: "edit_settings", label: "Edit" }
    ]
  }
];

const createFullPerms = (val: boolean): Record<PermissionKey, boolean> => ({
  view_sales: val, create_sale: val, edit_sale: val, delete_sale: val,
  view_purchase: val, create_purchase: val, edit_purchase: val, delete_purchase: val,
  view_inventory: val, create_product: val, edit_product: val, delete_product: val,
  view_reports: val, export_reports: val,
  view_users: val, create_user: val, edit_user: val, delete_user: val,
  view_settings: val, edit_settings: val
});

const initialRolePerms: RolePermission[] = [
  {
    role: "Super Admin",
    permissions: createFullPerms(true)
  },
  {
    role: "Manager",
    permissions: {
      ...createFullPerms(false),
      view_sales: true, create_sale: true, edit_sale: true,
      view_purchase: true, create_purchase: true, edit_purchase: true,
      view_inventory: true, create_product: true, edit_product: true,
      view_reports: true, export_reports: true,
      view_settings: true
    }
  },
  {
    role: "Cashier",
    permissions: {
      ...createFullPerms(false),
      view_sales: true, create_sale: true,
      view_inventory: true
    }
  }
];

export default function PermissionsPage() {
  const [rolePerms, setRolePerms] = useState<RolePermission[]>(initialRolePerms);
  const [selectedRole, setSelectedRole] = useState<string>(initialRolePerms[0].role);
  const [saved, setSaved] = useState(false);

  const currentRole = useMemo(() => rolePerms.find((r) => r.role === selectedRole) || rolePerms[0], [rolePerms, selectedRole]);

  const togglePerm = (key: PermissionKey) => {
    setRolePerms((prev) =>
      prev.map((r) =>
        r.role === selectedRole
          ? { ...r, permissions: { ...r.permissions, [key]: !r.permissions[key] } }
          : r
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalEnabled = Object.values(currentRole.permissions).filter(Boolean).length;
  const totalPerms = Object.keys(currentRole.permissions).length;

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Permissions Matrix</h1>
          <p className="text-muted-foreground mt-1 text-sm">Configure granular module-level permissions for each assigned role</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? "Saved!" : "Save Permissions"}</span>
        </button>
      </div>

      {/* Role Selector Tabs */}
      <div className="border border-border bg-card rounded-md p-1 flex gap-1 overflow-x-auto custom-scrollbar">
        {rolePerms.map((r) => (
          <button
            key={r.role}
            onClick={() => setSelectedRole(r.role)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap",
              selectedRole === r.role
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            {r.role}
          </button>
        ))}
      </div>

      {/* KPI Summary */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Selected Role</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Enabled Permissions</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Total Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold text-foreground block">{currentRole.role}</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-500 block tracking-tight font-mono">{totalEnabled} Active</span>
                </td>
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">{totalPerms} Total</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-5">
        {MODULES.map((module) => (
          <div key={module.label}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-primary rounded-full inline-block" />
              {module.label} Module
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {module.perms.map((perm) => {
                const enabled = currentRole.permissions[perm.key];
                return (
                  <button
                    key={perm.key}
                    onClick={() => togglePerm(perm.key)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-md border text-left transition-all text-xs font-medium",
                      enabled
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted/20 border-border text-muted-foreground hover:border-border/70"
                    )}
                  >
                    <span className={cn(
                      "w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                      enabled ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30"
                    )}>
                      {enabled && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                    </span>
                    {perm.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
