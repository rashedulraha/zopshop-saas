"use client";

import { useState } from "react";
import { Lock, Shield, Smartphone, Key, Monitor, LogOut, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionItem {
  id: string;
  device: string;
  ip: string;
  location: string;
  activeNow: boolean;
}

const initialSessions: SessionItem[] = [];

export default function SecuritySettingsPage() {
  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [twoFactor, setTwoFactor] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    showNotification("Security password successfully changed!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle2FA = () => {
    const newState = !twoFactor;
    setTwoFactor(newState);
    showNotification(newState ? "Two-Factor Authentication activated!" : "Two-Factor Authentication deactivated!");
  };

  const handleTerminateSession = (id: string) => {
    if (confirm("Are you sure you want to terminate this active user session?")) {
      setSessions(sessions.filter((s) => s.id !== id));
      showNotification("User session terminated.");
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full pb-12 flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground mt-2">Manage user credentials, Multi-Factor authentication rules, and audit active sessions.</p>
      </div>

      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium py-3 px-5 rounded-md shadow-lg flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{notification}</span>
        </div>
      )}

      {/* Grid of Password & 2FA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Change Password */}
        <div className="md:col-span-7 border border-border bg-card p-6 rounded-md flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-primary" />
              <span>Change Password</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Keep your account secure by periodically updating your password.</p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/20 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-end">
              <button
                type="submit"
                className="px-5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: 2FA */}
        <div className="md:col-span-5 border border-border bg-card p-6 rounded-md flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-primary" />
              <span>Multi-Factor Auth</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Secure logins using temporary security passcodes generated by authentication apps.</p>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">2FA verification</span>
                <span className={cn("text-[10px]", twoFactor ? "text-emerald-500 font-bold" : "text-muted-foreground")}>
                  {twoFactor ? "Currently Enabled" : "Currently Disabled"}
                </span>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={handleToggle2FA}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                twoFactor ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                  twoFactor ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Active User Sessions */}
      <div className="border border-border bg-card p-6 rounded-md flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Monitor className="w-4.5 h-4.5 text-primary" />
            <span>Active Session Devices</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Auditing logs representing devices currently logged in to your account.</p>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-4 py-2 font-semibold">Device</th>
                <th className="px-4 py-2 font-semibold">IP Address</th>
                <th className="px-4 py-2 font-semibold">Location</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sessions.map((sess) => (
                <tr key={sess.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{sess.device}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{sess.ip}</td>
                  <td className="px-4 py-3 text-muted-foreground">{sess.location}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {sess.activeNow ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                        Active Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20">
                        Logged Out
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleTerminateSession(sess.id)}
                      disabled={sess.activeNow}
                      className={cn(
                        "h-7 px-2.5 rounded font-semibold text-[10px] inline-flex items-center gap-1 transition-colors border",
                        sess.activeNow
                          ? "bg-muted text-muted-foreground border-transparent cursor-not-allowed"
                          : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border-rose-500/15"
                      )}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Terminate</span>
                    </button>
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
