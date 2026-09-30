import type { ComponentType } from "react";

import { CalendarCheck, DollarSign, Plane, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import metricsData from "./kpi-data.json";

type Metric = {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency";
  change: number;
  trend: "up" | "down";
  helper: string;
  spark: number[];
};

const metrics = metricsData as Metric[];

const icons: Record<string, ComponentType<{ className?: string }>> = {
  "total-bookings": CalendarCheck,
  travelers: Users,
  "upcoming-trips": Plane,
  revenue: DollarSign,
};

const accents: Record<string, { icon: string; bar: string; spark: string }> = {
  "total-bookings": { icon: "bg-sky-500/10 text-sky-500", bar: "stroke-sky-500", spark: "bg-sky-500" },
  travelers: { icon: "bg-violet-500/10 text-violet-500", bar: "stroke-violet-500", spark: "bg-violet-500" },
  "upcoming-trips": { icon: "bg-amber-500/10 text-amber-500", bar: "stroke-amber-500", spark: "bg-amber-500" },
  revenue: { icon: "bg-emerald-500/10 text-emerald-500", bar: "stroke-emerald-500", spark: "bg-emerald-500" },
};

function formatValue(metric: Metric) {
  if (metric.format === "currency") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      metric.value,
    );
  }
  return metric.value.toLocaleString();
}

export function BookingKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = icons[metric.id] ?? CalendarCheck;
        const accent = accents[metric.id] ?? accents["total-bookings"];
        const isUp = metric.trend === "up";
        const maxSpark = Math.max(...metric.spark);

        return (
          <Card key={metric.id} className="gap-3 py-4">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className={`flex size-9 items-center justify-center rounded-lg ${accent.icon}`}>
                  <Icon className="size-4.5" />
                </div>
                <div className="flex h-6 items-end gap-0.5" aria-hidden="true">
                  {metric.spark.map((point, sparkIndex) => (
                    <span
                      key={sparkIndex}
                      className={`w-1 rounded-full ${accent.spark} opacity-70 first:opacity-30 last:opacity-100`}
                      style={{ height: `${Math.max(4, (point / maxSpark) * 24)}px` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-2xl tabular-nums leading-none tracking-tight">
                  {formatValue(metric)}
                </span>
                <span className="text-muted-foreground text-sm">{metric.label}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span
                  className={`flex items-center gap-0.5 font-medium ${isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {isUp ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="text-muted-foreground">{metric.helper}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
