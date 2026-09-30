"use client";

import { cn } from "cn";
import {
  Armchair,
  Building2,
  CalendarDays,
  Clock,
  DoorOpen,
  Pencil,
  Plane,
  PlaneTakeoff,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { airlineStyles, type Flight, getAvailableSeats, getSeatAvailabilityClass, statusStyles } from "./flights-data";

const bookingStatusClasses: Record<Flight["bookings"][number]["status"], string> = {
  Confirmed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cancelled: "border-destructive/20 bg-destructive/10 text-destructive",
};

type FlightDetailsProps = {
  flight: Flight | null;
};

function EmptyFlightDetails() {
  return (
    <div className="grid h-full place-items-center p-4">
      <Empty>
        <EmptyMedia variant="icon">
          <Plane />
        </EmptyMedia>
        <EmptyTitle>Select a flight</EmptyTitle>
        <EmptyDescription>Choose a flight from the list to view its route, seats and bookings.</EmptyDescription>
      </Empty>
    </div>
  );
}

function RoutePanel({ flight }: { flight: Flight }) {
  const status = statusStyles[flight.status];

  return (
    <div className="relative isolate min-h-64 overflow-hidden rounded-2xl border">
      <img
        src="/images/flight-hero-clouds.png"
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-sea/10 via-black/35 to-background" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent backdrop-blur-md" />

      <div className="flex h-full flex-col justify-between gap-6 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-xl text-sm font-semibold shadow-sm",
                airlineStyles[flight.airlineCode],
              )}
            >
              {flight.airlineCode}
            </div>
            <div>
              <h2 className="text-lg leading-none font-semibold text-white drop-shadow-sm">{flight.flightNumber}</h2>
              <p className="mt-1 text-sm text-white/85 drop-shadow-sm">{flight.airline}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", status.badge)}>
              <span className="size-1.5 rounded-full bg-current" />
              {flight.status}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-white/85 drop-shadow-sm">
              <CalendarDays className="size-3.5" />
              {flight.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{flight.origin.code}</div>
            <div className="text-sm text-muted-foreground">{flight.origin.city}</div>
            <div className="mt-3 text-sm font-medium tabular-nums">{flight.departure}</div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 px-2">
            <span className="text-xs text-muted-foreground">{flight.duration}</span>
            <div className="flex w-full items-center gap-2">
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <PlaneTakeoff className="size-4" />
              </div>
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
            </div>
            <span className="text-xs text-muted-foreground">Nonstop</span>
          </div>

          <div className="text-right">
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{flight.destination.code}</div>
            <div className="text-sm text-muted-foreground">{flight.destination.city}</div>
            <div className="mt-3 text-sm font-medium tabular-nums">{flight.arrival}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={cn("truncate text-sm font-medium", valueClassName)}>{value}</div>
      </div>
    </div>
  );
}

function OverviewTab({ flight }: { flight: Flight }) {
  const available = getAvailableSeats(flight);

  const rows: [string, string][] = [
    ["Flight number", flight.flightNumber],
    ["Airline", flight.airline],
    ["Route", `${flight.origin.code} → ${flight.destination.code}`],
    ["Date", flight.date],
    ["Departure", `${flight.departure} (${flight.origin.city})`],
    ["Arrival", `${flight.arrival} (${flight.destination.city})`],
    ["Duration", flight.duration],
    ["Aircraft", flight.aircraft],
    ["Gate", flight.gate],
    ["Terminal", flight.terminal],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Seat capacity</h3>
          <span className="text-sm tabular-nums text-muted-foreground">
            {flight.bookedSeats} / {flight.totalSeats} booked
          </span>
        </div>
        <Progress value={(flight.bookedSeats / flight.totalSeats) * 100} />
        <p className={cn("text-xs font-medium", getSeatAvailabilityClass(flight))}>{available} seats available</p>
      </div>
    </div>
  );
}

