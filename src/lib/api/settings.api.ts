import { api } from "../axios";

export const settingsApi = {
  /**
   * Get tax settings
   * GET /api/settings/tax
   */
  getTaxSettings: async (): Promise<unknown> => {
    const { data } = await api.get("/settings/tax");
    return data.data || data;
  },

  /**
   * Get backup settings
   * GET /api/settings/backup
   */
  getBackupSettings: async (): Promise<unknown> => {
    const { data } = await api.get("/settings/backup");
    return data.data || data;
  },

  /**
   * Get security settings
   * GET /api/settings/security
   */
  getSecuritySettings: async (): Promise<unknown> => {
    const { data } = await api.get("/settings/security");
    return data.data || data;
  },
};
