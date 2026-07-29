"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section className="bg-background py-20 lg:py-28 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-muted text-xs font-semibold uppercase tracking-wider text-primary">
            Get Started Today
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Start operating with ZopShop in seconds
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Join over 10,000+ modern merchants. 30-day free trial, zero credit card required.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="email"
              placeholder="Your work e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border border-border text-foreground placeholder-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <span>Start for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>Instant setup in 3 mins</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
