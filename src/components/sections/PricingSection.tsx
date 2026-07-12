import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Crown, Rocket } from "lucide-react";
import ResponsiveComponents from "../providers/ResponsiveComponents";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    icon: <Rocket className="w-5 h-5" />,
    name: "Basic",
    price: "BDT 200",
    period: "/month",
    description: "Perfect for getting started",
    buttonText: "Start Free Trial",
    isPopular: false,
    cardClasses: "border-border",
    iconContainerClasses: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    priceGradient: "from-white to-cyan-400",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    name: "Standard",
    price: "BDT 250",
    period: "/month",
    description: "Extra customization for growth",
    buttonText: "Start Free Trial",
    isPopular: true,
    cardClasses: "border-cyan-500/40",
    iconContainerClasses: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    priceGradient: "from-white to-cyan-400",
  },
  {
    icon: <Crown className="w-5 h-5" />,
    name: "Premium",
    price: "BDT 500",
    period: "/month",
    description: "All features with premium support",
    buttonText: "Start Free Trial",
    isPopular: false,
    cardClasses: "border-border",
    iconContainerClasses:
      "bg-purple-500/10 border-purple-500/20 text-purple-400",
    priceGradient: "from-white to-purple-400",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 overflow-hidden px-4 py-12 lg:py-16"
    >
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,119,255,0.09)_0%,transparent_70%)] blur-[80px]"
      />

      <ResponsiveComponents>
        {/* Header */}
        <div className="relative z-10 mb-20 flex flex-col items-center text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Pricing
            </span>
          </div>

          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Try any plan free for 30 days. No credit card required. Cancel
            anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-muted",
                plan.cardClasses,
                plan.isPopular && "md:-mt-6 md:mb-6",
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 px-4 py-1 text-xs font-bold text-primary-foreground">
                  ⚡ Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div
                    className={cn(
                      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl border",
                      plan.iconContainerClasses,
                    )}
                  >
                    {plan.icon}
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span
                    className={cn(
                      "bg-gradient-to-br bg-clip-text text-5xl font-black tracking-tighter text-transparent",
                      plan.priceGradient,
                    )}
                  >
                    {plan.price}
                  </span>

                  <span className="text-sm font-medium text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                variant={plan.isPopular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-xl font-semibold",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                <Link href="/register">{plan.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            No credit card required · Free for 30 days · Cancel anytime
          </div>
        </div>
      </ResponsiveComponents>
    </section>
  );
}
