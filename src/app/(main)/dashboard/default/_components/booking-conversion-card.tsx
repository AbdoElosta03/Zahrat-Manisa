import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Booking Conversion</CardTitle>
        <CardDescription className="flex items-baseline gap-2">
          <span className="text-foreground text-3xl tabular-nums leading-none tracking-tight">
            {conversion.conversionRate}%
          </span>
          <Badge className="gap-1">
            <TrendingUp className="size-3" />+{conversion.change}%
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          {conversion.stages.map((stage) => (
            <span
              key={stage.label}
              aria-hidden="true"
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ width: `${stage.percent}%`, backgroundColor: stage.color }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {conversion.stages.map((stage) => (
            <div key={stage.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: stage.color }} />
                <span className="text-muted-foreground text-sm">{stage.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm tabular-nums">{stage.count.toLocaleString()}</span>
                <span className="text-muted-foreground text-xs tabular-nums">{stage.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
