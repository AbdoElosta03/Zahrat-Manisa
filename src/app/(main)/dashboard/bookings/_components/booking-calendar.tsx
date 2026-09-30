"use client";

import { useMemo } from "react";

import Image from "next/image";

import { cn } from "cn";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plane, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { bookingStatusDotStyles } from "./status-badge";
import type { Booking } from "./types";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function BookingCalendar({
  bookings,
  currentMonth,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: {
  bookings: Booking[];
  currentMonth: Date;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onMonthChange: (date: Date) => void;
}) {
  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const booking of bookings) {
      const key = booking.departureDate;
      const existing = map.get(key) ?? [];
      existing.push(booking);
      map.set(key, existing);
    }
    return map;
  }, [bookings]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-lg">{format(currentMonth, "MMMM yyyy")}</span>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onMonthChange(new Date())}>
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            aria-label="Next month"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-muted-foreground text-xs">
        {weekdayLabels.map((label) => (
          <span key={label} className="py-1">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayBookings = bookingsByDate.get(dateKey) ?? [];
          const inMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate === dateKey;
          const primary = dayBookings[0];
          const extraCount = dayBookings.length - 1;
          const travelersTotal = dayBookings.reduce((sum, b) => sum + b.travelersCount, 0);
          const statuses = Array.from(new Set(dayBookings.map((b) => b.bookingStatus)));

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={cn(
                "flex min-h-24 flex-col gap-1 rounded-lg border p-1.5 text-left transition-colors",
                inMonth ? "bg-card" : "bg-muted/30 opacity-50",
                dayBookings.length > 0 && inMonth ? "border-border" : "border-transparent",
                isSelected && "border-primary ring-1 ring-primary",
              )}
            >
              <span
                className={cn(
                  "text-xs tabular-nums",
                  isToday(day)
                    ? "flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {format(day, "d")}
              </span>

              {primary ? (
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={primary.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="truncate font-medium text-xs">{primary.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Users className="size-2.5" />
                      {travelersTotal}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Plane className="size-2.5" />
                      {dayBookings.length}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {statuses.map((status) => (
                        <span
                          key={status}
                          aria-hidden="true"
                          className={cn("size-1.5 rounded-full", bookingStatusDotStyles[status])}
                        />
                      ))}
                    </div>
                    {extraCount > 0 ? (
                      <span className="text-[10px] text-muted-foreground">+{extraCount} more</span>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
