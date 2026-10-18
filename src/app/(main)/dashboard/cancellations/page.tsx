import { T } from "@/i18n/t";
import { Download, Filter, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { CancellationsWorkspace } from "./_components/cancellations-workspace";

export const metadata: Metadata = {
  title: "Cancellations | Manisa Travel Admin",
  description: "Review cancellation requests, airline void status, and refund handoffs.",
  alternates: {
    canonical: "/dashboard/cancellations",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            <T id="cancellations.cancellations" />
          </h1>
          <p className="text-sm text-muted-foreground">
            <T id="cancellations.reviewVoidRequestsAirlineConfirmationsAndHandoffsToFinance" />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" type="button">
            <Filter data-icon="inline-start" />
            <T id="cancellations.filter" />
          </Button>
          <Button variant="outline" type="button">
            <Download data-icon="inline-start" />
            <T id="cancellations.export" />
          </Button>
          <Button type="button">
            <Plus data-icon="inline-start" />
            <T id="cancellations.manualRequest" />
          </Button>
        </div>
      </div>

      <CancellationsWorkspace />
    </div>
  );
}
