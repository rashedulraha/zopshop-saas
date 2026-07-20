"use client";

import { useEffect, useState } from "react";
import { usePartyStore } from "@/store/party.store";
import { PartyForm } from "@/components/forms/PartyForm";
import { Search, Plus, User, Phone, MapPin, Edit, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getPaymentStatus } from "@/lib/utils/transaction.utils";

export default function CustomersPage() {
  const { parties, isLoading, fetchParties, createParty, updateParty, deleteParty, fetchPartyTransactions, partyTransactions } = usePartyStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartyId, setEditingPartyId] = useState<string | null>(null);
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetchParties({ type: "CUSTOMER", search: debouncedSearch, limit: 50 });
  }, [debouncedSearch, fetchParties]);

  // Set default selected party if none is selected and data is available
  useEffect(() => {
    if (parties.length > 0 && !selectedPartyId) {
      setSelectedPartyId(parties[0].id);
    }
  }, [parties, selectedPartyId]);

  // Fetch transactions when a party is selected
  useEffect(() => {
    if (selectedPartyId) {
      fetchPartyTransactions(selectedPartyId, { limit: 10 });
    }
  }, [selectedPartyId, fetchPartyTransactions]);

  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (editingPartyId) {
        await updateParty(editingPartyId, data);
        toast.success("Customer updated successfully");
      } else {
        await createParty({ ...data, type: "CUSTOMER" });
        toast.success("Customer created successfully");
      }
      setIsFormOpen(false);
      setEditingPartyId(null);
      fetchParties({ type: "CUSTOMER", search: debouncedSearch, limit: 50 });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save customer");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteParty(id);
      toast.success("Customer deleted successfully");
      if (selectedPartyId === id) setSelectedPartyId(null);
      fetchParties({ type: "CUSTOMER", search: debouncedSearch, limit: 50 });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete customer");
    }
  };

  const selectedParty = parties.find(p => p.id === selectedPartyId) || parties[0];
  const editingParty = parties.find(p => p.id === editingPartyId);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Customers
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage client details and balances
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => {
              setEditingPartyId(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Customer</span>
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="border border-border bg-card rounded-md max-w-2xl p-6">
          <div className="border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {editingPartyId ? "Edit Customer" : "Add New Customer"}
            </h2>
          </div>
          <PartyForm 
            initialData={editingParty}
            defaultType="CUSTOMER"
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingPartyId(null);
            }}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Customer Selector (List) */}
          <div className="lg:col-span-4 border border-border bg-card rounded-md flex flex-col p-4">
            <div className="relative w-full mb-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              {isLoading && parties.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">Loading...</div>
              ) : parties.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">No customers found.</div>
              ) : (
                parties.map((cust) => {
                  const isSelected = cust.id === selectedPartyId;
                  const balance = cust.balance ?? 0;
                  return (
                    <button
                      key={cust.id}
                      onClick={() => setSelectedPartyId(cust.id)}
                      className={cn(
                        "flex flex-col items-start text-left p-3 rounded-md border transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-transparent bg-transparent hover:bg-muted/50",
                      )}
                    >
                      <span className="font-semibold text-foreground text-sm">
                        {cust.name}
                      </span>
                      <div className="flex items-center justify-between w-full mt-1">
                        <span className="text-xs text-muted-foreground">
                          {cust.mobile || "-"}
                        </span>
                        <span className={cn(
                          "text-xs font-medium",
                          balance > 0 ? "text-emerald-500" : balance < 0 ? "text-rose-500" : "text-muted-foreground"
                        )}>
                          ${Math.abs(balance).toFixed(2)} {balance > 0 ? "Recv" : balance < 0 ? "Pay" : ""}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Customer Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {selectedParty ? (
              <div className="border border-border bg-card rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedParty.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{selectedParty.mobile || "No Mobile"}</span>
                        </div>
                        {selectedParty.address && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{selectedParty.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingPartyId(selectedParty.id);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger render={<Button variant="outline" size="sm" className="text-rose-500 hover:text-rose-600" />}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {selectedParty.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(selectedParty.id)}
                            className="bg-rose-500 hover:bg-rose-600 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="p-5 rounded-md border border-border bg-background flex flex-col items-center text-center flex-1">
                      <span className="text-sm font-medium text-muted-foreground mb-1">Current Balance</span>
                      <span className={cn(
                        "text-3xl font-bold",
                        (selectedParty.balance ?? 0) > 0 ? "text-emerald-500" : (selectedParty.balance ?? 0) < 0 ? "text-rose-500" : "text-foreground"
                      )}>
                        ${Math.abs(selectedParty.balance ?? 0).toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {(selectedParty.balance ?? 0) > 0 ? "Receivable" : (selectedParty.balance ?? 0) < 0 ? "Payable" : "Settled"}
                      </span>
                    </div>
                    <div className="p-5 rounded-md border border-border bg-background flex flex-col justify-center items-center flex-1">
                       <span className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</span>
                       <Link href={`/dashboard/sales/new?partyId=${selectedParty.id}`}>
                         <Button className="w-full">
                           <Plus className="w-4 h-4 mr-2" />
                           New Transaction
                         </Button>
                       </Link>
                    </div>
                  </div>

                  {/* Transactions List */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                      <Link href={`/dashboard/customers/ledger?partyId=${selectedParty.id}`} className="text-sm text-primary hover:underline flex items-center">
                        View full ledger <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                    
                    {isLoading ? (
                      <div className="text-center py-6 text-sm text-muted-foreground">Loading transactions...</div>
                    ) : partyTransactions.length === 0 ? (
                      <div className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-md">
                        No transactions found for this customer.
                      </div>
                    ) : (
                      <div className="border border-border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50 border-b border-border text-left">
                            <tr>
                              <th className="font-medium p-3">Invoice</th>
                              <th className="font-medium p-3">Date</th>
                              <th className="font-medium p-3">Type</th>
                              <th className="font-medium p-3">Amount</th>
                              <th className="font-medium p-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {partyTransactions.map((tx) => (
                              <tr key={tx.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                                <td className="px-4 py-3 font-semibold text-foreground font-mono">
                                  {tx.invoiceNo || "-"}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                  {new Date(tx.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                  <span className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border",
                                    tx.type === "SALE" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                  )}>
                                    {tx.type}
                                  </span>
                                </td>
                                <td className="px-4 py-3 font-bold text-foreground font-mono">
                                  ${tx.amount.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className={cn(
                                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                                    getPaymentStatus(tx.dueAmount, tx.amount) === "paid" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                                    (getPaymentStatus(tx.dueAmount, tx.amount) === "due" || getPaymentStatus(tx.dueAmount, tx.amount) === "partial") && "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                  )}>
                                    <span className={cn(
                                      "w-1.5 h-1.5 rounded-full",
                                      getPaymentStatus(tx.dueAmount, tx.amount) === "paid" ? "bg-emerald-500" : "bg-amber-500"
                                    )} />
                                    {getPaymentStatus(tx.dueAmount, tx.amount) === "paid" ? "Paid" : "Due"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-border bg-card rounded-md p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <User className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground">No Customer Selected</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Select a customer from the list or create a new one to view their details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
