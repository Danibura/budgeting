"use client";

import type { Transaction, TransactionWithOccurrency } from "@/lib/validation";
import { calcInOut } from "@/lib/utils";
import {
  calcFirstYear,
  calcFirstMonth,
  calcLastMonth,
  thisYearInOut,
} from "@/lib/utils";
import { useState } from "react";

import { TrendingDownIcon, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  YAxis,
} from "recharts";
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
};

const chartConfig = {
  incomes: {
    label: "Incomes",
    color: "green",
  },
  outcomes: {
    label: "Outcomes",
    color: "red",
  },
} satisfies ChartConfig;

export default function InOutChart(props: Props) {
  let thisYear = new Date().getFullYear();

  const firstYear = calcFirstYear(undefined, props.transactions);
  let firstMonth = calcFirstMonth(undefined, props.transactions);
  let lastMonth = calcLastMonth(undefined, props.transactions);

  const [year, setYear] = useState(thisYear);
  const [leftDisabled, setLeftDisabled] = useState(year == firstYear);
  const [rightDisabled, setRightDisabled] = useState(year == thisYear);
  const monthInOut = calcInOut(props.transactions);
  const yearlyInOut = thisYearInOut(monthInOut, year);
  const lastIndex = monthInOut.length - 1;
  const net = monthInOut[lastIndex].incomes - monthInOut[lastIndex].outcomes;
  if (firstYear != year) firstMonth = "January";
  if (thisYear != year) lastMonth = "December";

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

      <Card className="shadow-sm shadow-stone-500/50 w-full max-w-xl ">
        <CardHeader>
          <CardTitle>Incomes and Outcomes</CardTitle>
          <CardDescription>
            {firstMonth} - {lastMonth} {year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={yearlyInOut}
              margin={{
                top: 25,
                left: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  (new Date(value).getMonth() + 1).toString()
                }
              />
              <YAxis width={40} tick={true} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="incomes" fill="green" radius={16}></Bar>
              <Bar dataKey="outcomes" fill="red" radius={16}></Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Net {net > 0 ? " profit " : " loss "} of {net} € this month
            {net > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDownIcon className="h-4 w-4" />
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
