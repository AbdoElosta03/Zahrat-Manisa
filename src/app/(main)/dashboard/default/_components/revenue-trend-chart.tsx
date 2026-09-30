"use client";

import { format, parseISO } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const rawData = revenueTrendData as RevenuePoint[];
// Weekly buckets keep the bar chart compact and readable instead of 90 daily bars.
const chartData = rawData.filter((_, index) => index % 7 === 0);
const summary = revenueSummaryData as RevenueSummary;

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "var(--color-blue-500)",
  },
  revenue: {
    label: "Revenue",
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
        <CardTitle className="leading-none">Bookings & Revenue</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Weekly bookings vs revenue for the last 90 days</span>
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
        <ChartContainer config={chartConfig} className="aspect-auto h-48 w-full">
          <BarChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-bookings)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-bookings)" stopOpacity={0.55} />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0.55} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.35} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                parseISO(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  className="w-50"
                  labelFormatter={(value) => format(parseISO(value), "d MMMM yyyy")}
                />
              }
            />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            <Bar dataKey="revenue" stackId="period" fill="url(#fillRevenue)" radius={[0, 0, 4, 4]} maxBarSize={26} />
            <Bar dataKey="bookings" stackId="period" fill="url(#fillBookings)" radius={[4, 4, 0, 0]} maxBarSize={26} />
          </BarChart>
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
