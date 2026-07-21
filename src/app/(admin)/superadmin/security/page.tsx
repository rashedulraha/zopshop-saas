"use client";

import { ShieldAlert, Key, Smartphone, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SuperadminSecurityPage() {
  const [isEnabling, setIsEnabling] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const handleEnable2FA = async () => {
    setIsEnabling(true);
    try {
      // With better-auth twoFactor plugin, we can call enable
      // This is a placeholder for the actual API call logic based on better-auth docs.
      const res = await authClient.twoFactor.enable({
        password: "YOUR_PASSWORD",
      }); // Example
      if (res?.data) {
        toast.success("2FA setup initiated. Please scan the QR code.");
        // Normally the response contains the TOTP URI which you render with a QR code library.
        setQrCodeData("MOCK_QR_CODE_URI");
      }
    } catch (err: any) {
      toast.error("Failed to enable 2FA");
    } finally {
      setIsEnabling(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-600" /> Security & Access
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage admin credentials and Two-Factor Authentication.
        </p>
      </div>

      <div className="grid gap-6">
        {/* 2FA Settings */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/10 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Two-Factor Authentication (2FA)
            </h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="max-w-md space-y-2">
                <p className="text-sm font-medium">
                  Protect your superadmin account with an extra layer of
                  security.
                </p>
                <p className="text-xs text-muted-foreground">
                  Once configured, you'll be required to enter both your
                  password and an authentication code from your mobile app (like
                  Google Authenticator) in order to sign in.
                </p>
              </div>
              <button
                onClick={handleEnable2FA}
                disabled={isEnabling}
                className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition-colors text-sm disabled:opacity-70 flex items-center gap-2"
              >
                {isEnabling ? "Processing..." : "Enable 2FA"}
              </button>
            </div>

            {qrCodeData && (
              <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg flex flex-col items-center justify-center space-y-4">
                <div className="w-48 h-48 bg-white p-2 rounded-md shadow-sm border border-border flex items-center justify-center">
                  <span className="text-muted-foreground text-sm text-center">
                    QR Code renders here
                    <br />
                    (Requires QRCode.react)
                  </span>
                </div>
                <div className="text-center max-w-sm">
                  <p className="text-sm font-medium">
                    Scan this QR Code in your Authenticator App
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    After scanning, enter the 6-digit code below to verify and
                    complete setup.
                  </p>
                </div>
                <div className="flex gap-2 w-full max-w-xs mt-2">
                  <input
                    type="text"
                    placeholder="000000"
                    className="flex-1 h-10 px-3 rounded-md border border-border text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                    maxLength={6}
                  />
                  <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium shadow-sm transition-colors text-sm">
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Password Reset */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/10 flex items-center gap-2">
            <Key className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Change Password</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="pt-2">
              <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors text-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
