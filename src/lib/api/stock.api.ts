import { api } from "../axios";
import { Product } from "@/types";

export interface StockAdjustmentPayload {
  productId: string;
  quantity: number;
  type: "ADD" | "SUBTRACT";
  reason?: string;
}

export const stockApi = {
  /**
   * Get stock alerts (e.g. low stock products)
   * GET /api/stock/alerts
   */
  getStockAlerts: async (): Promise<Product[]> => {
    const { data } = await api.get<{ alerts: Product[] }>("/stock/alerts");
    return data.alerts;
  },

  adjustStock: async (payload: StockAdjustmentPayload): Promise<unknown> => {
    const { data } = await api.post("/stock/adjustments", payload);
    return data;
  },
};
