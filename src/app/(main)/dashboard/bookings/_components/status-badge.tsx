import { cn } from "cn";

import type { BookingStatus, CalendarEventType, PaymentStatus } from "./types";

const bookingStatusStyles: Record<BookingStatus, string> = {
  confirmed: "border-emerald-600/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "border-amber-600/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  cancelled: "border-rose-600/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const bookingStatusLabels: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
};

export function BookingStatusBadge({ status, className }: { status: BookingStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium",
        bookingStatusStyles[status],
        className,
      )}
    >
      {bookingStatusLabels[status]}
    </span>
  );
}

const paymentStatusStyles: Record<PaymentStatus, string> = {
  paid: "border-emerald-600/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  partial: "border-sky-600/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  unpaid: "border-muted-foreground/20 bg-muted text-muted-foreground",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
  paid: "Paid",
  partial: "Partial",
  unpaid: "Unpaid",
};

export function PaymentStatusBadge({ status, className }: { status: PaymentStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium",
        paymentStatusStyles[status],
        className,
      )}
    >
      {paymentStatusLabels[status]}
    </span>
  );
}

export const eventTypeDotStyles: Record<CalendarEventType, string> = {
  departure: "bg-sky-500",
  return: "bg-violet-500",
};

export const bookingStatusDotStyles: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-500",
  pending: "bg-amber-500",
  cancelled: "bg-rose-500",
};
