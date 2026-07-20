import { api } from "../axios";
import { Config, StoreInfo, Category } from "@/types";

export const configAPI = {
  getConfig: () => api.get<Config>("/config"),

  updateConfig: (data: Partial<Config>) =>
    api.put<{ config: Config }>("/config", data),

  getStoreInfo: () => api.get<StoreInfo>("/config/store-info"),
};

export const categoryAPI = {
  getAll: () => api.get<{ categories: Category[] }>("/categories"),

  getById: (id: string) =>
    api.get<{ category: Category }>(`/categories/${id}`),

  create: (data: { name: string }) =>
    api.post<{ category: Category }>("/categories", data),

  update: (id: string, data: { name: string }) =>
    api.put<{ category: Category }>(`/categories/${id}`, data),

  delete: (id: string) => api.delete(`/categories/${id}`),
};
