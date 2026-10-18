import { T, V } from "@/i18n/t";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { paymentMix } from "./transactions-data";

export function PaymentMix() {
  const total = paymentMix.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle><T id="transactions.paymentMix" /></CardTitle>
        <CardDescription><T id="transactions.captureDistributionByPaymentMethod" /></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="font-medium text-2xl">{formatCurrency(total, { noDecimals: true })}</div>
          <div className="flex h-6 w-full overflow-hidden rounded-md">
            {paymentMix.map((item, index) => {
              const width = (item.amount / total) * 100;
              const alpha = Math.max(0.35, 1 - index * 0.12);

              return (
                <div
                  key={item.key}
                  className="h-full shrink-0 border-background border-l first:border-l-0"
                  style={{
                    width: `${width}%`,
                    background: `color-mix(in oklch, var(--primary) ${alpha * 100}%, transparent)`,
                  }}
                  title={`${item.label}: ${formatCurrency(item.amount)}`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {paymentMix.map((item, index) => {
            const pct = Math.round((item.amount / total) * 100);
            const alpha = Math.max(0.35, 1 - index * 0.12);

            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-sm"
                    style={{
                      background: `color-mix(in oklch, var(--primary) ${alpha * 100}%, transparent)`,
                    }}
                  />
                  <span className="text-muted-foreground text-sm"><V scope="transactions" text={item.label} /></span>
                </div>
                <span className="font-medium text-sm tabular-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
