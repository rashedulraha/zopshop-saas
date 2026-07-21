"use client";

import { useAuthStore } from "@/store/auth.store";
import { Building2, Users, CreditCard, Activity, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function SuperadminDashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: "Total Stores",
      value: "142",
      change: "+12%",
      trend: "up",
      icon: Building2,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Total Users",
      value: "1,249",
      change: "+18%",
      trend: "up",
      icon: Users,
      color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      title: "MRR (Revenue)",
      value: "$12,450",
      change: "+8%",
      trend: "up",
      icon: CreditCard,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "Active Sessions",
      value: "34",
      change: "Stable",
      trend: "neutral",
      icon: Activity,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.name || "Super Admin"}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is what's happening across the ZopShop platform today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Recent Store Registrations</h3>
            <button className="text-sm text-primary font-medium hover:underline flex items-center">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-md">
                <tr>
                  <th className="px-4 py-3 font-medium">Store Name</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Joined Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Tech Haven", owner: "John Doe", plan: "Pro", date: "Today", status: "Active" },
                  { name: "Fresh Groceries", owner: "Sarah Smith", plan: "Basic", date: "Yesterday", status: "Active" },
                  { name: "Build It Hardware", owner: "Mike Johnson", plan: "Enterprise", date: "Jul 18", status: "Active" },
                  { name: "Fashion Boutique", owner: "Emma Wilson", plan: "Basic", date: "Jul 15", status: "Pending" },
                ].map((store, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{store.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{store.owner}</td>
                    <td className="px-4 py-3 text-muted-foreground">{store.plan}</td>
                    <td className="px-4 py-3 text-muted-foreground">{store.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        store.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {store.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-6">System Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Database Load</span>
                <span className="text-sm text-emerald-600 font-semibold">24%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">API Response Time</span>
                <span className="text-sm text-emerald-600 font-semibold">124ms</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-amber-600 font-semibold">78%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
