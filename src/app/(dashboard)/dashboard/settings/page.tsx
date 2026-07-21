"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BusinessSettings from "./business/page";
import ThemeSettings from "./theme/page";
import InvoiceSettings from "./invoice/page";
import TaxSettings from "./tax/page";
import BackupSettings from "./backup/page";
import SecuritySettings from "./security/page";
import SystemSettings from "./system/page";
import { Briefcase, Palette, FileText, Calculator, HardDrive, Shield, Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="business" className="flex flex-col md:flex-row gap-6 w-full relative" orientation="vertical">
        {/* Left Side: Tabs List (Sticky on Desktop) */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 md:sticky md:top-20 md:h-[calc(100vh-8rem)] overflow-y-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <TabsList className="flex md:flex-col justify-start h-auto w-full p-1 bg-transparent gap-1.5">
            <TabsTrigger value="business" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <Briefcase className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Business Info</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <Palette className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="invoice" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Invoice Settings</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <Calculator className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Tax & VAT</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <HardDrive className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Backup</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="w-full justify-start py-2.5 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">System Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right Side: Tab Content (Scrolls Naturally) */}
        <div className="flex-1 min-w-0 bg-card/50 backdrop-blur-sm rounded-xl border border-border shadow-sm p-4 md:p-6 lg:p-8">
          <TabsContent value="business" className="m-0 border-0 p-0 outline-none">
            <BusinessSettings />
          </TabsContent>
          
          <TabsContent value="theme" className="m-0 border-0 p-0 outline-none">
            <ThemeSettings />
          </TabsContent>

          <TabsContent value="invoice" className="m-0 border-0 p-0 outline-none">
            <InvoiceSettings />
          </TabsContent>

          <TabsContent value="tax" className="m-0 border-0 p-0 outline-none">
            <TaxSettings />
          </TabsContent>

          <TabsContent value="backup" className="m-0 border-0 p-0 outline-none">
            <BackupSettings />
          </TabsContent>

          <TabsContent value="security" className="m-0 border-0 p-0 outline-none">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="system" className="m-0 border-0 p-0 outline-none">
            <SystemSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
