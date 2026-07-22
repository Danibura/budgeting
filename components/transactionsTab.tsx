import { TransactionWithOccurrency } from "@/lib/validation";
import Link from "next/link";
import TransactionElement from "./transactionElement";

type Props = {
  transactions: TransactionWithOccurrency[];
};

export default function TransactionsTab(props: Props) {
  return (
    <Link href="/transactions" className="w-full max-w-4xl">
      <div className="shadow-sm shadow-stone-500/50 rounded-sm bg-white ">
        <div className="flex flex-row justify-start px-4 py-2">
          <h1 className="text-sm text-stone-500">Last transactions</h1>
        </div>
        {props.transactions.length <= 0 && (
          <div className="flex flex-col items-center p-4">
            <button className="bg-emerald-700 text-emerald-50 text-md py-1.5 px-2 rounded-sm shadow-sm shadow-stone-500/50">
              Add transactions
            </button>
          </div>
        )}
        <div className="w-full flex flex-col">
          {props.transactions.map((transaction, index) => (
            <TransactionElement key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </Link>
  );
}
