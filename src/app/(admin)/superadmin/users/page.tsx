"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  ShieldAlert,
  CheckCircle2,
  Ban,
  UserX,
  AlertTriangle,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAdminStore } from "@/store/admin.store";
import { AdminUser } from "@/lib/api/admin.api";

// ─── Confirmation Modal ────────────────────────────────────────────────────────
type ActionType = "ACTIVATE" | "SUSPEND" | "BAN" | "CANCEL_SUB";

interface PendingAction {
  type: ActionType;
  user: AdminUser;
}

const ACTION_CONFIG: Record<
  ActionType,
  {
    title: string;
    description: (name: string) => string;
    confirmLabel: string;
    confirmClass: string;
    icon: React.ReactNode;
  }
> = {
  ACTIVATE: {
    title: "Activate User",
    description: (name) =>
      `Are you sure you want to activate "${name}"? They will regain full platform access.`,
    confirmLabel: "Yes, Activate",
    confirmClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
  },
  SUSPEND: {
    title: "Suspend User",
    description: (name) =>
      `Are you sure you want to suspend "${name}"? They will temporarily lose access to the platform.`,
    confirmLabel: "Yes, Suspend",
    confirmClass: "bg-amber-500 hover:bg-amber-600 text-white",
    icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
  },
  BAN: {
    title: "Ban User",
    description: (name) =>
      `Are you sure you want to permanently ban "${name}"? This is a serious action.`,
    confirmLabel: "Yes, Ban User",
    confirmClass: "bg-red-600 hover:bg-red-700 text-white",
    icon: <Ban className="w-5 h-5 text-red-600" />,
  },
  CANCEL_SUB: {
    title: "Cancel Subscription",
    description: (name) =>
      `Are you sure you want to cancel the subscription for "${name}"? They will lose paid features.`,
    confirmLabel: "Yes, Cancel",
    confirmClass: "bg-slate-700 hover:bg-slate-800 text-white",
    icon: <UserX className="w-5 h-5 text-slate-600" />,
  },
};

function ConfirmModal({
  action,
  onConfirm,
  onCancel,
  isProcessing,
}: {
  action: PendingAction;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}) {
  const cfg = ACTION_CONFIG[action.type];
  const userName = action.user.name || action.user.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isProcessing ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        {!isProcessing && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-muted shrink-0">{cfg.icon}</div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {cfg.title}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              This action will affect the user immediately.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {cfg.description(userName)}
          </p>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-xs">
              {userName.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {action.user.name || "Unknown"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {action.user.email}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`flex-1 h-9 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${cfg.confirmClass}`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              cfg.confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SuperadminUsersPage() {
  const {
    users,
    isLoading,
    fetchUsers,
    updateUserStatus,
    updateUserSubscription,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const requestAction = (type: ActionType, user: AdminUser) => {
    setPendingAction({ type, user });
  };

  const handleConfirm = async () => {
    if (!pendingAction) return;
    setIsProcessing(true);
    try {
      const { type, user } = pendingAction;
      if (type === "ACTIVATE") await updateUserStatus(user.id, "ACTIVE");
      else if (type === "SUSPEND") await updateUserStatus(user.id, "SUSPENDED");
      else if (type === "BAN") await updateUserStatus(user.id, "BANNED");
      else if (type === "CANCEL_SUB")
        await updateUserSubscription(
          user.id,
          user.subscriptionPlan,
          "CANCELLED",
        );

      setPendingAction(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (!isProcessing) setPendingAction(null);
  };

  return (
    <>
      {/* Confirmation Modal */}
      {pendingAction && (
        <ConfirmModal
          action={pendingAction}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isProcessing={isProcessing}
        />
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" /> All Users
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage global user accounts across the entire platform.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {/* Toolbar */}
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
            <span className="text-xs text-muted-foreground shrink-0">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User Info</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">
                      Store Associated
                    </th>
                    <th className="px-6 py-4 font-semibold">Subscription</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        {/* User Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-primary font-bold text-xs">
                                {(user.name || "U")
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {user.name || "Unknown"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded border text-[10px] font-bold tracking-wider ${
                              user.isSuperAdmin
                                ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30"
                                : "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30"
                            }`}
                          >
                            {user.isSuperAdmin ? "SUPERADMIN" : "OWNER"}
                          </span>
                        </td>

                        {/* Store */}
                        <td className="px-6 py-4 text-muted-foreground">
                          {user.store?.name || "-"}
                        </td>

                        {/* Subscription */}
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold">
                            {user.subscriptionPlan}
                          </span>
                          <br />
                          <span
                            className={`text-[10px] ${
                              user.subscriptionStatus === "CANCELLED"
                                ? "text-red-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {user.subscriptionStatus}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : user.status === "SUSPENDED"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          {user.isSuperAdmin ? (
                            // ── SuperAdmin is fully protected — no actions allowed ──
                            <div className="flex items-center justify-end gap-1.5">
                              <span
                                title="SuperAdmin accounts are protected and cannot be modified"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800 select-none"
                              >
                                <ShieldCheck className="w-3 h-3" />
                                Protected
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              {/* Activate or Suspend toggle */}
                              {user.status !== "ACTIVE" ? (
                                <button
                                  onClick={() =>
                                    requestAction("ACTIVATE", user)
                                  }
                                  title="Activate User"
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => requestAction("SUSPEND", user)}
                                  title="Suspend User"
                                  className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md transition-colors"
                                >
                                  <ShieldAlert className="w-4 h-4" />
                                </button>
                              )}

                              {/* Ban */}
                              {user.status !== "BANNED" && (
                                <button
                                  onClick={() => requestAction("BAN", user)}
                                  title="Ban User"
                                  className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              )}

                              {/* Cancel Subscription */}
                              {user.subscriptionStatus === "ACTIVE" && (
                                <button
                                  onClick={() =>
                                    requestAction("CANCEL_SUB", user)
                                  }
                                  title="Cancel Subscription"
                                  className="p-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                                >
                                  <UserX className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
