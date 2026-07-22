import Link from "next/link";
import Header from "@/components/header";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import type { Transaction } from "@/lib/validation";
import { fullTransactions } from "@/lib/utils";
import InOutChart from "@/components/inOutChart";
import CategoriesChart from "@/components/categoriesChart";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function InOutPage() {
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
      <Header title="Incomes and Outcomes" />
      <div className="flex flex-col flex-1 items-center w-full p-4 gap-8">
        <InOutChart transactions={full} />
        <CategoriesChart transactions={full} type="income" />
        <CategoriesChart transactions={full} type="outcome" />
      </div>
    </div>
  );
}
