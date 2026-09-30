"use client";

import * as React from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { FlightDetails } from "./flight-details";
import { FlightList } from "./flight-list";
import { flights } from "./flights-data";

export function Flights() {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedFlightId, setSelectedFlightId] = React.useState<string | null>(flights[0].id);
  const selectedFlight = flights.find((flight) => flight.id === selectedFlightId) ?? flights[0];

  function handleSelectFlight(flightId: string) {
    setSelectedFlightId(flightId);

    if (window.innerWidth < 1024) {
      setDetailsOpen(true);
    }
  }

  return (
    <>
      <div
        data-content-padding="false"
        className="grid h-[calc(100dvh-var(--dashboard-header-height))] overflow-hidden lg:grid-cols-[420px_minmax(0,1fr)] lg:divide-x"
      >
        <div className="h-full overflow-hidden">
          <FlightList flights={flights} selectedFlightId={selectedFlightId} onSelectFlight={handleSelectFlight} />
        </div>
        <div className="hidden h-full overflow-hidden lg:block">
          <FlightDetails flight={selectedFlight} />
        </div>
      </div>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          className="gap-0 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-none data-[side=right]:md:w-3/4"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{selectedFlight ? `Flight ${selectedFlight.flightNumber}` : "Flight details"}</SheetTitle>
            <SheetDescription>Selected flight route, schedule, and booking details.</SheetDescription>
          </SheetHeader>
          <FlightDetails flight={selectedFlight} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Flights;
