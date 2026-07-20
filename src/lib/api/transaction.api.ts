import { api } from "../axios";
import { Transaction, TransactionType } from "@/types";

export interface TransactionFilters {
  type?: TransactionType;
  partyId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
}

export const transactionApi = {
  getTransactions: async (params?: TransactionFilters): Promise<Transaction[]> => {
    const { data } = await api.get<Transaction[]>("/transactions", { params });
    return data;
  },

  getTransaction: async (id: string): Promise<Transaction> => {
    const { data } = await api.get<Transaction>(`/transactions/${id}`);
    return data;
  },

  createTransaction: async (transactionData: Partial<Transaction>): Promise<Transaction> => {
    const { data } = await api.post<Transaction>("/transactions", transactionData);
    return data;
  },

  updateTransaction: async (id: string, transactionData: Partial<Transaction>): Promise<Transaction> => {
    const { data } = await api.put<Transaction>(`/transactions/${id}`, transactionData);
    return data;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};
