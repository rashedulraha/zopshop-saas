"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahim Chowdhury",
    body: "ZopShop transformed our operational workflow! Real-time inventory sync and instant receipt generation eliminated stock mismatch entirely.",
    role: "CEO & Founder",
    company: "Fresh Mart Grocery",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    body: "Best inventory and status tracking tool I've used. Invoice processing time dropped from 30 minutes to under 2 minutes per order.",
    role: "Operations Director",
    company: "Steel World BD",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 3,
    name: "Tariqul Islam",
    body: "My team loves the UI interface and speed. We save 10+ hours weekly across 4 retail branches.",
    role: "Managing Director",
    company: "Daily Needs Retail",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    body: "The analytics dashboards give us 100% clarity. We expanded our product inventory with full confidence.",
    role: "Owner",
    company: "Modish Boutique",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            Customer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Loved by engineering & retail teams
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            See how merchants rely on ZopShop every day to run fast, error-free store operations.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/40" />
                </div>

                <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 italic">
                  "{item.body}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-border">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-muted">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
