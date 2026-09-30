import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import refundsData from "./refunds-data.json";
import { RefundStatusBadge } from "./status-badges";
import type { Refund } from "./types";

const refunds = refundsData as Refund[];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentRefundsCard() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-semibold text-base">Recent Refunds</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y">
          {refunds.map((refund) => (
            <div key={refund.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-muted-foreground text-sm leading-none">{refund.customer.name}</span>
                  <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{refund.bookingId}</span>
                </div>
                <span className="text-muted-foreground text-xs">{formatDate(refund.date)}</span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-sm tabular-nums">{formatCurrency(refund.amount, { noDecimals: true })}</span>
                <RefundStatusBadge status={refund.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
