"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, Edit3, Trash2, CheckCircle, 
  AlertTriangle, Warehouse, Package, Hash, Tag, FileText,
  DollarSign, BarChart2, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  brand: string;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  warehouse: string;
  status: "Active" | "Inactive";
}

import { useProductStore } from "@/store/product.store";
import { useEffect } from "react";
import { toast } from "sonner";

const initialProducts: Product[] = [];

export default function ProductsPage() {
  const { products: storeProducts, fetchProducts, createProduct, deleteProduct, isLoading } = useProductStore();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const products: Product[] = storeProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    code: p.sku || "-",
    category: p.category?.name || "Uncategorized",
    brand: (p.attributes?.brand as string) || "N/A",
    unit: p.unit || "pcs",
    purchasePrice: p.purchasePrice || 0,
    sellingPrice: p.price,
    currentStock: p.stock || 0,
    reorderLevel: 5,
    warehouse: "Main",
    status: "Active"
  }));

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form States
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [brand, setBrand] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [warehouse, setWarehouse] = useState("Main Warehouse");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !purchasePrice || !sellingPrice || !currentStock) return;

    try {
      await createProduct({
        name,
        unit,
        price: parseFloat(sellingPrice),
        purchasePrice: parseFloat(purchasePrice),
        stock: parseInt(currentStock),
        sku: code,
        attributes: { brand, warehouse, reorderLevel: parseInt(reorderLevel) || 5 }
      });
      toast.success("Product added successfully!");
      setIsFormOpen(false);
      resetForm();
    } catch (err) {
      // Error handled by store
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
      } catch (error) {
        // Handled by store
      }
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setCategory("Electronics");
    setBrand("");
    setUnit("pcs");
    setPurchasePrice("");
    setSellingPrice("");
    setCurrentStock("");
    setReorderLevel("");
    setWarehouse("Main Warehouse");
    setStatus("Active");
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage inventory and catalog items</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? "View Catalog" : "Add Product"}</span>
        </button>
      </div>

      {isFormOpen ? (
        /* Create Product Form */
        <div className="border border-border bg-card rounded-md max-w-4xl p-6">
          <div className="border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Add New Product</h2>
            <p className="text-sm text-muted-foreground">Fill in all fields to add a product to the catalog.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Name</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Product Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Code / SKU</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="e.g. IPH15-PM-256"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Groceries">Groceries</option>
                  </select>
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Apple"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Purchase Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Purchase Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(e.target.value)}
                    placeholder="999.00"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Selling Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selling Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={sellingPrice}
                    onChange={e => setSellingPrice(e.target.value)}
                    placeholder="1199.00"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Current Stock */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Stock</label>
                <div className="relative">
                  <BarChart2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    required
                    value={currentStock}
                    onChange={e => setCurrentStock(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Reorder Level */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reorder Level</label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    value={reorderLevel}
                    onChange={e => setReorderLevel(e.target.value)}
                    placeholder="e.g. 10 (triggers low stock alert)"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Warehouse */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Warehouse</label>
                <div className="relative">
                  <Warehouse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={warehouse}
                    onChange={e => setWarehouse(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                  >
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Floor Warehouse">Floor Warehouse</option>
                    <option value="Secondary Warehouse">Secondary Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Unit */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unit</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                  >
                    <option value="pcs">pcs</option>
                    <option value="box">box</option>
                    <option value="kg">kg</option>
                    <option value="ltr">ltr</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Catalog View Table */
        <div className="flex flex-col gap-4">
          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name or code..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
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
                <thead className="text-xs text-muted-foreground bg-muted/10 uppercase border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm">
                  <tr>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Code</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Product Name</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Category</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Brand</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Warehouse</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Stock</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Purchase Price</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Selling Price</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredProducts.map((product) => {
                    const isLowStock = product.currentStock <= product.reorderLevel;
                    return (
                      <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">{product.code}</td>
                        <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">{product.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-muted-foreground">{product.category}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-muted-foreground">{product.brand}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Warehouse className="w-3.5 h-3.5 text-muted-foreground/75" />
                            {product.warehouse}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center gap-1 font-semibold",
                            isLowStock ? "text-rose-500" : "text-foreground"
                          )}>
                            {product.currentStock} {product.unit}
                            {isLowStock && <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap font-medium text-foreground">${product.purchasePrice.toFixed(2)}</td>
                        <td className="px-4 py-2 whitespace-nowrap font-medium text-foreground">${product.sellingPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                            product.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                          )}>
                            {product.status === "Active" ? <CheckCircle className="w-3 h-3" /> : null}
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-1.5">
                            <button title="Edit" className="p-1 hover:text-primary hover:bg-primary/5 rounded transition-colors text-muted-foreground">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(product.id)} title="Delete" className="p-1 hover:text-rose-500 hover:bg-rose-500/5 rounded transition-colors text-muted-foreground">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">
                        No products found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
