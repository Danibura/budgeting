import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/header";
import TransactionForm from "@/components/transactionForm";
import type { Transaction } from "@/types/types";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const result = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, Number(id)));
  const transaction = result[0] as Transaction;

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Edit transaction"></Header>
      <div className="bg-stone-100 flex-1 flex flex-col items-center w-full">
        <TransactionForm transaction={transaction} />
      </div>
    </div>
  );
}
