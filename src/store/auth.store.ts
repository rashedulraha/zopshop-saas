import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, LoginPayload, RegisterPayload } from "@/types";
import { authApi } from "@/lib/api/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;

  login: (credentials: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login(credentials);
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", res.token);
          }
        } catch (err: any) {
          const errMsg = err.response?.data?.message || err.message || "Login failed";
          set({ isLoading: false, error: errMsg });
          throw err;
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.register(payload);
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", res.token);
          }
        } catch (err: any) {
          const errMsg = err.response?.data?.message || err.message || "Registration failed";
          set({ isLoading: false, error: errMsg });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authApi.logout();
        } catch (err) {
          console.error("Logout API call failed, proceeding with local logout", err);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("token");
          }
        }
      },

      checkAuth: async () => {
        const storedToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        const currentToken = get().token || storedToken;

        if (!currentToken) {
          set({ isAuthenticated: false, user: null, token: null, isCheckingAuth: false });
          return;
        }

        set({ isCheckingAuth: true, error: null });
        try {
          const res = await authApi.getSession();
          // If the backend returns a new token in the response, we store it. Otherwise, keep current token.
          const tokenToUse = res.token || currentToken;
          set({
            user: res.user,
            token: tokenToUse,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
          if (typeof window !== "undefined" && tokenToUse) {
            localStorage.setItem("accessToken", tokenToUse);
          }
        } catch (err) {
          // If the session check fails (expired token etc.), clear the local auth state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("token");
          }
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "zopshop-auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Dummy storage object during SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Select fields to persist in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
