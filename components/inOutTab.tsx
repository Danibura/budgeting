"use client";

import Link from "next/link";
import type { Transaction } from "@/lib/validation";
import { calcInOut } from "@/lib/utils";

import { TrendingDownIcon, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
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
  transactions: Transaction[];
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

export default function InOutTab(props: Props) {
  const today = new Date().toLocaleDateString("en-US", { month: "long" });

  if (props.transactions.length > 0) {
    const monthInOut = calcInOut(props.transactions);
    const lastIndex = monthInOut.length - 1;
    const actualInOut = [monthInOut[lastIndex]];
    const net =
      (monthInOut[lastIndex].incomes ?? 0) -
      (monthInOut[lastIndex].outcomes ?? 0);

    return (
      <Card className="shadow-sm shadow-stone-500/50 w-full max-w-xl ">
        <CardHeader>
          <CardTitle>Incomes and Outcomes</CardTitle>
          <CardDescription>{today}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={actualInOut}
              margin={{
                top: 25,
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="incomes" fill="green" radius={16}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
              <Bar dataKey="outcomes" fill="red" radius={16}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
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
    );
  } else {
    return (
      <div className="shadow-sm shadow-stone-500/50 w-full max-w-xl bg-white p-10 rounded-sm flex flex-col items-center">
        <h1 className="text-stone-800 text-xl">No transactions yet</h1>
      </div>
    );
  }
}
