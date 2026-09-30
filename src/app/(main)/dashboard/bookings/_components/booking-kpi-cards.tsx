import type { ComponentType } from "react";

import Image from "next/image";

import { CalendarCheck, Plane, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import metricsData from "./kpi-data.json";
import revenueData from "./revenue-data.json";

type Metric = {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency";
  change: number;
  trend: "up" | "down";
  helper?: string;
  spark?: number[];
};

type Revenue = {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
  image: string;
};

const metrics = metricsData as Metric[];
const revenue = revenueData as Revenue;

const icons: Record<string, ComponentType<{ className?: string }>> = {
  "total-bookings": CalendarCheck,
  travelers: Users,
  "upcoming-trips": Plane,
};

const accents: Record<string, { icon: string; spark: string }> = {
  "total-bookings": { icon: "bg-sky-500/10 text-sky-500", spark: "bg-sky-500" },
  travelers: { icon: "bg-violet-500/10 text-violet-500", spark: "bg-violet-500" },
  "upcoming-trips": { icon: "bg-amber-500/10 text-amber-500", spark: "bg-amber-500" },
};

function formatNumber(value: number) {
  return value.toLocaleString();
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function TrendBadge({ change, trend }: { change: number; trend: "up" | "down" }) {
  const isUp = trend === "up";
  return (
    <span
      className={`flex items-center gap-0.5 font-medium text-xs ${isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
    >
      {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {isUp ? "+" : ""}
      {change}%
    </span>
  );
}

export function BookingKpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="gap-0 py-0 lg:col-span-2">
        <CardContent className="grid grid-cols-1 divide-y p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => {
            const Icon = icons[metric.id] ?? CalendarCheck;
            const accent = accents[metric.id] ?? accents["total-bookings"];
            const maxSpark = metric.spark ? Math.max(...metric.spark) : 0;

            return (
              <div key={metric.id} className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex size-9 items-center justify-center rounded-lg ${accent.icon}`}>
                    <Icon className="size-4.5" />
                  </div>
                  {metric.spark ? (
                    <div className="flex h-6 items-end gap-0.5" aria-hidden="true">
                      {metric.spark.map((point, sparkIndex) => (
                        <span
                          key={sparkIndex}
                          className={`w-1 rounded-full ${accent.spark} opacity-70 first:opacity-30 last:opacity-100`}
                          style={{ height: `${Math.max(4, (point / maxSpark) * 24)}px` }}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-2xl leading-none tracking-tight tabular-nums">
                    {formatNumber(metric.value)}
                  </span>
                  <span className="text-muted-foreground text-sm">{metric.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <TrendBadge change={metric.change} trend={metric.trend} />
                  {metric.helper ? <span className="text-muted-foreground text-xs">{metric.helper}</span> : null}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="relative gap-0 overflow-hidden py-0">
        <Image
          src={revenue.image || "/placeholder.svg"}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <CardContent className="relative flex h-full flex-col justify-between gap-3 p-5 text-white">
          <span className="font-medium text-sm text-white/80">{revenue.label}</span>
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-3xl leading-none tracking-tight tabular-nums">
              {formatCurrency(revenue.value)}
            </span>
            <span
              className={`flex items-center gap-0.5 font-medium text-xs ${revenue.trend === "up" ? "text-emerald-400" : "text-red-400"}`}
            >
              {revenue.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {revenue.trend === "up" ? "+" : ""}
              {revenue.change}%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
