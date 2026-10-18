"use client";

import type { ComponentType } from "react";

import { cn } from "cn";
import { CalendarCheck, DollarSign, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";

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

const accents: Record<string, { icon: string }> = {
  "total-bookings": { icon: "bg-primary/10 text-primary" },
  revenue: { icon: "bg-secondary text-secondary-foreground" },
  "active-travelers": { icon: "bg-accent text-accent-foreground" },
  "avg-trip-value": { icon: "bg-success/10 text-success" },
};

export function KpiGrid() {
  const { formatCurrency, formatNumber } = useI18n();

  function formatValue(metric: Metric) {
    return metric.format === "currency" ? formatCurrency(metric.value) : formatNumber(metric.value);
  }

  return (
    <Card className="h-full gap-0 py-0">
      <CardHeader className="gap-1 px-5 pt-5 pb-4">
        <CardTitle className="leading-none">
          <T id="default.todaySOverview" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          <T id="default.hereSWhatSHappeningWithYourTravelBusinessToday" />
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {metrics.map((metric) => {
            const Icon = icons[metric.id] ?? DollarSign;
            const accent = accents[metric.id] ?? accents["total-bookings"];
            const isUp = metric.trend === "up";
            return (
              <div
                key={metric.id}
                className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/30 p-4"
              >
                <div className={`flex size-8 items-center justify-center rounded-lg ${accent.icon}`}>
                  <Icon className="size-4" />
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-semibold text-2xl tabular-nums leading-none tracking-tight text-foreground">
                      {formatValue(metric)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      <V scope="default" text={metric.label} />
                    </span>
                  </div>

                  <Badge
                    className={cn(isUp && "bg-success/10 text-success")}
                    variant={isUp ? "secondary" : "destructive"}
                  >
                    {isUp ? <TrendingUp data-icon="inline-start" /> : <TrendingDown data-icon="inline-start" />}
                    {isUp ? "+" : ""}
                    {metric.change}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
