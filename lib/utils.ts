import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  Transaction,
  TransactionWithOccurrency,
  MonthSavings,
  MonthInOut,
} from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const incomeCategories = [
  { id: "salary", label: "Salary", emoji: "💼", color: "#2563EB" },
  { id: "freelance", label: "Freelance", emoji: "🧑‍💻", color: "#7C3AED" },
  { id: "business", label: "Business", emoji: "🏢", color: "#059669" },
  { id: "investments", label: "Investments", emoji: "📈", color: "#16A34A" },
  { id: "dividends", label: "Dividends", emoji: "💰", color: "#CA8A04" },
  { id: "interest", label: "Interest", emoji: "🏦", color: "#0891B2" },
  {
    id: "rental_income",
    label: "Rental Income",
    emoji: "🏠",
    color: "#EA580C",
  },
  { id: "gifts", label: "Gifts", emoji: "🎁", color: "#DB2777" },
  { id: "refunds", label: "Refunds", emoji: "↩️", color: "#9333EA" },
  { id: "cashback", label: "Cashback", emoji: "💳", color: "#0D9488" },
  { id: "bonus", label: "Bonus", emoji: "🎉", color: "#DC2626" },
  { id: "scholarship", label: "Scholarship", emoji: "🎓", color: "#4F46E5" },
  { id: "pension", label: "Pension", emoji: "👴", color: "#64748B" },
  {
    id: "government_benefits",
    label: "Government Benefits",
    emoji: "🏛️",
    color: "#475569",
  },
  { id: "side_hustle", label: "Side Hustle", emoji: "🚀", color: "#F97316" },
  { id: "selling", label: "Selling Items", emoji: "🛒", color: "#65A30D" },
  { id: "other", label: "Other", emoji: "📌", color: "#78716C" },
];

export const outcomeCategories = [
  { id: "housing", label: "Housing", emoji: "🏠", color: "#2563EB" },
  {
    id: "transportation",
    label: "Transportation",
    emoji: "🚗",
    color: "#EA580C",
  },
  { id: "food", label: "Food", emoji: "🍔", color: "#16A34A" },
  { id: "utilities", label: "Utilities", emoji: "💡", color: "#EAB308" },
  { id: "clothing", label: "Clothing", emoji: "👕", color: "#DB2777" },
  { id: "healthcare", label: "Healthcare", emoji: "🏥", color: "#DC2626" },
  { id: "insurance", label: "Insurance", emoji: "🛡️", color: "#7C3AED" },
  { id: "supplies", label: "Supplies", emoji: "🛡️", color: "#65A30D" },
  { id: "tech", label: "Tech", emoji: "💻", color: "#0891B2" },
  {
    id: "entertainment",
    label: "Entertainment",
    emoji: "🎮",
    color: "#9333EA",
  },
  { id: "travel", label: "Travel", emoji: "✈️", color: "#0D9488" },
  {
    id: "sports_fitness",
    label: "Sports & Fitness",
    emoji: "🏋️",
    color: "#F97316",
  },
  {
    id: "personal_care",
    label: "Personal Care",
    emoji: "💅",
    color: "#EC4899",
  },
  { id: "pets", label: "Pets", emoji: "🐶", color: "#92400E" },
  { id: "gifts", label: "Gifts", emoji: "🎁", color: "#BE123C" },
  { id: "education", label: "Education", emoji: "🎓", color: "#4F46E5" },
  { id: "investments", label: "Investments", emoji: "📈", color: "#059669" },
  { id: "debt", label: "Debt", emoji: "💳", color: "#475569" },
  { id: "taxes", label: "Taxes", emoji: "🧾", color: "#64748B" },
  { id: "charity", label: "Charity", emoji: "❤️", color: "#F43F5E" },
  { id: "business", label: "Business", emoji: "💼", color: "#14B8A6" },
  { id: "other", label: "Other", emoji: "📌", color: "#78716C" },
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
          nextDate <= today &&
          (!transaction.endDate || nextDate <= transaction.endDate)
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
  let monthSavings: MonthSavings[] = [];
  if (transactions.length > 0) {
    const sorted = orderTransactions(transactions, "asc");
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
        if (transaction.type == "income")
          findMonth.savings += transaction.amount;
        else findMonth.savings -= transaction.amount;
      }
    });

    let total = 0;
    monthSavings.forEach((el) => {
      total += el.savings;
      el.savings = total;
    });
  }

  return monthSavings;
}

