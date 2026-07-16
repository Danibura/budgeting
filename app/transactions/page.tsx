import Link from "next/link";
import Header from "@/components/header";
import TransactionsList from "@/components/transactionsList";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import type { Transaction } from "@/types/types";
import { fullTransactions } from "@/lib/utils";

export default async function TransactionsPage() {
  const result = (await db.select().from(transactions)) as Transaction[];
  const full = fullTransactions(result);
  console.log(full);

  return (
    <div className="bg-stone-100 min-h-screen">
      <Header title="Transactions"></Header>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between w-full max-w-3xl p-4 items-center">
          <h1 className="text-xl font-bold">Your transactions</h1>
          <Link
            href="/transactions/new"
            className="bg-emerald-700 text-emerald-50 text-md py-1.5 px-2 rounded-sm shadow-sm shadow-stone-500/50"
          >
            New
          </Link>
        </div>
        <div className="p-4 w-full max-w-3xl">
          <TransactionsList initialTransactions={full} />
        </div>
      </div>
    </div>
  );
}
