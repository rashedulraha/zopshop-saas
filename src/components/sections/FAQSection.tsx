"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Do I need a continuous internet connection to use ZopShop?",
    answer: "ZopShop is a cloud-based platform, so you do need an internet connection to sync your data. However, it requires very little data to run, so even a basic mobile data connection is more than enough to operate smoothly.",
  },
  {
    question: "Is my business data and customer information secure?",
    answer: "Absolutely. We use enterprise-grade encryption to protect your data. Unlike pen-and-paper ledgers that can be lost or damaged, your data is securely backed up in the cloud every single second.",
  },
  {
    question: "Do I need to be a computer expert to use this software?",
    answer: "Not at all! We built ZopShop specifically for business owners, not IT experts. The interface is as simple as using a smartphone app. If you can use WhatsApp or Facebook, you can master ZopShop in 10 minutes.",
  },
  {
    question: "Can I check my shop's sales from my home or phone?",
    answer: "Yes! As long as you log in with your secure admin account, you can monitor live sales, check current inventory, and view profit reports from any device, anywhere in the world.",
  },
  {
    question: "What happens when my 30-day free trial ends?",
    answer: "You will receive a notification a few days before your trial ends. If you love the system (and we know you will!), you can choose a subscription plan that fits your business size. If you decide not to continue, there are no hidden cancellation fees.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 lg:py-20 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/8 blur-[90px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <HelpCircle className="w-3.5 h-3.5" />
                Got Questions?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              Everything you need to know about getting started with ZopShop.
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className={cn(
                    "relative rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen
                      ? "glass-xl shadow-[0_10px_40px_rgba(79,70,229,0.08)] dark:shadow-[0_10px_40px_rgba(79,70,229,0.12)] ring-1 ring-primary/20"
                      : "glass-md hover:shadow-md hover:-translate-y-px",
                  )}
                >
                  {/* Active left accent bar */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300",
                      isOpen
                        ? "bg-gradient-to-b from-primary via-indigo-400 to-transparent"
                        : "bg-transparent",
                    )}
                  />

                  {/* Top shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent" />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className={cn(
                      "text-base font-semibold pr-4 transition-colors duration-200",
                      isOpen ? "text-primary" : "text-foreground",
                    )}>
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 glass-sm",
                        isOpen
                          ? "bg-primary/20 text-primary rotate-180"
                          : "text-muted-foreground",
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed text-sm border-t border-white/20 dark:border-white/5">
                          <div className="pt-4">{faq.answer}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ResponsiveComponents>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
