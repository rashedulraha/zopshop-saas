"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, Category } from "@/types";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/category.store";
import { Loader2 } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  unit: z.string().min(1, "Unit is required (e.g. pcs, kg, ltr)"),
  price: z.number().min(0, "Selling price must be >= 0"),
  purchasePrice: z.number().min(0, "Purchase price must be >= 0").optional(),
  stock: z.number().int().min(0, "Stock must be >= 0").optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  categoryId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const router = useRouter();
  const {
    categories,
    isLoading: isCategoriesLoading,
    fetchCategories,
  } = useCategoryStore();

  // Load categories for the dropdown on mount
  useEffect(() => {
    fetchCategories().catch(console.error);
  }, [fetchCategories]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      unit: initialData?.unit || "",
      price: initialData?.price || 0,
      purchasePrice: initialData?.purchasePrice ?? undefined,
      stock: initialData?.stock ?? 0,
      sku: initialData?.sku || "",
      barcode: initialData?.barcode || "",
      categoryId: initialData?.categoryId || "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="e.g. Organic Rice"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Unit */}
        <div className="space-y-2">
          <Label htmlFor="unit">Unit *</Label>
          <Input
            id="unit"
            placeholder="e.g. pcs, kg, ltr, box"
            {...form.register("unit")}
          />
          {form.formState.errors.unit && (
            <p className="text-sm text-red-500">
              {form.formState.errors.unit.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          {isCategoriesLoading ? (
            <div className="flex items-center h-9 gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading categories...
            </div>
          ) : (
            <select
              id="categoryId"
              {...form.register("categoryId")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              <option value="">— No category —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          {form.formState.errors.categoryId && (
            <p className="text-sm text-red-500">
              {form.formState.errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Selling Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Selling Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...form.register("price", { valueAsNumber: true })}
          />
          {form.formState.errors.price && (
            <p className="text-sm text-red-500">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        {/* Purchase Price */}
        <div className="space-y-2">
          <Label htmlFor="purchasePrice">Purchase Price</Label>
          <Input
            id="purchasePrice"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...form.register("purchasePrice", { valueAsNumber: true })}
          />
          {form.formState.errors.purchasePrice && (
            <p className="text-sm text-red-500">
              {form.formState.errors.purchasePrice.message}
            </p>
          )}
        </div>

        {/* Initial Stock */}
        <div className="space-y-2">
          <Label htmlFor="stock">Initial Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="0"
            {...form.register("stock", { valueAsNumber: true })}
          />
          {form.formState.errors.stock && (
            <p className="text-sm text-red-500">
              {form.formState.errors.stock.message}
            </p>
          )}
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            placeholder="e.g. RICE-1KG-ORG"
            {...form.register("sku")}
          />
          {form.formState.errors.sku && (
            <p className="text-sm text-red-500">
              {form.formState.errors.sku.message}
            </p>
          )}
        </div>

        {/* Barcode */}
        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            placeholder="e.g. 8901234567890"
            {...form.register("barcode")}
          />
          {form.formState.errors.barcode && (
            <p className="text-sm text-red-500">
              {form.formState.errors.barcode.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/products")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || isCategoriesLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
