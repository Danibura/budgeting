import Link from "next/link";
import Header from "@/components/header";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import type { Transaction } from "@/types/types";
import { fullTransactions } from "@/lib/utils";
import { ChartBarLabel } from "@/components/example";
import InOutChart from "@/components/inOutChart";
import CategoriesChart from "@/components/categoriesChart";

export default async function InOutPage() {
  const result = (await db.select().from(transactions)) as Transaction[];
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
