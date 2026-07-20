import { api } from "../axios";
import { Product, Category } from "@/types";

export const productApi = {
  // ==========================================
  // CATEGORIES
  // ==========================================

  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>("/categories");
    return data;
  },

  getCategory: async (id: string): Promise<Category> => {
    const { data } = await api.get<Category>(`/categories/${id}`);
    return data;
  },

  createCategory: async (categoryData: Partial<Category>): Promise<Category> => {
    const { data } = await api.post<Category>("/categories", categoryData);
    return data;
  },

  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    const { data } = await api.put<Category>(`/categories/${id}`, categoryData);
    return data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

  // ==========================================
  // PRODUCTS
  // ==========================================

  getProducts: async (params?: { categoryId?: string; search?: string }): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/products", { params });
    return data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const { data } = await api.post<Product>("/products", productData);
    return data;
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
