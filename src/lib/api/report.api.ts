import { api } from "../axios";
import { 
  DashboardReport, 
  DailyReport, 
  OutstandingReport, 
  StockReport, 
  ProfitLossReport 
} from "@/types";

export const reportApi = {
  getDashboardReport: async (): Promise<DashboardReport> => {
    const { data } = await api.get<DashboardReport>("/reports/dashboard");
    return data;
  },

  getDailyReport: async (params?: { date?: string }): Promise<DailyReport> => {
    const { data } = await api.get<DailyReport>("/reports/daily", { params });
    return data;
  },

  getOutstandingReport: async (): Promise<OutstandingReport> => {
    const { data } = await api.get<OutstandingReport>("/reports/outstanding");
    return data;
  },

  getStockReport: async (params?: { lowStockOnly?: boolean }): Promise<StockReport> => {
    const { data } = await api.get<StockReport>("/reports/stock", { params });
    return data;
  },

  getProfitLossReport: async (params?: { startDate?: string; endDate?: string }): Promise<ProfitLossReport> => {
    const { data } = await api.get<ProfitLossReport>("/reports/profit-loss", { params });
    return data;
  },
};
