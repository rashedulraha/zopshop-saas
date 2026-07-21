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

export const adminApi = {
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
};
