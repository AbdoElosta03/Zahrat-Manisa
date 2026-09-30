"use client";

import Link from "next/link";

import { format, parseISO } from "date-fns";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { BookingDraft } from "./types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function ConfirmationStep({
  bookingId,
  draft,
  onCreateAnother,
}: {
  bookingId: string;
  draft: BookingDraft;
  onCreateAnother: () => void;
}) {
  const { traveler, trip, passengers, discount, taxesFees, paidAmount } = draft;
  const subtotal = (trip?.price ?? 0) * passengers.length;
  const total = Math.max(0, subtotal - discount + taxesFees);
  const remaining = Math.max(0, total - paidAmount);

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-8" />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">Booking created</h2>
        <p className="text-muted-foreground text-sm">
          {bookingId} has been created for {traveler?.name}.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-3 p-4 text-left text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="font-medium">{bookingId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trip</span>
            <span className="font-medium">{trip?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Departure</span>
            <span className="font-medium">{trip ? format(parseISO(trip.departureDate), "d MMM yyyy") : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Passengers</span>
            <span className="font-medium">{passengers.length}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-muted-foreground">Total amount</span>
            <span className="font-semibold tabular-nums">{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Remaining balance</span>
            <span className="tabular-nums">{formatCurrency(remaining)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Button asChild>
          <Link href="/dashboard/bookings">View bookings</Link>
        </Button>
        <Button variant="outline" onClick={onCreateAnother}>
          Create another booking
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/default">Return to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
