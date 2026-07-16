import type { Transaction } from "@/types/types";
import { incomeCategories } from "@/lib/utils";
import { outcomeCategories } from "@/lib/utils";

export default function TransactionElement({
  transaction,
}: {
  transaction: Transaction;
}) {
  const voice = incomeCategories.find(
    (category) => category.id == transaction.category,
  );

  console.log(voice);
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
          <h1 className="text-xs text-stone-300">{transaction.date}</h1>
        </div>
      </div>
    </div>
  );
}
