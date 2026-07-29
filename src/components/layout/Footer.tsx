"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Documentation", href: "/docs" },
      { name: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "API Reference", href: "/api" },
      { name: "Status Page", href: "/status" },
      { name: "Community", href: "/community" },
    ],
  },
];

const SOCIAL = [
  { icon: <FaXTwitter className="w-3.5 h-3.5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="w-3.5 h-3.5" />, href: "#", label: "LinkedIn" },
  { icon: <FaGithub className="w-3.5 h-3.5" />, href: "#", label: "GitHub" },
  { icon: <FaYoutube className="w-3.5 h-3.5" />, href: "#", label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border text-muted-foreground pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-foreground">
                Zop<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The AI-native SaaS management & POS infrastructure built for speed, security, and continuous execution.
            </p>
            <div className="flex gap-2 mt-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary flex items-center justify-center transition-colors shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 ZopShop Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
