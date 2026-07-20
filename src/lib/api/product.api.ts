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
   * Fetches products with pagination, search, sorting, and category filtering.
   * GET /api/products
   * Response: ProductListResponse (products[], total, page, limit)
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
   * Response: { product: Product }
   */
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get<{ product: Product }>(`/products/${id}`);
    return data.product;
  },

  /**
   * Creates a new product.
   * POST /api/products
   * Response: { product: Product }
   */
  createProduct: async (
    productData: CreateProductPayload,
  ): Promise<Product> => {
    const { data } = await api.post<{ product: Product }>(
      "/products",
      productData,
    );
    return data.product;
  },

  /**
   * Updates an existing product.
   * PUT /api/products/:id
   * Response: { product: Product }
   */
  updateProduct: async (
    id: string,
    productData: Partial<CreateProductPayload>,
  ): Promise<Product> => {
    const { data } = await api.put<{ product: Product }>(
      `/products/${id}`,
      productData,
    );
    return data.product;
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
   * Response: { products: Product[] }
   */
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    const { data } = await api.get<{ products: Product[] }>(
      `/products/category/${categoryId}`,
    );
    return data.products;
  },

  /**
   * Searches products by keyword.
   * GET /api/products/search?q=keyword
   * Response: { products: Product[] }
   */
  searchProducts: async (query: string): Promise<Product[]> => {
    const { data } = await api.get<{ products: Product[] }>(
      "/products/search",
      {
        params: { q: query },
      },
    );
    return data.products;
  },
};
