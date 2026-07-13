"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">Appearance & Theme</h1>
        <p className="text-muted-foreground mt-2">Customize the look and feel of your dashboard.</p>
      </div>

      <div className="p-6 border border-border bg-card rounded-md">
        <h2 className="text-lg font-semibold text-foreground mb-1">Color Theme</h2>
        <p className="text-sm text-muted-foreground mb-6">Select your preferred color scheme for the dashboard interface.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Light Theme Option */}
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "flex flex-col items-start p-4 border rounded-md transition-all text-left",
              theme === "light" 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Sun className="w-5 h-5 text-orange-500" />
              </div>
              {theme === "light" && <Check className="w-5 h-5 text-primary" />}
            </div>
            <span className="font-medium text-foreground">Light Mode</span>
            <span className="text-sm text-muted-foreground mt-1">Clean and bright for daytime use.</span>
          </button>

          {/* Dark Theme Option */}
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "flex flex-col items-start p-4 border rounded-md transition-all text-left",
              theme === "dark" 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <Moon className="w-5 h-5 text-slate-300" />
              </div>
              {theme === "dark" && <Check className="w-5 h-5 text-primary" />}
            </div>
            <span className="font-medium text-foreground">Dark Mode</span>
            <span className="text-sm text-muted-foreground mt-1">Easy on the eyes for low-light environments.</span>
          </button>

          {/* System Theme Option */}
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "flex flex-col items-start p-4 border rounded-md transition-all text-left",
              theme === "system" 
                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                <Monitor className="w-5 h-5 text-muted-foreground" />
              </div>
              {theme === "system" && <Check className="w-5 h-5 text-primary" />}
            </div>
            <span className="font-medium text-foreground">System Default</span>
            <span className="text-sm text-muted-foreground mt-1">Automatically syncs with your OS settings.</span>
          </button>
        </div>
      </div>
    </div>
  );
}
