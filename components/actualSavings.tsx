import { MonthSavings } from "@/types/types";

type Props = {
  monthSavings: MonthSavings[];
};

export default function ActualSavings(props: Props) {
  const lastIndex = props.monthSavings.length - 1;
  const actualSavings = props.monthSavings[lastIndex].savings;
  return (
    <div className="shadow-sm shadow-stone-500/50 p-10 rounded-sm bg-white w-full flex flex-col items-center">
      <h1 className="text-stone-800 text-4xl font-bold">{actualSavings} €</h1>
      <h1 className="text-stone-400 text-sm">Current savings</h1>
    </div>
  );
}
