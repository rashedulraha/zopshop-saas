import { api } from "../axios";
import { 
  Transaction, 
  CreateTransactionPayload, 
  TransactionListResponse, 
  DailySummary 
} from "@/types";

export interface TransactionListParams {
  type?: string | null;
  mode?: string | null; // e.g., paymentMethod or cash flow mode
  partyId?: string | null;
  from?: string | null; // ISO Date string
  to?: string | null;   // ISO Date string
  page?: number;
  limit?: number;
}

export const transactionApi = {
  /**
   * Fetches transactions with filters.
   * GET /api/transactions
   */
  getAllTransactions: async (params?: TransactionListParams): Promise<TransactionListResponse> => {
    const cleanParams = { ...params };
    // Clear null values so they aren't serialized as strings
    Object.keys(cleanParams).forEach((key) => {
      const k = key as keyof TransactionListParams;
      if (cleanParams[k] === null) {
        delete cleanParams[k];
      }
    });

    const { data } = await api.get<TransactionListResponse>("/transactions", { 
      params: cleanParams 
    });
    return data;
  },

  /**
   * Fetches a single transaction by ID.
   * GET /api/transactions/:id
   */
  getTransactionById: async (id: string): Promise<Transaction> => {
    const { data } = await api.get<{ transaction: Transaction }>(`/transactions/${id}`);
    return data.transaction;
  },

  /**
   * Retrieves the daily summary.
   * GET /api/transactions/daily-summary
   */
  getDailySummary: async (date?: string): Promise<DailySummary> => {
    const { data } = await api.get<{ dailySummary?: DailySummary } | DailySummary>("/transactions/daily-summary", {
      params: date ? { date } : undefined,
    });
    // Just in case it's wrapped
    if ('dailySummary' in data && data.dailySummary) return data.dailySummary;
    return data as DailySummary;
  },

  /**
   * Creates a new transaction.
   * POST /api/transactions
   */
  createTransaction: async (transactionData: CreateTransactionPayload): Promise<Transaction> => {
    const { data } = await api.post<{ transaction: Transaction }>("/transactions", transactionData);
    return data.transaction;
  },

  /**
   * Updates an existing transaction.
   * PUT /api/transactions/:id
   */
  updateTransaction: async (id: string, transactionData: Partial<CreateTransactionPayload>): Promise<Transaction> => {
    const { data } = await api.put<{ transaction: Transaction }>(`/transactions/${id}`, transactionData);
    return data.transaction;
  },

  /**
   * Deletes a transaction by ID.
   * DELETE /api/transactions/:id
   */
  deleteTransaction: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};
