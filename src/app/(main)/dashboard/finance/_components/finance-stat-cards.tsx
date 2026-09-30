import type { ComponentType } from "react";

import { Hourglass, Receipt, TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import financeSummaryData from "./finance-summary-data.json";
import type { FinanceSummary } from "./types";

const summary = financeSummaryData as FinanceSummary;

type StatCardConfig = {
  id: string;
  label: string;
  value: number;
  change: number;
  direction: "up" | "down";
  caption: string;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
  badgeClassName: string;
};

const stats: StatCardConfig[] = [
  {
    id: "expenses",
    label: "Total Expenses",
    value: summary.totalExpenses,
    change: summary.expensesChange,
    direction: "up",
    caption: `+${formatCurrency(summary.expensesComparedAmount, { noDecimals: true })} than last month`,
    icon: Receipt,
    iconClassName: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    badgeClassName: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "net-profit",
    label: "Net Profit",
    value: summary.netProfit,
    change: summary.netProfitChange,
    direction: "up",
    caption: `+${formatCurrency(summary.netProfitComparedAmount, { noDecimals: true })} than last month`,
    icon: Wallet,
    iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    badgeClassName: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "outstanding",
    label: "Outstanding Receivables",
    value: summary.outstandingReceivables,
    change: summary.outstandingReceivablesChange,
    direction: "down",
    caption: summary.outstandingReceivablesCaption,
    icon: Hourglass,
    iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    badgeClassName: "text-amber-600 dark:text-amber-400",
  },
];

export function FinanceStatCards() {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.direction === "up" ? TrendingUp : TrendingDown;

        return (
          <Card key={stat.id} className="h-full shadow-xs">
            <CardContent className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`flex size-8 items-center justify-center rounded-lg ${stat.iconClassName}`}>
                  <Icon className="size-4" />
                </div>
                <span className={`flex items-center gap-1 font-medium text-xs ${stat.badgeClassName}`}>
                  <TrendIcon className="size-3" />
                  {stat.direction === "up" ? "+" : ""}
                  {stat.change}%
                </span>
              </div>
              <div className="mt-auto flex flex-col gap-1">
                <span className="font-semibold text-2xl tabular-nums leading-none tracking-tight">
                  {formatCurrency(stat.value, { noDecimals: true })}
                </span>
                <span className="text-muted-foreground text-xs">{stat.label}</span>
              </div>
              <p className="text-muted-foreground text-xs leading-snug">{stat.caption}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
