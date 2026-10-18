import { T } from "@/i18n/t";
import { Download, Filter, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { RefundsWorkspace } from "./_components/refunds-workspace";

export const metadata: Metadata = {
  title: "Refunds | Manisa Travel Admin",
  description: "Review refund payouts, gateway status, and finance operations.",
  alternates: {
    canonical: "/dashboard/refunds",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            <T id="refunds.refunds" />
          </h1>
          <p className="text-sm text-muted-foreground">
            <T id="refunds.reviewPayoutsGatewayStatusAndSettlementHandoffs" />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" type="button">
            <Filter data-icon="inline-start" />
            <T id="refunds.filter" />
          </Button>
          <Button variant="outline" type="button">
            <Download data-icon="inline-start" />
            <T id="refunds.export" />
          </Button>
          <Button type="button">
            <Plus data-icon="inline-start" />
            <T id="refunds.manualRefund" />
          </Button>
        </div>
      </div>

      <RefundsWorkspace />
    </div>
  );
}
