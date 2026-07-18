"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";

const CONTACT_ITEMS = [
  {
    icon: <Mail className="w-5 h-5 text-primary" />,
    iconBg: "bg-primary/10 border border-primary/15 group-hover:bg-primary/15",
    label: "Email Us",
    value: "hello@zopshop.com",
    href: "mailto:hello@zopshop.com",
    sub: "We typically reply within 24 hours.",
    hoverColor: "hover:text-primary",
  },
  {
    icon: <Phone className="w-5 h-5 text-cyan-500" />,
    iconBg: "bg-cyan-500/10 border border-cyan-500/15 group-hover:bg-cyan-500/15",
    label: "Call Us",
    value: "+880 123 456 789",
    href: "tel:+880123456789",
    sub: "Sat-Thu from 9am to 6pm.",
    hoverColor: "hover:text-cyan-500",
  },
  {
    icon: <MapPin className="w-5 h-5 text-purple-500" />,
    iconBg: "bg-purple-500/10 border border-purple-500/15 group-hover:bg-purple-500/15",
    label: "Visit Us",
    value: "Gulshan-1, Dhaka, Bangladesh",
    href: undefined,
    sub: undefined,
    hoverColor: "",
  },
];

const INPUT_CLASS =
  "w-full glass-sm rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 border-white/30 dark:border-white/8";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-14 lg:py-20 relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/4 dark:bg-primary/7 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-cyan-500/3 dark:bg-cyan-500/6 rounded-full blur-[100px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      <ResponsiveComponents>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Contact Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Let&apos;s build something{" "}
              <span className="text-gradient">great together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Have a question about ZopShop? Want to request a demo? Our team is
              ready to help you transform your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Contact Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative glass-md rounded-3xl p-8 lg:p-10 h-full overflow-hidden">
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent rounded-t-3xl" />

                <h3 className="text-2xl font-semibold mb-8 text-foreground">
                  Contact Information
                </h3>

                <div className="space-y-7">
                  {CONTACT_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${item.iconBg}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                          {item.label}
                        </h4>
                        {item.href ? (
                          <a
                            href={item.href}
                            className={`text-base font-semibold text-foreground transition-colors ${item.hoverColor}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-semibold text-foreground">{item.value}</p>
                        )}
                        {item.sub && (
                          <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/20 dark:border-white/5">
                  <h4 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-widest">
                    Follow us
                  </h4>
                  <div className="flex gap-3">
                    {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="glass-sm px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="relative glass-md rounded-3xl p-8 lg:p-12 overflow-hidden">
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent rounded-t-3xl" />

                <h3 className="text-2xl font-semibold mb-8 text-foreground">
                  Send us a message
                </h3>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={INPUT_CLASS}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={INPUT_CLASS}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={INPUT_CLASS}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        defaultValue=""
                        className={`${INPUT_CLASS} appearance-none`}
                      >
                        <option value="" disabled>How can we help you?</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="Tell us a little about your project..."
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_8px_25px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.35)] hover:-translate-y-0.5"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveComponents>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </section>
  );
}
