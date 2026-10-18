import { T, V } from "@/i18n/t";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { riskItems, transactionSummary } from "./transactions-data";

export function ControlsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><T id="transactions.controlsSummary" /></CardTitle>
        <CardDescription><T id="transactions.riskAndReconciliationSignalsForFinanceReview" /></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium text-xl"><T id="transactions.stablePosition" /></p>
          <p className="text-muted-foreground text-xs"><T id="transactions.ledgerStatus" /> {transactionSummary.ledgerStatus}</p>
        </div>
        {riskItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-4">
            <Separator />
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-lg"><V scope="transactions" text={item.label} /></p>
                <p className="text-muted-foreground text-xs"><V scope="transactions" text={item.helper} /></p>
              </div>
              <p className="font-medium text-lg tabular-nums">{item.value}</p>
            </div>
          </div>
        ))}
        <Separator />
        <p className="text-muted-foreground text-xs">
          <T id="transactions.clearanceTrend" /> <span className="font-medium text-primary">{transactionSummary.clearanceRate}</span>
        </p>
      </CardContent>
    </Card>
  );
}
