"use client";

import type { TransactionWithOccurrency } from "@/types/types";
import TransactionElement from "./transactionElement";
import { useEffect, useState } from "react";

export default function TransactionsList({
  initialTransactions,
}: {
  initialTransactions: TransactionWithOccurrency[];
}) {
  const [transactions, setTransactions] =
    useState<TransactionWithOccurrency[]>(initialTransactions);

  return (
    <div className="flex flex-col w-full   rounded-xl  shadow-sm shadow-stone-500/50 backdrop-blur-lg bg-white/50">
      {transactions.map((transaction, index) => (
        <TransactionElement key={index} transaction={transaction} />
      ))}
    </div>
  );
}
