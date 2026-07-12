import Link from "next/link";
import { Container } from "../ui/Container";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Basic",
    price: "TK 200",
    period: "/month",
    description: "Perfect for getting started",
    features: ["1 Store", "100 Products", "Basic Reports", "First 30 days free"],
    buttonText: "Start Free Trial",
    buttonClass: "border border-border text-foreground hover:bg-accent transition-colors",
    isPopular: false,
  },
  {
    name: "Standard",
    price: "TK 250",
    period: "/month",
    description: "Extra customization for growth",
    features: ["3 Stores", "500 Products", "Advanced Reports", "Customized Features", "First 30 days free"],
    buttonText: "Start Free Trial",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "TK 500",
    period: "/month",
    description: "All features with premium support",
    features: ["Unlimited Stores", "Unlimited Products", "Custom Reports", "Dedicated Support", "First 30 days free"],
    buttonText: "Start Free Trial",
    buttonClass: "border border-border text-foreground hover:bg-accent transition-colors",
    isPopular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 lg:py-16 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try any plan free for 30 days. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "p-10 rounded-3xl relative flex flex-col bg-card border transition-all duration-300",
                plan.isPopular
                  ? "border-primary shadow-xl md:-mt-4"
                  : "border-border shadow-sm hover:shadow-md hover:border-primary/50"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground font-medium">{plan.period}</span>
              </div>

              <Link
                href="#"
                className={cn(
                  "w-full text-center font-semibold py-3 rounded-full mb-8 shadow-sm hover:shadow-md hover:-translate-y-0.5",
                  plan.buttonClass
                )}
              >
                {plan.buttonText}
              </Link>

              <ul className="flex flex-col gap-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
