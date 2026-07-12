"use client";

import { Container } from "../ui/Container";
import { Package, CreditCard, BarChart, Users, Shield, Smartphone, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: <Package className="w-5 h-5" />,
    title: "Inventory Management",
    description: "Real-time stock updates",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Billing System",
    description: "Fast invoicing",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    title: "Reports & Analytics",
    description: "Data-driven insights",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Management",
    description: "Role-based access",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Data",
    description: "Encrypted storage",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Friendly",
    description: "Access from anywhere",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">Why Choose ZopShop?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your inventory efficiently, wrapped in a beautiful experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="group flex flex-col bg-card border border-border shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all duration-300">
              
              {/* Top Content Area (16:9 Image placeholder) */}
              <div className="relative w-full aspect-video bg-muted overflow-hidden flex flex-col justify-end p-5 sm:p-6">
                {/* Background Image Placeholder */}
                <img 
                  src={`/images/feature-placeholder-${index + 1}.png`} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply dark:mix-blend-overlay group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; 
                    (e.target as HTMLImageElement).className = "absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent";
                  }}
                />
                
                {/* Subtle gradient overlay to ensure text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent z-10"></div>
                
                <div className="relative z-20">
                  <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2 block">PROJECT</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="mt-auto p-4 sm:p-5 bg-secondary/50 border-t border-border flex items-center justify-between">
                <span className="text-foreground text-sm font-semibold tracking-wide">View all projects</span>
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
