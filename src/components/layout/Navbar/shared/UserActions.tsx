import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserActionsProps {
  isLoggedIn: boolean;
  userRole?: string;
  hideDashboardLink?: boolean;
  onClose: () => void;
}

export function UserActions({
  isLoggedIn,
  userRole,
  hideDashboardLink,
  onClose,
}: UserActionsProps) {
  if (isLoggedIn) {
    if (hideDashboardLink) return null;

    const isSuperAdmin = userRole === "SUPERADMIN";
    const dashboardHref = isSuperAdmin ? "/superadmin" : "/dashboard";
    const dashboardLabel = isSuperAdmin ? "Super Admin Panel" : "Go to Dashboard";

    return (
      <Button
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary-light transition-colors duration-300"
        render={<Link href={dashboardHref} onClick={onClose} />}
        nativeButton={false}
      >
        {dashboardLabel}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        onClick={onClose}
        className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-2 py-1"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        onClick={onClose}
        className="text-sm font-medium bg-[#615fff] hover:bg-[#5250e6] text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm"
      >
        Sign up
      </Link>
    </div>
  );
}
