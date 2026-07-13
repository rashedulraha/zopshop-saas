import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | ZopShop",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="text-center mb-10 space-y-5">
        <h1 className="text-8xl md:text-9xl font-bold text-primary opacity-80 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Oops! The page you are looking for doesn't exist. But hey, here's a
          dinosaur to keep you company.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary-dark transition-all duration-300 font-medium shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
