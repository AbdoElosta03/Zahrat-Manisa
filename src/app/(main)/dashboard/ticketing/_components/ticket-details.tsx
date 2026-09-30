"use client";

import { cn } from "cn";
import {
  Armchair,
  CalendarDays,
  Download,
  Mail,
  MoreHorizontal,
  Plane,
  PlaneTakeoff,
  QrCode,
  Ticket as TicketIcon,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { airlineStyles, statusStyles, type Ticket } from "./ticketing-data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function EmptyTicketDetails() {
  return (
    <Card className="grid h-full place-items-center p-4">
      <Empty>
        <EmptyMedia variant="icon">
          <TicketIcon />
        </EmptyMedia>
        <EmptyTitle>Select a ticket</EmptyTitle>
        <EmptyDescription>
          Choose a ticket from the list to view passenger, flight and payment details.
        </EmptyDescription>
      </Empty>
    </Card>
  );
}

function HeroPanel({ ticket }: { ticket: Ticket }) {
  const status = statusStyles[ticket.status];

  return (
    <div className="relative isolate min-h-52 overflow-hidden rounded-t-xl border-b">
      <img
        src="/images/flight-hero-clouds.png"
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-sea/10 via-black/35 to-background" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent backdrop-blur-md" />

      <div className="flex h-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold shadow-sm",
                airlineStyles[ticket.airlineCode],
              )}
            >
              {ticket.airlineCode}
            </div>
            <div>
              <h2 className="text-lg leading-none font-semibold text-white drop-shadow-sm">{ticket.id}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85 drop-shadow-sm">
                {ticket.airline} · PNR {ticket.pnr}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", status.badge)}>
              <span className="size-1.5 rounded-full bg-current" />
              {ticket.status}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-white/85 drop-shadow-sm">
              <CalendarDays className="size-3.5" />
              {ticket.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <div className="text-2xl font-semibold tracking-tight tabular-nums">{ticket.origin.code}</div>
            <div className="text-xs text-muted-foreground">{ticket.origin.city}</div>
            <div className="mt-2 text-sm font-medium tabular-nums">{ticket.departure}</div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 px-2">
            <span className="text-xs text-muted-foreground">{ticket.duration}</span>
            <div className="flex w-full items-center gap-2">
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <PlaneTakeoff className="size-3.5" />
              </div>
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
            </div>
            <span className="text-xs text-muted-foreground">{ticket.flightNumber}</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold tracking-tight tabular-nums">{ticket.destination.code}</div>
            <div className="text-xs text-muted-foreground">{ticket.destination.city}</div>
            <div className="mt-2 text-sm font-medium tabular-nums">{ticket.arrival}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="mb-3 text-sm font-medium">Passenger Information</h3>
        <div className="flex items-center gap-3 rounded-xl border p-3">
          <Avatar className="size-10">
            <AvatarFallback>{initials(ticket.passenger.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{ticket.passenger.name}</div>
            <div className="truncate text-xs text-muted-foreground">
              Passport: {ticket.passenger.passport} · {ticket.passenger.nationality}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InfoRow label="Seat" value={ticket.seat} />
        <InfoRow label="Class" value={ticket.cabinClass} />
        <InfoRow label="Gate" value={ticket.gate} />
        <InfoRow label="Terminal" value={ticket.terminal} />
        <InfoRow label="Aircraft" value={ticket.aircraft} />
        <InfoRow label="Duration" value={ticket.duration} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function FlightTab({ ticket }: { ticket: Ticket }) {
  const rows: [string, string][] = [
    ["Flight number", ticket.flightNumber],
    ["Airline", ticket.airline],
    ["Route", `${ticket.origin.code} → ${ticket.destination.code}`],
    ["Date", ticket.date],
    ["Departure", `${ticket.departure} (${ticket.origin.city})`],
    ["Arrival", `${ticket.arrival} (${ticket.destination.city})`],
    ["Duration", ticket.duration],
    ["Aircraft", ticket.aircraft],
    ["Gate", ticket.gate],
    ["Terminal", ticket.terminal],
  ];

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {rows.map(([label, value]) => (
        <InfoRow key={label} label={label} value={value} />
      ))}
    </div>
  );
}

function PaymentTab({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InfoRow label="Fare" value={`$${ticket.fare}`} />
        <InfoRow label="Taxes & fees" value={`$${ticket.taxes}`} />
        <InfoRow label="Total amount" value={`$${ticket.amount}`} />
        <InfoRow label="Payment method" value={ticket.paymentMethod} />
        <InfoRow label="Payment date" value={ticket.paymentDate} />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Payment status</span>
          <Badge variant="outline" className="w-fit gap-1.5 border-border bg-muted text-foreground">
            {ticket.paymentStatus}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="overflow-hidden rounded-xl border">
        <div
          className={cn("flex items-center justify-between px-4 py-2.5 text-white", airlineStyles[ticket.airlineCode])}
        >
          <span className="text-sm font-semibold">{ticket.airline}</span>
          <QrCode className="size-5" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          <div>
            <div className="text-xs text-muted-foreground">Passenger</div>
            <div className="truncate text-sm font-medium">{ticket.passenger.name}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">PNR</div>
            <div className="text-sm font-medium">{ticket.pnr}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Flight</div>
            <div className="text-sm font-medium">{ticket.flightNumber}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Date</div>
            <div className="text-sm font-medium">{ticket.date}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Gate</div>
            <div className="text-sm font-medium">{ticket.gate}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Seat</div>
            <div className="text-sm font-medium">{ticket.seat}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex flex-col">
      {ticket.history.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
            {index < ticket.history.length - 1 && <span className="w-px flex-1 bg-border" />}
          </div>
          <div className={cn("flex flex-col gap-0.5", index < ticket.history.length - 1 && "pb-5")}>
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

export function TicketDetails({ ticket }: { ticket: Ticket | null }) {
  if (!ticket) {
    return <EmptyTicketDetails />;
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <HeroPanel ticket={ticket} />

      <CardContent className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Armchair className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Seat / Class</div>
              <div className="truncate text-sm font-medium">
                {ticket.seat} · {ticket.cabinClass}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <User className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Passengers</div>
              <div className="truncate text-sm font-medium">{ticket.passenger.paxCount}</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start" variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flight">Flight</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-5">
            <OverviewTab ticket={ticket} />
          </TabsContent>
          <TabsContent value="flight" className="mt-5">
            <FlightTab ticket={ticket} />
          </TabsContent>
          <TabsContent value="payment" className="mt-5">
            <PaymentTab ticket={ticket} />
          </TabsContent>
          <TabsContent value="history" className="mt-5">
            <HistoryTab ticket={ticket} />
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1">
            <Download data-icon="inline-start" />
            Download
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail data-icon="inline-start" />
            Email Ticket
          </Button>
          <Button variant="outline" size="icon" aria-label="More actions">
            <MoreHorizontal />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
