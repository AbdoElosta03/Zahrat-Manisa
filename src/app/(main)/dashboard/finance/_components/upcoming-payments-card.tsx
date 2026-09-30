import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { UpcomingPaymentStatusBadge } from "./status-badges";
import type { UpcomingPayment } from "./types";
import upcomingPaymentsData from "./upcoming-payments-data.json";

const upcomingPayments = upcomingPaymentsData as UpcomingPayment[];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function UpcomingPaymentsCard() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base">Upcoming Payments</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y">
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
                {payment.customer.initials}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-medium text-sm leading-none">{payment.customer.name}</span>
                  <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{payment.bookingId}</span>
                </div>
                <span
                  className={`truncate text-xs ${payment.status === "overdue" ? "font-medium text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}
                >
                  Due {formatDate(payment.dueDate)}
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-medium text-sm tabular-nums">
                  {formatCurrency(payment.amount, { noDecimals: true })}
                </span>
                <UpcomingPaymentStatusBadge status={payment.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
