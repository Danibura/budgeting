import { Transaction } from "@/types/types";
import Link from "next/link";
import TransactionElement from "./transactionElement";
import ActualSavings from "./actualSavings";
import { fullTransactions, calcMonthSavings } from "@/lib/utils";
import type { MonthSavings } from "@/types/types";
type Props = {
  monthSavings: MonthSavings[];
};

export default function SavingsTab(props: Props) {
  return (
    <Link href="/savings" className="w-full max-w-4xl">
      <ActualSavings monthSavings={props.monthSavings} />
    </Link>
  );
}
