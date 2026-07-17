"use client";

import type { Transaction, TransactionWithOccurrency } from "@/types/types";
import { calcInOut, thisYearIncomes, thisYearOutcomes } from "@/lib/utils";
import {
  calcFirstYear,
  calcFirstMonth,
  calcLastMonth,
  thisYearInOut,
} from "@/lib/utils";
import { useState } from "react";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Props = {
  transactions: TransactionWithOccurrency[];
  type: string;
};

export default function CategoriesChart(props: Props) {
  let thisYear = new Date().getFullYear();

  const firstYear = calcFirstYear(undefined, props.transactions);
  let firstMonth = calcFirstMonth(undefined, props.transactions);
  let lastMonth = calcLastMonth(undefined, props.transactions);

  const [year, setYear] = useState(thisYear);
  const [leftDisabled, setLeftDisabled] = useState(year == firstYear);
  const [rightDisabled, setRightDisabled] = useState(year == thisYear);

  if (firstYear != year) firstMonth = "January";
  if (thisYear != year) lastMonth = "December";

  const yearlyIncomes = thisYearIncomes(props.transactions, year);

  const yearlyOutcomes = thisYearOutcomes(props.transactions, year);

  const chartData =
    props.type == "income"
      ? yearlyIncomes.filter((el) => el.amount > 0)
      : yearlyOutcomes.filter((el) => el.amount > 0);
  const chartDataWithColor = chartData.map((el) => ({ ...el, fill: el.color }));
  const chartConfig = chartData.reduce<ChartConfig>((acc, el) => {
    acc[el.id] = {
      label: el.label,
      color: el.color,
    };
    return acc;
  }, {});

  function clickLeft() {
    let newYear = year - 1;
    setYear(newYear);
    if (thisYear != newYear) setRightDisabled(false);
    if (firstYear == newYear) setLeftDisabled(true);
  }

  function clickRight() {
    let newYear = year + 1;
    setYear(newYear);
    if (thisYear == newYear) setRightDisabled(true);
    if (firstYear != newYear) setLeftDisabled(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <div className="flex flex-row items-center gap-2 p-2 rounded-4xl bg-white mt-4 shadow-sm shadow-stone-500/50 text-sm">
        <button
          onClick={clickLeft}
          disabled={leftDisabled}
          className="material-symbols-rounded scale-50"
        >
          arrow_back_ios
        </button>
        <div>{year}</div>
        <button
          onClick={clickRight}
          disabled={rightDisabled}
          className="material-symbols-rounded scale-50"
        >
          arrow_forward_ios
        </button>
      </div>

      <Card className="flex flex-col w-full shadow-sm shadow-stone-500/50">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            Yearly {props.type == "income" ? "incomes" : "outcomes"}
          </CardTitle>
          <CardDescription>
            {firstMonth} - {lastMonth} {thisYear}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie
                data={chartDataWithColor}
                dataKey="amount"
                nameKey="label"
              ></Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
