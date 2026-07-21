import { api } from "../axios";

export interface Brand {
  id: string;
  name: string;
}

export const brandApi = {
  /**
   * List brands
   * GET /api/brands
   */
  getBrands: async (): Promise<Brand[]> => {
    const { data } = await api.get<{ brands: Brand[] }>("/brands");
    return data.brands;
  },

  /**
   * Create brand
   * POST /api/brands
   */
  createBrand: async (name: string): Promise<Brand> => {
    const { data } = await api.post<{ brand: Brand }>("/brands", { name });
    return data.brand;
  },
};
