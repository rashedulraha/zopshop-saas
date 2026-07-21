"use client";

import { useState, useEffect, useRef } from "react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Star, Quote, ArrowRight, Users, Zap } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahim Chowdhury",
    body: "ZopShop saved my business! Now I track everything easily. The real-time updates are a game-changer for our daily operations.",
    role: "CEO & Founder",
    company: "Fresh Mart Grocery",
    businessType: "Grocery Store",
    avatar: "https://i.pravatar.cc/150?img=11",
    location: "Dhaka, Bangladesh",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    body: "Best inventory tool I've ever used. Simple and powerful. Our invoicing time went from 30 minutes to under 2 minutes.",
    role: "Operations Manager",
    company: "Steel World BD",
    businessType: "Hardware Shop",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Chittagong, Bangladesh",
    rating: 5,
  },
  {
    id: 3,
    name: "Tariqul Islam",
    body: "My team loves it. We saved 10+ hours weekly. The reports section alone is worth every taka we pay for this tool.",
    role: "Managing Director",
    company: "Daily Needs Retail",
    businessType: "Retail Chain",
    avatar: "https://i.pravatar.cc/150?img=33",
    location: "Sylhet, Bangladesh",
    rating: 5,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    body: "The analytics are mind-blowing. I finally know which products are my best sellers. Revenue up by 30% in 2 months.",
    role: "Owner",
    company: "Modish Boutique",
    businessType: "Boutique Store",
    avatar: "https://i.pravatar.cc/150?img=5",
    location: "Rajshahi, Bangladesh",
    rating: 5,
  },
  {
    id: 5,
    name: "Kamal Hossain",
    body: "I was using Excel for 5 years. Switching to ZopShop took 10 minutes and it's the best decision I've made this year.",
    role: "Proprietor",
    company: "Tech Hub BD",
    businessType: "Electronics Store",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Khulna, Bangladesh",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [cards, setCards] = useState(TESTIMONIALS);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const newArray = [...prev];
        const topCard = newArray.shift();
        if (topCard) newArray.push(topCard);
        return newArray;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[130px] animate-pulse delay-2000" />

        {/* Premium grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden xl:block animate-float">
        <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl">
          <Users className="w-5 h-5 text-primary/60" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 hidden xl:block animate-float-delayed">
        <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl">
          <Quote className="w-5 h-5 text-amber-500/60" />
        </div>
      </div>

      <ResponsiveComponents>
        <div className="w-full relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* LEFT: Premium Content */}
            <div className="flex flex-col items-start text-left">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-primary shadow-lg shadow-primary/5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trusted by 1,000+ businesses</span>
              </motion.div>

              {/* Heading with Gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Loved by{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    growing
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/20"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      d="M2 8C50 2 150 2 198 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                businesses.
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg font-normal text-muted-foreground leading-relaxed mb-10 max-w-xl"
              >
                Join thousands of store owners who rely on ZopShop to streamline
                their inventory, track sales, and grow their revenue
                effortlessly.
              </motion.p>

              {/* Premium Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 py-6 text-base font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 mt-8"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      4.9/5
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Based on 500+ reviews
                  </span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Premium Card Stack */}
            <div className="relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div
                className="relative w-full max-w-[450px]"
                style={{ height: "340px" }}
              >
                <AnimatePresence mode="popLayout">
                  {cards
                    .slice(0, 3)
                    .map((card, index) => ({ card, index }))
                    .reverse()
                    .map(({ card, index }) => (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: -40 }}
                        animate={{
                          opacity: 1 - index * 0.12,
                          scale: 1 - index * 0.04,
                          y: index * -20,
                          zIndex: 10 - index,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          y: 40,
                          transition: { duration: 0.4, ease: "easeInOut" },
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className={`absolute top-0 left-0 right-0 p-8 rounded-2xl bg-card/80 backdrop-blur-sm border ${
                          index === 0
                            ? "border-primary/30 shadow-2xl shadow-primary/10"
                            : "border-border/50"
                        } flex flex-col transition-all duration-300 hover:shadow-xl`}
                      >
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1">
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Featured
                            </div>
                          </div>
                        )}

                        {/* Top row with avatar and rating */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                              <img
                                src={card.avatar}
                                alt={card.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-foreground text-base">
                                {card.name}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-normal text-muted-foreground mt-0.5">
                                <span>{card.role}</span>
                                <span className="text-muted-foreground/30">
                                  /
                                </span>
                                <span>{card.company}</span>
                              </div>
                            </div>
                          </div>
                          <StarRating rating={card.rating} />
                        </div>

                        {/* Quote with premium styling */}
                        <div className="relative flex-1 mb-4">
                          <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                          <p className="font-normal text-foreground text-sm sm:text-base leading-relaxed pl-4 italic">
                            &ldquo;{card.body}&rdquo;
                          </p>
                        </div>

                        {/* Footer with location and tag */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                            {card.location}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-primary font-bold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors">
                            {card.businessType}
                          </span>
                        </div>

                        {/* Premium glow indicator for top card */}
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-transparent via-primary to-transparent">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
