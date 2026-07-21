"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  FolderOpen,
  Layers,
  FileText,
  Tags,
  Hash,
  X,
  Sparkles,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  code: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
}

const initialBrands: Brand[] = [];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  // Aggregate stats based on active state
  const stats = useMemo(() => {
    const total = brands.length;
    const active = brands.filter((b) => b.status === "Active").length;
    const totalProducts = brands.reduce((sum, curr) => sum + curr.productCount, 0);
    const avgProducts = total > 0 ? (totalProducts / total).toFixed(1) : "0";

    return { total, active, totalProducts, avgProducts };
  }, [brands]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    if (editingBrand) {
      // Editing Mode
      setBrands(
        brands.map((b) =>
          b.id === editingBrand.id
            ? { ...b, name, code, description, status }
            : b
        )
      );
      setEditingBrand(null);
    } else {
      // Add Mode
      const newBrand: Brand = {
        id: `BRD-00${brands.length + 1}`,
        name,
        code: code.toUpperCase(),
        description,
        productCount: 0,
        status
      };
      setBrands([newBrand, ...brands]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setCode(brand.code);
    setDescription(brand.description);
    setStatus(brand.status);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setDescription("");
    setStatus("Active");
    setEditingBrand(null);
  };

  // Search Filter
  const filteredBrands = useMemo(() => {
    return brands.filter(
      (b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [brands, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Brands</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage product manufacturers and brand catalogs</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Brands</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Active Brands</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Branded Products</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Avg Items / Brand</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Brands */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Bookmark className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.total}
                  </span>
                </td>

                {/* Active Brands */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.active}
                  </span>
                </td>

                {/* Branded Products */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.totalProducts}
                  </span>
                </td>

                {/* Avg Items / Brand */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Hash className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.avgProducts}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brands List Table Section */}
      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
        {/* Search bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brands by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Table container */}
        <div className="border border-border bg-card rounded-md overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/10 uppercase border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-2 font-medium w-[15%] whitespace-nowrap">Code</th>
                  <th className="px-4 py-2 font-medium w-[25%] whitespace-nowrap">Brand Name</th>
                  <th className="px-4 py-2 font-medium w-[35%]">Description</th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center whitespace-nowrap">Products Count</th>
                  <th className="px-4 py-2 font-medium w-[10%] text-center">Status</th>
                  <th className="px-4 py-2 font-medium w-[13%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-foreground whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 rounded bg-muted text-xs font-mono">
                        {brand.code}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm uppercase shrink-0">
                          {brand.name.charAt(0)}
                        </div>
                        <span>{brand.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-sm max-w-xs truncate">
                      {brand.description || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-foreground whitespace-nowrap">
                      {brand.productCount} items
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                          brand.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            brand.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                          )}
                        />
                        {brand.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Brand"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                          title="Delete Brand"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBrands.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No brands found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Add/Edit Brand */}
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
          <div className="relative border border-border bg-card rounded-md max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {editingBrand ? "Edit Brand" : "Add New Brand"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {editingBrand
                    ? "Update brand details and categorization specifications."
                    : "Fill in brand specifications to organize products."}
                </p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Brand Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Brand Name
                  </label>
                  <div className="relative">
                    <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Apple or Sony"
                      className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Brand Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Brand Code / SKU Suffix
                  </label>
                  <div className="relative">
                    <Tags className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. AAPL or SONY"
                      className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all uppercase"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short manufacturer summary..."
                      className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </label>
                  <div className="flex gap-4 mt-2">
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
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-5">
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
                  {editingBrand ? "Update Brand" : "Add Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
