export type Transaction = {
  id: number;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  recurring: boolean;
  frequency?: "daily" | "monthly" | "annually";
  startDate?: Date;
  endDate?: Date | string;
};
