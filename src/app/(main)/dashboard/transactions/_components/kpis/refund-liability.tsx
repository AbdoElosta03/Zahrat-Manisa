import { T } from "@/i18n/t";
import { ArrowDownLeft, TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

import { transactionSummary } from "../transactions-data";

export function RefundLiability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-content-center rounded-sm bg-muted">
              <ArrowDownLeft className="size-5" />
            </span>
            <T id="transactions.refundLiability" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="font-medium text-xl tabular-nums">
            {formatCurrency(transactionSummary.refundTotal, { noDecimals: true })}
          </p>
          <p className="text-muted-foreground text-xs"><T id="transactions.reservedUntilGatewayResponse" /></p>
        </div>

        <Separator />
        <p className="flex items-center gap-1 text-muted-foreground text-xs">
          <TrendingDown className="size-4" />
          <T id="transactions.1RefundInTheCurrentLedger" />
        </p>
      </CardContent>
    </Card>
  );
}
