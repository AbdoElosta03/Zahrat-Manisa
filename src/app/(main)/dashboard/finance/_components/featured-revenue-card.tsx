"use client";

import type { ComponentType } from "react";

import Image from "next/image";

import { Briefcase, Plane, Ticket, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";

import financeSummaryData from "./finance-summary-data.json";
import type { FinanceSummary, RevenueBreakdownIcon } from "./types";

const summary = financeSummaryData as FinanceSummary;

const breakdownIcons: Record<RevenueBreakdownIcon, ComponentType<{ className?: string }>> = {
  flights: Plane,
  packages: Briefcase,
  ticketing: Ticket,
};

export function FeaturedRevenueCard() {
  const { formatCurrency } = useI18n();

  return (
    <Card className="relative h-full gap-4 overflow-hidden py-0">
      <div className="absolute inset-0">
        <Image
          src="/images/revenue-hero.svg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10" />
      </div>

      <CardHeader className="relative z-10 pt-5">
        <CardTitle className="font-normal text-sm text-white/80"><T id="finance.totalRevenue" /></CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 flex flex-1 flex-col justify-end gap-4 pb-5">
        <div>
          <div className="flex flex-wrap items-end gap-2.5">
            <span className="font-semibold text-4xl text-white tabular-nums leading-none tracking-tight" dir="auto">
              {formatCurrency(summary.totalRevenue, { maximumFractionDigits: 0 })}
            </span>
            <Badge className="bg-success/15 text-success" dir="ltr" variant="secondary">
              <TrendingUp data-icon="inline-start" />+{summary.revenueChange}%
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-white/70" dir="auto">
            <bdi>+{formatCurrency(summary.revenueComparedAmount, { maximumFractionDigits: 0 })}</bdi>{" "}
            <T id="finance.thanLastMonth" />
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
                  <span className="truncate text-[11px] text-white/70 leading-none"><V scope="finance" text={item.label} /></span>
                  <span className="truncate font-medium text-sm text-white tabular-nums leading-none" dir="auto">
                    {formatCurrency(item.value, { maximumFractionDigits: 0 })}
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
