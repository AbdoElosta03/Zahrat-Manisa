"use client";

import { T } from "@/i18n/t";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-provider";

import { flowChartData } from "./transactions-data";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function TransactionFlow() {
  const { locale, t } = useLanguage();
  const chartConfig = {
    captures: { label: t("transactions.captures"), color: "var(--chart-1)" },
    refunds: { label: t("transactions.refunds"), color: "var(--chart-2)" },
  } satisfies ChartConfig;
  const totalCaptures = flowChartData.reduce((acc, item) => acc + item.captures, 0);
  const totalRefunds = flowChartData.reduce((acc, item) => acc + Math.abs(item.refunds), 0);
  const monthFormatter = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { month: "short" });

  return (
    <Card>
      <CardHeader>
        <CardTitle><T id="transactions.transactionFlow" /></CardTitle>
        <CardDescription><T id="transactions.monthlyCapturesAndRefundsWithNetSettlementImpact" /></CardDescription>
        <CardAction>
          <Select defaultValue="this-year">
            <SelectTrigger size="sm" className="w-37">
              <SelectValue placeholder={t("common.selectPeriod")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="this-month"><T id="transactions.thisMonth" /></SelectItem>
                <SelectItem value="last-6-months"><T id="transactions.last6Months" /></SelectItem>
                <SelectItem value="ytd"><T id="transactions.yearToDate" /></SelectItem>
                <SelectItem value="this-year"><T id="transactions.thisYear" /></SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex items-start justify-between gap-2 py-5 md:items-stretch md:gap-0">
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-chart-1">
              <ArrowDownLeft className="size-6 stroke-background" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase"><T id="transactions.captures" /></p>
              <p className="font-medium tabular-nums">{formatCurrency(totalCaptures, { noDecimals: true })}</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-auto! self-stretch" />
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-chart-2">
              <ArrowUpRight className="size-6 stroke-background" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase"><T id="transactions.refunds" /></p>
              <p className="font-medium tabular-nums">{formatCurrency(totalRefunds, { noDecimals: true })}</p>
            </div>
          </div>
        </div>
        <Separator />
        <ChartContainer className="max-h-72 w-full" config={chartConfig}>
          <BarChart
            stackOffset="sign"
            margin={{ left: -25, right: 0, top: 25, bottom: 0 }}
            accessibilityLayer
            data={flowChartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(month: string) => monthFormatter.format(new Date(2026, monthNames.indexOf(month), 1))}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const abs = Math.abs(value);
                const formatted = abs >= 1000 ? `${abs / 1000}k` : `${abs}`;
                return value < 0 ? `-${formatted}` : formatted;
              }}
              ticks={[-8000, -4000, 0, 8000, 16000, 24000]}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ReferenceLine y={0} stroke="var(--border)" />
            <Bar dataKey="captures" stackId="a" fill={chartConfig.captures.color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="refunds" stackId="a" fill={chartConfig.refunds.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
