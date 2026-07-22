import Link from "next/link";
import Header from "@/components/header";
import TransactionsList from "@/components/transactionsList";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import type { Transaction } from "@/lib/validation";
import { fullTransactions } from "@/lib/utils";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const result = (await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, session.user.id))) as Transaction[];

  const full = fullTransactions(result);

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
