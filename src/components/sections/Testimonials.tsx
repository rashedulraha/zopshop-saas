"use client";

import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "ZopShop saved my business! Now I track everything easily. The real-time updates are a game-changer for our daily operations.",
    author: "Rahim",
    role: "Grocery Store Owner",
    avatar: "R",
    avatarBg: "bg-cyan-500/10",
    avatarBorder: "border-cyan-500/20",
    avatarColor: "text-cyan-400",
    quoteColor: "text-cyan-400",
    cardClasses: "border-border",
  },
  {
    text: "Best inventory tool I've ever used. Simple and powerful. Our invoicing time went from 30 minutes to under 2 minutes.",
    author: "Sarah",
    role: "Hardware Shop",
    avatar: "S",
    avatarBg: "bg-purple-500/10",
    avatarBorder: "border-purple-500/20",
    avatarColor: "text-purple-400",
    quoteColor: "text-purple-400",
    featured: true,
    cardClasses: "border-cyan-500/30",
    bottomLine: "bg-gradient-to-r from-transparent via-cyan-400 to-transparent",
  },
  {
    text: "My team loves it. We saved 10+ hours weekly. The reports section alone is worth every taka we pay for this tool.",
    author: "Ahmed",
    role: "Retail Chain Manager",
    avatar: "A",
    avatarBg: "bg-emerald-500/10",
    avatarBorder: "border-emerald-500/20",
    avatarColor: "text-emerald-400",
    quoteColor: "text-emerald-400",
    cardClasses: "border-border",
  },
];

// Duplicate for infinite marquee effect
const MARQUEE_ITEMS = [
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
];

export function Testimonials() {
  return (
    <section className="py-12 lg:py-20 relative z-10 overflow-hidden bg-background">
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,212,255,0.07)_0%,transparent_70%)] blur-[80px]"
      />

      <ResponsiveComponents>
        {/* Header */}
        <div className="text-center mb-20 relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            Loved by Businesses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands of business owners across Bangladesh and
            beyond.
          </p>
        </div>
      </ResponsiveComponents>

      {/* Infinite Marquee */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Left & Right fade masks */}
        <div className="absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {MARQUEE_ITEMS.map((t, index) => (
              <div
                key={index}
                className={`w-[300px] md:w-[400px] shrink-0 relative p-8 rounded-2xl bg-card border flex flex-col gap-6 transition-all duration-300 hover:bg-muted ${t.cardClasses}`}
              >
                {/* Decorative quote icon */}
                <div
                  className={`absolute top-4 right-5 opacity-10 ${t.quoteColor}`}
                >
                  <Quote className="w-10 h-10 fill-current" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base leading-relaxed flex-grow italic text-muted-foreground">
                  &quot;{t.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${t.avatarBg} ${t.avatarBorder} ${t.avatarColor}`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>

                {/* Bottom glow line for featured */}
                {t.featured && t.bottomLine && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${t.bottomLine}`}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <ResponsiveComponents>
        {/* Social proof bar */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                {
                  c: "text-cyan-400",
                  bg: "bg-cyan-400/20",
                  border: "border-cyan-400",
                },
                {
                  c: "text-purple-400",
                  bg: "bg-purple-400/20",
                  border: "border-purple-400",
                },
                {
                  c: "text-emerald-400",
                  bg: "bg-emerald-400/20",
                  border: "border-emerald-400",
                },
                {
                  c: "text-amber-400",
                  bg: "bg-amber-400/20",
                  border: "border-amber-400",
                },
                {
                  c: "text-pink-400",
                  bg: "bg-pink-400/20",
                  border: "border-pink-400",
                },
              ].map((style, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${style.bg} ${style.border} ${style.c}`}
                  style={{ zIndex: 5 - i }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="font-medium ml-2">10,000+ happy customers</span>
          </div>
          <div className="h-4 w-px hidden sm:block bg-border" />
          <div className="flex items-center gap-1.5 font-medium">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
              ))}
            </div>
            <span className="ml-1">4.9/5 average rating</span>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
