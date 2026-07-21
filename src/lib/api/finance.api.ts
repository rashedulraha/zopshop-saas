import { api } from "../axios";

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  balance: number;
}

export const financeApi = {
  /**
   * List bank accounts
   * GET /api/accounts
   */
  getBankAccounts: async (): Promise<BankAccount[]> => {
    const { data } = await api.get<{ accounts: BankAccount[] }>("/accounts");
    return data.accounts;
  },

  /**
   * Create bank account
   * POST /api/accounts
   */
  createBankAccount: async (accountData: Omit<BankAccount, "id" | "balance"> & { balance?: number }): Promise<BankAccount> => {
    const { data } = await api.post<{ account: BankAccount }>("/accounts", accountData);
    return data.account;
  },

  /**
   * Get total income
   * GET /api/finance/income
   */
  getTotalIncome: async (): Promise<{ totalIncome: number }> => {
    const { data } = await api.get<{ totalIncome: number }>("/finance/income");
    return data;
  },

  /**
   * Get total expense
   * GET /api/finance/expense
   */
  getTotalExpense: async (): Promise<{ totalExpense: number }> => {
    const { data } = await api.get<{ totalExpense: number }>("/finance/expense");
    return data;
  },

  /**
   * Get profit/loss summary
   * GET /api/finance/profit-loss
   */
  getProfitLoss: async (): Promise<{ profit: number; loss: number; net: number }> => {
    const { data } = await api.get<{ profit: number; loss: number; net: number }>("/finance/profit-loss");
    return data;
  },
};
