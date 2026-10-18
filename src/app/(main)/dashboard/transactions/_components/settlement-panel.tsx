import { T, V } from "@/i18n/t";
import { Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

import { settlementItems, transactionRows, transactionSummary } from "./transactions-data";

const followUps = transactionRows.filter(
  (transaction) => transaction.status === "Pending" || transaction.status === "Review",
);

export function SettlementPanel() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle><T id="transactions.settlementBoard" /></CardTitle>
        <CardDescription><T id="transactions.todaySLedgerPositionAndItemsRequiringFinanceAttention" /></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid w-full place-items-center">
          <div className="relative flex aspect-8/5 w-full max-w-100 flex-col justify-between overflow-hidden rounded-xl bg-primary p-6">
            <div className="flex items-start justify-between">
              <Landmark className="size-5 text-primary-foreground sm:size-8" />
              <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 font-medium text-primary-foreground text-xs">
                {transactionSummary.ledgerStatus}
              </span>
            </div>
            <div>
              <p className="text-primary-foreground/80 text-xs uppercase tracking-wider"><T id="transactions.statementDate" /></p>
              <p className="font-medium text-primary-foreground text-lg">{transactionSummary.statementDate}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider"><T id="transactions.approvedVolume2" /></p>
                <p className="font-medium font-mono text-primary-foreground text-sm tabular-nums sm:text-lg">
                  {formatCurrency(transactionSummary.approvedTotal, { noDecimals: true })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider"><T id="transactions.pending" /></p>
                <p className="font-mono text-primary-foreground/80 text-xs tabular-nums sm:text-sm">
                  {formatCurrency(transactionSummary.pendingAmount, { noDecimals: true })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          {settlementItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground"><V scope="transactions" text={item.label} /></span>
              <span className="font-medium tabular-nums">{formatCurrency(item.amount, { noDecimals: true })}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <Button className="w-full" size="sm">
            <T id="transactions.openReconciliation" />
          </Button>
          <Button className="w-full" variant="outline" size="sm">
            <T id="transactions.exportStatement" />
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h6 className="text-muted-foreground text-sm uppercase"><T id="transactions.followUps" /></h6>
          <div className="flex flex-col gap-4">
            {followUps.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-2">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Landmark className="size-5 text-muted-foreground" />
                </div>
                <div className="flex w-full items-end justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{transaction.customer}</p>
                    <p className="text-muted-foreground text-xs">
                      {transaction.id} · <V scope="transactions" text={transaction.status} />
                    </p>
                  </div>
                  <span className="font-medium text-sm tabular-nums leading-none">
                    {formatCurrency(transaction.amount, { noDecimals: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" size="sm" variant="outline">
            <T id="transactions.viewAllFollowUps" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
