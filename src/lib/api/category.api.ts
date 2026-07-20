import { api } from "../axios";
import { Category } from "@/types";

export const categoryApi = {
  /**
   * Fetches all categories.
   * GET /api/categories
   */
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>("/categories");
    return data;
  },

  /**
   * Creates a new category.
   * POST /api/categories
   */
  createCategory: async (name: string): Promise<Category> => {
    const { data } = await api.post<Category>("/categories", { name });
    return data;
  },

  /**
   * Deletes a category by ID.
   * DELETE /api/categories/:id
   */
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
