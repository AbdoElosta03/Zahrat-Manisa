import { format, parseISO } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import bookingsData from "./recent-bookings-table/data.json";
import type { BookingRow, BookingStatus } from "./recent-bookings-table/schema";

const recentBookings = (bookingsData as BookingRow[]).slice(0, 5);

const statusVariants: Record<BookingStatus, "default" | "secondary" | "destructive" | "outline"> = {
  confirmed: "default",
  completed: "secondary",
  pending: "outline",
  cancelled: "destructive",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RecentBookingsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Recent Bookings</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          Latest {recentBookings.length} bookings
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {recentBookings.map((booking) => (
          <div key={booking.id} className="flex items-center gap-3 rounded-lg py-2 first:pt-0 last:pb-0">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
              {booking.customer.initials}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate font-medium text-sm leading-none">{booking.customer.name}</span>
                <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{booking.id}</span>
              </div>
              <span className="truncate text-muted-foreground text-xs">
                {booking.destination} · {format(parseISO(booking.travelDate), "d MMM")}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-medium text-sm tabular-nums leading-none">{formatCurrency(booking.amount)}</span>
              <Badge variant={statusVariants[booking.status]} className="px-1.5 py-0 text-[10px] capitalize">
                {booking.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
