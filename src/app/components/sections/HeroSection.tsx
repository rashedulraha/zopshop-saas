import Link from "next/link";
import { Container } from "../ui/Container";
import { Building2, Package, ShieldCheck, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[400px] w-[800px] opacity-20 blur-[100px] bg-primary/40 rounded-full"></div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <Link
          href="#features"
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-8 hover:bg-primary/20 transition-colors border border-primary/20"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          New! Inventory 1.0 Released
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Heading */}
        <h1 className="max-w-4xl mb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Smart Inventory Management <br className="hidden md:block" />
          <span className="text-primary">for Your Business</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
          ZopShop is the simple, smart, and secure platform. Get everything you need to manage your inventory, sales, and profits in one unified dashboard.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
          <Link
            href="#demo"
            className="w-full sm:w-auto bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground text-lg px-8 py-4 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            See Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-10 border-t border-border w-full max-w-4xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-3xl md:text-4xl text-foreground">0+</h4>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Businesses</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-3xl md:text-4xl text-foreground">0K+</h4>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Products</p>
          </div>
          <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-3xl md:text-4xl text-foreground">0%</h4>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Uptime</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
