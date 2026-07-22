import type { TransactionWithOccurrency } from "@/lib/validation";
import { incomeCategories } from "@/lib/utils";
import { outcomeCategories } from "@/lib/utils";

export default function TransactionElement({
  transaction,
}: {
  transaction: TransactionWithOccurrency;
}) {
  let voice;
  if (transaction.type == "income")
    voice = incomeCategories.find(
      (category) => category.id == transaction.category,
    );
  else
    voice = outcomeCategories.find(
      (category) => category.id == transaction.category,
    );

  return (
    <div className="px-4 py-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <h1>{voice!.emoji}</h1>
          <h1>
            {transaction.description == ""
              ? voice!.label
              : transaction.description}
          </h1>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm">
            {""}
            {transaction.type == "income" ? "+" : "-"} {transaction.amount} €
          </h1>
          <h1 className="text-xs text-stone-400">
            {transaction.recurring
              ? transaction.occurrencyDate
              : transaction.date}
          </h1>
        </div>
      </div>
    </div>
  );
}
