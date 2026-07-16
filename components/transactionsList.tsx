"use client";

import type { TransactionWithOccurrency } from "@/types/types";
import TransactionElement from "./transactionElement";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

export default function TransactionsList({
  initialTransactions,
}: {
  initialTransactions: TransactionWithOccurrency[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("category");
  const filtered = filterTransactions(initialTransactions);

  function filterTransactions(transactions: TransactionWithOccurrency[]) {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.category?.toUpperCase().includes(search.toUpperCase()) ||
        transaction.description?.toUpperCase().includes(search.toUpperCase()),
    );

    return filtered;
  }

  return (
    <div className="flex flex-col w-full items-center">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-col w-full   rounded-xl  shadow-sm shadow-stone-500/50 backdrop-blur-lg bg-white/50 mt-4">
        {filtered.map((element, index) => (
          <TransactionElement key={index} transaction={element} />
        ))}
      </div>
    </div>
  );
}
