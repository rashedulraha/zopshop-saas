export type BusinessType = "general" | "grocery" | "pharmacy" | "electronics" | "clothing" | "hardware" | "restaurant";

export interface BusinessConfig {
  label: string;
  features: string[]; // List of features enabled for this business
  hiddenSidebarItems: string[]; // Navigation labels to hide
}

export const BUSINESS_TYPES: Record<BusinessType, BusinessConfig> = {
  general: {
    label: "General Store / Retail",
    features: ["pos", "inventory", "customers", "suppliers", "reports"],
    hiddenSidebarItems: ["Stock Adjustments", "Expiry Alerts"],
  },
  grocery: {
    label: "Grocery & Supermarket",
    features: ["pos", "inventory", "customers", "suppliers", "reports"],
    hiddenSidebarItems: ["Stock Adjustments", "Expiry Alerts"],
  },
  pharmacy: {
    label: "Pharmacy & Medical",
    features: ["pos", "inventory", "customers", "suppliers", "reports", "expiry_alerts"],
    hiddenSidebarItems: ["Stock Adjustments"],
  },
  electronics: {
    label: "Electronics & Gadgets",
    features: ["pos", "inventory", "customers", "suppliers", "reports", "warranty"],
    hiddenSidebarItems: ["Expiry Alerts", "Stock Adjustments"],
  },
  clothing: {
    label: "Clothing & Fashion",
    features: ["pos", "inventory", "customers", "suppliers", "reports", "variants"],
    hiddenSidebarItems: ["Expiry Alerts"],
  },
  hardware: {
    label: "Hardware & Tools",
    features: ["pos", "inventory", "customers", "suppliers", "reports"],
    hiddenSidebarItems: ["Expiry Alerts"],
  },
  restaurant: {
    label: "Restaurant & Cafe",
    features: ["pos", "inventory", "reports", "tables"],
    hiddenSidebarItems: ["Suppliers", "Expiry Alerts", "Stock Adjustments"], // Simplified for restaurant
  },
};
