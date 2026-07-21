import { api } from "../axios";
import { Store } from "@/types";

export const storeApi = {
  /**
   * Get all stores for the current user
   * GET /api/stores
   */
  getStores: async (): Promise<Store[]> => {
    const { data } = await api.get<{ data: Store[] }>("/stores");
    return data.data;
  },

  /**
   * Create a new store
   * POST /api/stores
   */
  createStore: async (storeData: { name: string; businessType?: string; address?: string; phone?: string; email?: string }): Promise<Store> => {
    const { data } = await api.post<{ data: Store }>("/stores", storeData);
    return data.data;
  },
};
