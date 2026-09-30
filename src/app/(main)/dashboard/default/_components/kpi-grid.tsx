import type { ComponentType } from "react";

import { CalendarCheck, DollarSign, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
      {metrics.map((metric) => {
        const Icon = icons[metric.id] ?? DollarSign;
        const accent = accents[metric.id] ?? accents["total-bookings"];
        const isUp = metric.trend === "up";
        const maxSpark = Math.max(...metric.spark);

        return (
          <Card key={metric.id} className="justify-between gap-3 shadow-xs">
            <CardHeader className="gap-1">
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
              <CardTitle className="pt-1 font-medium text-2xl tabular-nums leading-none tracking-tight">
                {formatValue(metric)}
              </CardTitle>
              <CardDescription>{metric.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-end gap-1">
              {metric.spark.map((point, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={`flex-1 rounded-full ${accent.bar} opacity-70 first:opacity-40 last:opacity-100`}
                  style={{ height: `${Math.max(14, (point / maxSpark) * 32)}px` }}
                />
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
