"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

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
    icon: <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    iconBg:
      "bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800",
    label: "Email Us",
    value: "hello@zopshop.com",
    href: "mailto:hello@zopshop.com",
    sub: "We typically reply within 24 hours.",
  },
  {
    icon: <Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    iconBg:
      "bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-100 dark:border-cyan-800",
    label: "Call Us",
    value: "+880 123 456 789",
    href: "tel:+880123456789",
    sub: "Sat-Thu from 9am to 6pm.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    iconBg:
      "bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800",
    label: "Visit Us",
    value: "Gulshan-1, Dhaka, Bangladesh",
    href: undefined,
    sub: undefined,
  },
];

export function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
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
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <ResponsiveComponents>
        <div className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
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
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
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
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              Have a question about ZopShop? Want to request a demo? Our team is
              ready to help you transform your business.
            </motion.p>
          </div>

          {/* Unified Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left Side: Contact Info */}
                <div className="lg:col-span-2 bg-slate-50/80 dark:bg-slate-800/30 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-xl text-slate-900 dark:text-white">
                        Get in touch
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Fill out the form and our team will get back to you
                        within 24 hours.
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      {CONTACT_ITEMS.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${item.iconBg}`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wider">
                              {item.label}
                            </h4>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {item.value}
                              </p>
                            )}
                            {item.sub && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {item.sub}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">
                      Follow us
                    </h4>
                    <div className="flex gap-3">
                      {[
                        {
                          icon: <FaTwitter className="w-4 h-4" />,
                          name: "Twitter",
                        },
                        {
                          icon: <FaLinkedin className="w-4 h-4" />,
                          name: "LinkedIn",
                        },
                        {
                          icon: <FaFacebook className="w-4 h-4" />,
                          name: "Facebook",
                        },
                      ].map((social) => (
                        <Button
                          key={social.name}
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200"
                        >
                          <a href="#" aria-label={social.name}>
                            {social.icon}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      Send us a message
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                    <form
                      className="space-y-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            {...register("firstName")}
                            placeholder="John"
                            className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50"
                          />
                          {errors.firstName && (
                            <p className="text-xs font-medium text-red-500">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            {...register("lastName")}
                            placeholder="Doe"
                            className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50"
                          />
                          {errors.lastName && (
                            <p className="text-xs font-medium text-red-500">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="john@company.com"
                          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50"
                        />
                        {errors.email && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                        >
                          Subject
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setValue("subject", value ?? "")
                          }
                          defaultValue=""
                        >
                          <SelectTrigger className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50">
                            <SelectValue placeholder="How can we help you?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder="Tell us a little about your project..."
                          rows={4}
                          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 resize-none"
                        />
                        {errors.message && (
                          <p className="text-xs font-medium text-red-500">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 transition-all duration-300 gap-2 group shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:pointer-events-none mt-2"
                      >
                        <span>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        {!isSubmitting && (
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
