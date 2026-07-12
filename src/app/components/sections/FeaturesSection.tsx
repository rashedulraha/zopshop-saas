import { Container } from "../ui/Container";
import { Package, CreditCard, BarChart, Users, Shield, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: <Package className="w-6 h-6 text-primary" />,
    title: "Inventory Management",
    description: "Real-time stock updates",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "Billing System",
    description: "Fast invoicing",
  },
  {
    icon: <BarChart className="w-6 h-6 text-primary" />,
    title: "Reports & Analytics",
    description: "Data-driven insights",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Team Management",
    description: "Role-based access",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Secure Data",
    description: "Encrypted storage",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: "Mobile Friendly",
    description: "Access from anywhere",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose ZopShop?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your inventory efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="glass-hover p-6 rounded-2xl flex flex-col gap-4 border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
