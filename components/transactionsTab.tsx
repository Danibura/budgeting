import { Transaction } from "@/types/types";
import Link from "next/link";
import TransactionElement from "./transactionElement";

type Props = {
  transactions: Transaction[];
};

export default function TransactionsTab(props: Props) {
  return (
    <Link href="/transactions" className="w-full max-w-4xl">
      <div className="shadow-sm shadow-stone-500/50 rounded-sm bg-white ">
        <div className="flex flex-row justify-start px-4 py-2">
          <h1 className="text-sm text-stone-500">Last transactions</h1>
        </div>
        <div className="w-full flex flex-col">
          {props.transactions.map((transaction, index) => (
            <TransactionElement key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </Link>
  );
}
