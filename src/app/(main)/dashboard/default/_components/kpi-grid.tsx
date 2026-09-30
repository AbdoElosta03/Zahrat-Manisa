import type { ComponentType } from "react";

import { CalendarCheck, DollarSign, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import metricsData from "./metrics-data.json";

type Metric = {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency";
  change: number;
  trend: "up" | "down";
  comparedTo: string;
  spark: number[];
};

const metrics = metricsData as Metric[];

const icons: Record<string, ComponentType<{ className?: string }>> = {
  "total-bookings": CalendarCheck,
  revenue: DollarSign,
  "active-travelers": Users,
  "avg-trip-value": Wallet,
};

const accents: Record<string, { icon: string; bar: string }> = {
  "total-bookings": { icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
  revenue: { icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  "active-travelers": { icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  "avg-trip-value": { icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
};

function formatValue(metric: Metric) {
  if (metric.format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(metric.value);
  }

  return metric.value.toLocaleString();
}

export function KpiGrid() {
  return (
    <Card className="h-full gap-4">
      <CardHeader>
        <CardTitle className="leading-none">Today&apos;s Overview</CardTitle>
        <CardDescription>Here&apos;s what&apos;s happening with your travel business today.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="divide-border grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {metrics.map((metric, index) => {
            const Icon = icons[metric.id] ?? DollarSign;
            const accent = accents[metric.id] ?? accents["total-bookings"];
            const isUp = metric.trend === "up";
            const maxSpark = Math.max(...metric.spark);

            return (
              <div
                key={metric.id}
                className={`flex flex-col gap-2.5 py-4 first:pt-0 sm:py-0 sm:first:pt-0 ${
                  index % 2 === 0 ? "sm:pr-5" : "sm:pl-5"
                } ${index >= 2 ? "sm:pt-4" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${accent.icon}`}>
                    <Icon className="size-4" />
                  </div>
                  <Badge variant={isUp ? "default" : "destructive"} className="gap-1">
                    {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {isUp ? "+" : ""}
                    {metric.change}%
                  </Badge>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-2xl tabular-nums leading-none tracking-tight">
                      {formatValue(metric)}
                    </span>
                    <span className="text-muted-foreground text-xs">{metric.label}</span>
                  </div>

                  <div className="flex h-8 items-end gap-0.5" aria-hidden="true">
                    {metric.spark.map((point, sparkIndex) => (
                      <span
                        key={sparkIndex}
                        className={`w-1.5 rounded-full ${accent.bar} opacity-70 first:opacity-40 last:opacity-100`}
                        style={{ height: `${Math.max(6, (point / maxSpark) * 32)}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      <Separator className="hidden sm:block" />
    </Card>
  );
}
