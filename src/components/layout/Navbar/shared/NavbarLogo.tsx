import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <span className={cn("font-bold text-lg tracking-tight", className)}>
        Zop<span className="text-primary">Shop</span>
      </span>
    </Link>
  );
}
