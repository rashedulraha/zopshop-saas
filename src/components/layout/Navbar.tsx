"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Layers,
  HelpCircle,
  CreditCard,
  Info,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { axiosServics } from "@/axios/axios.service";

const NAV_LINKS = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Features", href: "#features", icon: Layers },
  { name: "How It Works", href: "#how-it-works", icon: HelpCircle },
  { name: "Pricing", href: "#pricing", icon: CreditCard },
  { name: "About", href: "#about", icon: Info },
  { name: "Contact", href: "#contact", icon: Mail },
];

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
} as const;

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 25 },
  },
  closed: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.15 },
  },
} as const;

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // use session
  const data = axiosServics.useSession();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    setIsLoggedIn(!!token);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          width: scrolled ? "100%" : "calc(100% - 2rem)",
          maxWidth: scrolled ? "100%" : "72rem",
          y: scrolled ? 0 : 16,
          x: "-50%",
          borderRadius: scrolled ? 0 : 32,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ top: 0 }}
        className={cn(
          "fixed left-1/2 z-50 transition-colors duration-300",
          isTransparent
            ? "bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 text-white/90 hover:text-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.1)] shadow-sm"
            : scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border"
              : "bg-background/80 backdrop-blur-xl border border-border/50 shadow-sm",
        )}
      >
        {/* Container */}
        <ResponsiveComponents>
          <div className="relative w-full container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <span
                className={cn(
                  "font-bold text-lg tracking-tight",
                  isTransparent ? "text-white" : "text-foreground",
                )}
              >
                Zop<span className="text-primary-light">Shop</span>
              </span>
            </Link>

            {/* Desktop Nav - Centered */}
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
                          ? "text-white"
                          : "text-primary"
                        : isTransparent
                          ? "text-white/80 hover:text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className={cn(
                          "absolute inset-0 rounded-lg -z-10",
                          isTransparent ? "bg-white/20" : "bg-primary/10",
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

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <ThemeToggle />
              {isLoggedIn ? (
                <Button
                  size="sm"
                  render={<Link href="/dashboard" />}
                  nativeButton={false}
                  className="bg-primary text-primary-foreground hover:bg-primary-dark"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/login" />}
                    nativeButton={false}
                    className={cn(
                      isTransparent
                        ? "text-white hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    render={<Link href="/register" />}
                    nativeButton={false}
                    className="bg-primary text-primary-foreground hover:bg-primary-dark"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  isTransparent
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    : "border-border bg-muted/50 hover:bg-muted text-foreground",
                )}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </ResponsiveComponents>
      </motion.header>

      {/* ═══ MOBILE DRAWER ═══ */}
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
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 320 }}
              dragElastic={{ left: 0.05, right: 0.6 }}
              onDragEnd={(e, info) => {
                // If dragged to the right by more than 100px, close
                if (info.offset.x > 100) {
                  setIsOpen(false);
                }
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-xs md:hidden flex flex-col bg-background/95 backdrop-blur-2xl border-l border-border shadow-2xl touch-pan-y"
            >
              {/* Subtle top gradient glow */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

              {/* Drawer Header */}
              <div className="relative flex items-center justify-between px-5 h-16 border-b border-border">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-bold text-base text-foreground">
                    Zop<span className="text-primary-light">Shop</span>
                  </span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border bg-muted/50 hover:bg-muted"
                  onClick={() => setIsOpen(false)}
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
                          setIsOpen(false);
                          if (link.href.startsWith("#")) {
                            e.preventDefault();
                            setTimeout(() => {
                              const target = document.querySelector(link.href);
                              if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 300); // Wait for drawer to close
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

              {/* Drawer Footer Actions */}
              <div className="relative p-4 border-t border-border bg-muted/30 flex flex-col gap-3">
                {isLoggedIn ? (
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-light transition-colors duration-300"
                    render={
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                      />
                    }
                    nativeButton={false}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-border"
                      render={
                        <Link href="/login" onClick={() => setIsOpen(false)} />
                      }
                      nativeButton={false}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary-light transition-colors duration-300"
                      render={
                        <Link
                          href="/register"
                          onClick={() => setIsOpen(false)}
                        />
                      }
                      nativeButton={false}
                    >
                      Get Started Free
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
