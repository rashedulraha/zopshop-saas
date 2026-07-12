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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
    <div className="w-full max-w-xl bg-card border border-border shadow-sm rounded-3xl p-8 sm:p-10 transition-all duration-300">
      {/* Progress Bar */}
      <div className="mb-8">
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep > step.number
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
                className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${currentStep >= step.number
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
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 !leading-tight tracking-tight">
              Let&apos;s set up your store
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
              We&apos;ll guide you through a quick setup so you can start
              selling online in minutes.
            </p>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
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
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 !leading-tight tracking-tight">
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
                  <FiShoppingBag className="w-3.5 h-3.5 text-primary" />
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="e.g. My Awesome Store"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="category"
                >
                  <FiGrid className="w-3.5 h-3.5 text-primary" />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="onboardPhone"
                >
                  <FiPhone className="w-3.5 h-3.5 text-primary" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="onboardPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1700-000000"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                  htmlFor="address"
                >
                  <FiMapPin className="w-3.5 h-3.5 text-primary" />
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your store address"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.storeName || !formData.category}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm text-sm"
              >
                Continue
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============= STEP 3: Confirmation ============= */}
        {currentStep === 3 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 !leading-tight tracking-tight">
                You&apos;re all set!
              </h2>
              <p className="text-muted-foreground text-sm">
                Review your store details and create your store.
              </p>
            </div>

            {/* Summary Card */}
            <div className="flex-1 bg-muted/50 border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Store Name
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formData.storeName || "—"}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiGrid className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formData.category || "—"}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiPhone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formData.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Address
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formData.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleCreateStore}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 text-sm"
              >
                <FiCheck className="w-4 h-4" />
                Create Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
