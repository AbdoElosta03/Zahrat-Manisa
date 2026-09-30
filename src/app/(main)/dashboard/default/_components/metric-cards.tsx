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
};

const metrics = metricsData as Metric[];

const icons: Record<string, ComponentType<{ className?: string }>> = {
  "total-bookings": CalendarCheck,
  revenue: DollarSign,
  "active-travelers": Users,
  "avg-trip-value": Wallet,
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

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {metrics.map((metric) => {
        const Icon = icons[metric.id] ?? DollarSign;
        const isUp = metric.trend === "up";

        return (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </div>
              </CardTitle>
              <CardDescription>{metric.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">
                  {formatValue(metric)}
                </div>
                <Badge variant={isUp ? "default" : "destructive"}>
                  {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {isUp ? "+" : ""}
                  {metric.change}%
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{metric.comparedTo}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
