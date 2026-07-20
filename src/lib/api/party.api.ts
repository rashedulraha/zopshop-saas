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
    const { data } = await api.get<Party>(`/parties/${id}`);
    return data;
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
    const { data } = await api.post<Party>("/parties", partyData);
    return data;
  },

  /**
   * Updates customer or supplier party details.
   * PUT /api/parties/:id
   */
  updateParty: async (id: string, partyData: Partial<CreatePartyPayload>): Promise<Party> => {
    const { data } = await api.put<Party>(`/parties/${id}`, partyData);
    return data;
  },

  /**
   * Deletes a party by ID.
   * DELETE /api/parties/:id
   */
  deleteParty: async (id: string): Promise<void> => {
    await api.delete(`/parties/${id}`);
  },
};
