import { create } from "zustand";
import { adminApi, AdminUser } from "@/lib/api/admin.api";
import { handleApiError } from "@/lib/error-handler";

interface AdminState {
  users: AdminUser[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  updateUserStatus: (id: string, status: "ACTIVE" | "SUSPENDED" | "BANNED") => Promise<void>;
  updateUserSubscription: (id: string, plan?: string, status?: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const users = await adminApi.getAllUsers();
      set({ users, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to fetch users");
      throw error;
    }
  },

  updateUserStatus: async (id: string, status: "ACTIVE" | "SUSPENDED" | "BANNED") => {
    set({ isLoading: true });
    try {
      await adminApi.updateUserStatus(id, status);
      await get().fetchUsers(); // Refresh list
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to update user status");
      throw error;
    }
  },

  updateUserSubscription: async (id: string, plan?: string, status?: string) => {
    set({ isLoading: true });
    try {
      await adminApi.updateUserSubscription(id, plan, status);
      await get().fetchUsers(); // Refresh list
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to update subscription");
      throw error;
    }
  },
}));
