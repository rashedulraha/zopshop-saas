import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/components/layout/Navbar/shared/constants";
import { UserActions } from "./UserActions";
import { Button } from "@/components/ui/button";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  isLoggedIn: boolean;
  hideDashboardLink?: boolean;
}

export function MobileDrawer({
  isOpen,
  onClose,
  activeSection,
  isLoggedIn,
  hideDashboardLink,
}: MobileDrawerProps) {
  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
    closed: {
      opacity: 0,
      x: 24,
      transition: { duration: 0.15 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 320 }}
            dragElastic={{ left: 0.05, right: 0.6 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) {
                onClose();
              }
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-xs md:hidden flex flex-col bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl touch-pan-y"
          >
            {/* Top gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            {/* Drawer Header */}
            <div className="relative flex items-center justify-between px-5 h-16 border-b border-border">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={onClose}
              >
                <span className="font-bold text-base text-foreground">
                  Zop<span className="text-primary-light">Shop</span>
                </span>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="border-border bg-muted/50 hover:bg-muted"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Drawer Nav */}
            <motion.nav
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative flex flex-col p-4 flex-1 gap-1 overflow-y-auto"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                const LinkIcon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 group",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                      onClick={(e) => {
                        onClose();
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          setTimeout(() => {
                            const target = document.querySelector(link.href);
                            if (target) {
                              target.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 300);
                        }
                      }}
                    >
                      <LinkIcon
                        className={cn(
                          "w-5 h-5 mr-3 transition-colors duration-200",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Drawer Footer */}
            <div className="relative p-4 border-t border-border bg-muted/30 flex flex-col gap-3">
              <UserActions
                isLoggedIn={isLoggedIn}
                hideDashboardLink={hideDashboardLink}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
