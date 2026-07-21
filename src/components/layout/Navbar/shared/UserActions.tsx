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
    <>
      <Button
        variant="outline"
        className="w-full md:w-auto border-border"
        render={<Link href="/login" onClick={onClose} />}
        nativeButton={false}
      >
        Sign In
      </Button>
      <Button
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary-light transition-colors duration-300"
        render={<Link href="/register" onClick={onClose} />}
        nativeButton={false}
      >
        Get Started Free
      </Button>
    </>
  );
}
