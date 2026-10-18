import { T } from "@/i18n/t";
import { ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { transactionSummary } from "../transactions-data";

export function ControlReview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-content-center rounded-sm bg-muted">
              <ShieldCheck className="size-5" />
            </span>
            <T id="transactions.controlReview" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl tabular-nums">{transactionSummary.clearanceRate}</p>
            <span className="text-xs">{transactionSummary.reviewCount} <T id="transactions.flags" /></span>
          </div>
          <p className="text-muted-foreground text-xs"><T id="transactions.clearanceRateAcrossPaymentControls" /></p>
        </div>

        <Separator />

        <p className="text-muted-foreground text-xs"><T id="transactions.aboveTheDailyControlThreshold" /></p>
      </CardContent>
    </Card>
  );
}
