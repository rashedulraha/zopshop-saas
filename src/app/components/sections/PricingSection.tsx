import Link from "next/link";
import { Container } from "../ui/Container";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Basic",
    price: "Free",
    features: ["1 Store", "100 Products", "Basic Reports"],
    buttonText: "Get Started",
    buttonClass: "border-2 border-primary text-primary hover:bg-primary/5",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$29/month",
    features: ["5 Stores", "1000 Products", "Advanced Reports", "Priority Support"],
    buttonText: "Get Started",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Stores", "Unlimited Products", "Custom Reports", "Dedicated Support"],
    buttonText: "Contact Sales",
    buttonClass: "border-2 border-primary text-primary hover:bg-primary/5",
    isPopular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "glass p-8 rounded-3xl relative flex flex-col",
                plan.isPopular ? "md:-mt-8 md:mb-8 border-primary shadow-xl" : ""
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-6 text-primary">
                {plan.price}
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <svg className="w-5 h-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={cn(
                  "glass-btn w-full text-center font-semibold text-lg py-3",
                  plan.buttonClass
                )}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
