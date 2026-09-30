"use client";

import * as React from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { TicketDetails } from "./ticket-details";
import { TicketKpiCards } from "./ticket-kpi-cards";
import { TicketTable } from "./ticket-table";
import { tickets } from "./ticketing-data";

export function Ticketing() {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(tickets[0].id);
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

  function handleSelectTicket(ticketId: string) {
    setSelectedTicketId(ticketId);

    if (window.innerWidth < 1280) {
      setDetailsOpen(true);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <TicketKpiCards tickets={tickets} />

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
          <TicketTable tickets={tickets} selectedTicketId={selectedTicketId} onSelectTicket={handleSelectTicket} />
          <div className="hidden xl:block">
            <TicketDetails ticket={selectedTicket} />
          </div>
        </div>
      </div>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          className="gap-0 overflow-y-auto p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-none data-[side=right]:md:w-3/4"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{selectedTicket ? `Ticket ${selectedTicket.id}` : "Ticket details"}</SheetTitle>
            <SheetDescription>Selected ticket passenger, flight, and payment details.</SheetDescription>
          </SheetHeader>
          <TicketDetails ticket={selectedTicket} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Ticketing;
