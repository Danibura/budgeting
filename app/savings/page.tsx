import { calcMonthSavings } from "@/lib/utils";
import Link from "next/link";
import Header from "@/components/header";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import type { Transaction } from "@/types/types";
import { fullTransactions } from "@/lib/utils";
import SavingsChart from "@/components/savingsChart";
import ActualSavings from "@/components/actualSavings";

export default async function SavingsPage() {
  const result = (await db.select().from(transactions)) as Transaction[];
  const full = fullTransactions(result);
  const monthSavings = calcMonthSavings(full);

  return (
    <div className="bg-stone-100 min-h-screen">
      <Header title="Savings" />
      <div className="flex flex-col flex-1 items-center w-full p-4 gap-8">
        <ActualSavings monthSavings={monthSavings} />
        <SavingsChart monthSavings={monthSavings} />
      </div>
    </div>
  );
}
