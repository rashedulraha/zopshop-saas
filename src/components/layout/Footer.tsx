"use client";

import Link from "next/link";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Security", href: "#" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "API Docs", href: "#" },
      { name: "Community", href: "#" },
      { name: "Guides", href: "#" },
    ],
  },
];

const SOCIAL = [
  { icon: <FaXTwitter className="w-3.5 h-3.5" />, href: "#", label: "Twitter" },
  {
    icon: <FaLinkedin className="w-3.5 h-3.5" />,
    href: "#",
    label: "LinkedIn",
  },
  { icon: <FaGithub className="w-3.5 h-3.5" />, href: "#", label: "GitHub" },
  { icon: <FaYoutube className="w-3.5 h-3.5" />, href: "#", label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 mt-auto pt-14 pb-8 overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4">
      {/* Top border glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
      />

      <ResponsiveComponents>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 max-w-7xl mx-auto">
          {/* Brand column */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 no-underline group"
            >
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Zop<span className="text-blue-600 dark:text-blue-400">Shop</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              The simple, smart, and secure inventory management platform for
              modern businesses.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm transition-all duration-200 hover:translate-x-0.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 no-underline font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-slate-800 max-w-7xl mx-auto relative">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Copyright © 2026 ZopShop Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
            >
              Terms of Service
            </Link>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="md:absolute right-0 -top-20 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </ResponsiveComponents>
    </footer>
  );
}
