"use client";

import type { ComponentType } from "react";

import { Clock, RefreshCw, Timer, Wallet } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import paymentStatusData from "./payment-status-data.json";
import type { PaymentStatusItem, PaymentStatusKey } from "./types";

const statusData = paymentStatusData as PaymentStatusItem[];

const radialData = [...statusData].reverse().map((item) => ({ ...item, fill: item.color }));

const chartConfig = statusData.reduce<ChartConfig>((config, item) => {
  config[item.key] = { label: item.label, color: item.color };
  return config;
}, {}) satisfies ChartConfig;

const accentClassNames: Record<PaymentStatusKey, string> = {
  paid: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  pending: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  partial: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  refunded: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const statusIcons: Record<PaymentStatusKey, ComponentType<{ className?: string }>> = {
  paid: Wallet,
  pending: Clock,
  partial: Timer,
  refunded: RefreshCw,
};

export function PaymentStatusRadial() {
  const paid = statusData.find((item) => item.key === "paid");

  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base">Payment Status</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="relative mx-auto aspect-square w-full max-w-[200px]">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full w-full">
            <RadialBarChart
              data={radialData}
              innerRadius="32%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              barGap={3}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} dataKey="percentage" tick={false} axisLine={false} />
              <RadialBar dataKey="percentage" background={{ fill: "var(--muted)" }} cornerRadius={6} />
            </RadialBarChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-semibold text-2xl tabular-nums leading-none">{paid?.percentage}%</span>
            <span className="mt-1 text-muted-foreground text-xs">Paid</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {statusData.map((item) => {
            const Icon = statusIcons[item.key];
            return (
              <div key={item.key} className="flex items-center gap-3">
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${accentClassNames[item.key]}`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-medium text-sm leading-none">{item.label}</span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {formatCurrency(item.amount, { noDecimals: true })}
                  </span>
                </div>
                <span className="shrink-0 font-medium text-sm tabular-nums">{item.percentage}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
