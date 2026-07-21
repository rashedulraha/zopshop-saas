"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Calendar,
  FileText,
  DollarSign,
  Trash2,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useTransactionStore } from "@/store/transaction.store";
import { toast } from "sonner";
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

const categories = [
  "Shop Rent",
  "Salary",
  "Electricity",
  "Internet",
  "Transport",
  "Loading",
  "Maintenance",
  "Miscellaneous",
];

export default function ExpensesPage() {
  const {
    transactions,
    isLoading,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
  } = useTransactionStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Form States
  const [category, setCategory] = useState("Miscellaneous");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Initial fetch for EXPENSE transactions
  useEffect(() => {
    fetchTransactions({ type: "EXPENSE", limit: 500 });
  }, [fetchTransactions]);

  const expenseTransactions = useMemo(() => {
    return transactions.filter((t) => t.type === "EXPENSE");
  }, [transactions]);

  const handleRecordExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description) {
      toast.error("Please fill in required fields: amount, date, description.");
      return;
    }

    try {
      await createTransaction({
        type: "EXPENSE",
        mode: "CASH", // Defaulting expenses to Cash
        amount: parseFloat(amount),
        netAmount: parseFloat(amount),
        paidAmount: parseFloat(amount), // Fully paid expense
        transactionDate: date,
        note: description,
        customData: {
          category,
          reference: reference || "-",
        },
      });

      setIsSuccess(true);
      toast.success("Expense recorded successfully!");

      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
        // Reset Form
        setCategory("Miscellaneous");
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);
        setReference("");
        setDescription("");
      }, 1500);
    } catch (err) {
      toast.error("Failed to record expense");
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Expense deleted");
    } catch (err) {
      toast.error("Failed to delete expense");
    }
  };

  // Filter logic
  const filteredExpenses = expenseTransactions.filter((exp) => {
    const desc = exp.note || "";
    const ref = exp.customData?.reference || "";
    const cat = exp.customData?.category || "Miscellaneous";

    const matchesSearch =
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "All" || cat === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenseAmount = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Expenses
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track showroom and business operational costs
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? "View Expenses" : "Record Expense"}</span>
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md flex items-center gap-3 text-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Expense voucher recorded successfully!</span>
        </div>
      )}

      {isFormOpen ? (
        /* Create Expense Form */
        <div className="border border-border bg-card rounded-md max-w-2xl p-6">
          <div className="border-b border-border pb-4 mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Record Operational Expense
            </h2>
            <p className="text-sm text-muted-foreground">
              Select category and amount to submit an expense voucher.
            </p>
          </div>
          <form onSubmit={handleRecordExpense} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Expense Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Expense Amount ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 150.00"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Voucher Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Reference */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bill Reference / Invoice
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. Bill Ref #101"
                    className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description / Notes
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail explanation for the audit ledger..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-md border border-border bg-muted/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-1.5 border border-border bg-card rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Recording..." : "Record Voucher"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Expenses Table List */
        <div className="flex flex-col gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Total Operational Cost
                </span>
                <span className="text-2xl font-bold text-rose-500 mt-1">
                  ${totalExpenseAmount.toFixed(2)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Active Categories
                </span>
                <span className="text-2xl font-bold text-foreground mt-1">
                  {categories.length} Accounts
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Tag className="w-5 h-5" />
              </div>
            </div>

            <div className="border border-border bg-card p-5 rounded-md flex items-center justify-between sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Total Transactions
                </span>
                <span className="text-2xl font-bold text-foreground mt-1">
                  {filteredExpenses.length} Vouchers
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search description or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-muted-foreground hover:text-foreground"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Ledger Table */}
          <div className="border border-border bg-card rounded-md overflow-hidden">
            <div className="overflow-x-auto max-h-[350px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border sticky top-0 z-10 bg-muted/95 backdrop-blur-sm shadow-sm">
                  <tr>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Voucher ID
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Category
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Reference
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Description
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-4 py-2 font-medium whitespace-nowrap text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {isLoading && filteredExpenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-muted-foreground"
                      >
                        Loading expenses...
                      </td>
                    </tr>
                  ) : filteredExpenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-muted-foreground"
                      >
                        No recorded operational expenses found.
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => (
                      <tr
                        key={exp.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-1.5 font-medium text-foreground whitespace-nowrap font-mono">
                          {exp.invoiceNo || exp.id.slice(-6)}
                        </td>
                        <td className="px-4 py-1.5 whitespace-nowrap text-muted-foreground">
                          {new Date(
                            exp.transactionDate || exp.createdAt,
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-1.5 whitespace-nowrap">
                          <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-500">
                            {exp.customData?.category || "Miscellaneous"}
                          </span>
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-foreground whitespace-nowrap">
                          {exp.customData?.reference || "-"}
                        </td>
                        <td className="px-4 py-1.5 text-muted-foreground whitespace-nowrap">
                          {exp.note || "-"}
                        </td>
                        <td className="px-4 py-1.5 font-bold text-rose-500 whitespace-nowrap font-mono">
                          ${exp.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-1.5 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-1.5">
                            <AlertDialog>
                              <AlertDialogTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-rose-500 hover:text-rose-600"
                                  />
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Expense?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this expense
                                    record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteExpense(exp.id)}
                                    className="bg-rose-500 hover:bg-rose-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))
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
