"use client";
import { useState, useEffect } from "react";
import type { Transaction } from "@/types/types";
import { incomeCategories } from "@/lib/utils";
import { outcomeCategories } from "@/lib/utils";
import { Switch } from "./ui/switch";

type Props = { transaction?: Transaction };

export default function TransactionForm(props: Props) {
  const [transaction, setTransaction] = useState<Transaction>(
    props.transaction ?? emptyTransaction,
  );

  function handleChange(field: string, value: string | number | boolean) {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  }

  function changeDate() {}

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(transaction);
  }

  useEffect(() => {
    alert("React caricato");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-emerald-700 text-emerald-50 font-bold text-lg p-2 rounded-md relative z-50"
        onClick={() => alert("Ciao")}
      >
        Ciao
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">Type</h2>
            <select
              onChange={(e) => handleChange("type", e.currentTarget.value)}
              value={transaction.type}
              className="border border-stone-400 rounded-sm p-2"
            >
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">Category</h2>
            <select
              onChange={(e) => handleChange("category", e.currentTarget.value)}
              value={transaction.category}
              className="border border-stone-400 rounded-sm p-2 "
            >
              {transaction.type == "income" &&
                incomeCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              {transaction.type == "outcome" &&
                outcomeCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">Description</h2>
            <textarea
              value={transaction.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border border-stone-400 rounded-sm p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">Amount</h2>
            <input
              type="number"
              value={transaction.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="border border-stone-400 rounded-sm p-2"
            />
          </div>
          <div className="flex flex-row gap-2 mt-2 items-center">
            <Switch
              id="recurring"
              checked={transaction.recurring}
              onCheckedChange={(checked) => {
                alert("Checked");
                handleChange("recurring", checked);
              }}
              className="data-checked:bg-emerald-600"
            />
            <label
              htmlFor="recurring"
              className="text-stone-500 font-bold text-sm"
            >
              Recurring
            </label>
          </div>
          {/*  !transaction.recurring && (
            <div className="flex flex-col gap-1">
              <h2 className="text-stone-300 font-bold text-sm">Date</h2>
              <input
                type="date"
                value={transaction.date.toString()}
                onChange={(e) => handleChange("date", e.currentTarget.value)}
                className="border border-stone-400 p-2 rounded-sm"
              />
            </div>
          ) */}
          <div className="flex flex-row justify-end">
            <input
              type="submit"
              className="bg-emerald-700 text-emerald-50 font-bold text-lg p-2 rounded-md"
              value="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

const emptyTransaction: Transaction = {
  id: 0,
  type: "income",
  category: "",
  description: "",
  date: new Date(),
  amount: 0,
  recurring: false,
};
