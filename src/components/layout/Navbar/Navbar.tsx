"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

// Shared components
import { NavbarLogo } from "./shared/NavbarLogo";
import { DesktopNav } from "./shared/DesktopNav";
import { MobileNav } from "./shared/MobileNav";
import { MobileDrawer } from "./shared/MobileDrawer";
import { ThemeToggle } from "./shared/ThemeToggle";
import { GreetingBanner } from "./shared/GreetingBanner";
import { UserActions } from "./shared/UserActions";
import ResponsiveComponents from "@/components/providers/ResponsiveComponents";
import { NAV_LINKS } from "./shared/constants";

export function Navbar({
  hideDashboardLink,
}: { hideDashboardLink?: boolean } = {}) {
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session;

  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showGreeting, setShowGreeting] = useState(isHome);
  const [greetingText, setGreetingText] = useState("");

  const isTransparent = isHome && !scrolled;

  // Set greeting based on time
  useEffect(() => {
    if (isHome) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreetingText("Good Morning");
      else if (hour >= 12 && hour < 17) setGreetingText("Good Afternoon");
      else if (hour >= 17 && hour < 21) setGreetingText("Good Evening");
      else setGreetingText("Good Night");

      const timer = setTimeout(() => setShowGreeting(false), 2500);
      return () => clearTimeout(timer);
    } else {
      setShowGreeting(false);
    }
  }, [isHome]);

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    const sections = NAV_LINKS.map((link) => link.href.substring(1));
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          width: showGreeting
            ? "260px"
            : scrolled
              ? "100%"
              : "calc(100% - 2rem)",
          maxWidth: showGreeting ? "260px" : scrolled ? "100%" : "72rem",
          y: scrolled && !showGreeting ? 0 : 16,
          x: "-50%",
          borderRadius: scrolled && !showGreeting ? 0 : 32,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ top: 0 }}
        className={cn(
          "fixed left-1/2 z-50 transition-colors duration-300",
          isTransparent
            ? "bg-white/30 dark:bg-slate-950/20 hover:bg-white/50 dark:hover:bg-slate-950/40 backdrop-blur-2xl border border-white/40 dark:border-slate-800/40 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm"
            : scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border"
              : "bg-background/80 backdrop-blur-xl border border-border/50 shadow-sm",
        )}
      >
        <ResponsiveComponents>
          <div className="relative w-full container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {showGreeting ? (
                <GreetingBanner
                  isVisible={showGreeting}
                  greetingText={greetingText}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex items-center justify-between"
                >
                  <NavbarLogo
                    className={cn(
                      isTransparent
                        ? "text-slate-900 dark:text-white"
                        : "text-foreground",
                    )}
                  />

                  {isHome && (
                    <DesktopNav
                      isTransparent={isTransparent}
                      activeSection={activeSection}
                    />
                  )}

                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <ThemeToggle />
                    <UserActions
                      isLoggedIn={isLoggedIn}
                      hideDashboardLink={hideDashboardLink}
                      onClose={() => setIsOpen(false)}
                    />
                  </div>

                  <MobileNav
                    isTransparent={isTransparent}
                    onMenuOpen={() => setIsOpen(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ResponsiveComponents>
      </motion.header>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeSection={activeSection}
        isLoggedIn={isLoggedIn}
        hideDashboardLink={hideDashboardLink}
      />
    </>
  );
}
