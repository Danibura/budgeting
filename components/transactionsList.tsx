"use client";

import type { TransactionWithOccurrency } from "@/lib/validation";
import TransactionElement from "./transactionElement";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import Link from "next/link";

export default function TransactionsList({
  initialTransactions,
}: {
  initialTransactions: TransactionWithOccurrency[];
}) {
  const [search, setSearch] = useState("");
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
          <Link href={`/transactions/${element.id}`} key={index}>
            <TransactionElement transaction={element} />
          </Link>
        ))}
      </div>
    </div>
  );
}
