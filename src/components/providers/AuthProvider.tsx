"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";

/**
 * AuthProvider calls checkAuth on initial app load to validate the
 * user's session with the backend (via better-auth HTTP-only cookie).
 * Also handles route protection for /dashboard and /onboarding based on store setup.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isMounted) return;
    
    const hasStore = !!localStorage.getItem("activeStoreId");
    
    // If accessing dashboard without a store
    if (pathname.startsWith("/dashboard") && !hasStore) {
      router.replace("/onboarding");
    }
    
    // If accessing onboarding but already has a store
    if (pathname === "/onboarding" && hasStore) {
      router.replace("/dashboard");
    }
  }, [pathname, isMounted, router]);

  return <>{children}</>;
}
