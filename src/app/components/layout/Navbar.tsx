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
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <Container className="flex items-center justify-between h-20">
        {/* Left - Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2">
            {/* Minimalist Logo Icon Placeholder */}
            <div className="w-6 h-6 bg-primary rounded-sm rotate-45 flex-shrink-0" />
            <span className="text-xl md:text-2xl font-extrabold tracking-tight">ZopShop</span>
          </Link>
        </div>

        {/* Middle - Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right - Desktop Actions */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden flex-1 items-center justify-end gap-3">
          <ThemeToggle />
          <Link
            href="/register"
            className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-full text-xs font-semibold shadow-sm"
          >
            Get Started
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 text-foreground/80 hover:text-foreground transition-colors focus:outline-none"
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
            "fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-xl p-6 transition-transform duration-300 ease-in-out flex flex-col gap-8 border-l border-border",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-5 h-5 bg-primary rounded-sm rotate-45" />
              <span className="text-xl font-extrabold tracking-tight">ZopShop</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-border/50 my-2" />
            <Link
              href="/login"
              className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-foreground text-background hover:bg-foreground/90 py-3 rounded-full text-center font-semibold mt-2"
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
