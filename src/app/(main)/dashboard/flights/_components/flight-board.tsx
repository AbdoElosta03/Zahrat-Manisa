"use client";

import * as React from "react";

import { CalendarDays, Check, ChevronRight, CircleAlert, Filter, Plane, Plus, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { airlineColors, type Flight, type FlightFilter, flightFilters, flights, statusClasses } from "./flights-data";

function AirlineMark({ flight, large = false }: { flight: Flight; large?: boolean }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-lg font-semibold text-white",
        large ? "size-12 text-sm" : "size-9 text-xs",
        airlineColors[flight.airlineCode],
      )}
    >
      {flight.airlineCode}
    </div>
  );
}

function StatusBadge({ status }: { status: Flight["status"] }) {
  return (
    <Badge variant="outline" className={cn("font-normal", statusClasses[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

function Route({ flight }: { flight: Flight }) {
  return (
    <div className="flex min-w-[220px] flex-1 items-center gap-3">
      <div className="text-right">
        <p className="font-semibold text-lg tracking-tight">{flight.origin.code}</p>
        <p className="text-muted-foreground text-xs">{flight.departure}</p>
      </div>
      <div className="flex min-w-16 flex-1 items-center gap-1">
        <span className="h-px flex-1 border-t border-dashed" />
        <Plane className="size-4 rotate-45 text-primary" />
        <span className="h-px flex-1 border-t border-dashed" />
      </div>
      <div>
        <p className="font-semibold text-lg tracking-tight">{flight.destination.code}</p>
        <p className="text-muted-foreground text-xs">{flight.arrival}</p>
      </div>
    </div>
  );
}

function FlightDetails({ flight }: { flight: Flight }) {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="border-b bg-muted/20 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <AirlineMark flight={flight} large />
            <div>
              <p className="font-semibold text-lg">{flight.flightNumber}</p>
              <p className="text-muted-foreground text-sm">{flight.airline}</p>
            </div>
          </div>
          <StatusBadge status={flight.status} />
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="font-semibold text-3xl tracking-tight">{flight.origin.code}</p>
            <p className="text-muted-foreground text-sm">{flight.origin.city}</p>
            <p className="mt-2 font-medium">{flight.departure}</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 px-3">
            <Plane className="size-5 rotate-45 text-primary" />
            <div className="w-full border-t border-dashed" />
            <span className="text-muted-foreground text-xs">{flight.duration}</span>
          </div>
          <div className="text-right">
            <p className="font-semibold text-3xl tracking-tight">{flight.destination.code}</p>
            <p className="text-muted-foreground text-sm">{flight.destination.city}</p>
            <p className="mt-2 font-medium">{flight.arrival}</p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="overview" className="flex-1 gap-0">
        <TabsList className="w-full justify-start rounded-none border-b px-5" variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="passengers">Passengers</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Date", flight.date],
              ["Gate", flight.gate],
              ["Terminal", flight.terminal],
              ["Aircraft", flight.aircraft],
              ["Available seats", `${flight.availableSeats} / ${flight.totalSeats}`],
              ["Booked seats", String(flight.passengers)],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-medium text-sm">{value}</p>
              </div>
            ))}
          </div>
          <Separator className="my-5" />
          <p className="text-muted-foreground text-xs">Latest update</p>
          <p className="mt-1 text-sm">{flight.lastUpdate}</p>
        </TabsContent>
        <TabsContent value="passengers" className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["AL", "MK", "SR", "+"].map((initials) => (
                <div
                  key={initials}
                  className="grid size-9 place-items-center rounded-full border-2 border-background bg-muted text-xs"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-sm">{flight.passengers} passengers</p>
              <p className="text-muted-foreground text-xs">Manifest is ready for boarding</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bookings" className="p-5 text-muted-foreground text-sm">
          {flight.passengers} seats are linked to active bookings.
        </TabsContent>
        <TabsContent value="history" className="p-5 text-muted-foreground text-sm">
          {flight.lastUpdate}
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap gap-2 border-t p-5">
        <Button className="flex-1">View bookings</Button>
        <Button variant="outline">Edit flight</Button>
        <Button variant="outline" size="icon" aria-label="Cancel flight">
          <X />
        </Button>
      </div>
    </div>
  );
}

export function FlightBoard() {
  const [selectedId, setSelectedId] = React.useState(flights[0].id);
  const [filter, setFilter] = React.useState<FlightFilter>("All Flights");
  const [query, setQuery] = React.useState("");
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const selected = flights.find((flight) => flight.id === selectedId) ?? flights[0];
  const visible = flights.filter((flight) => {
    const matchesQuery = `${flight.flightNumber} ${flight.airline} ${flight.origin.code} ${flight.destination.code}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "All Flights" ||
      (filter === "Delayed" && flight.status === "Delayed") ||
      (filter === "Cancelled" && flight.status === "Cancelled") ||
      filter === "Departures" ||
      filter === "Arrivals";
    return matchesQuery && matchesFilter;
  });
  function select(id: string) {
    setSelectedId(id);
    if (window.innerWidth < 1024) setDetailsOpen(true);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-muted-foreground text-sm">Operations / Schedule</p>
          <h1 className="mt-1 font-semibold text-3xl tracking-tight">Flights</h1>
          <p className="mt-1 text-muted-foreground">
            Manage flight schedules, routes, availability and operational status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarDays data-icon="inline-start" />
            Mar 18, 2025
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            Add flight
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <p className="text-primary-foreground/70 text-xs">Today's flights</p>
            <p className="mt-1 font-semibold text-3xl">24</p>
            <p className="mt-2 text-primary-foreground/70 text-xs">14 departures · 10 arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs">Upcoming flights</p>
            <p className="mt-1 font-semibold text-3xl">68</p>
            <p className="mt-2 text-emerald-600 text-xs">+12.4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs">Delayed</p>
            <p className="mt-1 font-semibold text-3xl">3</p>
            <p className="mt-2 text-amber-600 text-xs">2 under 30 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs">Cancelled</p>
            <p className="mt-1 font-semibold text-3xl">1</p>
            <p className="mt-2 text-destructive text-xs">Requires rebooking</p>
          </CardContent>
        </Card>
        <Card className="hidden bg-muted/40 xl:block">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs">Available seats</p>
            <p className="mt-1 font-semibold text-3xl">1,284</p>
            <p className="mt-2 text-muted-foreground text-xs">64% average capacity</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="gap-4 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-base">Flight operations board</CardTitle>
            <InputGroup className="h-9 w-full lg:w-80">
              <InputGroupInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search flight, airline or route..."
                aria-label="Search flights"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <div className="flex flex-wrap gap-1">
              {flightFilters.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={filter === item ? "secondary" : "ghost"}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            <Button className="ml-auto" size="sm" variant="outline">
              <Filter data-icon="inline-start" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[430px]">
            <div className="divide-y">
              {visible.map((flight) => (
                <button
                  type="button"
                  key={flight.id}
                  onClick={() => select(flight.id)}
                  className={cn(
                    "flex w-full flex-col gap-4 p-4 text-left transition-colors hover:bg-muted/40 lg:flex-row lg:items-center",
                    selected.id === flight.id && "bg-muted/50",
                  )}
                >
                  <div className="flex min-w-[190px] items-center gap-3">
                    <AirlineMark flight={flight} />
                    <div>
                      <p className="font-semibold text-sm">{flight.flightNumber}</p>
                      <p className="text-muted-foreground text-xs">{flight.airline}</p>
                    </div>
                  </div>
                  <Route flight={flight} />
                  <div className="grid grid-cols-3 gap-4 text-xs lg:min-w-[250px]">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="mt-1">{flight.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gate / terminal</p>
                      <p className="mt-1">
                        {flight.gate} · T{flight.terminal}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Seats</p>
                      <p className="mt-1">
                        {flight.availableSeats} / {flight.totalSeats}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 lg:ml-auto">
                    <StatusBadge status={flight.status} />
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
              {visible.length === 0 && (
                <div className="p-10 text-center text-muted-foreground text-sm">No flights match your search.</div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="hidden min-h-[480px] lg:block">
        <Card className="h-full overflow-hidden">
          <FlightDetails flight={selected} />
        </Card>
      </div>
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-xl">
          <SheetHeader className="sr-only">
            <SheetTitle>Flight details</SheetTitle>
            <SheetDescription>Operational details for {selected.flightNumber}.</SheetDescription>
          </SheetHeader>
          <FlightDetails flight={selected} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function FlightSummary() {
  return null;
}
export function FlightFilters() {
  return null;
}
export function FlightDetailsPanel() {
  return null;
}
export const unusedIcons = { Check, CircleAlert };

export default FlightBoard;
