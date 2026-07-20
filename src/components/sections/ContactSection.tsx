"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactSchema = z.infer<typeof contactSchema>;

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
  "w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all duration-200 border border-slate-200 dark:border-slate-700";

export function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactSchema) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <ResponsiveComponents>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 px-4 sm:px-6">
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
                  Contact Us
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
              Let&apos;s build something{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                great together
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
            >
              Have a question about ZopShop? Want to request a demo? Our team is
              ready to help you transform your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 px-4 sm:px-6">
            {/* Contact Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-10 h-full overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20">

                <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
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
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                          {item.label}
                        </h4>
                        {item.href ? (
                          <a
                            href={item.href}
                            className={`text-base font-semibold text-slate-900 dark:text-white transition-colors ${item.hoverColor}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
                        )}
                        {item.sub && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">
                    Follow us
                  </h4>
                  <div className="flex gap-3">
                    {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20">

                <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
                  Send us a message
                </h3>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        className={INPUT_CLASS}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-xs font-medium text-destructive mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        className={INPUT_CLASS}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-xs font-medium text-destructive mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={INPUT_CLASS}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        {...register("subject")}
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
                    {errors.subject && (
                      <p className="text-xs font-medium text-destructive mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="Tell us a little about your project..."
                    />
                    {errors.message && (
                      <p className="text-xs font-medium text-destructive mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
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
