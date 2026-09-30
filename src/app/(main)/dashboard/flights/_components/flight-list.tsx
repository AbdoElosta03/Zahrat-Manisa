"use client";

import * as React from "react";

import { cn } from "cn";
import { Plane, PlusIcon, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  airlineStyles,
  type Flight,
  type FlightFilter,
  getAvailableSeats,
  getSeatAvailabilityClass,
  HUB_AIRPORT,
  statusStyles,
} from "./flights-data";

type FlightCardProps = {
  active?: boolean;
  flight: Flight;
  onSelectFlight: (flightId: string) => void;
};

function FlightCard({ flight, active, onSelectFlight }: FlightCardProps) {
  const available = getAvailableSeats(flight);
  const seatClass = getSeatAvailabilityClass(flight);
  const status = statusStyles[flight.status];

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(event) => {
        event.currentTarget.blur();
        onSelectFlight(flight.id);
      }}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-3 text-left transition-colors",
        "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active ? "border-primary bg-primary/5" : "border-transparent bg-muted/30",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg text-xs font-semibold",
              airlineStyles[flight.airlineCode],
            )}
          >
            {flight.airlineCode}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm leading-none font-medium">{flight.flightNumber}</div>
            <div className="mt-1 truncate text-xs text-muted-foreground">{flight.airline}</div>
          </div>
        </div>
        <Badge variant="outline" className={cn("shrink-0 gap-1.5 text-xs", status.badge)}>
          <span className={cn("size-1.5 rounded-full bg-current")} />
          {flight.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <div>
          <div className="text-sm leading-none font-semibold">{flight.origin.code}</div>
          <div className="mt-1 text-xs leading-none text-muted-foreground">{flight.departure}</div>
        </div>
        <div className="flex flex-1 items-center gap-1.5 px-1">
          <span className="h-px flex-1 border-t border-dashed border-border" />
          <Plane className="size-3.5 shrink-0 rotate-90 text-primary" />
          <span className="h-px flex-1 border-t border-dashed border-border" />
        </div>
        <div className="text-right">
          <div className="text-sm leading-none font-semibold">{flight.destination.code}</div>
          <div className="mt-1 text-xs leading-none text-muted-foreground">{flight.arrival}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="truncate text-muted-foreground">
          {flight.origin.city} → {flight.destination.city}
        </span>
        <span className={cn("shrink-0 font-medium tabular-nums", seatClass)}>
          {available} / {flight.totalSeats} seats
        </span>
      </div>
    </button>
  );
}

type FlightListProps = {
  flights: Flight[];
  onAddFlight?: () => void;
  onSelectFlight: (flightId: string) => void;
  selectedFlightId: string | null;
};

export function FlightList({ flights, selectedFlightId, onSelectFlight, onAddFlight }: FlightListProps) {
  const [tab, setTab] = React.useState<FlightFilter>("all");
  const [query, setQuery] = React.useState("");

  const counts = React.useMemo(
    () => ({
      all: flights.length,
      departures: flights.filter((flight) => flight.origin.code === HUB_AIRPORT).length,
      arrivals: flights.filter((flight) => flight.destination.code === HUB_AIRPORT).length,
      delayed: flights.filter((flight) => flight.status === "Delayed").length,
    }),
    [flights],
  );

  const filtered = flights.filter((flight) => {
    const matchesTab =
      tab === "all" ||
      (tab === "departures" && flight.origin.code === HUB_AIRPORT) ||
      (tab === "arrivals" && flight.destination.code === HUB_AIRPORT) ||
      (tab === "delayed" && flight.status === "Delayed");

    const haystack =
      `${flight.flightNumber} ${flight.airline} ${flight.origin.code} ${flight.origin.city} ${flight.destination.code} ${flight.destination.city}`.toLowerCase();

    return matchesTab && haystack.includes(query.toLowerCase());
  });

  return (
    <Card className="h-full rounded-none ring-0">
      <CardHeader>
        <CardTitle className="text-xl font-normal">Flights</CardTitle>
        <CardAction>
          <Button size="sm" onClick={onAddFlight}>
            <PlusIcon data-icon="inline-start" />
            Add Flight
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden px-0">
        <Tabs value={tab} onValueChange={(value) => setTab(value as FlightFilter)}>
          <TabsList className="w-full border-b px-4" variant="line">
            <TabsTrigger className="text-xs" value="all">
              All Flights ({counts.all})
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="departures">
              Departures ({counts.departures})
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="arrivals">
              Arrivals ({counts.arrivals})
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="delayed">
              Delayed ({counts.delayed})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="px-4">
          <InputGroup className="h-9">
            <InputGroupInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search flights"
              placeholder="Search flights, airline, route..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <ScrollArea className="h-0 flex-1">
          <div className="flex flex-col gap-3 px-4 pb-4">
            {filtered.length === 0 ? (
              <Empty>
                <EmptyMedia variant="icon">
                  <Plane />
                </EmptyMedia>
                <EmptyTitle>No flights found</EmptyTitle>
                <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
              </Empty>
            ) : (
              filtered.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  active={flight.id === selectedFlightId}
                  onSelectFlight={onSelectFlight}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
