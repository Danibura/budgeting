import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const incomeCategories = [
  { id: "salary", label: "Salary", emoji: "💼" },
  { id: "freelance", label: "Freelance", emoji: "🧑‍💻" },
  { id: "business", label: "Business", emoji: "🏢" },
  { id: "investments", label: "Investments", emoji: "📈" },
  { id: "dividends", label: "Dividends", emoji: "💰" },
  { id: "interest", label: "Interest", emoji: "🏦" },
  { id: "rental_income", label: "Rental Income", emoji: "🏠" },
  { id: "gifts", label: "Gifts", emoji: "🎁" },
  { id: "refunds", label: "Refunds", emoji: "↩️" },
  { id: "cashback", label: "Cashback", emoji: "💳" },
  { id: "bonus", label: "Bonus", emoji: "🎉" },
  { id: "scholarship", label: "Scholarship", emoji: "🎓" },
  { id: "pension", label: "Pension", emoji: "👴" },
  { id: "government_benefits", label: "Government Benefits", emoji: "🏛️" },
  { id: "side_hustle", label: "Side Hustle", emoji: "🚀" },
  { id: "selling", label: "Selling Items", emoji: "🛒" },
  { id: "other", label: "Other", emoji: "📌" },
];

export const outcomeCategories = [
  { id: "housing", label: "Housing", emoji: "🏠" },
  { id: "transportation", label: "Transportation", emoji: "🚗" },
  { id: "food", label: "Food", emoji: "🍔" },
  { id: "utilities", label: "Utilities", emoji: "💡" },
  { id: "clothing", label: "Clothing", emoji: "👕" },
  { id: "healthcare", label: "Healthcare", emoji: "🏥" },
  { id: "insurance", label: "Insurance", emoji: "🛡️" },
  { id: "supplies", label: "Supplies", emoji: "🛡️" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "entertainment", label: "Entertainment", emoji: "🎮" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "sports_fitness", label: "Sports & Fitness", emoji: "🏋️" },
  { id: "personal_care", label: "Personal Care", emoji: "💅" },
  { id: "pets", label: "Pets", emoji: "🐶" },
  { id: "gifts", label: "Gifts", emoji: "🎁" },
  { id: "education", label: "Education", emoji: "🎓" },
  { id: "investments", label: "Investments", emoji: "📈" },
  { id: "debt", label: "Debt", emoji: "💳" },
  { id: "taxes", label: "Taxes", emoji: "🧾" },
  { id: "charity", label: "Charity", emoji: "❤️" },
  { id: "business", label: "Business", emoji: "💼" },
  { id: "other", label: "Other", emoji: "📌" },
];
