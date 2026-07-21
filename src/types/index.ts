// ==========================================
// USER & AUTHENTICATION TYPES
// ==========================================

export interface User {
  id: string;
  name: string;
  fullName?: string; // Some API response fields might use fullName
  email: string;
  phone?: string;
  role?: "SUPERADMIN" | "admin" | "manager" | "cashier" | "user" | string;
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
  _count?: { products: number };
  createdAt?: string;
  updatedAt?: string;
}

export interface Config {
  id: string;
  storeId: string;
  enableCredit: boolean;
  enableStock: boolean;
  enableExpense: boolean;
  currency: string;
  dateFormat: string;
  businessType?: string;
  customFields: {
    product?: string[];
    party?: string[];
    transaction?: string[];
    [key: string]: any;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  userId: string;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number; // Selling price
  purchasePrice?: number;
  stock: number;
  sku?: string;
  barcode?: string;
  attributes?: Record<string, unknown>;
  storeId: string;
  categoryId?: string | null;
  category?: Category | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductPayload {
  name: string;
  unit: string;
  price: number;
  purchasePrice?: number;
  stock?: number;
  sku?: string;
  barcode?: string;
  attributes?: Record<string, unknown>;
  categoryId?: string | null;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// ==========================================
// PARTY (CUSTOMER / SUPPLIER) TYPES
// ==========================================

export type PartyType =
  | "customer"
  | "supplier"
  | "CUSTOMER"
  | "SUPPLIER"
  | "BOTH";

export interface Party {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  address?: string;
  type: PartyType;
  openingBalance: number;
  balance?: number; // Positive means receivable for customer / payable for supplier
  customData?: Record<string, unknown>;
  storeId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePartyPayload {
  name: string;
  email?: string;
  mobile?: string;
  address?: string;
  type: PartyType;
  openingBalance?: number;
  customData?: Record<string, unknown>;
}

export interface PartyListResponse {
  parties: Party[];
  total: number;
  page: number;
  limit: number;
}

// ==========================================
// TRANSACTION TYPES
// ==========================================

export type TransactionType =
  | "SALE"
  | "PURCHASE"
  | "EXPENSE"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_SENT";
export type TransactionMode = "CASH" | "CREDIT" | "BANK";

export interface TransactionItem {
  id: string;
  transactionId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price?: number; // legacy alias
  unitPrice: number;
  costPrice?: number;
  subtotal?: number; // legacy alias
  totalPrice?: number;
}

export interface Transaction {
  id: string;
  invoiceNo: string;
  invoiceNumber?: string; // legacy alias
  type: TransactionType;
  mode: TransactionMode;
  partyId?: string | null;
  party?: Party | null;
  items?: TransactionItem[];
  amount: number;
  totalAmount?: number; // legacy alias
  discount: number;
  tax: number;
  netAmount: number;
  paidAmount: number;
  dueAmount: number;
  note?: string;
  notes?: string; // legacy alias
  transactionDate: string;
  customData?: Record<string, any>;
  createdBy?: string;
  storeId?: string;
  createdAt: string;
  updatedAt: string;
}



export interface CreateTransactionPayload {
  partyId?: string | null;
  type: TransactionType;
  mode: TransactionMode;
  amount: number;
  netAmount: number;
  discount?: number;
  tax?: number;
  paidAmount?: number;
  note?: string;
  transactionDate?: string;
  customData?: Record<string, any>;
  items?: Array<Omit<TransactionItem, "id" | "transactionId">>;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export interface DailySummary {
  date: string;
  totalSales: number;
  totalPurchases: number;
  totalExpenses: number;
  paymentsReceived: number;
  paymentsSent: number;
  netCashFlow: number;
}

export interface PartyLedgerResponse {
  party: Party;
  openingBalance: number;
  closingBalance: number;
  transactions: Transaction[];
  totalDebit: number;
  totalCredit: number;
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
