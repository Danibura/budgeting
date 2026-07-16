"use client";

import type { Transaction } from "@/types/types";
import TransactionElement from "./transactionElement";
import { useEffect, useState } from "react";

export default function TransactionsList({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  return (
    <div className="flex flex-col w-full   rounded-xl bg-white">
      {transactions.map((transaction, index) => (
        <TransactionElement key={index} transaction={transaction} />
      ))}
    </div>
  );
}
