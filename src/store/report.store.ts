import { create } from "zustand";
import { reportApi } from "@/lib/api/report.api";
import { DashboardReport } from "@/types";
import { handleApiError } from "@/lib/error-handler";

// The user requested a specific DashboardStats interface shape.
// We map the backend DashboardReport to this if needed, or just extend DashboardReport.
export interface DashboardStats extends DashboardReport {
  todaySales?: number;
  totalOutstanding?: number;
  totalProducts?: number;
  totalParties?: number;
  lowStockCount?: number;
}

interface ReportStore {
  dashboardStats: DashboardStats | null;
  isLoading: boolean;
  fetchDashboardStats: () => Promise<void>;
}

export const useReportStore = create<ReportStore>((set) => ({
  dashboardStats: null,
  isLoading: false,

  fetchDashboardStats: async () => {
    set({ isLoading: true });
    try {
      const response = await reportApi.getDashboardStats();

      // Map properties to match requested frontend naming if they are missing
      const mappedStats: DashboardStats = {
        ...response,
        todaySales: response.summary?.totalSales || 0,
        totalOutstanding:
          (response.summary?.receivables || 0) +
          (response.summary?.payables || 0),
        totalProducts: response.topProducts?.length || 0, // Fallback if actual count isn't provided
        totalParties: 0, // Not typically in DashboardReport, defaulting to 0
        lowStockCount: 0, // Not typically in DashboardReport, defaulting to 0
      };

      set({ dashboardStats: mappedStats, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to fetch dashboard stats");
    }
  },
}));
