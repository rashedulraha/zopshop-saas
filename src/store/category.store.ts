import { create } from "zustand";
import { Category } from "@/types";
import { categoryAPI } from "@/lib/api/config.api";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await categoryAPI.getAll();
      set({ categories: response.data.categories || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createCategory: async (name: string) => {
    set({ isLoading: true });
    try {
      await categoryAPI.create({ name });
      set({ isLoading: false });
      await get().fetchCategories();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateCategory: async (id: string, name: string) => {
    set({ isLoading: true });
    try {
      await categoryAPI.update(id, { name });
      set({ isLoading: false });
      await get().fetchCategories();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteCategory: async (id: string) => {
    set({ isLoading: true });
    try {
      await categoryAPI.delete(id);
      set({ isLoading: false });
      await get().fetchCategories();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
