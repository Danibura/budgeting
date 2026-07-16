export type Transaction = {
  id: number;
  type: string;
  category: string;
  description?: string;
  amount: number;
  date: string;
  recurring: boolean;
  frequency?: "daily" | "monthly" | "annually";
  endDate?: string;
};
