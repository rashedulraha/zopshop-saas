"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

/**
 * AuthProvider calls checkAuth on initial app load to validate the
 * user's session with the backend (via better-auth HTTP-only cookie).
 * If the session is invalid or expired, the store will clear the auth state
 * and the user will be redirected to login by the middleware.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
