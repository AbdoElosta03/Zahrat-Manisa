import type React from "react";

import type { BookingFilter } from "./schema";

export function formatBookingCount(
  filter: BookingFilter,
  count: number,
  formatNumber: (value: number) => string = (value) => new Intl.NumberFormat("en").format(value),
) {
  const bookingLabel = count === 1 ? "booking" : "bookings";

  if (filter === "All") {
    return `${formatNumber(count)} ${bookingLabel}`;
  }

  return `${formatNumber(count)} ${filter.toLowerCase()} ${bookingLabel}`;
}

export function formatSelectedBookingCount(
  count: number,
  formatNumber: (value: number) => string = (value) => new Intl.NumberFormat("en").format(value),
) {
  const bookingLabel = count === 1 ? "booking" : "bookings";

  return `${formatNumber(count)} ${bookingLabel} selected`;
}

export function preventPaginationNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}
