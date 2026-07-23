import TransactionsTab from "@/components/transactionsTab";
import Header from "@/components/header";
import { fullTransactions, calcMonthSavings } from "@/lib/utils";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { Transaction, TransactionWithOccurrency } from "@/lib/validation";
import InOutTab from "@/components/inOutTab";
import Link from "next/link";
import ActualSavings from "@/components/actualSavings";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const result = (await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, session.user.id))) as Transaction[];
  console.log("Result: ", result);

  console.log(result);
  const full: TransactionWithOccurrency[] = fullTransactions(result);
  const lastThree = full.slice(0, 3);
  const monthSavings = calcMonthSavings(full);
  console.log("Full ", full);
  console.log("Month savings: ", monthSavings);

  return (
    <div className="flex flex-col flex-1 bg-white font-sans w-full">
      <Header title="Home"></Header>

      <div className="flex flex-col flex-1 items-center bg-stone-100 font-sans w-full p-4 gap-8">
        {full.length > 0 && (
          <Link href="/savings" className="w-full max-w-4xl">
            <ActualSavings monthSavings={monthSavings} />
          </Link>
        )}

        <TransactionsTab transactions={lastThree} />

        {full.length > 0 && (
          <Link href="/inOut/" className="w-full max-w-xl">
            <InOutTab transactions={full} />
          </Link>
        )}
      </div>
    </div>
  );
}
