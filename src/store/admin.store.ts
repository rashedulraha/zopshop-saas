import { create } from "zustand";
import { adminApi, AdminUser, AdminStore } from "@/lib/api/admin.api";
import { handleApiError } from "@/lib/error-handler";

interface AdminState {
  // Users
  users: AdminUser[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  updateUserStatus: (id: string, status: "ACTIVE" | "SUSPENDED" | "BANNED") => Promise<void>;
  updateUserSubscription: (id: string, plan?: string, status?: string) => Promise<void>;
  // Stores
  stores: AdminStore[];
  isLoadingStores: boolean;
  fetchStores: () => Promise<void>;
  removeStore: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // ─── Users ─────────────────────────────────────────────────────────────────
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
    const previousUsers = get().users;
    set({ users: previousUsers.map((u) => (u.id === id ? { ...u, status } : u)) });
    try {
      await adminApi.updateUserStatus(id, status);
    } catch (error) {
      set({ users: previousUsers });
      handleApiError(error, "Failed to update user status");
      throw error;
    }
  },

  updateUserSubscription: async (id: string, plan?: string, status?: string) => {
    const previousUsers = get().users;
    set({
      users: previousUsers.map((u) =>
        u.id === id
          ? {
              ...u,
              ...(plan ? { subscriptionPlan: plan } : {}),
              ...(status ? { subscriptionStatus: status } : {}),
            }
          : u
      ),
    });
    try {
      await adminApi.updateUserSubscription(id, plan, status);
    } catch (error) {
      set({ users: previousUsers });
      handleApiError(error, "Failed to update subscription");
      throw error;
    }
  },

  // ─── Stores ────────────────────────────────────────────────────────────────
  stores: [],
  isLoadingStores: false,

  fetchStores: async () => {
    set({ isLoadingStores: true });
    try {
      const stores = await adminApi.getAllStores();
      set({ stores, isLoadingStores: false });
    } catch (error) {
      set({ isLoadingStores: false });
      handleApiError(error, "Failed to fetch stores");
      throw error;
    }
  },

  removeStore: async (id: string) => {
    const previousStores = get().stores;
    set({ stores: previousStores.filter((s) => s.id !== id) });
    try {
      await adminApi.deleteStore(id);
    } catch (error) {
      set({ stores: previousStores });
      handleApiError(error, "Failed to delete store");
      throw error;
    }
  },
}));
