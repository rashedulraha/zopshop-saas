"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Edit3, Trash2, CheckCircle, Percent, Layers, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  description: string;
  isDefault: boolean;
  status: "Active" | "Inactive";
}

const initialTaxRates: TaxRate[] = [];

export default function TaxSettingsPage() {
  const [rates, setRates] = useState<TaxRate[]>(initialTaxRates);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRate, setEditingBrand] = useState<TaxRate | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  // Aggregate Stats
  const stats = useMemo(() => {
    const total = rates.length;
    const active = rates.filter((r) => r.status === "Active").length;
    const defaultRate = rates.find((r) => r.isDefault)?.rate || 0;

    return { total, active, defaultRate };
  }, [rates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rate) return;

    const parsedRate = parseFloat(rate) || 0;

    // Reset default flags if this is marked default
    let updatedRates = [...rates];
    if (isDefault) {
      updatedRates = updatedRates.map((r) => ({ ...r, isDefault: false }));
    }

    if (editingRate) {
      // Edit mode
      setRates(
        updatedRates.map((r) =>
          r.id === editingRate.id
            ? { ...r, name, rate: parsedRate, description, isDefault, status }
            : r
        )
      );
      setEditingBrand(null);
    } else {
      // Add mode
      const newRate: TaxRate = {
        id: `TAX-00${rates.length + 1}`,
        name,
        rate: parsedRate,
        description,
        isDefault,
        status
      };
      setRates([newRate, ...updatedRates]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (tax: TaxRate) => {
    setEditingBrand(tax);
    setName(tax.name);
    setRate(tax.rate.toString());
    setDescription(tax.description);
    setIsDefault(tax.isDefault);
    setStatus(tax.status);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const target = rates.find((r) => r.id === id);
    if (target?.isDefault) {
      alert("Cannot delete a default tax profile! Set another profile as default first.");
      return;
    }
    if (confirm("Are you sure you want to remove this tax profile?")) {
      setRates(rates.filter((r) => r.id !== id));
    }
  };

  const resetForm = () => {
    setName("");
    setRate("");
    setDescription("");
    setIsDefault(false);
    setStatus("Active");
    setEditingBrand(null);
  };

  const filteredRates = useMemo(() => {
    return rates.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rates, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Tax & VAT</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage value-added tax rates, default invoice taxation, and compliance flags</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tax Profile</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Tax Configurations</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Active Profiles</th>
                <th className="px-5 py-3 font-semibold text-center w-[34%]">Default Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Tax Profiles */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.total} Profiles
                  </span>
                </td>

                {/* Active Profiles */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.active} Active
                  </span>
                </td>

                {/* Default Rate */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Percent className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.defaultRate}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax list section */}
      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tax profiles by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Table */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/10 uppercase border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-2 font-medium w-[20%] whitespace-nowrap">Tax Profile</th>
                  <th className="px-4 py-2 font-medium w-[15%] text-center whitespace-nowrap">Rate Percentage</th>
                  <th className="px-4 py-2 font-medium w-[42%]">Description</th>
                  <th className="px-4 py-2 font-medium w-[10%] text-center">Status</th>
                  <th className="px-4 py-2 font-medium w-[13%] text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredRates.map((tax) => (
                  <tr key={tax.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-foreground whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{tax.name}</span>
                        {tax.isDefault && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Default
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-foreground whitespace-nowrap font-mono text-sm">
                      {tax.rate}%
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm max-w-xs truncate">
                      {tax.description || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                          tax.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1 h-1 rounded-full",
                            tax.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                          )}
                        />
                        {tax.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(tax)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Tax Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tax.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                          title="Delete Tax Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No tax profiles found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Add/Edit Tax Profile */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setIsFormOpen(false);
              resetForm();
            }}
          />

          {/* Modal Container */}
          <div className="relative border border-border bg-card rounded-md max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {editingRate ? "Edit Tax Profile" : "Add Tax Profile"}
                </h3>
                <span className="text-[10px] text-muted-foreground mt-0.5">Configure tax and VAT rates sheet</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted/50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Profile Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Standard VAT"
                  className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Rate Percentage (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief tax description note..."
                  className="w-full px-3 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Configurations</label>
                <div className="flex flex-col gap-2.5 mt-1">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      className="accent-primary rounded"
                    />
                    <span>Set as default tax profile</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</label>
                <div className="flex gap-4 mt-1.5">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input
                      type="radio"
                      checked={status === "Active"}
                      onChange={() => setStatus("Active")}
                      className="accent-primary"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input
                      type="radio"
                      checked={status === "Inactive"}
                      onChange={() => setStatus("Inactive")}
                      className="accent-primary"
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                >
                  {editingRate ? "Update Profile" : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