function PassengersTab({ flight }: { flight: Flight }) {
  if (flight.passengers.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>
        <EmptyTitle>No passengers</EmptyTitle>
        <EmptyDescription>This flight currently has no booked passengers.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Total passengers</div>
          <div className="text-2xl font-semibold tabular-nums">{flight.bookedSeats}</div>
        </div>
        <AvatarGroup>
          {flight.passengers.slice(0, 5).map((passenger) => (
            <Avatar key={passenger.id}>
              <AvatarFallback>
                {passenger.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {flight.bookedSeats > 5 && <AvatarGroupCount>+{flight.bookedSeats - 5}</AvatarGroupCount>}
        </AvatarGroup>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Passenger</TableHead>
            <TableHead>Seat</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Check-in</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flight.passengers.map((passenger) => (
            <TableRow key={passenger.id}>
              <TableCell className="font-medium">{passenger.name}</TableCell>
              <TableCell className="tabular-nums">{passenger.seat}</TableCell>
              <TableCell>{passenger.class}</TableCell>
              <TableCell className="text-right">
                {passenger.checkedIn ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    Checked in
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                    Pending
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function BookingsTab({ flight }: { flight: Flight }) {
  if (flight.bookings.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Ticket />
        </EmptyMedia>
        <EmptyTitle>No bookings</EmptyTitle>
        <EmptyDescription>No bookings are currently connected to this flight.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Traveler</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead className="text-right">Pax</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flight.bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>{booking.traveler}</TableCell>
            <TableCell>{booking.destination}</TableCell>
            <TableCell className="text-right tabular-nums">{booking.pax}</TableCell>
            <TableCell className="text-right tabular-nums">{booking.amount}</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline" className={cn("gap-1.5", bookingStatusClasses[booking.status])}>
                <span className="size-1.5 rounded-full bg-current" />
                {booking.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function HistoryTab({ flight }: { flight: Flight }) {
  return (
    <div className="flex flex-col">
      {flight.history.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
            {index < flight.history.length - 1 && <span className="w-px flex-1 bg-border" />}
          </div>
          <div className={cn("flex flex-col gap-0.5", index < flight.history.length - 1 && "pb-5")}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{event.label}</span>
              <span className="text-xs text-muted-foreground">· {event.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlightDetails({ flight }: FlightDetailsProps) {
  if (!flight) {
    return <EmptyFlightDetails />;
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto p-4 lg:p-5">
      <RoutePanel flight={flight} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <SummaryBlock icon={DoorOpen} label="Gate" value={flight.gate} />
        <SummaryBlock icon={Building2} label="Terminal" value={flight.terminal} />
        <SummaryBlock icon={Plane} label="Aircraft" value={flight.aircraft} />
        <SummaryBlock
          icon={Armchair}
          label="Available Seats"
          value={`${getAvailableSeats(flight)} / ${flight.totalSeats}`}
          valueClassName={getSeatAvailabilityClass(flight)}
        />
        <SummaryBlock icon={Users} label="Booked Seats" value={`${flight.bookedSeats}`} />
        <SummaryBlock icon={Clock} label="Duration" value={flight.duration} />
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="w-full justify-start" variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="passengers">Passengers ({flight.bookedSeats})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings ({flight.bookings.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-5">
          <OverviewTab flight={flight} />
        </TabsContent>
        <TabsContent value="passengers" className="mt-5">
          <PassengersTab flight={flight} />
        </TabsContent>
        <TabsContent value="bookings" className="mt-5">
          <BookingsTab flight={flight} />
        </TabsContent>
        <TabsContent value="history" className="mt-5">
          <HistoryTab flight={flight} />
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button className="flex-1">
          <Ticket data-icon="inline-start" />
          View Bookings
        </Button>
        <Button variant="outline" className="flex-1">
          <Pencil data-icon="inline-start" />
          Edit Flight
        </Button>
        <Button
          variant="outline"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive sm:ml-auto"
        >
          <Trash2 data-icon="inline-start" />
          Cancel Flight
        </Button>
      </div>
    </div>
  );
}
