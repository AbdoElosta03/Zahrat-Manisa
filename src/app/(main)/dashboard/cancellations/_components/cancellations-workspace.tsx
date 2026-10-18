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

import { CancellationDetails } from "./cancellation-details";
import { CancellationKpiCards } from "./cancellation-kpi-cards";
import { CancellationTable } from "./cancellation-table";
import { cancellationRequests } from "./cancellations-data";

export function CancellationsWorkspace() {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedRequestId, setSelectedRequestId] = React.useState<string | null>(null);
  const selectedRequest = cancellationRequests.find((item) => item.id === selectedRequestId) ?? null;

  function handleSelectRequest(requestId: string) {
    setSelectedRequestId(requestId);
    setDetailsOpen(true);
  }

  return (
    <>
      <div className="flex min-w-0 flex-col gap-4">
        <CancellationKpiCards requests={cancellationRequests} />
        <CancellationTable
          requests={cancellationRequests}
          selectedRequestId={selectedRequestId}
          onSelectRequest={handleSelectRequest}
        />
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="gap-0 overflow-y-auto p-0 sm:max-w-2xl md:max-w-3xl">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedRequest ? `Cancellation ${selectedRequest.id}` : "Cancellation details"}
            </DialogTitle>
            <DialogDescription>
              <T id="cancellations.selectedRequestBookingTimelineAndMockActions" />
            </DialogDescription>
          </DialogHeader>
          {selectedRequest ? <CancellationDetails request={selectedRequest} /> : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CancellationsWorkspace;
