import { create } from "zustand";
import { Transaction, CreateTransactionPayload, DailySummary } from "@/types";
import {
  transactionApi,
  TransactionListParams,
} from "@/lib/api/transaction.api";
import { handleApiError } from "@/lib/error-handler";

interface TransactionFiltersState {
  type: string | null;
  mode: string | null;
  partyId: string | null;
  from: string | null;
  to: string | null;
}

interface TransactionState {
  // State
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  dailySummary: DailySummary | null;
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  filters: TransactionFiltersState;

  // Actions
  fetchTransactions: (params?: Partial<TransactionListParams>) => Promise<void>;
  fetchTransactionById: (id: string) => Promise<void>;
  fetchDailySummary: (date?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionPayload) => Promise<Transaction>;
  updateTransaction: (
    id: string,
    data: Partial<CreateTransactionPayload>,
  ) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TransactionFiltersState>) => void;
  reset: () => void;
}

const defaultFilters: TransactionFiltersState = {
  type: null,
  mode: null,
  partyId: null,
  from: null,
  to: null,
};

const initialState = {
  transactions: [],
  currentTransaction: null,
  dailySummary: null,
  isLoading: false,
  total: 0,
  page: 1,
  limit: 10,
  filters: defaultFilters,
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  ...initialState,

  /**
   * Fetches transactions with active page, limit, and filter parameters.
   */
  fetchTransactions: async (params) => {
    set({ isLoading: true });

    const state = get();
    // Resolve page/limit
    const page = params?.page !== undefined ? params.page : state.page;
    const limit = params?.limit !== undefined ? params.limit : state.limit;

    // Resolve filter state variables
    const filterType =
      params?.type !== undefined ? params.type : state.filters.type;
    const filterMode =
      params?.mode !== undefined ? params.mode : state.filters.mode;
    const filterPartyId =
      params?.partyId !== undefined ? params.partyId : state.filters.partyId;
    const filterFrom =
      params?.from !== undefined ? params.from : state.filters.from;
    const filterTo = params?.to !== undefined ? params.to : state.filters.to;

    try {
      const response = await transactionApi.getAllTransactions({
        page,
        limit,
        type: filterType,
        mode: filterMode,
        partyId: filterPartyId,
        from: filterFrom,
        to: filterTo,
      });

      set({
        transactions: response.transactions || [],
        total: response.total || 0,
        page,
        limit,
        filters: {
          type: filterType,
          mode: filterMode,
          partyId: filterPartyId,
          from: filterFrom,
          to: filterTo,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to fetch transactions");
      throw error;
    }
  },

  /**
   * Fetches a single transaction details by ID.
   */
  fetchTransactionById: async (id) => {
    set({ isLoading: true });
    try {
      const transaction = await transactionApi.getTransactionById(id);
      set({ currentTransaction: transaction, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to fetch transaction details");
      throw error;
    }
  },

  /**
   * Fetches daily summary statement metrics.
   */
  fetchDailySummary: async (date) => {
    set({ isLoading: true });
    try {
      const summary = await transactionApi.getDailySummary(date);
      set({ dailySummary: summary, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to fetch daily summary");
      throw error;
    }
  },

  /**
   * Creates a transaction record and auto-refetches lists and summaries.
   */
  createTransaction: async (data) => {
    set({ isLoading: true });
    try {
      const newTx = await transactionApi.createTransaction(data);
      set({ isLoading: false });

      // Auto refresh list
      await get().fetchTransactions();

      // If a daily summary was loaded, refresh it too
      if (get().dailySummary) {
        await get().fetchDailySummary();
      }
      return newTx;
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to create transaction");
      throw error;
    }
  },

  /**
   * Updates transaction details and auto-refetches lists and summaries.
   */
  updateTransaction: async (id, data) => {
    set({ isLoading: true });
    try {
      const updatedTx = await transactionApi.updateTransaction(id, data);
      set({ isLoading: false });

      // Auto refresh list
      await get().fetchTransactions();

      // If we are currently viewing this transaction details, update store state
      if (get().currentTransaction?.id === id) {
        set({ currentTransaction: updatedTx });
      }

      // Refresh daily summary
      if (get().dailySummary) {
        await get().fetchDailySummary();
      }
      return updatedTx;
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to update transaction");
      throw error;
    }
  },

  /**
   * Deletes a transaction and auto-refetches lists and summaries.
   */
  deleteTransaction: async (id) => {
    set({ isLoading: true });
    try {
      await transactionApi.deleteTransaction(id);
      set({ isLoading: false });

      // Auto refresh list
      await get().fetchTransactions();

      // Clear current details if the viewed transaction was deleted
      if (get().currentTransaction?.id === id) {
        set({ currentTransaction: null });
      }

      // Refresh daily summary
      if (get().dailySummary) {
        await get().fetchDailySummary();
      }
    } catch (error) {
      set({ isLoading: false });
      handleApiError(error, "Failed to delete transaction");
      throw error;
    }
  },

  /**
   * Updates active search and filters, resetting page to 1, and triggers a fetch.
   */
  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
      page: 1, // Reset to page 1 on search/filter update
    }));
    get().fetchTransactions();
  },

  /**
   * Resets store state back to initial default values.
   */
  reset: () => {
    set(initialState);
  },
}));
