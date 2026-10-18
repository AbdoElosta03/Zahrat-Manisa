"use client";

import { T } from "@/i18n/t";
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
import { useLanguage } from "@/i18n/language-provider";

import revenueExpensesData from "./revenue-expenses-data.json";
import type { MonthlyFinancePoint } from "./types";

const chartData = revenueExpensesData as MonthlyFinancePoint[];

export function RevenueExpensesChart() {
  const { locale, value } = useLanguage();
  const chartConfig = {
    revenue: { label: value("finance", "Revenue"), color: "var(--chart-1)" },
    expenses: { label: value("finance", "Expenses"), color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base"><T id="finance.revenueExpenses" /></CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ComposedFinanceChart data={chartData} locale={locale} labels={chartConfig} />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ComposedFinanceChart({
  data,
  locale,
  labels,
}: {
  data: MonthlyFinancePoint[];
  locale: "en" | "ar";
  labels: ChartConfig;
}) {
  const dateLocale = locale === "ar" ? "ar" : "en-US";
  return (
    <BarChart accessibilityLayer data={data} margin={{ left: 0, right: 0, top: 8 }}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value: string) => new Date(value).toLocaleDateString(dateLocale, { month: "short" })}
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
                ? new Date(value).toLocaleDateString(dateLocale, { month: "long", year: "numeric" })
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
                    {labels[String(name)]?.label ?? name}
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
