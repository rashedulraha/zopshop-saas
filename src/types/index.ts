// ==========================================
// USER & AUTHENTICATION TYPES
// ==========================================

export interface User {
  id: string;
  name: string;
  fullName?: string; // Some API response fields might use fullName
  email: string;
  phone?: string;
  role?: "admin" | "manager" | "cashier" | "user" | string;
  storeId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Store {
  id: string;
  name: string;
  slug?: string;
  ownerId: string;
  address?: string;
  phone?: string;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  user: User;
  token?: string;
  expiresAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  store?: Store | null;
}

// ==========================================
// INVENTORY TYPES
// ==========================================

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  storeId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  barcode?: string;
  description?: string;
  costPrice: number;
  price: number; // Selling price
  stock: number;
  storeId: string;
  categoryId?: string | null;
  category?: Category | null;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// PARTY (CUSTOMER / SUPPLIER) TYPES
// ==========================================

export type PartyType = "customer" | "supplier";

export interface Party {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  type: PartyType;
  balance: number; // Positive means receivable for customer / payable for supplier
  storeId: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// TRANSACTION TYPES
// ==========================================

export type TransactionType = "sale" | "purchase" | "expense" | "cash_in" | "cash_out";
export type PaymentMethod = "cash" | "bank" | "mobile_banking" | "other";
export type PaymentStatus = "paid" | "partial" | "due";

export interface TransactionItem {
  id: string;
  transactionId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number; // Price at which item was sold/purchased
  costPrice?: number; // Cost price of item at time of transaction
  subtotal: number;
}

export interface Transaction {
  id: string;
  invoiceNumber: string;
  type: TransactionType;
  partyId?: string | null;
  party?: Party | null;
  items: TransactionItem[];
  totalAmount: number;
  discount: number;
  tax: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdBy: string; // User ID of creator
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// REPORT RESPONSES TYPES
// ==========================================

// 1. Dashboard Summary Report
export interface DashboardReport {
  summary: {
    totalSales: number;
    totalPurchases: number;
    totalExpenses: number;
    cashInHand: number;
    receivables: number;
    payables: number;
    stockValue: number;
  };
  recentTransactions: Transaction[];
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  salesTrend: Array<{
    date: string; // "YYYY-MM-DD" or short date
    sales: number;
    purchases: number;
    profit: number;
  }>;
}

// 2. Daily Summary Report
export interface DailyReport {
  date: string;
  openingBalance: number;
  closingBalance: number;
  sales: number;
  purchases: number;
  expenses: number;
  cashInFlow: number;
  cashOutFlow: number;
  netCashFlow: number;
  transactions: Transaction[];
}

// 3. Outstanding Balances Report
export interface OutstandingReport {
  totalReceivables: number;
  totalPayables: number;
  customers: Array<{
    partyId: string;
    name: string;
    phone: string;
    dueAmount: number;
  }>;
  suppliers: Array<{
    partyId: string;
    name: string;
    phone: string;
    dueAmount: number;
  }>;
}

// 4. Stock & Inventory Report
export interface StockReport {
  totalItems: number;
  totalStockValueCost: number;
  totalStockValueRetail: number;
  lowStockItems: Product[];
  items: Array<{
    productId: string;
    name: string;
    sku?: string;
    stock: number;
    costPrice: number;
    price: number;
    stockValue: number; // stock * costPrice or retail price depending on standard
  }>;
}

// 5. Profit & Loss Report
export interface ProfitLossReport {
  startDate: string;
  endDate: string;
  revenue: number; // total sales
  costOfGoodsSold: number;
  grossProfit: number;
  expenses: Array<{
    category: string;
    amount: number;
  }>;
  totalExpenses: number;
  netProfit: number;
}
