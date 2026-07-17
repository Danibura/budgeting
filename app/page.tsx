import TransactionsTab from "@/components/transactionsTab";
import Header from "@/components/header";
import { fullTransactions, calcMonthSavings } from "@/lib/utils";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { Transaction } from "@/types/types";
import InOutTab from "@/components/inOutTab";
import Link from "next/link";
import ActualSavings from "@/components/actualSavings";

export default async function Home() {
  const result = (await db.select().from(transactions)) as Transaction[];
  const full = fullTransactions(result);
  const lastThree = full.slice(0, 3);
  const monthSavings = calcMonthSavings(full);

  return (
    <div className="flex flex-col flex-1 bg-white font-sans w-full">
      <Header title="Home"></Header>
      <div className="flex flex-col flex-1 items-center bg-stone-100 font-sans w-full p-4 gap-8">
        <Link href="/savings" className="w-full max-w-4xl">
          <ActualSavings monthSavings={monthSavings} />
        </Link>
        <TransactionsTab transactions={lastThree} />
        <Link href="/inOut/" className="w-full max-w-xl">
          <InOutTab transactions={full} />
        </Link>
      </div>
    </div>
  );
}
