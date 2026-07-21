import { api } from "../axios";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  isSuperAdmin: boolean;
  status: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  createdAt: string;
  store: {
    name: string;
  } | null;
}

export interface AdminStore {
  id: string;
  name: string;
  businessType: string;
  createdAt: string;
  ownerName: string | null;
  ownerEmail: string | null;
  ownerStatus: string;
  ownerId: string | null;
  productCount: number;
  transactionCount: number;
}

export interface DashboardRecentStore {
  id: string;
  name: string;
  ownerName: string | null;
  plan: string;
  ownerStatus: string;
  createdAt: string;
}

export interface DashboardStats {
  totalStores: number;
  totalUsers: number;
  activeUsers: number;
  recentStores: DashboardRecentStore[];
}

export const adminApi = {
  // ─── Dashboard ───────────────────────────────────────────────────────────────
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get<{ data: DashboardStats }>("/admin/dashboard/stats");
    return data.data;
  },

  // ─── Users ───────────────────────────────────────────────────────────────────
  getAllUsers: async (): Promise<AdminUser[]> => {
    const { data } = await api.get<{ data: AdminUser[] }>("/admin/users");
    return data.data;
  },

  updateUserStatus: async (id: string, status: "ACTIVE" | "SUSPENDED" | "BANNED"): Promise<void> => {
    await api.patch(`/admin/users/${id}/status`, { status });
  },

  updateUserSubscription: async (id: string, subscriptionPlan?: string, subscriptionStatus?: string): Promise<void> => {
    await api.patch(`/admin/users/${id}/subscription`, {
      subscriptionPlan,
      subscriptionStatus,
    });
  },

  // ─── Stores ──────────────────────────────────────────────────────────────────
  getAllStores: async (): Promise<AdminStore[]> => {
    const { data } = await api.get<{ data: AdminStore[] }>("/admin/stores");
    return data.data;
  },

  deleteStore: async (id: string): Promise<void> => {
    await api.delete(`/admin/stores/${id}`);
  },
};
