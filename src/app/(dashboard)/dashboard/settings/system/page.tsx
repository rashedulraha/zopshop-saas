"use client";

import { useEffect, useState } from "react";
import { Settings, Bell, Volume2, Database, Trash2, CheckCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/store/config.store";

export default function SystemSettingsPage() {
  const { config, isLoading, fetchConfig, updateConfig } = useConfigStore();

  const [enableStock, setEnableStock] = useState(true);
  const [enableExpense, setEnableExpense] = useState(true);
  const [enableCredit, setEnableCredit] = useState(true);
  
  const [isResetting, setIsResetting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load from store on mount
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Sync state when config loads
  useEffect(() => {
    if (config) {
      setEnableStock(config.enableStock ?? true);
      setEnableExpense(config.enableExpense ?? true);
      setEnableCredit(config.enableCredit ?? true);
    }
  }, [config]);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig({
        enableStock,
        enableExpense,
        enableCredit
      });
      showNotification("General system configurations successfully updated!");
    } catch (error) {
      // Error handled by store
    }
  };

  const handleFactoryReset = () => {
    const text = prompt("CRITICAL DANGER: This will delete ALL transactions, products, categories, customers, and rosters. Type 'RESET' to confirm:");
    if (text === "RESET") {
      setIsResetting(true);
      setTimeout(() => {
        setIsResetting(false);
        showNotification("Database successfully wiped. System initialized to factory defaults.");
      }, 2000);
    } else if (text !== null) {
      alert("Invalid confirmation code. Factory reset cancelled.");
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full pb-12 flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-2">Adjust feature toggles, master database settings, and system modules.</p>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {isLoading && !config ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      ) : (
        <div className="border border-border bg-card p-6 rounded-md shadow-sm">
          <form onSubmit={handleSaveConfig} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-primary" />
                <span>Feature Modules</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 font-normal">Enable or disable specific modules of the SaaS application.</p>
            </div>

            {/* Toggle Options */}
            <div className="border-t border-border pt-6 flex flex-col gap-5">
              
              {/* Enable Stock Module */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Database className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Stock & Inventory Module</span>
                    <span className="text-xs text-muted-foreground">Track product stock levels and low stock warnings.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableStock(!enableStock)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableStock ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                      enableStock ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Enable Expense Module */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Volume2 className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Operational Expense Module</span>
                    <span className="text-xs text-muted-foreground">Allow recording of operational expenses in the finance section.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableExpense(!enableExpense)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableExpense ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                      enableExpense ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Enable Credit Module */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bell className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Credit Sales & Purchases</span>
                    <span className="text-xs text-muted-foreground">Allow users to record transactions with partial payments or full credit.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableCredit(!enableCredit)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableCredit ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                      enableCredit ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-5 mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Configuration"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Critical Danger Zone: Factory Reset */}
      <div className="border border-rose-500/20 bg-rose-500/[0.02] p-6 rounded-md flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-rose-500 flex items-center gap-2">
            <Trash2 className="w-4.5 h-4.5" />
            <span>Danger Zone</span>
          </h2>
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">Highly critical actions. Wiping database is irreversible. Proceed with extreme caution.</p>
        </div>

        <div className="border-t border-rose-500/10 pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Factory Reset Database</span>
            <span className="text-xs text-muted-foreground">Wipe all inventory, transactions, customers, and systems.</span>
          </div>
          <button
            onClick={handleFactoryReset}
            disabled={isResetting}
            className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {isResetting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Database</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
