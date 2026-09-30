import type { ComponentType } from "react";

import Image from "next/image";

import { Briefcase, Plane, Ticket, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import financeSummaryData from "./finance-summary-data.json";
import type { FinanceSummary, RevenueBreakdownIcon } from "./types";

const summary = financeSummaryData as FinanceSummary;

const breakdownIcons: Record<RevenueBreakdownIcon, ComponentType<{ className?: string }>> = {
  flights: Plane,
  packages: Briefcase,
  ticketing: Ticket,
};

export function FeaturedRevenueCard() {
  return (
    <Card className="relative h-full gap-4 overflow-hidden py-0">
      <div className="absolute inset-0">
        <Image
          src="/destinations/revenue-hero.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      </div>

      <CardHeader className="relative z-10 pt-5">
        <CardTitle className="font-normal text-sm text-white/80">Total Revenue</CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 flex flex-1 flex-col justify-end gap-4 pb-5">
        <div>
          <div className="flex flex-wrap items-end gap-2.5">
            <span className="font-semibold text-4xl text-white tabular-nums leading-none tracking-tight">
              {formatCurrency(summary.totalRevenue, { noDecimals: true })}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2 py-0.5 font-medium text-emerald-300 text-xs">
              <TrendingUp className="size-3" />+{summary.revenueChange}%
            </span>
          </div>
          <p className="mt-1.5 text-sm text-white/70">
            +{formatCurrency(summary.revenueComparedAmount, { noDecimals: true })} than last month
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 border-white/15 border-t pt-4">
          {summary.revenueBreakdown.map((item) => {
            const Icon = breakdownIcons[item.icon];
            return (
              <div key={item.label} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
                  <Icon className="size-3.5" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[11px] text-white/70 leading-none">{item.label}</span>
                  <span className="truncate font-medium text-sm text-white tabular-nums leading-none">
                    {formatCurrency(item.value, { noDecimals: true })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
