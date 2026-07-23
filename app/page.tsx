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

  if (session) redirect("/home");

  return (
    <div className="flex flex-col flex-1 font-sans w-full min-h-screen bg-emerald-700">
      <div className="flex flex-row px-3 py-2 justify-between items-center  w-full text-emerald-600 bg-white">
        <img
          src="/budgetingLogo.png"
          alt="Budgeting logo"
          className="w-10 h-10"
        />
        <Link
          href="/home"
          className="bg-emerald-700 text-stone-50 text-sm rounded-sm p-2 shadow-sm shadow-stone-500/50"
        >
          Get started
        </Link>
      </div>
      <div className="flex flex-col flex-1  font-sans w-full items-center justify-center ">
        <div className="flex flex-row flex-wrap justify-center items-center gap-y-10 gap-x-60">
          <div className="flex flex-col gap-4 p-4 max-w-180">
            <h1 className="font-extrabold text-4xl md:text-7xl  text-center text-white">
              The easy way to track your savings
            </h1>
            <h2 className="text-center text-lg md:text-2xl text-emerald-50">
              Completely free. Details shown in a simple manner. Data shared
              across devices.
            </h2>
          </div>

          <img
            src="/phoneMockup.png"
            alt="Phone mockup"
            className="w-80 h-120"
          />
        </div>
      </div>
      <div className="mt-40"> </div>
    </div>
  );
}
