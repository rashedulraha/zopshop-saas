"use client";

import { useState, useEffect } from "react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import {
  Star,
  MessageSquare,
  ArrowUpRight,
  Quote,
  User,
  Briefcase,
  Building2,
  Store,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahim Chowdhury",
    handle: "@rahimceo",
    body: "ZopShop saved my business! Now I track everything easily. The real-time updates are a game-changer for our daily operations. We've seen 45% increase in efficiency.",
    role: "CEO & Founder",
    company: "Fresh Mart Grocery",
    businessType: "Grocery Store",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    location: "Dhaka, Bangladesh",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    handle: "@sarahops",
    body: "Best inventory tool I've ever used. Simple and powerful. Our invoicing time went from 30 minutes to under 2 minutes. The reports section is incredibly insightful.",
    role: "Operations Manager",
    company: "Steel World BD",
    businessType: "Hardware Shop",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    location: "Chittagong, Bangladesh",
    verified: true,
  },
  {
    id: 3,
    name: "Tariqul Islam",
    handle: "@tariqul",
    body: "My team loves it. We saved 10+ hours weekly. The reports section alone is worth every taka we pay for this tool. Customer support is phenomenal.",
    role: "Managing Director",
    company: "Daily Needs Retail",
    businessType: "Retail Chain",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    location: "Sylhet, Bangladesh",
    verified: true,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    handle: "@nusratbj",
    body: "The analytics are mind-blowing. I finally know which products are my best sellers and which ones are just taking up space. Revenue up by 30% in 2 months.",
    role: "Owner",
    company: "Modish Boutique",
    businessType: "Boutique Store",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    location: "Rajshahi, Bangladesh",
    verified: false,
  },
  {
    id: 5,
    name: "Kamal Hossain",
    handle: "@kamalh",
    body: "I was using Excel for 5 years. Switching to ZopShop took 10 minutes and it's the best decision I've made this year. Everything is so intuitive.",
    role: "Proprietor",
    company: "Tech Hub BD",
    businessType: "Electronics Store",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    location: "Khulna, Bangladesh",
    verified: true,
  },
];

// Business Type Icons
const BusinessIcons = {
  "Grocery Store": Store,
  "Hardware Shop": Building2,
  "Retail Chain": Store,
  "Boutique Store": Briefcase,
  "Electronics Store": Store,
};

export function Testimonials() {
  const [cards, setCards] = useState(TESTIMONIALS);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  // Star Rating Component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 lg:py-32 relative z-10 overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <ResponsiveComponents>
        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
            {/* =========================================== */}
            {/* LEFT COLUMN - Content & Stats */}
            {/* =========================================== */}
            <div className="flex flex-col items-start text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-8 backdrop-blur-sm"
              >
                <Quote className="w-3 h-3" />
                Trusted by 0 businesses
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
              >
                Loved by growing
                <br />
                <span className="text-gradient">businesses.</span>
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg mb-10 max-w-xl leading-relaxed"
              >
                Join thousands of store owners who rely on ZopShop to streamline
                their inventory, track sales, and grow their revenue
                effortlessly.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-3 w-full border-t border-b border-border py-6 mb-10 divide-x divide-border"
              >
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    0
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-semibold text-muted-foreground mt-1.5">
                    Happy Clients
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    BDT 0
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-semibold text-muted-foreground mt-1.5">
                    Revenue Added
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    0.00
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-semibold text-muted-foreground mt-1.5">
                    Avg Rating
                  </div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-6 border-border text-foreground hover:bg-muted hover:border-primary/30 transition-all duration-300 group"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Contact Sales
                  </Link>
                </Button>
                <Button className="rounded-full px-6 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group">
                  <Link href="/register" className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* =========================================== */}
            {/* RIGHT COLUMN - Card Stack */}
            {/* =========================================== */}
            <div className="relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[500px] h-[440px]">
                <AnimatePresence mode="popLayout">
                  {cards
                    .slice(0, 3)
                    .map((card, index) => ({ card, index }))
                    .reverse()
                    .map(({ card, index }) => {
                      const BusinessIcon =
                        BusinessIcons[
                          card.businessType as keyof typeof BusinessIcons
                        ] || Store;

                      return (
                        <motion.div
                          key={card.id}
                          layout
                          initial={{ opacity: 0, scale: 0.85, y: -40 }}
                          animate={{
                            opacity: 1 - index * 0.15,
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
                          onMouseEnter={() => setHoveredIndex(card.id)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`absolute top-0 left-0 right-0 p-7 rounded-3xl bg-card/80 backdrop-blur-sm border border-border shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-300 ${
                            hoveredIndex === card.id
                              ? "ring-2 ring-primary/20 shadow-xl scale-[1.01]"
                              : ""
                          }`}
                        >
                          {/* Top Row: Avatar + Info */}
                          <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                              {/* Avatar */}
                              <div className="relative shrink-0">
                                <img
                                  src={card.avatar}
                                  alt={card.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-border bg-muted"
                                />
                                {card.verified && (
                                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                                    <svg
                                      className="w-2.5 h-2.5 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>

                              {/* Name & Role */}
                              <div>
                                <div className="font-semibold text-foreground text-base leading-tight">
                                  {card.name}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{card.role}</span>
                                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                  <span>{card.company}</span>
                                </div>
                              </div>
                            </div>

                            {/* Business Type Icon */}
                            <div className="p-1.5 rounded-full bg-muted/50 border border-border/50">
                              <BusinessIcon className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                          </div>

                          {/* Star Rating */}
                          <div className="mb-4">
                            <StarRating rating={card.rating} />
                          </div>

                          {/* Quote Body */}
                          <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-4">
                            "{card.body}"
                          </p>

                          {/* Bottom: Location */}
                          <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground/70">
                              📍 {card.location}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-primary/70 font-medium">
                              {card.businessType}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
