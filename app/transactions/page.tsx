import Link from "next/link";
import Header from "@/components/header";

export default function TransactionsPage() {
  return (
    <div>
      <Header title="Transactions"></Header>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between w-full p-4 items-center">
          <h1 className="text-xl font-bold">Your transactions</h1>
          <Link
            href="/transactions/new"
            className="bg-emerald-700 text-emerald-50 font-bold text-lg p-2 rounded-md"
          >
            New
          </Link>
        </div>
      </div>
    </div>
  );
}
