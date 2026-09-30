"use client";

import Image from "next/image";

import { format, parseISO } from "date-fns";
import { Banknote, Building2, CreditCard, Pencil, Wallet } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { BookingDraft } from "./types";

const paymentMethodConfig = {
  cash: { label: "Cash", icon: Banknote },
  "bank-transfer": { label: "Bank transfer", icon: Building2 },
  card: { label: "Card", icon: CreditCard },
  other: { label: "Other", icon: Wallet },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function ReviewStep({ draft, onEditStep }: { draft: BookingDraft; onEditStep: (index: number) => void }) {
  const { traveler, trip, passengers, discount, taxesFees, paidAmount, paymentMethod } = draft;
  const subtotal = (trip?.price ?? 0) * passengers.length;
  const total = Math.max(0, subtotal - discount + taxesFees);
  const remaining = Math.max(0, total - paidAmount);
  const PaymentIcon = paymentMethodConfig[paymentMethod].icon;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Review booking</h2>
        <p className="text-muted-foreground text-sm">Confirm everything looks right before creating the booking.</p>
      </div>

      <Card>
        <CardContent className="flex items-start justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{traveler?.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{traveler?.name}</span>
              <span className="text-muted-foreground text-xs">{traveler?.phone}</span>
              <span className="text-muted-foreground text-xs">{traveler?.email}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => onEditStep(0)}>
            <Pencil className="text-muted-foreground" />
            <span className="sr-only">Edit traveler</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="gap-0 overflow-hidden py-0">
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            {trip ? (
              <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={trip.image || "/placeholder.svg"}
                  alt={trip.destination}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{trip?.name}</span>
              <span className="text-muted-foreground text-xs">
                {trip ? format(parseISO(trip.departureDate), "d MMM yyyy") : ""} &middot; {trip?.duration}
              </span>
              <span className="text-muted-foreground text-xs">Guide: {trip?.guide}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => onEditStep(1)}>
            <Pencil className="text-muted-foreground" />
            <span className="sr-only">Edit trip</span>
          </Button>
        </div>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <AvatarGroup>
              {passengers.slice(0, 3).map((passenger) => (
                <Avatar key={passenger.id}>
                  <AvatarFallback>{passenger.initials}</AvatarFallback>
                </Avatar>
              ))}
              {passengers.length > 3 ? <AvatarGroupCount>+{passengers.length - 3}</AvatarGroupCount> : null}
            </AvatarGroup>
            <span className="text-sm">
              {passengers.length} passenger{passengers.length === 1 ? "" : "s"}
            </span>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => onEditStep(2)}>
            <Pencil className="text-muted-foreground" />
            <span className="sr-only">Edit passengers</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm">
              <PaymentIcon className="size-4 text-muted-foreground" />
              {paymentMethodConfig[paymentMethod].label}
            </span>
            <Button variant="ghost" size="icon-sm" onClick={() => onEditStep(3)}>
              <Pencil className="text-muted-foreground" />
              <span className="sr-only">Edit payment</span>
            </Button>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold tabular-nums">{formatCurrency(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Paid now</span>
              <span className="tabular-nums">{formatCurrency(paidAmount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Remaining</span>
              <span className="tabular-nums">{formatCurrency(remaining)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
