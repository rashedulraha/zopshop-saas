import { Home, Layers, HelpCircle, CreditCard, Info, Mail } from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Features", href: "#features", icon: Layers },
  { name: "How It Works", href: "#how-it-works", icon: HelpCircle },
  { name: "Pricing", href: "#pricing", icon: CreditCard },
  { name: "About", href: "#about", icon: Info },
  { name: "Contact", href: "#contact", icon: Mail },
];

export type NavLink = (typeof NAV_LINKS)[0];
