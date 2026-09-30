import type { ComponentType } from "react";

import Image from "next/image";

import { CalendarCheck, DollarSign, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  "total-bookings": { icon: "bg-white/15 text-sky-300", bar: "bg-sky-300" },
  revenue: { icon: "bg-white/15 text-emerald-300", bar: "bg-emerald-300" },
  "active-travelers": { icon: "bg-white/15 text-violet-300", bar: "bg-violet-300" },
  "avg-trip-value": { icon: "bg-white/15 text-amber-300", bar: "bg-amber-300" },
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
    <Card className="relative h-full gap-4 overflow-hidden py-0">
      <div className="absolute inset-0">
        <Image src="/destinations/overview-hero.png" alt="" fill priority className="object-cover" sizes="800px" />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      <CardHeader className="relative z-10 pt-5">
        <CardTitle className="leading-none text-white">Today&apos;s Overview</CardTitle>
        <p className="text-sm text-white/70">Here&apos;s what&apos;s happening with your travel business today.</p>
      </CardHeader>

      <CardContent className="relative z-10 pb-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {metrics.map((metric) => {
            const Icon = icons[metric.id] ?? DollarSign;
            const accent = accents[metric.id] ?? accents["total-bookings"];
            const isUp = metric.trend === "up";
            const maxSpark = Math.max(...metric.spark);

            return (
              <div
                key={metric.id}
                className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${accent.icon}`}>
                    <Icon className="size-4" />
                  </div>
                  <Badge className="gap-1 border-white/15 bg-white/15 text-white backdrop-blur-sm">
                    {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {isUp ? "+" : ""}
                    {metric.change}%
                  </Badge>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-2xl tabular-nums leading-none tracking-tight text-white">
                      {formatValue(metric)}
                    </span>
                    <span className="text-white/70 text-xs">{metric.label}</span>
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
    </Card>
  );
}
