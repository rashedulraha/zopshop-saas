"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Transaction,
  TransactionType,
  Party,
  Product,
  TransactionMode,
} from "@/types";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPaymentStatus } from "@/lib/utils/transaction.utils";

const transactionItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
});

const transactionSchema = z.object({
  partyId: z.string().optional(),
  type: z.enum([
    "SALE",
    "PURCHASE",
    "EXPENSE",
    "PAYMENT_RECEIVED",
    "PAYMENT_SENT",
  ] as const),
  items: z.array(transactionItemSchema).optional(),
  amount: z.number().min(0, "Total amount cannot be negative"),
  discount: z.number().min(0).optional(),
  tax: z.number().min(0).optional(),
  paidAmount: z.number().min(0, "Paid amount cannot be negative"),
  mode: z.enum(["CASH", "CREDIT", "BANK"] as const),
  note: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  initialData?: Transaction;
  defaultType: TransactionType;
  parties: Party[];
  products: Product[];
  onSubmit: (data: TransactionFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TransactionForm({
  initialData,
  defaultType,
  parties,
  products,
  onSubmit,
  onCancel,
  isLoading,
}: TransactionFormProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: initialData?.type || defaultType,
      partyId: initialData?.partyId || "",
      items:
        initialData?.items?.map((i) => ({
          productId: i.product?.id || "",
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })) || [],
      amount: initialData?.amount || 0,
      discount: initialData?.discount || 0,
      tax: initialData?.tax || 0,
      paidAmount: initialData?.paidAmount || 0,
      mode: initialData?.mode || "CASH",
      note: initialData?.note || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchItems = form.watch("items") || [];
  const watchDiscount = form.watch("discount") || 0;
  const watchTax = form.watch("tax") || 0;

  // Auto calculate total amount
  useEffect(() => {
    if (defaultType === "SALE" || defaultType === "PURCHASE") {
      const subtotal = watchItems.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0,
      );
      const total = subtotal - watchDiscount + watchTax;
      form.setValue("amount", total);
    }
  }, [watchItems, watchDiscount, watchTax, defaultType, form]);

  const handleProductSelect = (index: number, productId: string) => {
    form.setValue(`items.${index}.productId`, productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      form.setValue(
        `items.${index}.unitPrice`,
        defaultType === "SALE" ? product.price : (product.purchasePrice ?? 0),
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="partyId">
            {defaultType === "SALE"
              ? "Customer"
              : defaultType === "PURCHASE"
                ? "Supplier"
                : "Party"}
          </Label>
          <Select
            onValueChange={(val) => form.setValue("partyId", val || "")}
            defaultValue={form.getValues("partyId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a party" />
            </SelectTrigger>
            <SelectContent>
              {parties.map((party) => (
                <SelectItem key={party.id} value={party.id}>
                  {party.name}{" "}
                  {(party.balance ?? 0) > 0 ? `(Bal: $${party.balance})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mode">Payment Mode *</Label>
          <Select
            onValueChange={(val) =>
              form.setValue("mode", val || "CASH")
            }
            defaultValue={form.getValues("mode")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="BANK">Bank</SelectItem>
              <SelectItem value="CREDIT">Credit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(defaultType === "SALE" || defaultType === "PURCHASE") && (
        <div className="space-y-4 border rounded-md p-4 bg-muted/20">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Order Items</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ productId: "", quantity: 1, unitPrice: 0 })
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 border rounded-md bg-card"
              >
                <div className="flex-1 w-full space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Product
                  </Label>
                  <Select
                    onValueChange={(val) =>
                      handleProductSelect(index, val || "")
                    }
                    defaultValue={form.getValues(`items.${index}.productId`)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} (Stock: {product.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.items?.[index]?.productId && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.items[index]?.productId?.message}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-24 space-y-1">
                  <Label className="text-xs text-muted-foreground">Qty</Label>
                  <Input
                    type="number"
                    min={1}
                    {...form.register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="w-full sm:w-32 space-y-1">
                  <Label className="text-xs text-muted-foreground">Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register(`items.${index}.unitPrice`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="w-full sm:w-32 space-y-1">
                  <Label className="text-xs text-muted-foreground">Total</Label>
                  <div className="h-9 px-3 flex items-center border rounded-md bg-muted text-sm">
                    $
                    {(
                      (watchItems[index]?.unitPrice || 0) *
                      (watchItems[index]?.quantity || 0)
                    ).toFixed(2)}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-5 sm:mt-6 shrink-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note">Notes / Reference</Label>
            <Input
              id="note"
              placeholder="e.g. Inv-10293 or extra details"
              {...form.register("note")}
            />
          </div>
        </div>

        <div className="space-y-4 border rounded-md p-4 bg-muted/10">
          {(defaultType === "SALE" || defaultType === "PURCHASE") && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-medium font-mono">
                  BDT{" "}
                  {watchItems
                    .reduce(
                      (acc, item) => acc + item.unitPrice * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Discount
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("discount", { valueAsNumber: true })}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground">Tax</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("tax", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-base font-semibold">Grand Total</span>
            <span className="text-lg font-bold text-primary font-mono">
              BDT {(form.watch("amount") || 0).toFixed(2)}
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="paidAmount">Paid Amount *</Label>
            <Input
              id="paidAmount"
              type="number"
              step="0.01"
              {...form.register("paidAmount", { valueAsNumber: true })}
            />
            {form.formState.errors.paidAmount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.paidAmount.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Transaction"}
        </Button>
      </div>
    </form>
  );
}
