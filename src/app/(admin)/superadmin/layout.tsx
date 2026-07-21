"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { SuperadminSidebar } from "@/components/dashboard/SuperadminSidebar";
import { SuperadminHeader } from "@/components/dashboard/SuperadminHeader";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "SUPERADMIN") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== "SUPERADMIN") {
    return <div className="h-screen w-full flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* Sidebar - fixed on the left */}
      <SuperadminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <SuperadminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar bg-muted/20">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
