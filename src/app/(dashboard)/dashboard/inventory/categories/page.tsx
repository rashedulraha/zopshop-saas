"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
  Layers,
  FileText,
  Tags,
  Hash,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
}

const initialCategories: Category[] = [
  {
    id: "CAT-001",
    name: "Electronics",
    code: "ELEC",
    description: "Smartphones, laptops, smart home devices, and consumer hardware.",
    productCount: 45,
    status: "Active"
  },
  {
    id: "CAT-002",
    name: "Accessories",
    code: "ACCS",
    description: "Chargers, adaptors, phone cases, cables, and power banks.",
    productCount: 8,
    status: "Active"
  },
  {
    id: "CAT-003",
    name: "Furniture",
    code: "FURN",
    description: "Ergonomic chairs, desks, storage cabinets, and office styling elements.",
    productCount: 12,
    status: "Active"
  },
  {
    id: "CAT-004",
    name: "Groceries",
    code: "GROC",
    description: "Daily essentials, canned goods, fresh foods, and beverages.",
    productCount: 0,
    status: "Inactive"
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  // Aggregate stats based on active state
  const stats = useMemo(() => {
    const total = categories.length;
    const active = categories.filter((c) => c.status === "Active").length;
    const totalProducts = categories.reduce((sum, curr) => sum + curr.productCount, 0);
    const avgProducts = total > 0 ? (totalProducts / total).toFixed(1) : "0";

    return { total, active, totalProducts, avgProducts };
  }, [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    if (editingCategory) {
      // Editing Mode
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, code, description, status }
            : c
        )
      );
      setEditingCategory(null);
    } else {
      // Add Mode
      const newCategory: Category = {
        id: `CAT-00${categories.length + 1}`,
        name,
        code: code.toUpperCase(),
        description,
        productCount: 0,
        status
      };
      setCategories([newCategory, ...categories]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setCode(category.code);
    setDescription(category.description);
    setStatus(category.status);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setDescription("");
    setStatus("Active");
    setEditingCategory(null);
  };

  // Search Filter
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1 text-sm">Organize products into hierarchical classification groups</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Total Categories</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Active Categories</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Categorized Products</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Avg Items / Cat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Total Categories */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <FolderOpen className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.total}
                  </span>
                </td>

                {/* Active Categories */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.active}
                  </span>
                </td>

                {/* Categorized Products */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight">
                    {stats.totalProducts}
                  </span>
                </td>

                {/* Avg Items / Category */}
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

      {/* Category List Table */}
      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
        {/* Search bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search categories by name or code..."
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
                  <th className="px-4 py-2 font-medium w-[25%] whitespace-nowrap">Category Name</th>
                  <th className="px-4 py-2 font-medium w-[35%]">Description</th>
                  <th className="px-4 py-2 font-medium w-[12%] text-center whitespace-nowrap">Products Count</th>
                  <th className="px-4 py-2 font-medium w-[10%] text-center">Status</th>
                  <th className="px-4 py-2 font-medium w-[13%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2 font-semibold text-foreground whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 rounded bg-muted text-xs font-mono">
                        {cat.code}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">
                      {cat.name}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-sm max-w-xs truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-foreground whitespace-nowrap">
                      {cat.productCount} items
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                          cat.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            cat.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                          )}
                        />
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No categories found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Add/Edit Category */}
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
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {editingCategory
                    ? "Update structural taxonomy information for this category."
                    : "Fill in category information to group products."}
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
                {/* Category Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Name
                  </label>
                  <div className="relative">
                    <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Smart Electronics"
                      className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Category Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Code (SKU Prefix)
                  </label>
                  <div className="relative">
                    <Tags className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. ELEC"
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
                      placeholder="Detailed category summary..."
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
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
