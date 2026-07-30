"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { storeApi } from "@/lib/api/store.api";
import { OnboardingForm } from "./OnboardingForm";
import { Loader2, Store } from "lucide-react";

export function OnboardingClient() {
  const router = useRouter();
  const { user, isCheckingAuth } = useAuthStore();
  const [isCheckingStore, setIsCheckingStore] = useState(true);

  useEffect(() => {
    async function verifyStoreStatus() {
      // 1. If super admin, redirect to superadmin panel
      if (user?.role === "SUPERADMIN") {
        router.replace("/superadmin");
        return;
      }

      // 2. Check if activeStoreId is already in localStorage or user profile
      const localStoreId = typeof window !== "undefined" ? localStorage.getItem("activeStoreId") : null;
      if (localStoreId || user?.storeId) {
        if (user?.storeId && !localStoreId && typeof window !== "undefined") {
          localStorage.setItem("activeStoreId", user.storeId);
        }
        router.replace("/dashboard");
        return;
      }

      // 3. Fetch stores from backend to check if user already created a store
      try {
        const stores = await storeApi.getStores();
        if (stores && stores.length > 0) {
          if (typeof window !== "undefined") {
            localStorage.setItem("activeStoreId", stores[0].id);
          }
          router.replace("/dashboard");
          return;
        }
      } catch (err) {
        console.error("Failed to check user stores:", err);
      }

      // 4. No stores found — ready to render OnboardingForm
      setIsCheckingStore(false);
    }

    if (!isCheckingAuth) {
      verifyStoreStatus();
    }
  }, [user, isCheckingAuth, router]);

  if (isCheckingAuth || isCheckingStore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <Store className="w-6 h-6 text-primary" />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span>Verifying store status...</span>
        </div>
      </div>
    );
  }

  return <OnboardingForm />;
}
