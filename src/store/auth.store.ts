import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import { authClient } from "@/lib/auth-client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: false,
      error: null,

      /**
       * Sign in using better-auth email/password flow.
       * better-auth sets an HTTP-only cookie automatically on success.
       */
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await authClient.signIn.email({ email, password });

          if (error) {
            const errMsg = error.message || "Login failed. Please check your credentials.";
            set({ isLoading: false, error: errMsg });
            throw new Error(errMsg);
          }

          set({
            user: data?.user as unknown as User || null,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          const errMsg = err.message || "Login failed";
          set({ isLoading: false, error: errMsg });
          throw err;
        }
      },

      /**
       * Register a new user using better-auth sign-up flow.
       */
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await authClient.signUp.email({ name, email, password });

          if (error) {
            const errMsg = error.message || "Registration failed. Please try again.";
            set({ isLoading: false, error: errMsg });
            throw new Error(errMsg);
          }

          // After registration, user may need to verify email or go directly to login
          set({ isLoading: false });
        } catch (err: any) {
          const errMsg = err.message || "Registration failed";
          set({ isLoading: false, error: errMsg });
          throw err;
        }
      },

      /**
       * Sign out the user - better-auth clears the session cookie on the server.
       */
      logout: async () => {
        set({ isLoading: true });
        try {
          await authClient.signOut();
        } catch (err) {
          console.error("Logout API call failed, proceeding with local logout", err);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      /**
       * Check the current session on app load via better-auth.
       * Uses the HTTP-only session cookie to verify with the server.
       */
      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const { data } = await authClient.getSession();

          if (data?.user) {
            set({
              user: data.user as unknown as User,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
          }
        } catch (err) {
          set({ user: null, isAuthenticated: false, isCheckingAuth: false });
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
        // SSR-safe dummy storage
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Only persist user data (session is managed via HTTP-only cookie by better-auth)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
