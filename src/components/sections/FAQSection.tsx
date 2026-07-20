"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQS = [
  {
    question: "Do I need a continuous internet connection to use ZopShop?",
    answer:
      "ZopShop is a cloud-based platform, so you do need an internet connection to sync your data. However, it requires very little data to run, so even a basic mobile data connection is more than enough to operate smoothly.",
  },
  {
    question: "Is my business data and customer information secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption to protect your data. Unlike pen-and-paper ledgers that can be lost or damaged, your data is securely backed up in the cloud every single second.",
  },
  {
    question: "Do I need to be a computer expert to use this software?",
    answer:
      "Not at all! We built ZopShop specifically for business owners, not IT experts. The interface is as simple as using a smartphone app. If you can use WhatsApp or Facebook, you can master ZopShop in 10 minutes.",
  },
  {
    question: "Can I check my shop's sales from my home or phone?",
    answer:
      "Yes! As long as you log in with your secure admin account, you can monitor live sales, check current inventory, and view profit reports from any device, anywhere in the world.",
  },
  {
    question: "What happens when my 30-day free trial ends?",
    answer:
      "You will receive a notification a few days before your trial ends. If you love the system (and we know you will!), you can choose a subscription plan that fits your business size. If you decide not to continue, there are no hidden cancellation fees.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <ResponsiveComponents>
        <div className="container mx-auto max-w-4xl relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
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
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
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
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Everything you need to know about getting started with ZopShop.
            </motion.p>
          </div>

          {/* FAQ Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden bg-white dark:bg-slate-900">
              <CardContent className="p-0">
                <Accordion className="divide-y divide-slate-100 dark:divide-slate-800">
                  {FAQS.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="group px-6 lg:px-10 py-2 transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 data-[state=open]:bg-blue-50/30 dark:data-[state=open]:bg-blue-900/10"
                      >
                        <AccordionTrigger className="py-6 text-left hover:no-underline [&>svg]:hidden w-full group">
                          <div className="flex items-start gap-4 w-full">
                            <div className="flex-1">
                              <h3 className="text-base lg:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 pr-8">
                                {faq.question}
                              </h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center shrink-0 transition-all duration-300 group-data-[state=open]:bg-blue-500 group-data-[state=open]:text-white group-data-[state=open]:rotate-180">
                              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-data-[state=open]:text-white" />
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base pb-6 pl-0 pr-4">
                          <div className="pt-2">{faq.answer}</div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Contact our support team
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </a>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
