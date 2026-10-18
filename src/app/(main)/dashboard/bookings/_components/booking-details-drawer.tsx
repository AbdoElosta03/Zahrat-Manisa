"use client";

import { T, V } from "@/i18n/t";
import Image from "next/image";

import { format, parseISO } from "date-fns";
import { CalendarDays, Plane, Users2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import { BookingStatusBadge, PaymentStatusBadge } from "./status-badge";
import type { Booking } from "./types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function BookingDetailsDrawer({
  booking,
  open,
  onOpenChange,
}: {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!booking) return null;

  const balance = booking.amount - booking.paidAmount;
  const extraTravelers = booking.travelersCount - booking.travelers.length;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="overflow-y-auto">
        <div className="relative h-36 w-full shrink-0">
          <Image
            src={booking.image || "/placeholder.svg"}
            alt={booking.destination}
            fill
            className="object-cover"
            sizes="384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        </div>

        <DrawerHeader className="gap-1 text-left">
          <DrawerTitle><V scope="bookings" text={booking.tripName} /></DrawerTitle>
          <DrawerDescription>
            {booking.id} <T id="bookings.middot" /> <V scope="bookings" text={booking.destination} />
          </DrawerDescription>
          <div className="flex items-center gap-2 pt-1">
            <BookingStatusBadge status={booking.bookingStatus} />
            <PaymentStatusBadge status={booking.paymentStatus} />
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-5 px-4 pb-4">
          <div className="grid grid-cols-2 gap-3 rounded-lg border p-3">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <CalendarDays className="size-3.5" />
                <T id="bookings.departure" />
              </span>
              <span className="font-medium text-sm">{format(parseISO(booking.departureDate), "d MMM yyyy")}</span>
              <span className="text-muted-foreground text-xs">{booking.departureTime}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <CalendarDays className="size-3.5" />
                <T id="bookings.return" />
              </span>
              <span className="font-medium text-sm">{format(parseISO(booking.returnDate), "d MMM yyyy")}</span>
              <span className="text-muted-foreground text-xs">{booking.arrivalTime}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs"><T id="bookings.duration" /></span>
              <span className="font-medium text-sm">{booking.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Plane className="size-3.5" />
                <T id="bookings.flight" />
              </span>
              <span className="font-medium text-sm">{booking.flightNumber}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="flex items-center gap-1.5 font-medium text-sm">
              <Users2 className="size-4" />
              <T id="bookings.travelers" />{booking.travelersCount})
            </span>
            <div className="flex flex-col gap-2">
              {booking.travelers.map((traveler) => (
                <div key={traveler.name} className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarFallback>{traveler.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{traveler.name}</span>
                </div>
              ))}
              {extraTravelers > 0 ? (
                <span className="text-muted-foreground text-xs">+{extraTravelers} <T id="bookings.moreTravelers" /></span>
              ) : null}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground"><T id="bookings.totalAmount" /></span>
              <span className="font-medium tabular-nums">{formatCurrency(booking.amount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground"><T id="bookings.paid" /></span>
              <span className="font-medium tabular-nums">{formatCurrency(booking.paidAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground"><T id="bookings.balanceDue" /></span>
              <span className={`font-medium tabular-nums ${balance > 0 ? "text-amber-600 dark:text-amber-400" : ""}`}>
                {formatCurrency(balance)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-muted-foreground text-xs">
            <span><T id="bookings.bookedOn" /> {format(parseISO(booking.bookingDate), "d MMM yyyy")}</span>
            <span>
              {booking.seatsBooked} <T id="bookings.of" /> {booking.seatsTotal} <T id="bookings.seatsReserved" />
            </span>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline"><T id="bookings.close" /></Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
