"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { adminApi, DashboardStats } from "@/lib/api/admin.api";
import {
  Building2,
  Users,
  UserCheck,
  ArrowUpRight,
  Store,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function StatSkeleton() {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
        </div>
        <div className="w-11 h-11 rounded-lg bg-muted" />
      </div>
      <div className="mt-4 h-3 w-32 bg-muted rounded" />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SuperadminDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .getDashboardStats()
      .then(setStats)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setIsLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          title: "Total Stores",
          value: stats.totalStores.toLocaleString(),
          sub: "Registered on the platform",
          icon: Building2,
          color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
        },
        {
          title: "Total Users",
          value: stats.totalUsers.toLocaleString(),
          sub: "Excluding super admins",
          icon: Users,
          color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30",
        },
        {
          title: "Active Users",
          value: stats.activeUsers.toLocaleString(),
          sub: `${stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}% of total users`,
          icon: UserCheck,
          color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.name || "Super Admin"}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is what's happening across the ZopShop platform today.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)
          : statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <h3 className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </motion.div>
              );
            })}
      </div>

      {/* Recent Store Registrations */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Recent Store Registrations</h3>
          <Link
            href="/superadmin/stores"
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          // Skeleton rows
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-32 bg-muted rounded" />
                  <div className="h-2.5 w-20 bg-muted rounded" />
                </div>
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-5 w-14 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        ) : stats && stats.recentStores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Store Name</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Registered</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentStores.map((store) => (
                  <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Store className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {store.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {store.ownerName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {store.plan}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(store.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          store.ownerStatus === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : store.ownerStatus === "SUSPENDED"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {store.ownerStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No stores yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              When users register stores, they will appear here.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center pt-4">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
