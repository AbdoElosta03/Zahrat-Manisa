"use client";

import { T, V } from "@/i18n/t";
import type { ColumnDef, Row } from "@tanstack/react-table";

import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatCurrency } from "@/lib/utils";

import type { TransactionRow, TransactionStatus } from "./transactions-data";

const statusVariant: Record<TransactionStatus, "secondary" | "outline" | "destructive"> = {
  Approved: "secondary",
  Settled: "secondary",
  Pending: "outline",
  Review: "outline",
  Voided: "destructive",
};

function methodIncludesFilter(row: Row<DataTableFeatures, TransactionRow>, _columnId: string, filterValue: unknown) {
  if (!filterValue || filterValue === "All") {
    return true;
  }

  return row.original.method.toLowerCase().includes(String(filterValue).toLowerCase());
}

export const transactionColumns: ColumnDef<DataTableFeatures, TransactionRow>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.bookingId} ${row.customer} ${row.method} ${row.type} ${row.status}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: () => <V scope="transactions" text="Transaction" />,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.id}</div>
        <div className="text-muted-foreground text-xs">
          {row.original.bookingId} · {row.original.date}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: () => <V scope="transactions" text="Customer" />,
  },
  {
    accessorKey: "type",
    header: () => <V scope="transactions" text="Type" />,
    filterFn: "equalsString",
    cell: ({ row }) => <V scope="transactions" text={row.original.type} />,
  },
  {
    accessorKey: "method",
    header: () => <V scope="transactions" text="Method" />,
    filterFn: methodIncludesFilter,
    cell: ({ row }) => <span className="text-muted-foreground"><V scope="transactions" text={row.original.method} /></span>,
  },
  {
    accessorKey: "risk",
    header: () => <V scope="transactions" text="Risk" />,
    cell: ({ row }) => <Badge variant="outline"><V scope="transactions" text={row.original.risk} /></Badge>,
  },
  {
    accessorKey: "status",
    header: () => <V scope="transactions" text="Status" />,
    filterFn: "equalsString",
    cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}><V scope="transactions" text={row.original.status} /></Badge>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right"><T id="transactions.amount" /></div>,
    cell: ({ row }) => {
      const isNegative = row.original.amount < 0;

      return (
        <div className={cn("text-right font-medium tabular-nums", isNegative ? "text-destructive" : "text-foreground")}>
          {isNegative ? "-" : ""}
          {formatCurrency(Math.abs(row.original.amount), { noDecimals: true })}
        </div>
      );
    },
  },
];
