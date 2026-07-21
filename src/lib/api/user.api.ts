import { api } from "../axios";

export interface Role {
  id: string;
  name: string;
}

export interface Permission {
  id: string;
  action: string;
  resource: string;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  roleId: string;
  role: Role;
}

export const userApi = {
  /**
   * Get all users
   * GET /api/users
   */
  getAllUsers: async (): Promise<UserDetail[]> => {
    const { data } = await api.get<{ data: UserDetail[] }>("/users");
    return data.data;
  },

  /**
   * Get all roles
   * GET /api/roles
   */
  getAllRoles: async (): Promise<Role[]> => {
    const { data } = await api.get<{ data: Role[] }>("/roles");
    return data.data;
  },

  /**
   * Get all permissions
   * GET /api/permissions
   */
  getAllPermissions: async (): Promise<Permission[]> => {
    const { data } = await api.get<{ data: Permission[] }>("/permissions");
    return data.data;
  },
};
