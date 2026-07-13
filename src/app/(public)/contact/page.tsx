import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | ZopShop",
  description: "Get in touch with the ZopShop team for support or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/30 selection:text-white">
      <Navbar />

      <main className="flex-1 relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h1 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                great together
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question about ZopShop? Want to request a demo? Our team is
              ready to help you transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 lg:p-10">
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
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 lg:p-12">
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
                        className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
                        className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
                        className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
                      className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                      placeholder="Tell us a little about your project..."
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
