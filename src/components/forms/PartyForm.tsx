"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Party, PartyType } from "@/types";

const partySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().optional(),
  type: z.enum(["CUSTOMER", "SUPPLIER", "BOTH"] as const),
  balance: z.number(),
});

export type PartyFormValues = z.infer<typeof partySchema>;

interface PartyFormProps {
  initialData?: Party;
  defaultType?: PartyType;
  onSubmit: (data: PartyFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PartyForm({ initialData, defaultType = "CUSTOMER", onSubmit, onCancel, isLoading }: PartyFormProps) {
  const form = useForm<PartyFormValues>({
    resolver: zodResolver(partySchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      type: (initialData?.type || defaultType) as any,
      balance: initialData?.balance || 0,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="e.g. Olivia Martin" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" placeholder="e.g. +880 1700-000000" {...form.register("phone")} />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="e.g. olivia@example.com" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="balance">Opening Balance ($)</Label>
          <Input 
            id="balance" 
            type="number" 
            step="0.01" 
            {...form.register("balance", { valueAsNumber: true })} 
            disabled={!!initialData}
          />
          {form.formState.errors.balance && (
            <p className="text-sm text-red-500">{form.formState.errors.balance.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="House, Road, City" {...form.register("address")} />
          {form.formState.errors.address && (
            <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
