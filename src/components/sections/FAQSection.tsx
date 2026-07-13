"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <section className="py-12 lg:py-20 relative bg-muted/30 overflow-hidden border-t border-border">
      <ResponsiveComponents>
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
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
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Questions</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              Everything you need to know about getting started with ZopShop.
            </motion.p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={cn(
                    "bg-card border rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen ? "border-primary/50 shadow-md" : "border-border hover:border-primary/30"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                      isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"
                    )}>
                      <ChevronDown className="w-5 h-5" />
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
                        <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
                          {faq.answer}
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
    </section>
  );
}
