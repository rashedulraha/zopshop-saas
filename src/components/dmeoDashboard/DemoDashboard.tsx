import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Package,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  FileText,
  Users,
  Shield,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Plus,
  Trash2,
  Landmark,
  MoreHorizontal,
  CheckCircle2,
  Sun,
  Moon,
  X,
} from "lucide-react";

const DemoDashboard = () => {
  // State Management
  const [mockupTab, setMockupTab] = useState("overview");
  const [isDark, setIsDark] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [shopName, setShopName] = useState("ZopShop");
  const [taxRate, setTaxRate] = useState("10");
  const [currency, setCurrency] = useState("USD ($)");
  const [receiptHeader, setReceiptHeader] = useState("Thank You For Shopping!");

  // Cart State
  const [cart, setCart] = useState([
    { id: 1, name: "iPhone 15 Case", price: 19.99, qty: 2 },
    { id: 2, name: "USB-C Cable 2M", price: 12.99, qty: 1 },
    { id: 3, name: "Screen Protector", price: 9.99, qty: 3 },
  ]);

  // Auto-Play Tabs
  const tabs = [
    "overview",
    "features",
    "product",
    "orders",
    "checkout",
    "finance",
    "reports",
    "employees",
    "roles",
    "setting",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      let currentIndex = tabs.indexOf(mockupTab);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabs.length;
        setMockupTab(tabs[currentIndex]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, mockupTab]);

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const cartTax = cartSubtotal * (parseFloat(taxRate) / 100);
  const cartTotal = cartSubtotal + cartTax;

  // Cart Functions
  const updateCartQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeCartItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Theme Toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      {/* Enhanced Dashboard Preview Section */}
      <div
        id="demo-dashboard"
        className="relative w-full max-w-full mx-auto px-4 mt-8"
      >
        {/* Header with Badge & Controls */}
        <div className="text-center mb-8 relative">
          <h2 className="text-2xl md:text-3xl font-normal bg-gradient-to-r from-slate-900 via-blue-600 to-slate-600 dark:from-white dark:via-blue-400 dark:to-slate-300 bg-clip-text text-transparent">
            All in one inventory management system
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Click any menu to explore features in real-time •{" "}
            {isAutoPlay ? "Auto-rotating" : "Manual mode"}
          </p>
        </div>

        {/* Dashboard Container with Glow Effect */}
        <div className="relative group">
          {/* Hover Glow Effect */}

          {/* Main Dashboard */}
          <div className="relative w-full rounded-2xl p-[1px] pt-[2.5px] bg-gradient-to-b from-indigo-300/60 via-indigo-200/20 to-transparent shadow-[0_24px_60px_rgba(99,102,241,0.12)] dark:shadow-[0_24px_60px_rgba(99,102,241,0.2)] transition-all duration-300 group-hover:shadow-[0_32px_80px_rgba(99,102,241,0.2)] dark:group-hover:shadow-[0_32px_80px_rgba(99,102,241,0.3)]">
            {/* Browser Window - Glassmorphism Base */}
            <div className="w-full bg-[#eef2ff] dark:bg-[#141e3a] rounded-[14px] overflow-hidden backdrop-blur-sm">
              {/* Browser Control Bar - Enhanced */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 dark:border-white/8 bg-white/70 dark:bg-[#1a2444] backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 hover:bg-rose-500 transition-colors cursor-pointer" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors cursor-pointer" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 hover:bg-emerald-500 transition-colors cursor-pointer" />
                  <div className="flex items-center gap-1 ml-4 text-[10px] text-slate-400">
                    <span className="hover:text-slate-600 cursor-pointer">
                      ‹
                    </span>
                    <span className="hover:text-slate-600 cursor-pointer">
                      ›
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-md px-4 md:px-14 py-0.5 text-[10px] text-slate-500 dark:text-slate-400 text-center select-none font-medium backdrop-blur-sm truncate max-w-[120px] md:max-w-none">
                  {shopName.toLowerCase()}.com
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <span className="text-[10px] text-slate-400">⟳</span>
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <span className="text-[10px] text-slate-400">✕</span>
                  </button>
                </div>
              </div>

              {/* Browser Content Area */}
              <div className="flex h-[650px] overflow-hidden">
                {/* Sidebar - Enhanced with Glass Effect */}
                <div className="w-16 md:w-48 border-r border-slate-200 dark:border-white/8 flex flex-col p-2 md:p-3.5 bg-white/80 dark:bg-[#1a2444]/80 backdrop-blur-sm overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col gap-4">
                    {/* Logo with Animation */}
                    <div className="flex items-center justify-center md:justify-start gap-2 px-0 md:px-2 pb-1 group/logo">
                      <span className="hidden md:inline font-bold text-slate-800 dark:text-white text-sm tracking-tight group-hover/logo:text-blue-600 transition-colors">
                        {shopName}
                      </span>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex flex-col gap-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {/* Group: Main */}
                      <div className="flex flex-col gap-1">
                        <span className="hidden md:flex text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-400/50" />
                          Main
                        </span>
                        <SidebarButton
                          active={mockupTab === "overview"}
                          onClick={() => setMockupTab("overview")}
                          icon={
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          }
                          label="Overview"
                        />
                        <SidebarButton
                          active={mockupTab === "features"}
                          onClick={() => setMockupTab("features")}
                          icon={<Sparkles className="w-3.5 h-3.5" />}
                          label="Key Features"
                        />
                      </div>

                      {/* Group: Operations */}
                      <div className="flex flex-col gap-1">
                        <span className="hidden md:flex text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
                          Operations
                        </span>
                        <SidebarButton
                          active={mockupTab === "product"}
                          onClick={() => setMockupTab("product")}
                          icon={<Package className="w-3.5 h-3.5" />}
                          label="Product"
                          badge={null}
                        />
                        <SidebarButton
                          active={mockupTab === "orders"}
                          onClick={() => setMockupTab("orders")}
                          icon={<ShoppingCart className="w-3.5 h-3.5" />}
                          label="Orders"
                        />
                        <SidebarButton
                          active={mockupTab === "checkout"}
                          onClick={() => setMockupTab("checkout")}
                          icon={<ShoppingBag className="w-3.5 h-3.5" />}
                          label="Checkout"
                          badge={cart.length}
                        />
                      </div>

                      {/* Group: Finance & Reports */}
                      <div className="flex flex-col gap-1">
                        <span className="hidden md:flex text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-purple-400/50" />
                          Finance & Reports
                        </span>
                        <SidebarButton
                          active={mockupTab === "finance"}
                          onClick={() => setMockupTab("finance")}
                          icon={<Wallet className="w-3.5 h-3.5" />}
                          label="Finance"
                        />
                        <SidebarButton
                          active={mockupTab === "reports"}
                          onClick={() => setMockupTab("reports")}
                          icon={<FileText className="w-3.5 h-3.5" />}
                          label="Reports"
                        />
                      </div>

                      {/* Group: Admin */}
                      <div className="flex flex-col gap-1">
                        <span className="hidden md:flex text-[9px] uppercase tracking-wider text-slate-400/80 dark:text-slate-500 font-bold px-2.5 mb-1 select-none items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-rose-400/50" />
                          Admin
                        </span>
                        <SidebarButton
                          active={mockupTab === "employees"}
                          onClick={() => setMockupTab("employees")}
                          icon={<Users className="w-3.5 h-3.5" />}
                          label="Employees"
                        />
                        <SidebarButton
                          active={mockupTab === "roles"}
                          onClick={() => setMockupTab("roles")}
                          icon={<Shield className="w-3.5 h-3.5" />}
                          label="Users & Roles"
                        />
                        <SidebarButton
                          active={mockupTab === "setting"}
                          onClick={() => setMockupTab("setting")}
                          icon={<Settings className="w-3.5 h-3.5" />}
                          label="Settings"
                        />
                      </div>
                    </div>

                    {/* Sidebar Footer - Status */}
                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/8">
                      <div className="flex items-center justify-center md:justify-start gap-2 px-1 md:px-2.5 py-1.5 rounded-md bg-emerald-50/50 dark:bg-emerald-950/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="hidden md:inline text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                          System Online
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Panel - Enhanced Glass Effect */}
                <div className="flex-1 bg-[#f5f7ff]/80 dark:bg-[#111827]/80 backdrop-blur-sm overflow-y-auto p-5 flex flex-col gap-5 custom-scrollbar">
                  {/* Panel Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        {getTabTitle(mockupTab)}
                        <span className="text-[8px] px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full font-normal">
                          {mockupTab}
                        </span>
                      </h3>
                      <p className="text-[10px] text-slate-550 dark:text-slate-400">
                        {getTabDescription(mockupTab)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative">
                        <Bell className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1.5 border border-white/20 dark:border-white/5 bg-white/30 dark:bg-slate-950/20 rounded-md px-1.5 md:px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 backdrop-blur-sm hover:bg-white/50 transition-all cursor-pointer group">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                          JD
                        </div>
                        <span className="hidden md:inline">Alex</span>
                        <ChevronDown className="hidden md:block w-3 h-3 group-hover:rotate-180 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Content Switcher */}
                  <div className="flex-1">
                    {mockupTab === "features" && <FeaturesTab />}
                    {mockupTab === "overview" && <OverviewTab />}
                    {mockupTab === "product" && <ProductTab />}
                    {mockupTab === "orders" && <OrdersTab />}
                    {mockupTab === "checkout" && (
                      <CheckoutTab
                        cart={cart}
                        cartSubtotal={cartSubtotal}
                        cartTax={cartTax}
                        cartTotal={cartTotal}
                        taxRate={taxRate}
                        updateCartQty={updateCartQty}
                        removeCartItem={removeCartItem}
                      />
                    )}
                    {mockupTab === "finance" && <FinanceTab />}
                    {mockupTab === "reports" && <ReportsTab />}
                    {mockupTab === "employees" && <EmployeesTab />}
                    {mockupTab === "roles" && <RolesTab />}
                    {mockupTab === "setting" && (
                      <SettingsTab
                        shopName={shopName}
                        setShopName={setShopName}
                        taxRate={taxRate}
                        setTaxRate={setTaxRate}
                        currency={currency}
                        setCurrency={setCurrency}
                        receiptHeader={receiptHeader}
                        setReceiptHeader={setReceiptHeader}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SidebarButton = ({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center md:justify-between px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer group relative md:static ${
      active
        ? "bg-[#0066ff]/10 text-[#0066ff] dark:text-blue-400 shadow-sm"
        : "hover:bg-white/10 dark:hover:bg-white/05 text-slate-500 dark:text-slate-400"
    }`}
  >
    <div className="flex items-center gap-2">
      <span
        className={`transition-transform group-hover:scale-110 ${active ? "text-blue-500" : ""}`}
      >
        {icon}
      </span>
      <span className="hidden md:inline">{label}</span>
    </div>
    {badge !== null && badge !== undefined && (
      <span
        className={`absolute md:static -top-1 -right-1 md:top-auto md:right-auto w-3.5 h-3.5 md:w-4 md:h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] md:text-[9px] font-bold transition-all ${active ? "scale-110" : ""}`}
      >
        {badge}
      </span>
    )}
    {!badge && active && <ChevronRight className="hidden md:block w-3 h-3 text-blue-500" />}
    {!badge && !active && (
      <ChevronRight className="hidden md:block w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    )}
  </button>
);

// Tab Content Components
const FeaturesTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs">
    {featuresData.map((feature, index) => (
      <div
        key={index}
        className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col gap-2 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h4 className="font-bold text-slate-800 dark:text-white">
            {feature.title}
          </h4>
        </div>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
          {feature.description}
        </p>
      </div>
    ))}
  </div>
);

const OverviewTab = () => (
  <div className="flex flex-col gap-5 animate-fade-in">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {overviewStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-white/8 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
              {stat.value}
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
            {stat.label}
          </div>
          <span
            className={`text-[9px] font-bold flex items-center gap-0.5 mt-1 ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
          >
            {stat.trend === "up" ? (
              <TrendingUp className="w-2.5 h-2.5" />
            ) : (
              <span className="transform rotate-45 inline-block text-[10px] font-black">
                ↓
              </span>
            )}{" "}
            {stat.change}
          </span>
        </div>
      ))}
    </div>

    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 overflow-hidden backdrop-blur-sm">
      <div className="px-4 py-3 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Recent Transactions
        </span>
        <button className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px] min-w-[500px]">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
            <th className="py-2.5 px-3">No</th>
            <th className="py-2.5 px-3">ID</th>
            <th className="py-2.5 px-3">Date</th>
            <th className="py-2.5 px-3">Customer</th>
            <th className="py-2.5 px-3">Amount</th>
            <th className="py-2.5 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-slate-700 dark:text-slate-300">
          {transactions.map((tx, index) => (
            <tr
              key={index}
              className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
            >
              <td className="py-2.5 px-3">{index + 1}</td>
              <td className="py-2.5 px-3 font-semibold text-[#0066ff] dark:text-blue-400">
                {tx.id}
              </td>
              <td className="py-2.5 px-3">{tx.date}</td>
              <td className="py-2.5 px-3 font-medium">{tx.customer}</td>
              <td className="py-2.5 px-3 font-bold">${tx.amount}</td>
              <td className="py-2.5 px-3">
                <span
                  className={`flex items-center gap-1 font-bold ${tx.status === "New Order" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${tx.status === "New Order" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  </div>
);

const ProductTab = () => (
  <div className="flex flex-col gap-4 animate-fade-in">
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter products..."
            disabled
            className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-md pl-8 pr-2.5 py-1 text-[10px] outline-none backdrop-blur-sm"
          />
        </div>
        <button className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-2.5 py-1 rounded-md text-[10px] font-bold transition-all hover:scale-105 active:scale-95">
          <Plus className="w-3.5 h-3.5" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px] min-w-[500px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
              <th className="py-2 px-3">SKU</th>
              <th className="py-2 px-3">Product</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Stock</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-slate-700 dark:text-slate-300">
            {products.map((product, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="py-2 px-3 font-medium">{product.sku}</td>
                <td className="py-2 px-3 font-semibold">{product.name}</td>
                <td className="py-2 px-3">{product.category}</td>
                <td
                  className={`py-2 px-3 font-bold ${product.stock < 10 ? "text-rose-500" : ""}`}
                >
                  {product.stock}
                </td>
                <td className="py-2 px-3 font-bold">${product.price}</td>
                <td className="py-2 px-3">
                  <span
                    className={`flex items-center gap-1 font-semibold ${product.status === "In Stock" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${product.status === "In Stock" ? "bg-emerald-500" : "bg-rose-500"}`}
                    />
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const OrdersTab = () => (
  <div className="flex flex-col gap-4 animate-fade-in">
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-3 mb-3">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Invoice List
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            3 Paid
          </span>
          <span className="w-2.5 h-2.5 rounded bg-amber-500 ml-2" />
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            1 Due
          </span>
          <span className="w-2.5 h-2.5 rounded bg-rose-500 ml-2" />
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            1 Overdue
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-md bg-white/20 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 text-xs hover:bg-white/40 transition-colors group"
          >
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                {order.id}
              </div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">
                Customer: {order.customer} | Date: {order.date}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-800 dark:text-white">
                ${order.amount}
              </span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                  order.status === "Paid"
                    ? "bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                    : order.status === "Due"
                      ? "bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                      : "bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CheckoutTab = ({
  cart,
  cartSubtotal,
  cartTax,
  cartTotal,
  taxRate,
  updateCartQty,
  removeCartItem,
}: any) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in text-xs">
    <div className="lg:col-span-7 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 flex flex-col gap-3 backdrop-blur-sm">
      <h4 className="font-bold text-slate-800 dark:text-white border-b border-white/10 dark:border-white/5 pb-2 mb-1 flex items-center justify-between">
        <span>Shopping Cart</span>
        <span className="text-[9px] font-normal text-slate-500">
          {cart.length} items
        </span>
      </h4>
      <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/8 hover:shadow-md transition-all group"
            >
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                  {item.name}
                </div>
                <div className="text-[9px] text-[#0066ff]">
                  ${item.price.toFixed(2)} each
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center border border-white/20 dark:border-white/10 rounded bg-white/30 dark:bg-slate-950/40 text-[10px]">
                  <button
                    onClick={() => updateCartQty(item.id, -1)}
                    className="px-1.5 py-0.5 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-l transition-colors"
                  >
                    -
                  </button>
                  <span className="px-2 font-bold min-w-[20px] text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateCartQty(item.id, 1)}
                    className="px-1.5 py-0.5 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-r transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer transition-colors hover:scale-110"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    <div className="lg:col-span-5 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 flex flex-col justify-between gap-4 backdrop-blur-sm">
      <div className="flex flex-col gap-2.5">
        <h4 className="font-bold text-slate-800 dark:text-white border-b border-white/10 dark:border-white/5 pb-2 mb-1">
          Billing Summary
        </h4>
        <div className="flex justify-between text-slate-500 dark:text-slate-400 font-semibold text-[10px]">
          <span>Subtotal</span>
          <span>${cartSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500 dark:text-slate-400 font-semibold text-[10px]">
          <span>Tax ({taxRate}%)</span>
          <span>${cartTax.toFixed(2)}</span>
        </div>
        <hr className="border-white/10 dark:border-white/5" />
        <div className="flex justify-between font-black text-slate-800 dark:text-white text-sm">
          <span>Total</span>
          <span className="text-blue-600 dark:text-blue-400">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-md font-bold text-[10px] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] active:scale-95">
        Process Payment →
      </button>
    </div>
  </div>
);

const FinanceTab = () => (
  <div className="flex flex-col gap-4 animate-fade-in text-xs">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {financeStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/60 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-white/8 flex items-center justify-between backdrop-blur-sm hover:shadow-lg transition-all group"
        >
          <div>
            <span className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold block">
              {stat.label}
            </span>
            <span className={`text-sm font-extrabold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <div className="group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 overflow-hidden backdrop-blur-sm">
      <div className="px-4 py-2.5 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
          Expenses Tracker
        </span>
        <button className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px] min-w-[400px]">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
            <th className="py-2 px-3">Category</th>
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
          {expenses.map((expense, index) => (
            <tr
              key={index}
              className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
            >
              <td className="py-2 px-3 font-semibold">{expense.category}</td>
              <td className="py-2 px-3 text-slate-450 dark:text-slate-400">
                {expense.description}
              </td>
              <td className="py-2 px-3 font-bold text-rose-500">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="py-2 px-3">{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  </div>
);

const ReportsTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
    <div className="lg:col-span-2 bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-white/8 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2 mb-3">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Orders Analytics
        </span>
        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" /> Offline
          </span>
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Online
          </span>
        </div>
      </div>
      <div className="h-32 flex items-end justify-between px-2 pt-4 relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
          <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
          <div className="border-b border-dashed border-white/10 dark:border-white/5 w-full h-[1px]" />
        </div>
        {reportBars.map((bar, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1.5 h-full justify-end w-8 relative"
          >
            {bar.isPeak && (
              <div className="absolute -top-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[7px] px-1 py-0.5 rounded font-black shadow-lg">
                ${bar.peakValue}
              </div>
            )}
            <div
              className={`w-2 rounded-t transition-all duration-500 hover:w-3 ${bar.color}`}
              style={{ height: `${bar.height}%` }}
            />
            <span
              className={`text-[8px] font-semibold ${bar.isPeak ? "text-slate-800 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-white/8 flex flex-col justify-between backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Profit Target
        </span>
        <MoreHorizontal className="w-4 h-4 text-slate-400" />
      </div>
      <div className="h-24 w-full flex items-center justify-center relative">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/40"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#10b981"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="251"
            strokeDashoffset="75"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/40"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#ef4444"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="188.4"
            strokeDashoffset="45"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/40"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="#0066ff"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="125.6"
            strokeDashoffset="30"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 text-[8px] text-slate-500 dark:text-slate-400 font-semibold gap-1 text-center">
        <span className="flex items-center justify-center gap-0.5">
          <span className="w-1 h-1 bg-[#ef4444] rounded-full" /> Offline
        </span>
        <span className="flex items-center justify-center gap-0.5">
          <span className="w-1 h-1 bg-[#10b981] rounded-full" /> Online
        </span>
        <span className="flex items-center justify-center gap-0.5">
          <span className="w-1 h-1 bg-[#0066ff] rounded-full" /> Trade
        </span>
      </div>
    </div>
  </div>
);

const EmployeesTab = () => (
  <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 animate-fade-in text-xs backdrop-blur-sm">
    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 dark:border-white/5">
      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
        Staff Payroll & Roster
      </span>
      <button className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-2.5 py-1 rounded-md text-[10px] font-bold transition-all hover:scale-105 active:scale-95">
        <Plus className="w-3.5 h-3.5" /> Add Staff
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-[10px] min-w-[450px]">
      <thead>
        <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
          <th className="py-2 px-3">Name</th>
          <th className="py-2 px-3">Role</th>
          <th className="py-2 px-3">Attendance</th>
          <th className="py-2 px-3">Salary</th>
          <th className="py-2 px-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
        {employees.map((employee, index) => (
          <tr
            key={index}
            className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
          >
            <td className="py-2 px-3 font-semibold">{employee.name}</td>
            <td className="py-2 px-3 text-slate-450 dark:text-slate-400">
              {employee.role}
            </td>
            <td className="py-2 px-3 font-bold">{employee.attendance}%</td>
            <td className="py-2 px-3 font-bold">
              ${employee.salary.toFixed(2)}
            </td>
            <td className="py-2 px-3">
              <span
                className={`px-2 py-0.5 rounded-md font-bold ${
                  employee.status === "Paid"
                    ? "bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                }`}
              >
                {employee.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
);

const RolesTab = () => (
  <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 animate-fade-in text-xs flex flex-col gap-4 backdrop-blur-sm">
    <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/5">
      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
        Users & Associated Roles
      </span>
      <button className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-2.5 py-1 rounded-md text-[10px] font-bold transition-all hover:scale-105 active:scale-95">
        <Plus className="w-3.5 h-3.5" /> Add User
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-[10px] min-w-[500px]">
      <thead>
        <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/8">
          <th className="py-2 px-3">Name</th>
          <th className="py-2 px-3">Email</th>
          <th className="py-2 px-3">Role</th>
          <th className="py-2 px-3">Permissions</th>
          <th className="py-2 px-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 text-slate-700 dark:text-slate-300">
        {rolesData.map((user, index) => (
          <tr
            key={index}
            className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
          >
            <td className="py-2.5 px-3 font-semibold">{user.name}</td>
            <td className="py-2.5 px-3 text-slate-450 dark:text-slate-400">
              {user.email}
            </td>
            <td className="py-2.5 px-3">
              <span
                className={`px-2 py-0.5 rounded-md font-bold ${user.roleColor}`}
              >
                {user.role}
              </span>
            </td>
            <td className="py-2.5 px-3 font-medium">{user.permissions}</td>
            <td className="py-2.5 px-3">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
);

const SettingsTab = ({
  shopName,
  setShopName,
  taxRate,
  setTaxRate,
  currency,
  setCurrency,
  receiptHeader,
  setReceiptHeader,
}: any) => (
  <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-white/8 p-4 flex flex-col gap-4 animate-fade-in text-xs backdrop-blur-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px] flex items-center gap-1">
          <span className="text-blue-500">🏪</span> Shop Name
        </label>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px] flex items-center gap-1">
          <span className="text-blue-500">📊</span> VAT / Tax Rate (%)
        </label>
        <input
          type="text"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px] flex items-center gap-1">
          <span className="text-blue-500">💱</span> Currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
        >
          <option>USD ($)</option>
          <option>BDT (৳)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-bold text-slate-600 dark:text-slate-400 text-[10px] flex items-center gap-1">
          <span className="text-blue-500">🧾</span> Receipt Footer
        </label>
        <input
          type="text"
          value={receiptHeader}
          onChange={(e) => setReceiptHeader(e.target.value)}
          className="bg-white/20 dark:bg-slate-950/20 border border-white/20 dark:border-white/5 rounded-md px-3 py-1.5 text-[10px] text-slate-800 dark:text-slate-200 font-medium outline-none focus:border-[#0066ff]/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>
    </div>

    <div className="border-t border-white/10 dark:border-white/5 pt-3 flex justify-end">
      <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-md font-bold text-[10px] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" /> Save Configuration
      </button>
    </div>
  </div>
);

// Data Constants
const featuresData = [
  {
    icon: <ShoppingCart className="w-4 h-4 text-[#0066ff]" />,
    title: "Sales & Profit Tracking",
    description:
      "Accurate daily, weekly, or monthly sales records with real-time profit tracking for your business.",
  },
  {
    icon: <Wallet className="w-4 h-4 text-[#0066ff]" />,
    title: "Customer Ledger & Debt Tracking",
    description:
      "Ditch paper registers and digitize customer accounts, credits, and invoices seamlessly.",
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-[#0066ff]" />,
    title: "Business Insights & Reports",
    description:
      "Understand business trends with interactive graphs and analytics to make data-driven decisions.",
  },
  {
    icon: <Users className="w-4 h-4 text-[#0066ff]" />,
    title: "Multi-User Access",
    description:
      "Separate role-based access control for owners, managers, and staff to run operations securely.",
  },
  {
    icon: <Shield className="w-4 h-4 text-[#0066ff]" />,
    title: "Secure Cloud Data",
    description:
      "Never worry about data loss; all store records are securely backed up in the cloud, accessible anytime, anywhere.",
  },
];

const overviewStats = [
  {
    value: "89,935",
    icon: <ShoppingCart className="w-3 h-3 text-[#0066ff]" />,
    label: "Total sales",
    trend: "up",
    change: "+1.0% this week",
  },
  {
    value: "23,283",
    icon: <Package className="w-3 h-3 text-[#0066ff]" />,
    label: "Total products",
    trend: "up",
    change: "+0.49% this week",
  },
  {
    value: "46,827",
    icon: <Users className="w-3 h-3 text-[#0066ff]" />,
    label: "Total users",
    trend: "down",
    change: "-0.91% this week",
  },
  {
    value: "124,854",
    icon: <TrendingUp className="w-3 h-3 text-[#0066ff]" />,
    label: "Refunded",
    trend: "up",
    change: "+1.51% this week",
  },
];

const transactions = [
  {
    id: "#12594",
    date: "Dec 1, 2026",
    customer: "Frank Murlo",
    amount: "847.69",
    status: "New Order",
  },
  {
    id: "#12593",
    date: "Nov 30, 2026",
    customer: "Olivia Martin",
    amount: "299.00",
    status: "New Order",
  },
  {
    id: "#12592",
    date: "Nov 29, 2026",
    customer: "Jackson Lee",
    amount: "150.00",
    status: "Processing",
  },
];

const products = [
  {
    sku: "SKU-8219",
    name: "iPhone 15 Case",
    category: "Accessories",
    stock: 150,
    price: "19.99",
    status: "In Stock",
  },
  {
    sku: "SKU-9382",
    name: 'MacBook Pro 14"',
    category: "Electronics",
    stock: 2,
    price: "1,999.00",
    status: "Critical",
  },
  {
    sku: "SKU-1029",
    name: "USB-C Cable 2M",
    category: "Accessories",
    stock: 200,
    price: "12.99",
    status: "In Stock",
  },
  {
    sku: "SKU-4456",
    name: "Wireless Mouse",
    category: "Electronics",
    stock: 45,
    price: "29.99",
    status: "In Stock",
  },
];

const orders = [
  {
    id: "INV-1001",
    customer: "Olivia Martin",
    date: "Today 10:24 AM",
    amount: "299.00",
    status: "Paid",
  },
  {
    id: "INV-1002",
    customer: "Jackson Lee",
    date: "Today 09:12 AM",
    amount: "99.00",
    status: "Due",
  },
  {
    id: "INV-1003",
    customer: "Sarah Johnson",
    date: "Yesterday 04:30 PM",
    amount: "450.00",
    status: "Paid",
  },
  {
    id: "INV-1004",
    customer: "Mike Wilson",
    date: "Yesterday 02:15 PM",
    amount: "175.50",
    status: "Overdue",
  },
];

const financeStats = [
  {
    label: "Cash Book",
    value: "$6,500.00",
    icon: <Wallet className="w-4 h-4 text-emerald-500" />,
    color: "text-slate-800 dark:text-white",
  },
  {
    label: "Bank Account",
    value: "$32,840.00",
    icon: <Landmark className="w-4 h-4 text-indigo-500" />,
    color: "text-slate-800 dark:text-white",
  },
  {
    label: "Daily Expense",
    value: "$705.00",
    icon: <TrendingUp className="w-4 h-4 text-rose-500 transform rotate-180" />,
    color: "text-rose-500",
  },
];

const expenses = [
  {
    category: "Marketing",
    description: "Facebook Page Ads",
    amount: 500.0,
    date: "12 Oct 2026",
  },
  {
    category: "Utilities",
    description: "Electricity Bill",
    amount: 120.0,
    date: "13 Oct 2026",
  },
  {
    category: "Logistics",
    description: "Courier Services",
    amount: 85.0,
    date: "11 Oct 2026",
  },
];

const reportBars = [
  {
    label: "Jan",
    height: 60,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
  {
    label: "Feb",
    height: 45,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
  {
    label: "Mar",
    height: 75,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
  {
    label: "Apr",
    height: 90,
    color: "bg-[#0066ff]",
    isPeak: true,
    peakValue: "59,492",
  },
  {
    label: "May",
    height: 55,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
  {
    label: "Jun",
    height: 65,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
  {
    label: "Jul",
    height: 50,
    color: "bg-slate-300 dark:bg-slate-700",
    isPeak: false,
  },
];

const employees = [
  {
    name: "John Doe",
    role: "Store Manager",
    attendance: 98,
    salary: 1200.0,
    status: "Paid",
  },
  {
    name: "Jane Smith",
    role: "Cashier",
    attendance: 95,
    salary: 800.0,
    status: "Paid",
  },
  {
    name: "Frank Miller",
    role: "Sales Clerk",
    attendance: 92,
    salary: 650.0,
    status: "Due",
  },
];

const rolesData = [
  {
    name: "Alex",
    email: "alex@zopshop.com",
    role: "Owner / Admin",
    roleColor:
      "bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    permissions: "Full Access (All Modules)",
  },
  {
    name: "John Doe",
    email: "john@zopshop.com",
    role: "Manager",
    roleColor:
      "bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
    permissions: "Inventory, Sales, Analytics",
  },
  {
    name: "Jane Smith",
    email: "jane@zopshop.com",
    role: "Cashier",
    roleColor:
      "bg-purple-50/50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
    permissions: "POS Billing Checkout Only",
  },
];

// Helper Functions
const getTabTitle = (tab: string) => {
  const titles: Record<string, string> = {
    overview: "Welcome Back, Alex",
    features: "Core System Modules",
    product: "Inventory Management",
    orders: "Orders Manager",
    checkout: "Point of Sale (POS) Checkout",
    finance: "Financial Cash Book",
    reports: "Business Insights & Reports",
    employees: "Employee Management",
    roles: "Users & Role Permissions",
    setting: "Store Settings",
  };
  return titles[tab] || "Dashboard";
};

const getTabDescription = (tab: string) => {
  const descriptions: Record<string, string> = {
    overview: "Here is the information about all your orders",
    features: "Core tools designed to scale your retail business",
    product: "Add, update and monitor your business inventory",
    orders: "Search, review and track customer invoice statuses",
    checkout: "Instantly invoice and check out store orders",
    finance: "Track daily operations, cash flows, and operating expenses",
    reports: "Diagnose sales performance and company profitability",
    employees: "Manage staff details, attendance records, and pay summaries",
    roles: "Configure user accounts, roles, and granular system access",
    setting: "Modify currency, tax rates and custom headers",
  };
  return descriptions[tab] || "";
};

// Add custom CSS for animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-5deg); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  
  .animate-spin-slow {
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }
`;

export default DemoDashboard;
