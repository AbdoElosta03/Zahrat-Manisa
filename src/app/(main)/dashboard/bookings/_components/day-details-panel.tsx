"use client";

import Image from "next/image";

import { format, parseISO } from "date-fns";
import { CalendarX2, Clock, DollarSign, Plane, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

import { BookingStatusBadge } from "./status-badge";
import type { Booking } from "./types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function DayDetailsPanel({
  selectedDate,
  bookings,
  onViewBooking,
}: {
  selectedDate: string;
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
}) {
  const revenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const travelers = bookings.reduce((sum, booking) => sum + booking.travelersCount, 0);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground text-xs">Selected day</span>
        <span className="font-medium text-lg">{format(parseISO(selectedDate), "EEEE, MMM d yyyy")}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-lg border bg-muted/30 p-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-[11px]">Trips</span>
          <span className="font-medium text-sm tabular-nums">{bookings.length}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-[11px]">Travelers</span>
          <span className="font-medium text-sm tabular-nums">{travelers}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-[11px]">Revenue</span>
          <span className="font-medium text-sm tabular-nums">{formatCurrency(revenue)}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <Empty className="flex-1 border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX2 />
            </EmptyMedia>
            <EmptyTitle>No trips scheduled</EmptyTitle>
            <EmptyDescription>There are no departures or bookings for this day.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-1 flex-col gap-2.5 overflow-auto">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col gap-2.5 rounded-lg border p-3">
              <div className="flex items-start gap-2.5">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.destination}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium text-sm">{booking.tripName}</span>
                    <BookingStatusBadge status={booking.bookingStatus} />
                  </div>
                  <span className="text-muted-foreground text-xs">{booking.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {booking.departureTime}
                </span>
                <span className="flex items-center gap-1">
                  <Plane className="size-3" />
                  {booking.flightNumber}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3" />
                  {formatCurrency(booking.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <AvatarGroup>
                  {booking.travelers.slice(0, 3).map((traveler) => (
                    <Avatar key={traveler.name} size="sm">
                      <AvatarFallback>{traveler.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  {booking.travelersCount > 3 ? (
                    <AvatarGroupCount className="size-6 text-xs">
                      <Users className="size-3" />
                    </AvatarGroupCount>
                  ) : null}
                  <span className="ml-2 self-center text-muted-foreground text-xs">
                    {booking.travelersCount} travelers
                  </span>
                </AvatarGroup>
                <Button variant="outline" size="sm" onClick={() => onViewBooking(booking)}>
                  View details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
