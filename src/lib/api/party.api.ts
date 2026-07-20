import { api } from "../axios";
import { Party, PartyType } from "@/types";

export const partyApi = {
  getParties: async (params?: { type?: PartyType; search?: string }): Promise<Party[]> => {
    const { data } = await api.get<Party[]>("/parties", { params });
    return data;
  },

  getParty: async (id: string): Promise<Party> => {
    const { data } = await api.get<Party>(`/parties/${id}`);
    return data;
  },

  createParty: async (partyData: Partial<Party>): Promise<Party> => {
    const { data } = await api.post<Party>("/parties", partyData);
    return data;
  },

  updateParty: async (id: string, partyData: Partial<Party>): Promise<Party> => {
    const { data } = await api.put<Party>(`/parties/${id}`, partyData);
    return data;
  },

  deleteParty: async (id: string): Promise<void> => {
    await api.delete(`/parties/${id}`);
  },
};
