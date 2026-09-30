"use client";

import { useMemo, useState } from "react";

import { format } from "date-fns";
import { CalendarDays, List } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookingCalendar } from "./booking-calendar";
import { BookingDetailsDrawer } from "./booking-details-drawer";
import { BookingList } from "./booking-list";
import bookingsData from "./bookings-data.json";
import { DayDetailsPanel } from "./day-details-panel";
import type { Booking } from "./types";

const bookings = bookingsData as Booking[];

export function BookingsWorkspace() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bookingsForSelectedDate = useMemo(
    () => bookings.filter((booking) => booking.departureDate === selectedDate),
    [selectedDate],
  );

  function handleViewBooking(booking: Booking) {
    setActiveBooking(booking);
    setDrawerOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Tabs value={view} onValueChange={(value) => setView(value as "calendar" | "list")}>
          <TabsList>
            <TabsTrigger value="calendar" className="gap-1.5">
              <CalendarDays className="size-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-1.5">
              <List className="size-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {view === "calendar" ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardContent>
                <BookingCalendar
                  bookings={bookings}
                  currentMonth={currentMonth}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onMonthChange={setCurrentMonth}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="h-full">
                <DayDetailsPanel
                  selectedDate={selectedDate}
                  bookings={bookingsForSelectedDate}
                  onViewBooking={handleViewBooking}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent>
              <BookingList bookings={bookings} onViewBooking={handleViewBooking} />
            </CardContent>
          </Card>
        )}
      </div>

      <BookingDetailsDrawer booking={activeBooking} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
