"use client";

import { useEffect, useState, useRef } from "react";
import {
  Building2, Search, Store, MoreVertical,
  Trash2, Eye, AlertTriangle, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useAdminStore } from "@/store/admin.store";
import { AdminStore } from "@/lib/api/admin.api";

const PAGE_SIZE = 10;

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────
function DeleteModal({
  store,
  onConfirm,
  onCancel,
  isProcessing,
}: {
  store: AdminStore;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isProcessing ? onCancel : undefined}
      />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {!isProcessing && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-red-100 dark:bg-red-900/30 shrink-0">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Delete Store</h2>
            <p className="text-xs text-muted-foreground mt-0.5">This action cannot be undone.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-800 dark:text-red-300">
            Deleting <strong>&quot;{store.name}&quot;</strong> will permanently remove all associated data including products, transactions, and configurations.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="w-8 h-8 rounded-md bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
            <Store className="w-4 h-4 text-rose-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{store.name}</p>
            <p className="text-xs text-muted-foreground">{store.businessType} • Owner: {store.ownerName ?? "Unassigned"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="flex-1 h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-70"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </span>
            ) : (
              "Yes, Delete Store"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Row Actions Dropdown ──────────────────────────────────────────────────────
function RowActions({
  store,
  onDelete,
}: {
  store: AdminStore;
  onDelete: (store: AdminStore) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 w-44 bg-card border border-border rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => { setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
            View Details
          </button>
          <div className="border-t border-border my-1" />
          <button
            onClick={() => { setOpen(false); onDelete(store); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Store
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function OwnerStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    SUSPENDED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    BANNED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] ?? map.ACTIVE}`}>
      {status}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SuperadminStoresPage() {
  const { stores, isLoadingStores, fetchStores, removeStore } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<AdminStore | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Reset page on search
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.ownerName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await removeStore(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          store={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !isDeleting && setDeleteTarget(null)}
          isProcessing={isDeleting}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Building2 className="w-6 h-6 text-rose-600" /> All Stores
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all tenant stores on the platform.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/10">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, type, owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
              />
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {filtered.length} store{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            {isLoadingStores ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Store Info</th>
                    <th className="px-6 py-4 font-semibold">Business Type</th>
                    <th className="px-6 py-4 font-semibold">Owner</th>
                    <th className="px-6 py-4 font-semibold">Products</th>
                    <th className="px-6 py-4 font-semibold">Joined</th>
                    <th className="px-6 py-4 font-semibold">Owner Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-muted-foreground">
                        {searchTerm ? "No stores match your search." : "No stores found."}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((store) => (
                      <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                        {/* Store Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center border border-rose-200 dark:border-rose-800 shrink-0">
                              <Store className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{store.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{store.id.slice(0, 8)}…</p>
                            </div>
                          </div>
                        </td>

                        {/* Business Type */}
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {store.businessType}
                          </span>
                        </td>

                        {/* Owner */}
                        <td className="px-6 py-4">
                          {store.ownerName ? (
                            <div>
                              <p className="font-medium text-foreground">{store.ownerName}</p>
                              <p className="text-xs text-muted-foreground">{store.ownerEmail}</p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs italic">Unassigned</span>
                          )}
                        </td>

                        {/* Products */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-foreground">{store.productCount}</span>
                          <span className="text-xs text-muted-foreground ml-1">products</span>
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {new Date(store.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </td>

                        {/* Owner Status */}
                        <td className="px-6 py-4">
                          <OwnerStatusBadge status={store.ownerStatus} />
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <RowActions store={store} onDelete={setDeleteTarget} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!isLoadingStores && filtered.length > 0 && (
            <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
              <span>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} stores
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && (arr[idx - 1] as number) + 1 < p) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`w-8 h-8 rounded-md border text-sm transition-colors ${
                          page === p
                            ? "bg-rose-500/10 text-rose-600 border-rose-300 dark:border-rose-700 font-semibold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
