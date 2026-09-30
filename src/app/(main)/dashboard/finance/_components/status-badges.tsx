import { cn } from "cn";

import { Badge } from "@/components/ui/badge";

import type { RefundStatus, TransactionStatus, UpcomingPaymentStatus } from "./types";

const transactionStatusStyles: Record<TransactionStatus, string> = {
  paid: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  refunded: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const transactionStatusLabels: Record<TransactionStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
};

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", transactionStatusStyles[status])}>
      {transactionStatusLabels[status]}
    </Badge>
  );
}

const upcomingPaymentStatusStyles: Record<UpcomingPaymentStatus, string> = {
  pending: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  partial: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  overdue: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const upcomingPaymentStatusLabels: Record<UpcomingPaymentStatus, string> = {
  pending: "Pending",
  partial: "Partial",
  overdue: "Overdue",
};

export function UpcomingPaymentStatusBadge({ status }: { status: UpcomingPaymentStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", upcomingPaymentStatusStyles[status])}>
      {upcomingPaymentStatusLabels[status]}
    </Badge>
  );
}

const refundStatusStyles: Record<RefundStatus, string> = {
  completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  processing: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const refundStatusLabels: Record<RefundStatus, string> = {
  completed: "Completed",
  processing: "Processing",
  pending: "Pending",
};

export function RefundStatusBadge({ status }: { status: RefundStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", refundStatusStyles[status])}>
      {refundStatusLabels[status]}
    </Badge>
  );
}
