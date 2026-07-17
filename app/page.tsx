import TransactionsTab from "@/components/transactionsTab";
import Header from "@/components/header";
import { fullTransactions } from "@/lib/utils";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { Transaction } from "@/types/types";
import SavingsTab from "@/components/savingsTab";
import { calcMonthSavings } from "@/lib/utils";

export default async function Home() {
  const result = (await db.select().from(transactions)) as Transaction[];
  const full = fullTransactions(result);
  const lastThree = full.slice(0, 3);
  const monthSavings = calcMonthSavings(full);

  return (
    <div className="flex flex-col flex-1 bg-white font-sans w-full">
      <Header title="Home"></Header>
      <div className="flex flex-col flex-1 items-center bg-stone-100 font-sans w-full p-4 gap-8">
        <SavingsTab monthSavings={monthSavings} />
        <TransactionsTab transactions={lastThree} />
      </div>
    </div>
  );
}
