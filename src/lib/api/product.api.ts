import { api } from "../axios";
import { Product, CreateProductPayload, ProductListResponse } from "@/types";

export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string | null;
  sortBy?: string;
  sortOrder?: string;
}

export const productApi = {
  /**
   * Fetches products with pagination, search, sorting and category filtering.
   * GET /api/products
   */
  getAllProducts: async (
    params?: ProductListParams,
  ): Promise<ProductListResponse> => {
    const { data } = await api.get<ProductListResponse>("/products", {
      params,
    });
    return data;
  },

  /**
   * Fetches a single product by ID.
   * GET /api/products/:id
   */
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  /**
   * Creates a new product.
   * POST /api/products
   */
  createProduct: async (
    productData: CreateProductPayload,
  ): Promise<Product> => {
    const { data } = await api.post<Product>("/products", productData);
    return data;
  },

  /**
   * Updates an existing product.
   * PUT /api/products/:id
   */
  updateProduct: async (
    id: string,
    productData: Partial<CreateProductPayload>,
  ): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, productData);
    return data;
  },

  /**
   * Deletes a product by ID.
   * DELETE /api/products/:id
   */
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  /**
   * Fetches all products belonging to a specific category.
   * GET /api/products/category/:categoryId
   */
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(
      `/products/category/${categoryId}`,
    );
    return data;
  },

  /**
   * Searches products by keyword.
   * GET /api/products/search?q=keyword
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/products/search", {
      params: { q: query },
    });
    return data;
  },
};
