import Link from "next/link";
import { Container } from "../ui/Container";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";


export function Footer() {
  return (
    <footer className="glass mt-auto pt-16 pb-8 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Product */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API Docs</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Social</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold text-gradient">ZopShop</div>
          <p className="text-sm text-muted-foreground">
            © 2026 ZopShop. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
