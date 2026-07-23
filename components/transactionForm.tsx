"use client";
import { useState } from "react";
import {
  CreateTransaction,
  createTransactionSchema,
  selectTransactionSchema,
  Transaction,
} from "@/lib/validation";
import { incomeCategories } from "@/lib/utils";
import { outcomeCategories } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = { transaction?: Transaction };

export default function TransactionForm(props: Props) {
  const [deleting, setDeleting] = useState(false);

  const form = useForm({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: props.transaction ?? {
      id: 0,
      type: "income",
      category: incomeCategories[0].id,
      description: "",
      date: new Date().toISOString().split("T")[0],
      amount: 1,
      recurring: false,
    },
  });

  const router = useRouter();

  function typeChange(value: "income" | "outcome") {
    form.setValue("type", value);
    if (value == "income") form.setValue("category", incomeCategories[0].id);
    else form.setValue("category", outcomeCategories[0].id);
  }

  function recurringChange(value: boolean) {
    form.setValue("recurring", value);
    form.setValue("frequency", value ? "daily" : undefined);
  }

  async function handleSave(transaction: CreateTransaction) {
    console.log(transaction);
    try {
      const response = await fetch(`/api/transactions/`, {
        method: props.transaction ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const savedTransaction = await response.json();
      console.log(savedTransaction);
      router.replace(`/transactions/`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    if (props.transaction) {
      const transaction: Transaction = props.transaction;
      try {
        const response = await fetch(`/api/transactions/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        });

        const savedTransaction = await response.json();
        console.log(savedTransaction);
        router.replace(`/transactions/`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl">
      <form
        onSubmit={form.handleSubmit(handleSave, (errors) =>
          console.log("Errors ", errors),
        )}
        className="flex flex-col gap-4 w-full p-4"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-400 font-bold text-sm">Type</h2>
          <select
            {...form.register("type", {
              onChange: (e) => typeChange(e.target.value),
            })}
            className="border border-stone-400 rounded-sm p-2 bg-white"
            required
          >
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-400 font-bold text-sm">Category</h2>
          <select
            {...form.register("category")}
            className="border border-stone-400 rounded-sm p-2 bg-white"
            required
          >
            {form.watch("type") == "income" &&
              incomeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emoji + " " + category.label}
                </option>
              ))}
            {form.watch("type") == "outcome" &&
              outcomeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.emoji + " " + category.label}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-400 font-bold text-sm">Description</h2>
          <textarea
            {...form.register("description")}
            className="border border-stone-400 rounded-sm p-2 bg-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-400 font-bold text-sm ">Amount</h2>
          <input
            type="number"
            {...form.register("amount", { valueAsNumber: true })}
            className="border border-stone-400 rounded-sm p-2 bg-white"
            required
            min={1}
          />
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 mt-2 items-center">
            <Controller
              name="recurring"
              control={form.control}
              render={({ field }) => (
                <Switch
                  id="recurring"
                  checked={field.value}
                  onCheckedChange={recurringChange}
                  className="data-checked:bg-emerald-600"
                />
              )}
            />

            <label
              htmlFor="recurring"
              className="text-stone-500 font-bold text-sm"
            >
              Recurring
            </label>
          </div>
          {form.watch("recurring") && (
            <div className="flex flex-col gap-1">
              <h2 className="text-stone-400 font-bold text-sm">Frequency</h2>
              <select
                className="border border-stone-400 rounded-sm p-2 bg-white"
                {...form.register("frequency")}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 ">
          <h2 className="text-stone-400 font-bold text-sm">
            {form.watch("recurring") ? "Start Date" : "Date"}
          </h2>
          <input
            type="date"
            {...form.register("date")}
            className="border border-stone-400 p-2 rounded-sm bg-white"
          />
        </div>

        {form.watch("recurring") && (
          <div className="flex flex-col gap-1">
            <h2 className="text-stone-400 font-bold text-sm">End Date</h2>
            <input
              type="date"
              {...form.register("endDate")}
              className="border border-stone-400 p-2 rounded-sm bg-white"
            />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className={` text-emerald-50 text-md py-1.5 px-2 rounded-sm mt-4 shadow-sm shadow-stone-500/50 cursor-pointer ${form.formState.isSubmitting ? "bg-emerald-500" : "bg-emerald-700"}`}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </button>
          {props.transaction && (
            <button
              type="button"
              onClick={handleDelete}
              className={` text-red-50 text-md py-1.5 px-2 rounded-sm mt-4 shadow-sm shadow-stone-500/50 cursor-pointer ${deleting ? "bg-red-500" : "bg-red-700"}`}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
