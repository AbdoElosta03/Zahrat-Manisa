"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/language-provider";
import { T, V } from "@/i18n/t";
import type { DataTableFeatures } from "@/lib/data-table-features";

import type { BookingRow } from "./schema";

function BookingAmount({ amount }: { amount: number }) {
  const { formatCurrency } = useI18n();
  return <div className="w-24 tabular-nums">{formatCurrency(amount)}</div>;
}

function BookingDate({ date }: { date: string }) {
  const { formatDate } = useI18n();
  return <div className="w-32 text-muted-foreground">{formatDate(date)}</div>;
}

function StatusBadge({ status }: { status: BookingRow["status"] }) {
  if (status === "confirmed") {
    return (
      <Badge
        className="border-green-700/25 text-green-700 dark:border-green-300/25 dark:text-green-300"
        variant="outline"
      >
        <span className="size-1.5 rounded-full bg-current" />
        <T id="default.confirmed" />
      </Badge>
    );
  }

  if (status === "completed") {
    return (
      <Badge className="border-blue-700/25 text-blue-700 dark:border-blue-300/25 dark:text-blue-300" variant="outline">
        <span className="size-1.5 rounded-full bg-current" />
        <T id="default.completed" />
      </Badge>
    );
  }

  if (status === "cancelled") {
    return (
      <Badge variant="destructive">
        <span className="size-1.5 rounded-full bg-current" />
        <T id="default.cancelled" />
      </Badge>
    );
  }

  return (
    <Badge
      className="border-yellow-700/25 text-yellow-700 dark:border-yellow-300/25 dark:text-yellow-300"
      variant="outline"
    >
      <span className="size-1.5 rounded-full bg-current" />
      <T id="default.pending" />
    </Badge>
  );
}

export const recentBookingsColumns: ColumnDef<DataTableFeatures, BookingRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-10">
        <Subscribe
          source={table.atoms.rowSelection}
          selector={() =>
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() && "indeterminate")
          }
        >
          {(checked) => (
            <Checkbox
              aria-label="Select all bookings"
              checked={checked}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
          )}
        </Subscribe>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-10">
        <Subscribe source={row.table.atoms.rowSelection} selector={(selection) => Boolean(selection?.[row.id])}>
          {(checked) => (
            <Checkbox
              aria-label={`Select booking ${row.original.id}`}
              checked={checked}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          )}
        </Subscribe>
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: () => <V scope="default" text="Booking" />,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="font-medium leading-none">{row.original.id}</div>
        <div className="text-muted-foreground text-xs">
          <V scope="default" text={row.original.packageName} />
        </div>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: () => <V scope="default" text="Traveler" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs">{row.original.customer.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="font-medium leading-none">{row.original.customer.name}</div>
          <div className="text-muted-foreground text-xs">{row.original.customer.email}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: () => <V scope="default" text="Destination" />,
    cell: ({ row }) => <V scope="default" text={row.original.destination} />,
  },
  {
    accessorKey: "travelers",
    header: () => (
      <div className="w-16">
        <T id="default.pax" />
      </div>
    ),
    cell: ({ row }) => <div className="w-16 tabular-nums">{row.original.travelers}</div>,
  },
  {
    id: "status",
    header: () => <V scope="default" text="Status" />,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, _columnId, value) => {
      if (value === "All") return true;
      return row.original.status === (value as string).toLowerCase();
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="w-24">
        <T id="default.amount" />
      </div>
    ),
    cell: ({ row }) => <BookingAmount amount={row.original.amount} />,
  },
  {
    accessorKey: "travelDate",
    header: () => (
      <div className="w-32">
        <T id="default.travelDate" />
      </div>
    ),
    cell: ({ row }) => <BookingDate date={row.original.travelDate} />,
  },
  {
    id: "actions",
    header: () => (
      <div className="flex w-full justify-end">
        <T id="default.actions" />
      </div>
    ),
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-full justify-end">
            <Button aria-label="Open booking actions" size="icon-sm" variant="ghost">
              <MoreHorizontal />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>
            <T id="default.bookingActions" />
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <T id="default.viewItinerary" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <T id="default.contactTraveler" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <T id="default.copyBookingID" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
