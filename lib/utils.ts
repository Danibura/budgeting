import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const incomeCategories = [
  { id: "salary", label: "💼 Salary" },
  { id: "freelance", label: "🧑‍💻 Freelance" },
  { id: "business", label: "🏢 Business" },
  { id: "investments", label: "📈 Investments" },
  { id: "dividends", label: "💰 Dividends" },
  { id: "interest", label: "🏦 Interest" },
  { id: "rental_income", label: "🏠 Rental Income" },
  { id: "gifts", label: "🎁 Gifts" },
  { id: "refunds", label: "↩️ Refunds" },
  { id: "cashback", label: "💳 Cashback" },
  { id: "bonus", label: "🎉 Bonus" },
  { id: "scholarship", label: "🎓 Scholarship" },
  { id: "pension", label: "👴 Pension" },
  { id: "government_benefits", label: "🏛️ Government Benefits" },
  { id: "side_hustle", label: "🚀 Side Hustle" },
  { id: "selling", label: "🛒 Selling Items" },
  { id: "other", label: "📌 Other" },
];

export const outcomeCategories = [
  { id: "housing", label: "🏠 Housing" },
  { id: "transportation", label: "🚗 Transportation" },
  { id: "food", label: "🍔 Food" },
  { id: "utilities", label: "💡 Utilities" },
  { id: "clothing", label: "👕 Clothing" },
  { id: "healthcare", label: "🏥 Healthcare" },
  { id: "insurance", label: "🛡️ Insurance" },
  { id: "supplies", label: "📦 Supplies" },
  { id: "tech", label: "💻 Tech" },
  { id: "entertainment", label: "🎮 Entertainment" },
  { id: "travel", label: "✈️ Travel" },
  { id: "sports_fitness", label: "🏋️ Sports & Fitness" },
  { id: "personal_care", label: "💅 Personal Care" },
  { id: "pets", label: "🐶 Pets" },
  { id: "gifts", label: "🎁 Gifts" },
  { id: "education", label: "🎓 Education" },
  { id: "investments", label: "📈 Investments" },
  { id: "debt", label: "💳 Debt" },
  { id: "taxes", label: "🧾 Taxes" },
  { id: "charity", label: "❤️ Charity" },
  { id: "business", label: "💼 Business" },
  { id: "other", label: "📌 Other" },
];
