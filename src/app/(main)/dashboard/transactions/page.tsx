import { T } from "@/i18n/t";
import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ControlsSummary } from "./_components/controls-summary";
import { ApprovedVolume } from "./_components/kpis/approved-volume";
import { ControlReview } from "./_components/kpis/control-review";
import { PendingSettlement } from "./_components/kpis/pending-settlement";
import { RefundLiability } from "./_components/kpis/refund-liability";
import { PaymentMix } from "./_components/payment-mix";
import { SettlementPanel } from "./_components/settlement-panel";
import { TransactionFlow } from "./_components/transaction-flow";
import { TransactionLedger } from "./_components/transaction-ledger";

export const metadata: Metadata = {
  title: "Transactions | Zahrat Manisa Travel Dashboard",
  description: "Monitor payment transactions, settlement movement, refunds, and finance control exceptions.",
  alternates: {
    canonical: "/dashboard/transactions",
  },
};

export default function Page() {
  return (
    <div>
      <Tabs className="gap-4" defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview"><T id="transactions.overview" /></TabsTrigger>
          <TabsTrigger value="activity"><T id="transactions.activity" /></TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col gap-4 **:data-[slot=card]:shadow-xs">
            <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:gap-2 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              <ApprovedVolume />
              <PendingSettlement />
              <RefundLiability />
              <ControlReview />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <div className="flex flex-col gap-4">
                <TransactionFlow />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <PaymentMix />
                  <ControlsSummary />
                </div>
              </div>

              <SettlementPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="**:data-[slot=card]:shadow-xs">
            <TransactionLedger />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
