import type { ComponentType } from "react";

import { format, parseISO } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, Banknote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import financialActivityData from "./financial-activity-data.json";

type Transaction = {
  id: string;
  type: "payment" | "refund" | "payout";
  description: string;
  amount: number;
  date: string;
};

const transactions = financialActivityData as Transaction[];

const icons: Record<Transaction["type"], ComponentType<{ className?: string }>> = {
  payment: ArrowDownLeft,
  refund: ArrowUpRight,
  payout: Banknote,
};

const accents: Record<Transaction["type"], string> = {
  payment: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  refund: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  payout: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    signDisplay: "always",
  }).format(amount);
}

export function FinancialActivityCard() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Financial Activity</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          Last 5 transactions
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View ledger
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {transactions.map((txn) => {
          const Icon = icons[txn.type];
          const isPositive = txn.amount > 0;

          return (
            <div key={txn.id} className="flex items-center gap-3">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${accents[txn.type]}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-medium text-sm leading-none">{txn.description}</span>
                <span className="text-muted-foreground text-xs">{format(parseISO(txn.date), "d MMM")}</span>
              </div>
              <span
                className={`shrink-0 font-medium text-sm tabular-nums ${
                  isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                }`}
              >
                {formatCurrency(txn.amount)}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
