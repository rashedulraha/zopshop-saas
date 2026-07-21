import { api } from "../axios";
import { Party, CreatePartyPayload, PartyListResponse, PartyType, Transaction } from "@/types";

export interface PartyListParams {
  type?: PartyType | null;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PartyTransactionsParams {
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface PartyTransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export interface PartyBalanceResponse {
  balance: number;
}

export const partyApi = {
  /**
   * Fetches parties with pagination, search, and type filters.
   * GET /api/parties
   */
  getAllParties: async (params?: PartyListParams): Promise<PartyListResponse> => {
    // If type is 'BOTH', we might omit it or handle it based on backend requirements
    const apiParams = { ...params };
    if (apiParams.type === "BOTH") {
      delete apiParams.type;
    }
    const { data } = await api.get<PartyListResponse>("/parties", { params: apiParams });
    return data;
  },

  /**
   * Fetches a single party by ID.
   * GET /api/parties/:id
   */
  getPartyById: async (id: string): Promise<Party> => {
    const { data } = await api.get<{ party: Party }>(`/parties/${id}`);
    return data.party;
  },

  /**
   * Retrieves the current balance for a party.
   * GET /api/parties/:id/balance
   */
  getPartyBalance: async (id: string): Promise<PartyBalanceResponse> => {
    const { data } = await api.get<PartyBalanceResponse>(`/parties/${id}/balance`);
    return data;
  },

  /**
   * Retrieves transaction ledger history for a party.
   * GET /api/parties/:id/transactions
   */
  getPartyTransactions: async (
    id: string,
    params?: PartyTransactionsParams
  ): Promise<PartyTransactionsResponse> => {
    const { data } = await api.get<PartyTransactionsResponse>(`/parties/${id}/transactions`, {
      params,
    });
    return data;
  },

  /**
   * Creates a new customer or supplier party.
   * POST /api/parties
   */
  createParty: async (partyData: CreatePartyPayload): Promise<Party> => {
    const { data } = await api.post<{ party: Party }>("/parties", partyData);
    return data.party;
  },

  /**
   * Updates customer or supplier party details.
   * PUT /api/parties/:id
   */
  updateParty: async (id: string, partyData: Partial<CreatePartyPayload>): Promise<Party> => {
    const { data } = await api.put<{ party: Party }>(`/parties/${id}`, partyData);
    return data.party;
  },

  /**
   * Deletes a party by ID.
   * DELETE /api/parties/:id
   */
  deleteParty: async (id: string): Promise<void> => {
    await api.delete(`/parties/${id}`);
  },

  /**
   * Gets all parties with due amount.
   * GET /api/parties/due
   */
  getDueParties: async (): Promise<Party[]> => {
    const { data } = await api.get<{ parties: Party[] }>("/parties/due");
    return data.parties;
  },

  /**
   * Records a payment for a due amount.
   * POST /api/parties/:id/payment
   */
  recordPartyPayment: async (
    id: string,
    paymentDetails: { amount: number; paymentMethod?: string; notes?: string }
  ): Promise<unknown> => {
    const { data } = await api.post(`/parties/${id}/payment`, paymentDetails);
    return data;
  },
};
