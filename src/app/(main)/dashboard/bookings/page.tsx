import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { BookingKpiCards } from "./_components/booking-kpi-cards";
import { BookingsWorkspace } from "./_components/bookings-workspace";

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl tracking-tight">Bookings</h1>
          <p className="text-muted-foreground text-sm">Manage and track all customer bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Export
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            New Booking
          </Button>
        </div>
      </div>

      <BookingKpiCards />

      <BookingsWorkspace />
    </div>
  );
}
