"use client";

import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";

import bookingConversionData from "./booking-conversion-data.json";

type Stage = {
  label: string;
  count: number;
  percent: number;
  color: string;
};

type ConversionData = {
  conversionRate: number;
  change: number;
  stages: Stage[];
};

const conversion = bookingConversionData as ConversionData;

export function BookingConversionCard() {
  const { formatNumber } = useI18n();
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">
          <T id="default.bookingConversion" />
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2">
          <span className="text-foreground text-3xl tabular-nums leading-none tracking-tight">
            {conversion.conversionRate}%
          </span>
          <Badge className="gap-1">
            <TrendingUp className="size-3" />+{conversion.change}%
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="rounded-xl border bg-muted/30 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-medium text-sm">
              <T id="default.colorTraining" />
            </span>
            <span className="text-muted-foreground text-xs">
              <T id="default.conversionStages" />
            </span>
          </div>
          <div className="flex h-10 items-center gap-1 rounded-lg bg-background/70 p-1">
            {conversion.stages.flatMap((stage, stageIndex) =>
              Array.from({ length: 3 }, (_, swatchIndex) => (
                <span
                  key={`${stage.label}-${swatchIndex}`}
                  aria-hidden="true"
                  className="h-full flex-1 rounded-full border border-white/10"
                  style={{
                    backgroundColor: stage.color,
                    opacity: 0.55 + (stageIndex + swatchIndex) * 0.08,
                  }}
                />
              )),
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {conversion.stages.map((stage) => (
            <div key={stage.label} className="rounded-lg border bg-muted/20 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: stage.color }} />
                <span className="truncate text-muted-foreground text-xs">
                  <V scope="default" text={stage.label} />
                </span>
              </div>
              <p className="font-semibold text-lg tabular-nums">{stage.percent}%</p>
              <p className="text-muted-foreground text-xs tabular-nums">{formatNumber(stage.count)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
