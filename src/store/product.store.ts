import { create } from "zustand";
import { Product, CreateProductPayload } from "@/types";
import { productApi } from "@/lib/api/product.api";

interface ProductFilters {
  page: number;
  limit: number;
  search: string;
  categoryId: string | null;
  sortBy?: string;
  sortOrder?: string;
}

interface ProductState {
  // State
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  search: string;
  categoryId: string | null;
  sortBy?: string;
  sortOrder?: string;

  // Actions
  fetchProducts: (params?: Partial<ProductFilters>) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (data: CreateProductPayload) => Promise<Product>;
  updateProduct: (
    id: string,
    data: Partial<CreateProductPayload>,
  ) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  reset: () => void;
}

const initialState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  total: 0,
  page: 1,
  limit: 10,
  search: "",
  categoryId: null,
  sortBy: undefined,
  sortOrder: undefined,
};

export const useProductStore = create<ProductState>((set, get) => ({
  ...initialState,

  /**
   * Fetches products list with active filter params.
   */
  fetchProducts: async (params) => {
    set({ isLoading: true });

    const state = get();
    // Resolve page, limit, search, categoryId, etc.
    const page = params?.page !== undefined ? params.page : state.page;
    const limit = params?.limit !== undefined ? params.limit : state.limit;
    const search = params?.search !== undefined ? params.search : state.search;
    const categoryId =
      params?.categoryId !== undefined ? params.categoryId : state.categoryId;
    const sortBy = params?.sortBy !== undefined ? params.sortBy : state.sortBy;
    const sortOrder =
      params?.sortOrder !== undefined ? params.sortOrder : state.sortOrder;

    try {
      const response = await productApi.getAllProducts({
        page,
        limit,
        search: search || undefined,
        categoryId: categoryId || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      });

      set({
        products: response.products || [],
        total: response.total || 0,
        page,
        limit,
        search,
        categoryId,
        sortBy,
        sortOrder,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Fetches a single product by ID.
   */
  fetchProductById: async (id) => {
    set({ isLoading: true });
    try {
      const product = await productApi.getProductById(id);
      set({ currentProduct: product, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Creates a new product and auto-refetches the products list.
   */
  createProduct: async (data) => {
    set({ isLoading: true });
    try {
      const newProduct = await productApi.createProduct(data);
      set({ isLoading: false });
      // Automatically refetch list using current store state parameters
      await get().fetchProducts();
      return newProduct;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Updates an existing product and auto-refetches the products list.
   */
  updateProduct: async (id, data) => {
    set({ isLoading: true });
    try {
      const updatedProduct = await productApi.updateProduct(id, data);
      set({ isLoading: false });
      // Automatically refetch list using current store state parameters
      await get().fetchProducts();
      return updatedProduct;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Deletes a product by ID and auto-refetches the products list.
   */
  deleteProduct: async (id) => {
    set({ isLoading: true });
    try {
      await productApi.deleteProduct(id);
      set({ isLoading: false });
      // Automatically refetch list using current store state parameters
      await get().fetchProducts();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Updates multiple filters simultaneously and triggers a refetch.
   */
  setFilters: (filters) => {
    set(filters);
    // Trigger products reload with updated state values
    get().fetchProducts();
  },

  /**
   * Resets the store back to its initial state.
   */
  reset: () => {
    set(initialState);
  },
}));
