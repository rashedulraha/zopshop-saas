import Link from "next/link";
import { ThemeToggle } from "../components/ui/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Minimal Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded-sm rotate-45 flex-shrink-0" />
          <span className="text-xl font-extrabold tracking-tight">ZopShop</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content (Centered) */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 relative">
        {/* Decorative Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        {children}
      </main>
    </div>
  );
}
