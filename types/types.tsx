export interface MonthSavings {
  month: string;
  savings: number;
}

export interface MonthInOut {
  month: string;
  incomes: number;
  outcomes: number;
}

export interface FullCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  amount: number;
}
