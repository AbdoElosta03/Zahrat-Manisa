import type { ComponentType } from "react";

import { cn } from "cn";
import { Banknote, Ticket as TicketIcon, TrendingDown, TrendingUp, XCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { Ticket } from "./ticketing-data";

type Stat = {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

function buildStats(tickets: Ticket[]): Stat[] {
  const issued = tickets.filter((ticket) => ticket.status === "Issued").length;
  const pending = tickets.filter((ticket) => ticket.status === "Pending").length;
  const cancelled = tickets.filter((ticket) => ticket.status === "Cancelled").length;
  const refunded = tickets.filter((ticket) => ticket.status === "Refunded").length;

  return [
    {
      id: "issued",
      label: "Issued Tickets",
      value: issued,
      change: 12,
      trend: "up",
      icon: TicketIcon,
      accent: "bg-brand-sea/10 text-brand-sea",
    },
    {
      id: "pending",
      label: "Pending",
      value: pending,
      change: 5,
      trend: "down",
      icon: Banknote,
      accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      value: cancelled,
      change: 2,
      trend: "up",
      icon: XCircle,
      accent: "bg-destructive/10 text-destructive",
    },
    {
      id: "refunded",
      label: "Refunded",
      value: refunded,
      change: 20,
      trend: "down",
      icon: TrendingDown,
      accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];
}

export function TicketKpiCards({ tickets }: { tickets: Ticket[] }) {
  const stats = buildStats(tickets);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isUp = stat.trend === "up";
        return (
          <Card key={stat.id} className="gap-0 py-0">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl", stat.accent)}>
                <Icon className="size-5" />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none font-semibold tabular-nums">{stat.value}</span>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {isUp ? "+" : "-"}
                    {stat.change}%
                  </span>
                </div>
                <span className="truncate text-sm text-muted-foreground">{stat.label}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
