"use client";

import { Fragment, type ComponentType } from "react";

import { cn } from "cn";
import { Hourglass, Receipt, TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";

import financeSummaryData from "./finance-summary-data.json";
import type { FinanceSummary } from "./types";

const summary = financeSummaryData as FinanceSummary;

type StatCardConfig = {
  id: string;
  label: string;
  value: number;
  change: number;
  direction: "up" | "down";
  caption?: string;
  captionAmount?: number;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
};

const stats: StatCardConfig[] = [
  {
    id: "expenses",
    label: "Total Expenses",
    value: summary.totalExpenses,
    change: summary.expensesChange,
    direction: "up",
    caption: "than last month",
    captionAmount: summary.expensesComparedAmount,
    icon: Receipt,
    iconClassName: "bg-secondary text-secondary-foreground",
  },
  {
    id: "net-profit",
    label: "Net Profit",
    value: summary.netProfit,
    change: summary.netProfitChange,
    direction: "up",
    caption: "than last month",
    captionAmount: summary.netProfitComparedAmount,
    icon: Wallet,
    iconClassName: "bg-success/10 text-success",
  },
  {
    id: "outstanding",
    label: "Outstanding Receivables",
    value: summary.outstandingReceivables,
    change: summary.outstandingReceivablesChange,
    direction: "down",
    caption: summary.outstandingReceivablesCaption,
    icon: Hourglass,
    iconClassName: "bg-accent text-accent-foreground",
  },
];

export function FinanceStatCards() {
  const { formatCurrency } = useI18n();

  return (
    <Card className="h-full shadow-xs">
      <CardContent className="flex h-full flex-col justify-center md:flex-row md:items-stretch">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.direction === "up" ? TrendingUp : TrendingDown;

          return (
            <Fragment key={stat.id}>
              {index > 0 ? (
                <>
                  <Separator className="md:hidden" />
                  <Separator orientation="vertical" className="hidden h-auto md:block" />
                </>
              ) : null}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-4 text-start md:px-4 md:py-0 first:pt-0 last:pb-0 md:first:ps-0 md:last:pe-0">
                <div className="flex items-center justify-between gap-2">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.iconClassName}`}>
                    <Icon className="size-4" />
                  </div>
                  <Badge
                    className={cn(stat.direction === "up" && "bg-success/10 text-success")}
                    dir="ltr"
                    variant={stat.direction === "up" ? "secondary" : "destructive"}
                  >
                    <TrendIcon data-icon="inline-start" />
                    {stat.direction === "up" ? "+" : ""}
                    {stat.change}%
                  </Badge>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-muted-foreground text-xs"><V scope="finance" text={stat.label} /></span>
                  <span className="font-semibold text-2xl tabular-nums leading-none tracking-tight" dir="auto">
                    {formatCurrency(stat.value, { maximumFractionDigits: 0 })}
                  </span>
                  <p className="text-muted-foreground text-xs leading-snug" dir="auto">
                    {stat.captionAmount !== undefined ? (
                      <>
                        <bdi>+{formatCurrency(stat.captionAmount, { maximumFractionDigits: 0 })}</bdi>{" "}
                        <T id="finance.thanLastMonth" />
                      </>
                    ) : (
                      <V scope="finance" text={stat.caption ?? ""} />
                    )}
                  </p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
