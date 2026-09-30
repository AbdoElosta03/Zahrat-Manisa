"use client";

import type { CSSProperties } from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import revenueExpensesData from "./revenue-expenses-data.json";
import type { MonthlyFinancePoint } from "./types";

const chartData = revenueExpensesData as MonthlyFinancePoint[];

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-teal-500)" },
  expenses: { label: "Expenses", color: "var(--color-orange-500)" },
  profit: { label: "Profit", color: "var(--color-amber-400)" },
} satisfies ChartConfig;

export function RevenueExpensesChart() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base">Revenue & Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ComposedFinanceChart data={chartData} />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ComposedFinanceChart({ data }: { data: MonthlyFinancePoint[] }) {
  return (
    <BarChart accessibilityLayer data={data} margin={{ left: 0, right: 0, top: 8 }}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value: string) => new Date(value).toLocaleDateString("en-US", { month: "short" })}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value: number) => `${Math.round(value / 1000)}K`}
        width={40}
      />
      <ChartTooltip
        content={
          <ChartTooltipContent
            labelFormatter={(value) =>
              typeof value === "string"
                ? new Date(value).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : value
            }
            formatter={(value, name, item) => (
              <>
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                  style={{ "--color-bg": item.color } as CSSProperties}
                />
                <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                  <span className="text-muted-foreground">
                    {chartConfig[name as keyof typeof chartConfig]?.label ?? name}
                  </span>
                  <span className="font-medium text-foreground tabular-nums">
                    {formatCurrency(Number(value), { noDecimals: true })}
                  </span>
                </div>
              </>
            )}
          />
        }
        cursor={false}
      />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
    </BarChart>
  );
}
