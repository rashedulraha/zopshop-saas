"use client";

import { useState } from "react";
import { Settings, Bell, Volume2, Database, Trash2, CheckCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemSettingsPage() {
  const [stockAlert, setStockAlert] = useState(true);
  const [stockThreshold, setStockThreshold] = useState("10");
  const [soundEffects, setSoundEffects] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pageSize, setPageSize] = useState("10");
  const [isResetting, setIsResetting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("General system configurations successfully updated!");
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
        <p className="text-muted-foreground mt-2">Adjust pagination limits, system alerts thresholds, sound parameters, and master database settings.</p>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* General Configuration Form */}
      <div className="border border-border bg-card p-6 rounded-md shadow-sm">
        <form onSubmit={handleSaveConfig} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4.5 h-4.5 text-primary" />
              <span>General System Configurations</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">Adjust general alert behaviors and paging preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Low Stock Threshold */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Low Stock Notification Threshold</label>
              <input
                type="number"
                required
                value={stockThreshold}
                onChange={(e) => setStockThreshold(e.target.value)}
                disabled={!stockAlert}
                placeholder="e.g. 10"
                className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none disabled:opacity-40"
              />
            </div>

            {/* Pagination Limit */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Table Row Limit</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-border bg-muted/20 text-sm focus:outline-none appearance-none"
              >
                <option value="10">10 Rows per page</option>
                <option value="20">20 Rows per page</option>
                <option value="50">50 Rows per page</option>
                <option value="100">100 Rows per page</option>
              </select>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="border-t border-border pt-6 flex flex-col gap-5">
            {/* Low Stock Warning Alert Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Database className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Low stock warnings alert</span>
                  <span className="text-xs text-muted-foreground">Warn on the dashboard when product quantity dips below threshold.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStockAlert(!stockAlert)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  stockAlert ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                    stockAlert ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Sound effects Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Volume2 className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">POS checkout sound effects</span>
                  <span className="text-xs text-muted-foreground">Play barcode scanner / payment checkout sound effects.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSoundEffects(!soundEffects)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  soundEffects ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                    soundEffects ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Email reports Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Email daily summary report</span>
                  <span className="text-xs text-muted-foreground">Email sales and inventory summaries daily to the administrator.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  emailAlerts ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                    emailAlerts ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5 mt-6">
            <button
              type="submit"
              className="px-5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

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
