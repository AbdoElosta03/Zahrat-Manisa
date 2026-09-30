"use client";

import { format, parseISO } from "date-fns";
import { Area, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import revenueSummaryData from "./revenue-summary-data.json";
import revenueTrendData from "./revenue-trend-data.json";

type RevenuePoint = {
  date: string;
  revenue: number;
  bookings: number;
};

type RevenueSummary = {
  bookingRevenue: number;
  refunds: number;
  netProfit: number;
};

const chartData = revenueTrendData as RevenuePoint[];
const summary = revenueSummaryData as RevenueSummary;

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-blue-500)",
  },
  bookings: {
    label: "Bookings",
    color: "var(--color-teal-500)",
  },
} satisfies ChartConfig;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RevenueTrendChart() {
  return (
    <Card className="@container/card h-full">
      <CardHeader>
        <CardTitle className="leading-none">Revenue & Bookings</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Booking revenue trend for the last 90 days</span>
          <span className="@[540px]/card:hidden">Last 90 days</span>
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Select defaultValue="90d">
            <SelectTrigger size="sm" className="w-28">
              <SelectValue placeholder="90 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="90d">90 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            View report
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <ComposedChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={48}
              tickFormatter={(value) =>
                parseISO(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-50"
                  indicator="line"
                  labelFormatter={(value) => format(parseISO(value), "d MMMM yyyy")}
                />
              }
            />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={1.25}
              dot={false}
              fillOpacity={1}
            />
            <Line dataKey="bookings" type="natural" stroke="var(--color-bookings)" strokeWidth={1.4} dot={false} />
          </ComposedChart>
        </ChartContainer>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">Booking Revenue</span>
            <span className="font-medium text-sm tabular-nums">{formatCurrency(summary.bookingRevenue)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">Refunds</span>
            <span className="font-medium text-rose-600 text-sm tabular-nums dark:text-rose-400">
              {formatCurrency(summary.refunds)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">Net Profit</span>
            <span className="font-medium text-emerald-600 text-sm tabular-nums dark:text-emerald-400">
              {formatCurrency(summary.netProfit)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
