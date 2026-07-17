export interface Transaction {
  id: number;
  type: string;
  category: string;
  description?: string;
  amount: number;
  date: string;
  recurring: boolean;
  frequency?: "daily" | "monthly" | "annually";
  endDate?: string;
}

export interface TransactionWithOccurrency extends Transaction {
  occurrencyDate?: string;
}

export interface MonthSavings {
  month: string;
  savings: number;
}
