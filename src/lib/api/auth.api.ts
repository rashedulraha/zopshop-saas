import { api } from "../axios";
import { User, Store } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface SessionResponse {
  user: User;
  store?: Store | null;
}

/**
 * Auth API service using the better-auth HTTP endpoints.
 * These are called via the axios instance (with withCredentials: true),
 * so session cookies are handled automatically by better-auth.
 */
export const authApi = {
  /**
   * Sign in with email and password.
   * POST /auth/sign-in/email
   */
  login: async (credentials: LoginPayload): Promise<{ user: User }> => {
    const { data } = await api.post<{ user: User }>("/auth/sign-in/email", credentials);
    return data;
  },

  /**
   * Register a new user with name, email, and password.
   * POST /auth/sign-up/email
   */
  register: async (payload: RegisterPayload): Promise<{ user: User }> => {
    const { data } = await api.post<{ user: User }>("/auth/sign-up/email", payload);
    return data;
  },

  /**
   * Sign out the current user and invalidate their session cookie.
   * POST /auth/sign-out
   */
  logout: async (): Promise<void> => {
    await api.post("/auth/sign-out");
  },

  /**
   * Get the current authenticated session.
   * GET /auth/get-session
   */
  getSession: async (): Promise<SessionResponse> => {
    const { data } = await api.get<SessionResponse>("/auth/get-session");
    return data;
  },
};
