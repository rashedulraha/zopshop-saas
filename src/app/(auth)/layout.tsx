import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Star, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-background text-foreground overflow-hidden">
      {/* Left Panel: Trust Building (Hidden on Mobile, ~60% width on Desktop) */}
      <div className="hidden lg:flex flex-col w-[60%] relative bg-muted text-foreground p-12 justify-between overflow-hidden border-r border-border">
        {/* Subtle premium gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_80%)] opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--primary)_0%,transparent_50%)] opacity-10 pointer-events-none" />

        {/* Header (Logo) */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 w-fit no-underline"
        >
          <span className="font-extrabold text-xl tracking-tight text-foreground">
            Zop<span className="text-primary">Shop</span>
          </span>
        </Link>

        {/* Main Trust Content (Typography focus) */}
        <div className="relative z-10 max-w-2xl my-auto">
          <h1 className="text-5xl xl:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-foreground">
            Everything you need to scale your business.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            A beautiful, intuitive platform for managing your inventory,
            generating fast invoices, and unlocking powerful growth insights.
          </p>
        </div>

        {/* Minimalist Trust Badge */}
        <div className="relative z-10 flex items-center gap-4 border-t border-border pt-8 mt-12">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-muted bg-background flex items-center justify-center"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              Trusted by 2,000+ businesses
            </div>
            <div className="text-sm text-muted-foreground">
              Rated 4.9/5 on G2 and Capterra
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Auth Form (~40% width) */}
      <div className="w-full lg:w-[40%] relative flex flex-col justify-center items-center p-6 sm:p-12 overflow-y-auto">
        {/* Desktop Back Button */}
        <Link
          href="/"
          className="hidden lg:flex absolute top-6 left-6 z-20 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Floating Theme Toggle */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>

        {/* Mobile Logo (only visible on mobile) */}
        <Link
          href="/"
          className="lg:hidden absolute top-6 left-6 z-20 flex items-center gap-2 no-underline"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-sm">
            Z
          </div>
          <span className="font-extrabold text-xl tracking-tight text-foreground">
            Zop<span className="text-cyan-500">Shop</span>
          </span>
        </Link>

        {/* The Form Content */}
        <div className="w-full flex justify-center mt-20 lg:mt-0 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
