import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/components/layout/Navbar/shared/constants";

interface DesktopNavProps {
  isTransparent?: boolean;
  activeSection: string;
}

export function DesktopNav({ isTransparent, activeSection }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href.substring(1);
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => {
              if (link.href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
              isActive
                ? isTransparent
                  ? "text-primary dark:text-primary-light"
                  : "text-primary"
                : isTransparent
                  ? "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="activeNavBackground"
                className={cn(
                  "absolute inset-0 rounded-lg -z-10",
                  isTransparent
                    ? "bg-slate-200/50 dark:bg-slate-800/50"
                    : "bg-primary/10",
                )}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
