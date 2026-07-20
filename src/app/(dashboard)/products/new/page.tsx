"use client";

import { ProductForm } from "@/components/forms/ProductForm";
import { useProductStore } from "@/store/product.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  const router = useRouter();
  const { createProduct, isLoading } = useProductStore();

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data);
      toast.success("Product created successfully");
      router.push("/products");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 border-b border-border/50 pb-5">
        <Link href="/products">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Add New Product
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create a new product in your inventory
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-md p-6">
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
