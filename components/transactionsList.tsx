"use client";

import type { Transaction } from "@/types/types";
import TransactionElement from "./transactionElement";
import { useEffect, useState } from "react";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/transactions/`,
      {
        method: "GET",
      },
    );
    const transactionsData = await response.json();
    setTransactions(transactionsData);
  }

  return (
    <div className="flex flex-col w-full   rounded-xl bg-white">
      {transactions.map((transaction, index) => (
        <TransactionElement key={index} transaction={transaction} />
      ))}
    </div>
  );
}
