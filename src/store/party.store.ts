import { create } from "zustand";
import { Party, CreatePartyPayload, Transaction } from "@/types";
import { partyApi, PartyTransactionsParams } from "@/lib/api/party.api";

interface PartyFilters {
  page: number;
  limit: number;
  search: string;
  type: "CUSTOMER" | "SUPPLIER" | "BOTH" | null;
}

interface PartyState {
  // State
  parties: Party[];
  currentParty: Party | null;
  currentBalance: number | null;
  partyTransactions: Transaction[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  search: string;
  type: "CUSTOMER" | "SUPPLIER" | "BOTH" | null;

  // Actions
  fetchParties: (params?: Partial<PartyFilters>) => Promise<void>;
  fetchPartyById: (id: string) => Promise<void>;
  fetchPartyBalance: (id: string) => Promise<void>;
  fetchPartyTransactions: (id: string, params?: PartyTransactionsParams) => Promise<void>;
  createParty: (data: CreatePartyPayload) => Promise<Party>;
  updateParty: (id: string, data: Partial<CreatePartyPayload>) => Promise<Party>;
  deleteParty: (id: string) => Promise<void>;
  setFilters: (filters: Partial<PartyFilters>) => void;
  reset: () => void;
}

const initialState = {
  parties: [],
  currentParty: null,
  currentBalance: null,
  partyTransactions: [],
  isLoading: false,
  total: 0,
  page: 1,
  limit: 10,
  search: "",
  type: null,
};

export const usePartyStore = create<PartyState>((set, get) => ({
  ...initialState,

  /**
   * Fetches parties with the current active filters.
   */
  fetchParties: async (params) => {
    set({ isLoading: true });

    const state = get();
    const page = params?.page !== undefined ? params.page : state.page;
    const limit = params?.limit !== undefined ? params.limit : state.limit;
    const search = params?.search !== undefined ? params.search : state.search;
    const type = params?.type !== undefined ? params.type : state.type;

    try {
      const response = await partyApi.getAllParties({
        page,
        limit,
        search: search || undefined,
        type: type || undefined,
      });

      set({
        parties: response.parties || [],
        total: response.total || 0,
        page,
        limit,
        search,
        type,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Fetches a single party details by ID.
   */
  fetchPartyById: async (id) => {
    set({ isLoading: true });
    try {
      const party = await partyApi.getPartyById(id);
      set({ currentParty: party, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Fetches the balance of a specific party.
   */
  fetchPartyBalance: async (id) => {
    set({ isLoading: true });
    try {
      const response = await partyApi.getPartyBalance(id);
      set({ currentBalance: response.balance, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Fetches transactions associated with a party.
   */
  fetchPartyTransactions: async (id, params) => {
    set({ isLoading: true });
    try {
      const response = await partyApi.getPartyTransactions(id, params);
      set({ partyTransactions: response.transactions || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Creates a new customer or supplier and auto-refetches the list.
   */
  createParty: async (data) => {
    set({ isLoading: true });
    try {
      const newParty = await partyApi.createParty(data);
      set({ isLoading: false });
      // Refresh active list using current filter state parameters
      await get().fetchParties();
      return newParty;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Updates customer/supplier details and auto-refetches the list.
   */
  updateParty: async (id, data) => {
    set({ isLoading: true });
    try {
      const updatedParty = await partyApi.updateParty(id, data);
      set({ isLoading: false });
      // Refresh active list using current filter state parameters
      await get().fetchParties();
      
      // If we are currently viewing this party, update details in store state
      if (get().currentParty?.id === id) {
        set({ currentParty: updatedParty });
      }
      return updatedParty;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Deletes a party and auto-refetches the list.
   */
  deleteParty: async (id) => {
    set({ isLoading: true });
    try {
      await partyApi.deleteParty(id);
      set({ isLoading: false });
      // Refresh active list using current filter state parameters
      await get().fetchParties();

      // Clear current details if the viewed party was deleted
      if (get().currentParty?.id === id) {
        set({ currentParty: null, currentBalance: null, partyTransactions: [] });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Sets/updates filters and auto-triggers a fetch.
   */
  setFilters: (filters) => {
    set(filters);
    get().fetchParties();
  },

  /**
   * Resets the store state back to initial state values.
   */
  reset: () => {
    set(initialState);
  },
}));
