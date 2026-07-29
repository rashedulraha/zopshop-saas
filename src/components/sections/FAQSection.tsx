"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Do I need complex hardware or servers to run ZopShop?",
    answer:
      "No! ZopShop runs on any browser, desktop, tablet, or smartphone with internet connection. No local servers or expensive hardware required.",
  },
  {
    question: "Is my store data and customer records completely safe?",
    answer:
      "Yes. All store data is encrypted at rest and in transit with automated cloud backups every second. Zero risk of losing sales logs.",
  },
  {
    question: "How long does onboarding and store setup take?",
    answer:
      "Under 3 minutes. You can import inventory CSV files, set tax rules, and issue your first invoice immediately after signing up.",
  },
  {
    question: "Can I manage multiple retail branches from one account?",
    answer:
      "Yes! Our Growth and Enterprise plans allow multi-branch inventory tracking, staff permission roles, and aggregated revenue reporting.",
  },
  {
    question: "What happens when my 30-day free trial ends?",
    answer:
      "You will receive a notification before trial expiry to choose your preferred plan. There are zero automatic charges or hidden cancellation fees.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-background py-20 lg:py-28 border-b border-border transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted-foreground">
            Everything you need to know about ZopShop operations & setup.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <Accordion className="w-full space-y-2">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border last:border-b-0 py-2"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <p className="text-xs text-muted-foreground mb-2">Still have questions?</p>
          <Link
            href="/contact"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Talk to our support team</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
