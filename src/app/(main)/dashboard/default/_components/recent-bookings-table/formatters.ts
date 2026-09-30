import type React from "react";

import type { BookingFilter } from "./schema";

export function formatBookingCount(filter: BookingFilter, count: number) {
  const bookingLabel = count === 1 ? "booking" : "bookings";

  if (filter === "All") {
    return `${count.toLocaleString()} ${bookingLabel}`;
  }

  return `${count.toLocaleString()} ${filter.toLowerCase()} ${bookingLabel}`;
}

export function formatSelectedBookingCount(count: number) {
  const bookingLabel = count === 1 ? "booking" : "bookings";

  return `${count.toLocaleString()} ${bookingLabel} selected`;
}

export function preventPaginationNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}
