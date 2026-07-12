import Link from "next/link";
import { Container } from "../ui/Container";
import { Building2, Package, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="glass-hero py-20 lg:py-32 relative overflow-hidden">
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-8 animate-fade-in border border-primary/20">
          New! Inventory 2.0 Released
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl mb-6">
          <span className="text-gradient">Smart Inventory Management</span>
          <br /> for Your Business
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
          ZopShop - Simple, Smart, Secure. Everything you need to manage your inventory in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="glass-btn bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 rounded-full font-semibold"
          >
            Get Started Free
          </Link>
          <Link
            href="#demo"
            className="glass-btn border-2 border-primary text-primary hover:bg-primary/5 text-lg px-8 py-4 rounded-full font-semibold"
          >
            See Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-2xl">10K+</h4>
            <p className="text-muted-foreground">Businesses</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-2xl">50K+</h4>
            <p className="text-muted-foreground">Products</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-2xl">99.9%</h4>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
