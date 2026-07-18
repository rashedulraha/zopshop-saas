"use client";

import { useState } from "react";
import {
  LineChartWidget,
  AreaChartWidget,
  BarChartWidget,
  DonutChartWidget,
} from "./ChartWidgets";
import { cn } from "@/lib/utils";
import { TrendingUp, Wallet, Package, Users } from "lucide-react";

interface ChartTabsProps {
  trendData: any[];
  monthlyData: any[];
  expenseData: any[];
  brandData: any[];
  bestSelling: any[];
  inventoryValue: any[];
}

export function ChartTabs({
  trendData,
  monthlyData,
  expenseData,
  brandData,
  bestSelling,
  inventoryValue,
}: ChartTabsProps) {
  const [activeTab, setActiveTab] = useState("sales");

  const tabs = [
    { id: "sales", label: "Sales & Cash Flow", icon: TrendingUp },
    { id: "financials", label: "Profit & Expenses", icon: Wallet },
    { id: "inventory", label: "Inventory & Products", icon: Package },
    { id: "customers", label: "Customer Growth", icon: Users },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Scrollable Tab bar on mobile */}
      <div className="flex border-b border-border overflow-x-auto custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        <div className="flex gap-2 pb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="w-full">
        {activeTab === "sales" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <LineChartWidget
              title="Sales Trend"
              subtitle="Daily sales performance over the last 7 days"
              data={trendData}
              dataKey="sales"
            />
            <AreaChartWidget
              title="Purchase Trend"
              subtitle="Daily purchase volume over the last 7 days"
              data={trendData}
              dataKey="purchase"
              fill="#06b6d4"
            />
            <BarChartWidget
              title="Monthly Revenue"
              subtitle="Total revenue generated per month"
              data={monthlyData}
              dataKeys={["revenue"]}
            />
            <BarChartWidget
              title="Cash Flow"
              subtitle="Income vs Expenses"
              data={monthlyData}
              dataKeys={["revenue", "expense"]}
              colors={["#10b981", "#ef4444"]}
            />
          </div>
        )}

        {activeTab === "financials" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <LineChartWidget
              title="Profit Analysis"
              subtitle="Net profit tracking over time"
              data={trendData}
              dataKey="profit"
              stroke="#10b981"
            />
            <DonutChartWidget
              title="Expense Analysis"
              subtitle="Breakdown by category"
              data={expenseData}
            />
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="lg:col-span-2">
              <AreaChartWidget
                title="Inventory Value"
                subtitle="Total monetary value of stock"
                data={inventoryValue}
                dataKey="value"
                fill="#8b5cf6"
              />
            </div>
            <div className="lg:col-span-1">
              <DonutChartWidget
                title="Sales by Brand"
                subtitle="Top performing brands (%)"
                data={brandData}
              />
            </div>
            <div className="lg:col-span-3">
              <BarChartWidget
                title="Best Selling Products"
                subtitle="Top 5 items by volume"
                data={bestSelling}
                dataKeys={["total"]}
                colors={["#f59e0b"]}
              />
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-300">
            <LineChartWidget
              title="Customer Growth"
              subtitle="New customer acquisition"
              data={trendData}
              dataKey="customers"
              stroke="#3b82f6"
            />
          </div>
        )}
      </div>
    </div>
  );
}
