"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden z-10 pt-24 pb-12 lg:pt-32 lg:pb-20 flex flex-col items-center text-center min-h-screen justify-center"
    >
      {/* Video Background with Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
        {isMounted ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero_video/flower-field.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="/hero_video/flower-field.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url('/hero_video/flower-field.jpg')" }}
          />
        )}
        {/* Subtle radial overlay directly behind text for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      <ResponsiveComponents>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-10 px-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 bg-primary/10 border border-primary/20 text-indigo-300 backdrop-blur-md animate-fade-in-up animation-delay-100"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            🌱 Nurture Your Business Growth
          </div>

          <h1
            className="max-w-4xl mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] animate-fade-in-up animation-delay-200"
          >
            Smart{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(99,102,241,0.3)]">
              POS & Inventory
            </span>{" "}
            <br className="hidden sm:block" />
            for Retail & Businesses.
          </h1>

          <p
            className="max-w-2xl mb-10 text-base md:text-lg text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-fade-in-up animation-delay-300"
          >
            Track stock in real-time, print instant POS invoices, manage customer dues,
            and monitor sales analytics — all in one powerful cloud platform built
            for modern retailers.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in-up animation-delay-400"
          >
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-6 text-sm font-semibold group transition-all duration-300 shadow-[0_4px_20px_rgba(79,70,229,0.35)]"
            >
              Start 30-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-sm font-semibold bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white/90 hover:text-white transition-all duration-300"
            >
              How it works
            </Button>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