export function thisYearSavings(monthSavings: MonthSavings[], year1: number) {
  const yearSavings = monthSavings.filter((el) => {
    const year2 = new Date(el.month).getFullYear();
    return year1 == year2;
  });
  return yearSavings;
}

export function calcFirstYear(
  monthSavings?: MonthSavings[],
  transactions?: TransactionWithOccurrency[],
) {
  let firstYear = 0;
  if (monthSavings) firstYear = new Date(monthSavings[0].month).getFullYear();
  if (transactions) {
    const sorted = orderTransactions(transactions, "asc");
    firstYear = new Date(sorted[0].date).getFullYear();
  }
  return firstYear;
}

export function calcFirstMonth(
  monthSavings?: MonthSavings[],
  transactions?: TransactionWithOccurrency[],
) {
  let firstMonth;
  if (monthSavings)
    firstMonth = new Date(monthSavings[0].month).toLocaleString("en-US", {
      month: "long",
    });
  if (transactions) {
    const sorted = orderTransactions(transactions, "asc");
    firstMonth = new Date(sorted[0].date).toLocaleString("en-US", {
      month: "long",
    });
  }
  return firstMonth;
}

export function calcLastMonth(
  monthSavings?: MonthSavings[],
  transactions?: TransactionWithOccurrency[],
) {
  let lastIndex = 0;
  let lastMonth = "0";
  if (monthSavings) {
    lastIndex = monthSavings.length - 1;

    lastMonth = new Date(monthSavings[lastIndex].month).toLocaleString(
      "en-US",
      {
        month: "long",
      },
    );
  }

  if (transactions) {
    lastIndex = transactions.length - 1;
    const sorted = orderTransactions(transactions, "asc");
    lastMonth = new Date(sorted[lastIndex].date).toLocaleString("en-US", {
      month: "long",
    });
  }

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

export function calcInOut(transactions: TransactionWithOccurrency[]) {
  let monthInOut: MonthInOut[] = [];

  if (transactions.length > 0) {
    const sorted = orderTransactions(transactions, "asc");
    let today = new Date().toISOString().split("T")[0];
    let nextMonth = transactions[0].date;
    while (nextMonth <= today) {
      monthInOut.push({ month: nextMonth, incomes: 0, outcomes: 0 });
      nextMonth = addFrequency(nextMonth, "monthly");
    }

    sorted.forEach((transaction) => {
      const transactionDate = transaction.recurring
        ? transaction.occurrencyDate
        : transaction.date;
      const year1 = new Date(transactionDate!).getFullYear();
      const month1 = new Date(transactionDate!).getMonth();

      const findMonth = monthInOut.find((el) => {
        const year2 = new Date(el.month).getFullYear();
        const month2 = new Date(el.month).getMonth();
        return year1 == year2 && month1 == month2;
      });

      if (findMonth != undefined) {
        if (transaction.type == "income")
          findMonth.incomes += transaction.amount;
        else findMonth.outcomes += transaction.amount;
      }
    });
  }

  return monthInOut;
}

export function thisYearInOut(monthInOut: MonthInOut[], year1: number) {
  const yearSavings = monthInOut.filter((el) => {
    const year2 = new Date(el.month).getFullYear();
    return year1 == year2;
  });
  return yearSavings;
}

export function thisYearIncomes(
  transactions: TransactionWithOccurrency[],
  year: number,
) {
  const yearCategories = incomeCategories.map((el) => ({ ...el, amount: 0 }));
  const transactionsType = transactions.filter((el) => el.type == "income");
  transactionsType.forEach((el) => {
    const year2 = new Date(el.date).getFullYear();
    if (year == year2) {
      const findCategory = yearCategories.find((c) => c.id == el.category);
      if (findCategory) findCategory.amount += el.amount;
    }
  });
  return yearCategories;
}

export function thisYearOutcomes(
  transactions: TransactionWithOccurrency[],
  year: number,
) {
  const yearCategories = outcomeCategories.map((el) => ({ ...el, amount: 0 }));
  const transactionsType = transactions.filter((el) => el.type == "outcome");
  transactionsType.forEach((el) => {
    const year2 = new Date(el.date).getFullYear();
    if (year == year2) {
      const findCategory = yearCategories.find((c) => c.id == el.category);
      if (findCategory) findCategory.amount += el.amount;
    }
  });
  return yearCategories;
}
