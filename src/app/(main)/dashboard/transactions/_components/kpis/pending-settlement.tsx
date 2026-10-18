import { T } from "@/i18n/t";
import { Landmark } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

import { transactionSummary } from "../transactions-data";

export function PendingSettlement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-content-center rounded-sm bg-muted">
              <Landmark className="size-5" />
            </span>
            <T id="transactions.pendingSettlement" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <p className="font-medium text-xl tabular-nums">
              {formatCurrency(transactionSummary.pendingAmount, { noDecimals: true })}
            </p>
            <span className="text-xs">{transactionSummary.pendingCount} <T id="transactions.item" /></span>
          </div>
          <p className="text-muted-foreground text-xs"><T id="transactions.awaitingBankConfirmation" /></p>
        </div>

        <Separator />

        <p className="text-muted-foreground text-xs"><T id="transactions.proofMatchingStillOpenForToday" /></p>
      </CardContent>
    </Card>
  );
}
