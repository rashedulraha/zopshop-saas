"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  FolderOpen,
  Layers,
  Hash,
  X,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category.store";
import { Category } from "@/types";

export default function CategoriesPage() {
  const { categories, isLoading, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategoryStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Aggregate stats based on active state
  const stats = useMemo(() => {
    const total = categories.length;
    const totalProducts = categories.reduce((sum, curr) => sum + (curr._count?.products || 0), 0);
    const avgProducts = total > 0 ? (totalProducts / total).toFixed(1) : "0";

    return { total, active: total, totalProducts, avgProducts };
  }, [categories]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingCategory) {
        // Editing Mode
        await updateCategory(editingCategory.id, name.trim());
        showNotification("Category successfully updated!");
      } else {
        // Add Mode
        await createCategory(name.trim());
        showNotification("New category successfully created!");
      }
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      // Error handled by store
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        showNotification("Category successfully deleted!");
      } catch (error) {
        // Error handled by store
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEditingCategory(null);
  };

  // Search Filter
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
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

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Total Categories</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Categorized Products</th>
                <th className="px-5 py-3 font-semibold text-center w-[33%]">Avg Items / Cat</th>
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
              placeholder="Search categories by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Table container */}
        <div className="border border-border bg-card rounded-md overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-20">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/10 uppercase border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                <tr>
                  <th className="px-4 py-3 font-medium w-[25%] whitespace-nowrap">ID</th>
                  <th className="px-4 py-3 font-medium w-[45%] whitespace-nowrap">Category Name</th>
                  <th className="px-4 py-3 font-medium w-[15%] text-center whitespace-nowrap">Products</th>
                  <th className="px-4 py-3 font-medium w-[15%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2 font-semibold text-muted-foreground whitespace-nowrap font-mono text-xs">
                      {cat.id.slice(-8)}
                    </td>
                    <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">
                      {cat.name}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-foreground whitespace-nowrap">
                      {cat._count?.products || 0} items
                    </td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5 w-full">
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
                {filteredCategories.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
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
          <div className="relative border border-border bg-card rounded-md max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {editingCategory
                    ? "Update taxonomy information for this category."
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
                  disabled={isLoading}
                  className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : (editingCategory ? "Update Category" : "Add Category")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
