import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { TransactionStatusBadge } from "./status-badges";
import transactionsData from "./transactions-data.json";
import type { Transaction, TransactionType } from "./types";

const transactions = transactionsData as Transaction[];

const typeLabels: Record<TransactionType, string> = {
  "booking-payment": "Booking Payment",
  "ticket-payment": "Ticket Payment",
  "package-payment": "Package Payment",
  refund: "Refund",
  expense: "Expense",
};

export function RecentTransactionsCard() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base">Recent Transactions</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y">
          {transactions.map((transaction) => {
            const isNegative = transaction.amount < 0;

            return (
              <div key={transaction.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
                  {transaction.customer.initials}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-medium text-sm leading-none">{transaction.customer.name}</span>
                    <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{transaction.id}</span>
                  </div>
                  <span className="truncate text-muted-foreground text-xs">
                    {typeLabels[transaction.type]} · {transaction.method}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={`font-medium text-sm tabular-nums ${isNegative ? "text-rose-600 dark:text-rose-400" : "text-foreground"}`}
                  >
                    {isNegative ? "-" : ""}
                    {formatCurrency(Math.abs(transaction.amount), { noDecimals: true })}
                  </span>
                  <TransactionStatusBadge status={transaction.status} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
