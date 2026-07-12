"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold text-gradient">ZopShop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="glass-btn bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full text-sm font-medium"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <Link
            href="/register"
            className="glass-btn bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-full text-xs font-medium"
          >
            Get Started
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-foreground/80 hover:text-primary transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-full max-w-xs glass-modal shadow-xl p-6 transition-transform duration-300 ease-in-out flex flex-col gap-6",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gradient">ZopShop</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border my-2" />
            <Link
              href="/login"
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="glass-btn bg-primary text-primary-foreground hover:bg-primary/90 text-center w-full mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
