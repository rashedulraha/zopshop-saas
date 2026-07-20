"use client";

import { useEffect, useState } from "react";
import { ProductForm } from "@/components/forms/ProductForm";
import { useProductStore } from "@/store/product.store";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const { currentProduct, fetchProductById, updateProduct, isLoading } = useProductStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProductById(productId);
      } catch (error) {
        toast.error("Failed to load product details");
        router.push("/products");
      } finally {
        setIsInitializing(false);
      }
    };
    
    if (productId) {
      loadProduct();
    }
  }, [productId, fetchProductById, router]);

  const handleSubmit = async (data: any) => {
    try {
      await updateProduct(productId, data);
      toast.success("Product updated successfully");
      router.push("/products");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update product");
    }
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col gap-6 md:gap-8 pb-12 max-w-3xl mx-auto w-full">
        <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
        <div className="h-[400px] w-full bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you are trying to edit does not exist.</p>
        <Link href="/products">
          <Button>Return to Products</Button>
        </Link>
      </div>
    );
  }

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
            Edit Product
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Update {currentProduct.name}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-md p-6">
        <ProductForm 
          initialData={currentProduct} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
