import { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Dashboard | ZopShop",
  description: "Manage your inventory, sales, and analytics.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
