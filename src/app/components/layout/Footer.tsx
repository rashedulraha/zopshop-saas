import Link from "next/link";
import { Container } from "../ui/Container";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-secondary/50 mt-auto pt-16 pb-8 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Product */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-1">Product</h3>
            <Link href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Security</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-1">Company</h3>
            <Link href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-1">Resources</h3>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">API Docs</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Community</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Guides</Link>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-foreground tracking-wider uppercase mb-1">Social</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm rotate-45" />
            <div className="text-sm font-bold tracking-tight">ZopShop</div>
          </div>
          <p className="text-xs text-muted-foreground">
            Copyright © 2026 ZopShop Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
