"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 lg:py-24 relative overflow-hidden bg-muted/30 border-t border-border"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] opacity-70" />
      </div>

      <ResponsiveComponents>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
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
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                great together
              </span>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl h-full">
                <h3 className="text-2xl font-semibold mb-8 text-foreground">
                  Contact Information
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Email Us
                      </h4>
                      <a
                        href="mailto:hello@zopshop.com"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        hello@zopshop.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We typically reply within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                      <Phone className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Call Us
                      </h4>
                      <a
                        href="tel:+880123456789"
                        className="text-lg font-medium text-foreground hover:text-cyan-500 transition-colors"
                      >
                        +880 123 456 789
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sat-Thu from 9am to 6pm.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                      <MapPin className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Visit Us
                      </h4>
                      <p className="text-lg font-medium text-foreground">
                        Gulshan-1, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50">
                  <h4 className="text-sm font-medium text-foreground mb-4">
                    Follow us
                  </h4>
                  <div className="flex gap-4">
                    {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 lg:p-12 shadow-xl">
                <h3 className="text-2xl font-semibold mb-8 text-foreground">
                  Send us a message
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-foreground"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-foreground"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        defaultValue=""
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                      >
                        <option value="" disabled>
                          How can we help you?
                        </option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder="Tell us a little about your project..."
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
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
    </section>
  );
}
