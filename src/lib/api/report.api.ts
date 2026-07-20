import { api } from "../axios";
import { 
  DashboardReport, 
  DailyReport, 
  OutstandingReport, 
  StockReport, 
  ProfitLossReport,
  PartyLedgerResponse 
} from "@/types";

export const reportApi = {
  /**
   * Retrieves summary metrics for the main dashboard.
   * GET /api/reports/dashboard
   */
  getDashboardStats: async (): Promise<DashboardReport> => {
    const { data } = await api.get<DashboardReport>("/reports/dashboard");
    return data;
  },

  /**
   * Retrieves daily ledger breakdown reports.
   * GET /api/reports/daily
   */
  getDailyReport: async (date?: string): Promise<DailyReport> => {
    const { data } = await api.get<DailyReport>("/reports/daily", {
      params: date ? { date } : undefined,
    });
    return data;
  },

  /**
   * Retrieves outstanding customer receivables or supplier payables.
   * GET /api/reports/outstanding
   */
  getOutstandingReport: async (type?: "customer" | "supplier" | "CUSTOMER" | "SUPPLIER"): Promise<OutstandingReport> => {
    const { data } = await api.get<OutstandingReport>("/reports/outstanding", {
      params: type ? { type } : undefined,
    });
    return data;
  },

  /**
   * Retrieves stock, inventory values, and low stock warnings.
   * GET /api/reports/stock
   */
  getStockReport: async (lowStock?: boolean): Promise<StockReport> => {
    const { data } = await api.get<StockReport>("/reports/stock", {
      params: lowStock !== undefined ? { lowStock } : undefined,
    });
    return data;
  },

  /**
   * Retrieves gross and net profit statements.
   * GET /api/reports/profit-loss
   */
  getProfitLossReport: async (from?: string, to?: string): Promise<ProfitLossReport> => {
    const { data } = await api.get<ProfitLossReport>("/reports/profit-loss", {
      params: { from, to },
    });
    return data;
  },

  /**
   * Retrieves a specific customer/supplier party ledger transaction breakdown.
   * GET /api/reports/party-ledger/:partyId
   */
  getPartyLedger: async (partyId: string, from?: string, to?: string): Promise<PartyLedgerResponse> => {
    const { data } = await api.get<PartyLedgerResponse>(`/reports/party-ledger/${partyId}`, {
      params: { from, to },
    });
    return data;
  },
};
