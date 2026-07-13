"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiShoppingBag,
  FiMapPin,
  FiPhone,
  FiGrid,
} from "react-icons/fi";

const STEPS = [
  { label: "Welcome", number: 1 },
  { label: "Business Info", number: 2 },
  { label: "Create Store", number: 3 },
];

const CATEGORIES = [
  "Fashion & Apparel",
  "Electronics",
  "Grocery & Food",
  "Health & Beauty",
  "Home & Living",
  "Books & Stationery",
  "Sports & Outdoors",
  "Other",
];

export function OnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: "",
    category: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreateStore = () => {
    // TODO: Submit form data to API
    console.log("Creating store with:", formData);
    router.push("/dashboard");
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto transition-all duration-300">
      {/* Progress Bar */}
      <div className="mb-8">
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                  currentStep >= step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[320px] flex flex-col">
        {/* ============= STEP 1: Welcome ============= */}
        {currentStep === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              Let&apos;s set up your store
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mb-8">
              We&apos;ll guide you through a quick setup so you can start
              selling online in minutes.
            </p>

            <button
              onClick={handleNext}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
            >
              Start Now
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============= STEP 2: Business Info ============= */}
        {currentStep === 2 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                Business Information
              </h2>
              <p className="text-muted-foreground text-sm">
                Tell us about your store so we can personalize your experience.
              </p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              {/* Store Name */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="storeName"
                >
                  <FiShoppingBag className="w-4 h-4 text-muted-foreground" />
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="e.g. Acme SuperMart"
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="category"
                >
                  <FiGrid className="w-4 h-4 text-muted-foreground" />
                  Business Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    required
                  >
                    <option value="" disabled>
                      Select a category...
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold px-4 py-2 text-sm transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.storeName || !formData.category}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
              >
                Continue
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============= STEP 3: Create Store ============= */}
        {currentStep === 3 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                Contact Details
              </h2>
              <p className="text-muted-foreground text-sm">
                How can your customers reach you?
              </p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="phone"
                >
                  <FiPhone className="w-4 h-4 text-muted-foreground" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1700 000000"
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="address"
                >
                  <FiMapPin className="w-4 h-4 text-muted-foreground" />
                  Store Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address of your store or office"
                  rows={3}
                  className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold px-4 py-2 text-sm transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleCreateStore}
                disabled={!formData.phone || !formData.address}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
              >
                Complete Setup
                <FiCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
