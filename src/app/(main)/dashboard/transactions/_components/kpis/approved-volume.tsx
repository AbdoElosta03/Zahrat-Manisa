import { T } from "@/i18n/t";
import { Banknote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { transactionSummary } from "../transactions-data";

export function ApprovedVolume() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-content-center rounded-sm bg-muted">
              <Banknote className="size-5" />
            </span>
            <T id="transactions.approvedVolume" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="font-medium text-xl tabular-nums">
            {formatCurrency(transactionSummary.approvedTotal, { noDecimals: true })}
          </p>
          <p className="text-muted-foreground text-xs"><T id="transactions.capturedBookingsExcludingVoidedRefunds" /></p>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" size="sm">
            <T id="transactions.export" />
          </Button>
          <Button className="flex-1" size="sm" variant="outline">
            <T id="transactions.review" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
