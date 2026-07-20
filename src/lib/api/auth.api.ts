import { api } from "../axios";
import { LoginPayload, RegisterPayload, AuthResponse, User, Store } from "@/types";

export interface SessionResponse {
  user: User;
  store?: Store | null;
  token?: string;
}

export const authApi = {
  /**
   * Logs in a user using email and password.
   */
  login: async (credentials: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/sign-in/email", credentials);
    return data;
  },

  /**
   * Registers a new user.
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/sign-up/email", payload);
    return data;
  },

  /**
   * Invalidates user session and logs them out.
   */
  logout: async (): Promise<void> => {
    await api.post("/signout");
  },

  /**
   * Retrieves the current authenticated user's session.
   */
  getSession: async (): Promise<SessionResponse> => {
    const { data } = await api.get<SessionResponse>("/me");
    return data;
  },
};
