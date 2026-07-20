import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MobileNavProps {
  isTransparent?: boolean;
  onMenuOpen: () => void;
}

export function MobileNav({ isTransparent, onMenuOpen }: MobileNavProps) {
  return (
    <div className="flex md:hidden items-center gap-2">
      <ThemeToggle />
      <Button
        variant="outline"
        size="icon"
        className={cn(
          isTransparent
            ? "border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-950/60"
            : "border-border bg-muted/50 hover:bg-muted text-foreground",
        )}
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  );
}
