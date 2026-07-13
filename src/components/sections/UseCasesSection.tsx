"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Wrench,
  Shirt,
  Pill,
  Utensils,
  Store,
  CheckCircle2,
  BarChart2,
} from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { cn } from "@/lib/utils";

const USE_CASES = [
  {
    image: "/Features_img/Grocery-&-Super Shops.jpg",
    title: "Transform Your Grocery Business",
    subtitle: "Say goodbye to manual stock counting and messy registers.",
    features: [
      "Real-time stock tracking – know exactly what's in your shop",
      "Low-stock auto alerts – never run out of bestsellers",
      "Fast checkout – serve customers 2x faster",
      "Smart expiry alerts – reduce waste and save money",
    ],
    stat: "5,000+ grocery items managed with 99.9% accuracy.",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-500/10 text-emerald-400",
  },
  {
    image: "/Features_img/Pharmacy-&-Medicine.jpg",
    title: "Transform Your Pharmacy Business",
    subtitle: "Stop manually checking expiry dates and batch numbers.",
    features: [
      "Batch number tracking – trace every medicine instantly",
      "Expiry date alerts – get notified 15 days before",
      "Secure sales management – protect patient data",
      "Daily sales reports – know your top-selling medicines",
    ],
    stat: "2,300+ medicines tracked with 100% batch traceability.",
    icon: <Pill className="w-6 h-6" />,
    color: "from-blue-400 to-cyan-500",
    bgLight: "bg-blue-500/10 text-blue-400",
  },
  {
    image: "/Features_img/ Hardware-&-Sanitary.jpg",
    title: "Transform Your Hardware Business",
    subtitle: "Stop losing track of tiny screws and big materials.",
    features: [
      "Manage diverse inventory – from screws to building materials",
      "Category-wise sorting – find anything in seconds",
      "Bulk inventory updates – save hours every week",
      "Smart reorder alerts – never run out of stock",
    ],
    stat: "15,000+ SKUs organized across 10+ categories.",
    icon: <Wrench className="w-6 h-6" />,
    color: "from-orange-400 to-amber-500",
    bgLight: "bg-orange-500/10 text-orange-400",
  },
  {
    image: "/Features_img/ Fashion&Boutiques.jpg",
    title: "Transform Your Fashion Business",
    subtitle: "Stop confusing sizes, colors, and seasonal stock.",
    features: [
      "Auto size & color tracking – manage S, M, L, XL effortlessly",
      "Seasonal stock management – summer, winter, all year round",
      "Style-wise reporting – know what's selling",
      "Smart inventory alerts – never miss a trend",
    ],
    stat: "3,500+ garments managed across 12 sizes and 4 seasons.",
    icon: <Shirt className="w-6 h-6" />,
    color: "from-purple-400 to-indigo-500",
    bgLight: "bg-purple-500/10 text-purple-400",
  },
  {
    image: "/Features_img/ Rod-Cement.jpg",
    title: "Transform Your Construction Business",
    subtitle: "Say goodbye to manual stock counting and messy paper records.",
    features: [
      "Track rods, cement, bricks – all in one place",
      "Real-time stock updates – know exactly what's available",
      "Smart reorder alerts – never run out of materials",
      "Job-site tracking – manage multiple projects",
    ],
    stat: "10,000+ construction materials tracked with 100% accuracy.",
    icon: <Store className="w-6 h-6" />,
    color: "from-slate-400 to-slate-600",
    bgLight: "bg-slate-500/10 text-slate-400",
  },
  {
    image: "/Features_img/Modi-Khana.jpg",
    title: "Transform Your General Store",
    subtitle: "Simplify your daily retail operations effortlessly.",
    features: [
      "Quick item entry – add products to billing fast",
      "Daily profit tracking – see earnings at a glance",
      "Customer ledger – manage store credit seamlessly",
      "Inventory alerts – know when to restock staples",
    ],
    stat: "1,000+ daily items sold with zero calculation errors.",
    icon: <Utensils className="w-6 h-6" />,
    color: "from-rose-400 to-pink-500",
    bgLight: "bg-rose-500/10 text-rose-400",
  },
];

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="py-12 lg:pt-24 lg:pb-12 relative bg-muted/30 overflow-visible border-t border-border"
    >
      <ResponsiveComponents>
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Who is it for?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Every Business
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              No matter what you sell, ZopShop adapts to your unique workflow
              and inventory needs.
            </motion.p>
          </div>

          {/* Sticky Card Stack Container */}
          <div className="flex flex-col gap-8 md:gap-12 pb-12 lg:pb-16">
            {USE_CASES.map((useCase, index) => {
              const topOffset = `calc(6rem + ${index * 1.5}rem)`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="sticky w-full max-w-[1200px] mx-auto group/card"
                  style={{
                    top: topOffset,
                    zIndex: 10 + index,
                  }}
                >
                  <div className="relative">
                    {/* Outer Glow Effect */}
                    <div
                      className={cn(
                        "absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover/card:opacity-30 blur-xl transition-opacity duration-500",
                        useCase.color,
                      )}
                    />

                    <div className="relative bg-card/80 backdrop-blur-xl border border-border/60 rounded-[2rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 group-hover/card:border-border/80">
                        {/* Left Side: 16:9 Image Area */}
                      <div className="w-full md:w-1/2 lg:w-[55%] relative bg-black/5 aspect-video md:aspect-auto overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:2rem_2rem] opacity-20" />
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-10",
                            useCase.color,
                          )}
                        />

                        <img
                          src={useCase.image}
                          alt={useCase.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
                        />
                      </div>

                      {/* Right Side: Content Area */}
                      <div className="w-full md:w-1/2 lg:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col bg-card/50 relative z-20">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground mb-3">
                          {useCase.title}
                        </h3>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {useCase.subtitle}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span
                              className={cn(
                                "w-6 h-6 rounded-md flex items-center justify-center shrink-0",
                                useCase.bgLight,
                              )}
                            >
                              {useCase.icon}
                            </span>
                            What ZopShop does for you
                          </h4>
                          <ul className="space-y-3">
                            {useCase.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-muted-foreground"
                              >
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-background/50 border border-border/50 rounded-2xl p-5 mt-auto shadow-sm transition-colors group-hover/card:bg-background/80">
                          <div className="flex items-center gap-3 text-foreground font-medium">
                            <BarChart2
                              className={cn(
                                "w-5 h-5 shrink-0",
                                useCase.bgLight.split(" ")[1],
                              )}
                            />
                            <span className="text-sm leading-snug">
                              {useCase.stat}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
