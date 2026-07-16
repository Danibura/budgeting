"use client";
import { useState } from "react";
import type { Transaction } from "@/types/types";
import { incomeCategories } from "@/lib/utils";
import { outcomeCategories } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";

type Props = { transaction?: Transaction };

export default function TransactionForm(props: Props) {
  const router = useRouter();

  const [transaction, setTransaction] = useState<Transaction>(
    props.transaction ?? emptyTransaction,
  );

  function handleChange(field: string, value: string | number | boolean) {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/transactions/", {
        method: props.transaction ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const savedTransaction = await response.json();
      console.log(savedTransaction);
      router.replace("/transactions/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">Type</h2>
            <select
              onChange={(e) => handleChange("type", e.currentTarget.value)}
              value={transaction.type}
              className="border border-stone-400 rounded-sm p-2"
              required
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
              required
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
              required
              min={1}
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-2 mt-2 items-center">
              <Switch
                id="recurring"
                checked={transaction.recurring}
                onCheckedChange={(checked) => {
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
            {transaction.recurring && (
              <div>
                <h2 className="text-stone-300 font-bold text-sm">Frequency</h2>
                <select
                  className="border border-stone-400 rounded-sm p-2"
                  value={transaction.frequency ?? ""}
                  onChange={(e) =>
                    handleChange("frequency", e.currentTarget.value)
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-300 font-bold text-sm">
              {transaction.recurring ? "Start Date" : "Date"}
            </h2>
            <input
              type="date"
              value={transaction.date}
              onChange={(e) => handleChange("date", e.currentTarget.value)}
              className="border border-stone-400 p-2 rounded-sm"
            />
          </div>

          {transaction.recurring && (
            <div className="flex flex-col gap-1">
              <h2 className="text-stone-300 font-bold text-sm">End Date</h2>
              <input
                type="date"
                value={transaction.endDate ?? ""}
                onChange={(e) => handleChange("endDate", e.currentTarget.value)}
                className="border border-stone-400 p-2 rounded-sm"
              />
            </div>
          )}
          <div className="flex flex-row justify-end">
            <input
              type="submit"
              className="bg-emerald-700 text-emerald-50 font-bold text-lg p-2 rounded-md mt-4"
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
  category: incomeCategories[0].id,
  description: "",
  date: new Date().toISOString().split("T")[0],
  amount: 1,
  recurring: false,
};
