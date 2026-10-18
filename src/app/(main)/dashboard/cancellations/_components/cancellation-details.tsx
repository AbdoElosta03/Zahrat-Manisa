"use client";

import { T, V } from "@/i18n/t";
import Link from "next/link";

import { cn } from "cn";
import {
  ArrowUpRight,
  Ban,
  CalendarDays,
  Check,
  Mail,
  PlaneTakeoff,
  RotateCcw,
  Send,
  User,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials } from "@/lib/utils";

import {
  airlineStyles,
  type CancellationRequest,
  refundStatusStyles,
  statusStyles,
} from "./cancellations-data";

function EmptyCancellationDetails() {
  return (
    <Card className="grid h-full place-items-center p-4">
      <Empty>
        <EmptyMedia variant="icon">
          <XCircle />
        </EmptyMedia>
        <EmptyTitle>
          <T id="cancellations.selectARequest" />
        </EmptyTitle>
        <EmptyDescription>
          <T id="cancellations.chooseARequestFromTheQueueToReviewBookingTimelineAndActions" />
        </EmptyDescription>
      </Empty>
    </Card>
  );
}

function HeroPanel({ request }: { request: CancellationRequest }) {
  const status = statusStyles[request.status];
  const refund = refundStatusStyles[request.refundStatus];

  return (
    <div className="relative isolate min-h-52 overflow-hidden rounded-t-xl border-b">
      <img
        src="/images/flight-hero-clouds.png"
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-sea/10 via-black/15 to-background/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 via-background/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_100%)]" />

      <div className="flex h-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold shadow-sm",
                airlineStyles[request.airlineCode],
              )}
            >
              {request.airlineCode}
            </div>
            <div>
              <h2 className="text-lg leading-none font-semibold text-white drop-shadow-sm">{request.id}</h2>
              <p className="mt-1 text-sm text-white/85 drop-shadow-sm">
                {request.bookingRef} · PNR {request.pnr}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", status.badge)}>
              <span className="size-1.5 rounded-full bg-current" />
              <V scope="cancellations" text={request.status} />
            </Badge>
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", refund.badge)}>
              <V scope="cancellations" text={request.refundStatus} />
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <div className="text-2xl font-semibold tracking-tight tabular-nums">{request.origin.code}</div>
            <div className="text-xs text-muted-foreground">
              <V scope="cancellations" text={request.origin.city} />
            </div>
            <div className="mt-2 text-sm font-medium tabular-nums">{request.departureTime}</div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 px-2">
            <span className="text-xs text-muted-foreground">{request.departureDate}</span>
            <div className="flex w-full items-center gap-2">
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <PlaneTakeoff className="size-3.5" />
              </div>
              <span className="h-px flex-1 border-t border-dashed border-primary/40" />
            </div>
            <span className="text-xs text-muted-foreground">{request.flightNumber}</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold tracking-tight tabular-nums">{request.destination.code}</div>
            <div className="text-xs text-muted-foreground">
              <V scope="cancellations" text={request.destination.city} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">
        <V scope="cancellations" text={label} />
      </span>
      <span className="text-sm font-medium">
        <V scope="cancellations" text={value} />
      </span>
    </div>
  );
}

function OverviewTab({ request }: { request: CancellationRequest }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="mb-3 text-sm font-medium">
          <T id="cancellations.travelerAndAgent" />
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <Avatar className="size-10">
              <AvatarFallback>{getInitials(request.traveler)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{request.traveler}</div>
              <div className="truncate text-xs text-muted-foreground">
                <V scope="cancellations" text={request.reason} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
              <User className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="cancellations.assignedAgent" />
              </div>
              <div className="truncate text-sm font-medium">{request.assignedAgent}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <InfoRow label="Requested on" value={request.requestDate} />
        <InfoRow label="Initiator" value={request.initiator} />
        <InfoRow label="Fare handling" value={request.fareDisplay} />
        <InfoRow label="Case age" value={request.age} />
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/dashboard/bookings">
          <T id="cancellations.openBooking" />
          <ArrowUpRight data-icon="inline-end" />
        </Link>
      </Button>
    </div>
  );
}

function TimelineTab({ request }: { request: CancellationRequest }) {
  return (
    <div className="flex flex-col">
      {request.timeline.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
            {index < request.timeline.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
          </div>
          <div className={cn("flex flex-col gap-0.5", index < request.timeline.length - 1 && "pb-5")}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">
                <V scope="cancellations" text={event.label} />
              </span>
              <span className="text-xs text-muted-foreground">
                · <V scope="cancellations" text={event.time} />
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              <V scope="cancellations" text={event.description} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CancellationDetails({ request }: { request: CancellationRequest | null }) {
  if (!request) {
    return <EmptyCancellationDetails />;
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <HeroPanel request={request} />

      <CardContent className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <CalendarDays className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="cancellations.departure" />
              </div>
              <div className="truncate text-sm font-medium">{request.departureDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <RotateCcw className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="cancellations.refund" />
              </div>
              <div className="truncate text-sm font-medium">
                <V scope="cancellations" text={request.refundStatus} />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start" variant="line">
            <TabsTrigger value="overview">
              <T id="cancellations.overview" />
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <T id="cancellations.timeline" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-5">
            <OverviewTab request={request} />
          </TabsContent>
          <TabsContent value="timeline" className="mt-5">
            <TimelineTab request={request} />
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" type="button">
              <Check data-icon="inline-start" />
              <T id="cancellations.approveRequest" />
            </Button>
            <Button variant="outline" className="flex-1" type="button">
              <Ban data-icon="inline-start" />
              <T id="cancellations.rejectRequest" />
            </Button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" className="flex-1" type="button">
              <Send data-icon="inline-start" />
              <T id="cancellations.sendToAirline" />
            </Button>
            <Button variant="outline" className="flex-1" type="button">
              <Mail data-icon="inline-start" />
              <T id="cancellations.notifyTraveler" />
            </Button>
          </div>
          <Button variant="outline" type="button">
            <RotateCcw data-icon="inline-start" />
            <T id="cancellations.linkToRefundsDesk" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
