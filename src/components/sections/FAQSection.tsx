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
    <section className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-blue-50/50 dark:bg-blue-900/10 blur-[90px]" />
      </div>

      <ResponsiveComponents>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Got Questions?
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Frequently Asked{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Questions
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
            >
              Everything you need to know about getting started with ZopShop.
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 px-4 sm:px-6">
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
                    "relative rounded-3xl overflow-hidden transition-all duration-300 border",
                    isOpen
                      ? "bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/50 shadow-xl shadow-blue-500/5"
                      : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md",
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-6 sm:px-8 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className={cn(
                      "text-lg font-semibold pr-4 transition-colors duration-200",
                      isOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white",
                    )}>
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rotate-180"
                          : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700",
                      )}
                    >
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
                        <div className="px-6 sm:px-8 pb-8 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium">
                          <div className="pt-2">{faq.answer}</div>
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
