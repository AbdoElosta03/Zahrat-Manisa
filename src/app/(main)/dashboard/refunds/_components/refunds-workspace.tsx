"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { T } from "@/i18n/t";

import { RefundDetails } from "./refund-details";
import { RefundKpiCards } from "./refund-kpi-cards";
import { RefundTable } from "./refund-table";
import { refundCases } from "./refunds-data";

export function RefundsWorkspace() {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedRefundId, setSelectedRefundId] = React.useState<string | null>(null);
  const selectedRefund = refundCases.find((item) => item.id === selectedRefundId) ?? null;

  function handleSelectRefund(refundId: string) {
    setSelectedRefundId(refundId);
    setDetailsOpen(true);
  }

  return (
    <>
      <div className="flex min-w-0 flex-col gap-4">
        <RefundKpiCards cases={refundCases} />
        <RefundTable cases={refundCases} selectedRefundId={selectedRefundId} onSelectRefund={handleSelectRefund} />
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="gap-0 overflow-y-auto p-0 sm:max-w-2xl md:max-w-3xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedRefund ? `Refund ${selectedRefund.id}` : "Refund details"}</DialogTitle>
            <DialogDescription>
              <T id="refunds.selectedRefundPayoutTimelineAndMockActions" />
            </DialogDescription>
          </DialogHeader>
          {selectedRefund ? <RefundDetails refundCase={selectedRefund} /> : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RefundsWorkspace;
