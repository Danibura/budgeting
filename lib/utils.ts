import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transaction, TransactionWithOccurrency } from "@/types/types";
import type { MonthSavings } from "@/types/types";

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

export function addFrequency(date: string, frequency: string) {
  const newDate = new Date(date);
  switch (frequency) {
    case "daily":
      newDate.setDate(newDate.getDate() + 1);
      break;
    case "monthly":
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case "yearly":
      newDate.setFullYear(newDate.getFullYear() + 1);
      break;
  }

  return newDate.toISOString().split("T")[0];
}

export function fullTransactions(transactions: Transaction[]) {
  const fullTransactions: TransactionWithOccurrency[] = transactions.flatMap(
    (transaction) => {
      if (!transaction.recurring) return transaction;
      else {
        let occurrences = [];
        let nextDate = transaction.date;
        let today = new Date().toISOString().split("T")[0];
        while (
          nextDate < today &&
          (!transaction.endDate || nextDate < transaction.endDate)
        ) {
          occurrences.push({
            ...transaction,
            occurrencyDate: nextDate,
          });
          nextDate = addFrequency(nextDate, transaction.frequency!);
        }

        return occurrences;
      }
    },
  );
  const sorted = orderTransactions(fullTransactions, "desc");
  return sorted;
}

export function orderTransactions(
  transactions: TransactionWithOccurrency[],
  order: string,
) {
  let sorted = transactions;
  if (order == "asc")
    sorted.sort((a, b) => {
      let aDate = a.recurring ? a.occurrencyDate : a.date;
      let bDate = b.recurring ? b.occurrencyDate : b.date;
      return aDate!.localeCompare(bDate!);
    });
  else
    sorted.sort((a, b) => {
      let aDate = a.recurring ? a.occurrencyDate : a.date;
      let bDate = b.recurring ? b.occurrencyDate : b.date;
      return bDate!.localeCompare(aDate!);
    });
  return sorted;
}

export function calcMonthSavings(transactions: TransactionWithOccurrency[]) {
  const sorted = orderTransactions(transactions, "asc");
  const monthSavings: MonthSavings[] = [];
  let today = new Date().toISOString().split("T")[0];
  let nextMonth = transactions[0].date;
  while (nextMonth < today) {
    monthSavings.push({ month: nextMonth, savings: 0 });
    nextMonth = addFrequency(nextMonth, "monthly");
  }

  sorted.forEach((transaction) => {
    const transactionDate = transaction.recurring
      ? transaction.occurrencyDate
      : transaction.date;
    const year1 = new Date(transactionDate!).getFullYear();
    const month1 = new Date(transactionDate!).getMonth();

    const findMonth = monthSavings.find((el) => {
      const year2 = new Date(el.month).getFullYear();
      const month2 = new Date(el.month).getMonth();
      return year1 == year2 && month1 == month2;
    });

    if (findMonth != undefined) {
      if (transaction.type == "income") findMonth.savings += transaction.amount;
      else findMonth.savings -= transaction.amount;
    }
  });

  let total = 0;
  monthSavings.forEach((el) => {
    total += el.savings;
    el.savings = total;
  });

  return monthSavings;
}

export function thisYearSavings(monthSavings: MonthSavings[], year1: number) {
  const yearSavings = monthSavings.filter((el) => {
    const year2 = new Date(el.month).getFullYear();
    return year1 == year2;
  });
  return yearSavings;
}

export function calcFirstYear(monthSavings: MonthSavings[]) {
  let firstYear = new Date(monthSavings[0].month).getFullYear();
  return firstYear;
}

export function calcFirstMonth(monthSavings: MonthSavings[]) {
  let firstMonth = new Date(monthSavings[0].month).toLocaleString("en-US", {
    month: "long",
  });
  return firstMonth;
}

export function calcLastMonth(monthSavings: MonthSavings[]) {
  const lastIndex = monthSavings.length - 1;
  let lastMonth = new Date(monthSavings[lastIndex].month).toLocaleString(
    "en-US",
    {
      month: "long",
    },
  );
  return lastMonth;
}

export function calcTrend(monthSavings: MonthSavings[]) {
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const prevMonth = monthSavings.find((el) => {
    const elMonth = new Date(el.month).getMonth();
    const elYear = new Date(el.month).getFullYear();

    return thisMonth - 1 == elMonth && thisYear == elYear;
  });

  const curMonth = monthSavings.find((el) => {
    const elMonth = new Date(el.month).getMonth();
    const elYear = new Date(el.month).getFullYear();

    return thisMonth == elMonth && thisYear == elYear;
  });

  let difference = 0;
  if (curMonth && prevMonth) difference = curMonth.savings - prevMonth.savings;

  return difference;
}
