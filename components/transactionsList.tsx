import type { Transaction } from "@/types/types";
import TransactionElement from "./transactionElement";

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="flex flex-col w-full   rounded-xl bg-white">
      {transactions.map((transaction, index) => (
        <TransactionElement key={index} transaction={transaction} />
      ))}
    </div>
  );
}
