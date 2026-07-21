"use client";

import { useEffect, useState } from "react";
import { Briefcase, Mail, Phone, Globe, MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useConfigStore } from "@/store/config.store";

export default function BusinessSettingsPage() {
  const { config, storeInfo, isLoading, fetchConfig, fetchStoreInfo, updateConfig } = useConfigStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("USD ($)");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [businessType, setBusinessType] = useState("Retail");

  const [notification, setNotification] = useState<string | null>(null);

  // Load from store on mount
  useEffect(() => {
    fetchConfig();
    fetchStoreInfo();
  }, [fetchConfig, fetchStoreInfo]);

  // Sync state when store loads
  useEffect(() => {
    if (storeInfo) {
      setName(storeInfo.name || "");
      setPhone(storeInfo.phone || "");
      setAddress(storeInfo.address || "");
    }
    if (config) {
      setCurrency(config.currency || "USD ($)");
      setDateFormat(config.dateFormat || "MM/DD/YYYY");
      setBusinessType(config.businessType || "Retail");
      
      const custom = config.customFields as any;
      if (custom) {
        setEmail(custom.email || "");
        setWebsite(custom.website || "");
      }
    }
  }, [config, storeInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig({
        currency,
        dateFormat,
        businessType,
        customFields: {
          ...(config?.customFields || {}),
          email,
          website,
          name, // Storing store info overrides in customFields if backend doesn't support separate PUT /store-info for now
          phone,
          address
        }
      });
      setNotification("Business information successfully updated!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Business Information</h1>
        <p className="text-muted-foreground mt-2">Manage your company profile details, default currency, and location configurations.</p>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {isLoading && (!config || !storeInfo) ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      ) : (
        <div className="border border-border bg-card rounded-md p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Name</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Corporate Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Base Currency</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                  </select>
                </div>
              </div>

              {/* Date Format */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">System Date Format</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-5 mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
