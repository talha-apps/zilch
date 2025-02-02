export const SORT_TYPES = ['High to Low', 'Low to High', 'Newest', 'Oldest', 'None'] as const;
export type SortType = typeof SORT_TYPES[number];
export const FILTER_STATUS = ['all', 'completed', 'pending'] as const;
export type FilterStatus = 'all' | 'completed' | 'pending';

export interface Instalment {
  total: number;
  paid: number;
  nextPaymentDate: string | null; // null if fully paid
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string; // ISO string for date
  status: "completed" | "pending"; // Status of the transaction
  instalments: Instalment;
  currencySymbol: string; // Optional currency symbol
}