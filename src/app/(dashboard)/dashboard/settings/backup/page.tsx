"use client";

import { useState, useMemo } from "react";
import { Download, Play, RefreshCw, Database, FileText, CheckCircle, Clock, Server, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackupItem {
  id: string;
  filename: string;
  createdAt: string;
  size: string;
  status: "Completed" | "Failed";
}

const initialBackups: BackupItem[] = [];

export default function BackupSettingsPage() {
  const [backups, setBackups] = useState<BackupItem[]>(initialBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleRunBackup = () => {
    setIsBackingUp(true);

    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const dateString = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      const timeString = `${pad(now.getHours())}${pad(now.getMinutes())}`;
      
      const newBackup: BackupItem = {
        id: `BKP-00${backups.length + 1}`,
        filename: `db_zopshop_${dateString}_${timeString}.sql`,
        createdAt: "Just now",
        size: "12.1 MB",
        status: "Completed"
      };

      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
      showNotification("Database backup file generated successfully!");
    }, 1500);
  };

  const handleRestore = (item: BackupItem) => {
    if (confirm(`CRITICAL WARNING: Restoring the database to the snapshot "${item.filename}" will overwrite all current system data. Are you sure you want to proceed?`)) {
      showNotification(`System successfully restored to backup point: ${item.filename}`);
    }
  };

  const handleDownload = (item: BackupItem) => {
    alert(`Downloading SQL backup archive: ${item.filename}`);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Stats aggregate
  const stats = useMemo(() => {
    const totalCount = backups.length;
    const lastBackup = backups.length > 0 ? backups[0].createdAt : "Never";
    const dbSize = "12.1 MB";
    const autoSchedule = "Everyday 03:00 AM";

    return { totalCount, lastBackup, dbSize, autoSchedule };
  }, [backups]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Database Backup</h1>
          <p className="text-muted-foreground mt-1 text-sm">Download sql database snapshots, schedule automated backups, and run restores</p>
        </div>
        <button
          onClick={handleRunBackup}
          disabled={isBackingUp}
          className="flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium self-start sm:self-auto disabled:opacity-50"
        >
          {isBackingUp ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Backing up...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Backup Database Now</span>
            </>
          )}
        </button>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* KPI Stats Table Card (Unified Single Card) */}
      <div className="border border-border bg-card rounded-md overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left table-fixed min-w-[650px] md:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr className="divide-x divide-border">
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Database Volume</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Last Snapshot</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Backups Count</th>
                <th className="px-5 py-3 font-semibold text-center w-[25%]">Auto Backup Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-border">
                {/* Database Volume */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-primary/10 items-center justify-center text-primary mb-1">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.dbSize}
                  </span>
                </td>

                {/* Last Snapshot */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors bg-emerald-500/[0.005]">
                  <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground block mt-1">
                    {stats.lastBackup}
                  </span>
                </td>

                {/* Backups Count */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-indigo-500/10 items-center justify-center text-indigo-500 mb-1">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-foreground block tracking-tight font-mono">
                    {stats.totalCount} Snaps
                  </span>
                </td>

                {/* Auto Backup Frequency */}
                <td className="px-5 py-5 text-center hover:bg-muted/10 transition-colors">
                  <div className="inline-flex w-7 h-7 rounded-full bg-amber-500/10 items-center justify-center text-amber-500 mb-1">
                    <Server className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-foreground block mt-1">
                    {stats.autoSchedule}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Backups list log card */}
      <div className="border border-border bg-card rounded-md p-5 flex flex-col gap-4 animate-in fade-in duration-200">
        <div>
          <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span>Database Backup Snapshots</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Chronological database archives containing full system tables logs.</p>
        </div>

        {/* Backups table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold w-[45%]">Backup Filename</th>
                <th className="px-4 py-2 font-semibold w-[20%]">Generated At</th>
                <th className="px-4 py-2 font-semibold w-[10%] text-center">Archive Size</th>
                <th className="px-4 py-2 font-semibold w-[10%] text-center">Status</th>
                <th className="px-4 py-2 font-semibold w-[15%] text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {backups.map((bk) => (
                <tr key={bk.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground font-mono">{bk.filename}</td>
                  <td className="px-4 py-3 text-muted-foreground">{bk.createdAt}</td>
                  <td className="px-4 py-3 text-center font-medium text-foreground font-mono">{bk.size}</td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                      bk.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                    )}>
                      <span className={cn(
                        "w-1 h-1 rounded-full",
                        bk.status === "Completed" ? "bg-emerald-500" : "bg-rose-500"
                      )} />
                      {bk.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => handleDownload(bk)}
                        className="h-7 px-2.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-medium text-[10px] inline-flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => handleRestore(bk)}
                        className="h-7 px-2.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold text-[10px] inline-flex items-center gap-1 transition-colors border border-amber-500/15"
                      >
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        <span>Restore</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
