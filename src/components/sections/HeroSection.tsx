"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import DemoDashboard from "../dmeoDashboard/DemoDashboard";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor(window.innerWidth / 30));
      const colors = [
        "rgba(79, 70, 229, 0.4)", // primary
        "rgba(139, 92, 246, 0.3)", // accent purple
        "rgba(6, 182, 212, 0.3)", // cyan
      ];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // We removed `if (!isMounted) return null;` to ensure the section is in the DOM for IntersectionObserver to find `#home`.

  return (
    <section id="home" className="relative flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-background via-background/95 to-background pt-24 sm:pt-32">
      {/* ===== ANIMATED PARTICLE BACKGROUND ===== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* ===== GRADIENT ORBS (CSS fallback/enhancement) ===== */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[130px] animate-pulse delay-2000 pointer-events-none" />

      {/* Premium grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ===== FLOATING GEOMETRIC SHAPES ===== */}
      <div className="absolute top-20 left-[10%] w-20 h-20 border border-primary/10 rounded-2xl rotate-12 animate-float hidden lg:block" />
      <div className="absolute top-40 right-[15%] w-16 h-16 bg-primary/5 rounded-full animate-float-delayed hidden lg:block" />
      <div className="absolute bottom-1/3 left-[5%] w-12 h-12 border border-accent/20 rounded-lg -rotate-12 animate-float hidden lg:block" />
      <div className="absolute top-1/2 right-[8%] w-24 h-24 border border-primary/10 rounded-full animate-float-delayed hidden lg:block" />

      {/* ===== HERO CONTENT ===== */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10 pb-12">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-primary shadow-lg shadow-primary/5 transition-all duration-1000 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Agentic POS Stack</span>
        </div>

        {/* Main Headline */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground transition-all duration-1000 delay-200 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          One POS System. <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              For Every Business.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C50 2 150 2 198 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Description */}
        <p
          className={`text-base sm:text-lg font-normal text-muted-foreground leading-relaxed max-w-2xl mb-10 transition-all duration-1000 delay-300 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Configure your POS for any industry in seconds. No code changes. No
          complex setup. Just powerful management built for speed.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mb-4 transition-all duration-1000 delay-500 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300 group"
          >
            <Play className="mr-2 w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust indicator */}
        <p
          className={`text-sm text-muted-foreground/60 transition-all duration-1000 delay-700 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          30-day free trial &nbsp;·&nbsp; No credit card required
        </p>
      </div>

      {/* ===== DASHBOARD SHOWCASE WITH CREATIVE FRAME ===== */}
      <div
        className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 transition-all duration-1000 delay-700 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Glow behind dashboard */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-3xl opacity-50" />

        {/* Dashboard container */}
        <div className="relative rounded-xl border border-primary/20 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/10 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full max-w-sm mx-auto h-6 rounded-md bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground font-mono">
                your-store.pos.app/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <div className="relative">
            <DemoDashboard />
            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
      </div>
    </section>
  );
}
