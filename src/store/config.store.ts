import { create } from "zustand";
import { Config, StoreInfo } from "@/types";
import { configAPI } from "@/lib/api/config.api";

interface ConfigState {
  config: Config | null;
  storeInfo: StoreInfo | null;
  isLoading: boolean;
  fetchConfig: () => Promise<void>;
  updateConfig: (data: Partial<Config>) => Promise<void>;
  fetchStoreInfo: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  storeInfo: null,
  isLoading: false,

  fetchConfig: async () => {
    set({ isLoading: true });
    try {
      const response = await configAPI.getConfig();
      set({ config: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateConfig: async (data: Partial<Config>) => {
    set({ isLoading: true });
    try {
      const response = await configAPI.updateConfig(data);
      set({ config: response.data.config, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchStoreInfo: async () => {
    set({ isLoading: true });
    try {
      const response = await configAPI.getStoreInfo();
      set({ storeInfo: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
