"use client";

import Link from "next/link";
import Header from "@/components/header";
import { MonthSavings } from "@/types/types";
import {
  thisYearSavings,
  calcFirstYear,
  calcTrend,
  calcFirstMonth,
  calcLastMonth,
} from "@/lib/utils";
import { useState } from "react";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  monthSavings: MonthSavings[];
};

const chartConfig = {
  savings: {
    label: "Savings",
    color: "green",
  },
} satisfies ChartConfig;

export default function SavingsChart(props: Props) {
  let today = new Date().getFullYear();
  const firstYear = calcFirstYear(props.monthSavings);
  let firstMonth = calcFirstMonth(props.monthSavings);
  let lastMonth = calcLastMonth(props.monthSavings);

  const [year, setYear] = useState(today);
  const [leftDisabled, setLeftDisabled] = useState(year == firstYear);
  const [rightDisabled, setRightDisabled] = useState(year == today);
  const yearlySavings = thisYearSavings(props.monthSavings, year);
  console.log(yearlySavings);
  const trend = calcTrend(props.monthSavings);
  if (firstYear != year) firstMonth = "January";
  if (today != year) lastMonth = "December";

  function clickLeft() {
    let newYear = year - 1;
    setYear(newYear);
    if (today != newYear) setRightDisabled(false);
    if (firstYear == newYear) setLeftDisabled(true);
  }

  function clickRight() {
    let newYear = year + 1;
    setYear(newYear);
    if (today == newYear) setRightDisabled(true);
    if (firstYear != newYear) setLeftDisabled(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 ">
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
      <Card className="shadow-sm shadow-stone-500">
        <CardHeader>
          <CardTitle>Savings</CardTitle>
          <CardDescription>
            {firstMonth} - {lastMonth} {today}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={yearlySavings}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  (new Date(value).getMonth() + 1).toString()
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="savings"
                type="linear"
                stroke="green"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Up of {trend} € this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total savings for each month of this year
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
