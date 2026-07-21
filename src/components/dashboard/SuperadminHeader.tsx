"use client";

import { Menu, LogOut, ChevronDown } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

export function SuperadminHeader() {
  const toggleSidebar = useSidebar((state) => state.toggle);
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const router = useRouter();

  // Simple breadcrumb logic
  const paths = pathname.split("/").filter(Boolean);
  const isDashboardRoot = paths.length === 1 && paths[0] === "superadmin";

  const handleSignoutUser = async () => {
    await authClient.signOut();
    toast.success("Logout successfull");
    router.push("/login");
  };

  const userName = user?.name || "Super Admin";
  const userEmail = user?.email || "admin@zopshop.com";
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "SA";

  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-background sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile: hamburger */}
        <button
          onClick={toggleSidebar}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted/50 text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Breadcrumb — desktop */}
        <div className="hidden sm:flex items-center text-sm">
          <span className="text-muted-foreground">Admin Portal</span>
          {!isDashboardRoot && paths.length > 1 && (
            <>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground font-medium capitalize">
                {paths[paths.length - 1]}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3 relative">
        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            className={cn(
              "flex items-center gap-2 border border-border bg-card hover:bg-muted/40 rounded-md px-2.5 py-1 text-xs font-semibold text-foreground transition-all duration-200 outline-none select-none",
              showAvatarMenu && "border-rose-500/50",
            )}
          >
            <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-[10px] font-bold text-rose-600 ring-1 ring-rose-500/20 shrink-0">
              {initials}
            </div>
            <span className="hidden sm:inline font-medium text-foreground text-xs">
              {userName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0" />
          </button>

          {showAvatarMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowAvatarMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-150">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center ring-2 ring-rose-500/20 shrink-0">
                      <span className="text-sm font-semibold text-rose-600">
                        {initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {userName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]" title={userEmail}>
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div className="py-1">
                  <button
                    onClick={handleSignoutUser}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
