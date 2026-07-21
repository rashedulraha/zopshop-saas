"use client";

import { motion } from "framer-motion";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
      className="py-16 lg:py-24 relative overflow-hidden bg-background"
    >
      <ResponsiveComponents>
        <div className="container mx-auto max-w-3xl relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                FAQ
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Questions & Answers.
            </motion.h2>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Accordion className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border py-2"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-normal text-muted-foreground text-sm sm:text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="font-normal text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Contact our support team &rarr;
            </Link>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
