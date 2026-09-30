"use client";

import Image from "next/image";

import { format, parseISO } from "date-fns";
import { CalendarDays, MapPin, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { BookingDraft } from "./types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function BookingSummary({ draft }: { draft: BookingDraft }) {
  const { traveler, trip, passengers, discount, taxesFees, paidAmount } = draft;
  const subtotal = (trip?.price ?? 0) * passengers.length;
  const total = Math.max(0, subtotal - discount + taxesFees);
  const remaining = Math.max(0, total - paidAmount);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {trip ? (
        <div className="relative h-28 w-full">
          <Image
            src={trip.image || "/placeholder.svg"}
            alt={trip.destination}
            fill
            className="object-cover"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-2 left-3 flex flex-col text-white">
            <span className="font-medium text-sm">{trip.name}</span>
            <span className="flex items-center gap-1 text-white/80 text-xs">
              <MapPin className="size-3" />
              {trip.destination}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-28 w-full items-center justify-center bg-muted text-muted-foreground text-sm">
          No trip selected yet
        </div>
      )}

      <CardContent className="flex flex-col gap-3 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="size-3.5" />
            Traveler
          </span>
          <span className="truncate font-medium">{traveler?.name ?? "Not selected"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="size-3.5" />
            Departure
          </span>
          <span className="font-medium">{trip ? format(parseISO(trip.departureDate), "d MMM yyyy") : "—"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Passengers</span>
          <span className="font-medium">{passengers.length}</span>
        </div>

        <div className="flex flex-col gap-1.5 border-t pt-3">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Remaining balance</span>
            <span className="tabular-nums">{formatCurrency(remaining)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
