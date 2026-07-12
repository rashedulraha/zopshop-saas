"use client";

import ResponsiveComponents from "../providers/ResponsiveComponents";
import { UserPlus, LayoutDashboard, BarChart3, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "1",
    title: "Create Your Account",
    description:
      "Sign up in seconds. No credit card required. Instantly get access to your personalized dashboard.",
    icon: <UserPlus className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    bgIcon: "bg-blue-500/10 text-blue-500",
  },
  {
    number: "2",
    title: "Configure Your Store",
    description:
      "Add your products, organize them into categories, and set your pricing using our beautiful built-in templates.",
    icon: <LayoutDashboard className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    bgIcon: "bg-purple-500/10 text-purple-500",
  },
  {
    number: "3",
    title: "Start Selling",
    description:
      "Connect your payment gateways and hit publish. Start accepting orders instantly and track your revenue in real-time.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-500",
    bgIcon: "bg-emerald-500/10 text-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-12 lg:py-20 relative bg-background overflow-hidden border-t border-border"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <ResponsiveComponents>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              How It Works
            </div>
            <h2 className="mb-5 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
              Three steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                launch your store
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve eliminated the complex setup process. Just follow these
              steps and you are ready to sell your products to the world.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="flex flex-col gap-16 md:gap-24 relative">
              {STEPS.map((step, index) => {
                const isEven = index % 2 !== 0;

                return (
                  <div
                    key={step.number}
                    className="relative flex items-center justify-between md:justify-center group"
                  >
                    {/* Desktop Left Content */}
                    <div
                      className={`hidden md:flex flex-1 ${isEven ? "justify-start pl-16" : "justify-end pr-16 text-right"}`}
                    >
                      <div
                        className={`w-full max-w-sm ${isEven ? "order-2" : ""}`}
                      >
                        {isEven ? (
                          <>
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </>
                        ) : (
                          <div className="w-full h-48 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center p-6 group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-300">
                            <div
                              className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-xl absolute`}
                            />
                            {step.icon}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-border flex items-center justify-center z-10 group-hover:border-primary transition-colors duration-300">
                      <span className="text-sm font-bold text-foreground">
                        {step.number}
                      </span>
                    </div>

                    {/* Desktop Right Content */}
                    <div
                      className={`hidden md:flex flex-1 ${isEven ? "justify-end pr-16 text-right" : "justify-start pl-16"}`}
                    >
                      <div
                        className={`w-full max-w-sm ${isEven ? "" : "order-2"}`}
                      >
                        {isEven ? (
                          <div className="w-full h-48 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center p-6 group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-300">
                            <div
                              className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-xl absolute`}
                            />
                            {step.icon}
                          </div>
                        ) : (
                          <>
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mobile Content (Visible only on small screens) */}
                    <div className="md:hidden flex-1 pl-20 relative">
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <div
                          className={`w-12 h-12 rounded-xl ${step.bgIcon} flex items-center justify-center mb-4`}
                        >
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
