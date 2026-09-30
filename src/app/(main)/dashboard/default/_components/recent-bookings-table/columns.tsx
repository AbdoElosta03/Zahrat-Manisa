import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
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
import type { DataTableFeatures } from "@/lib/data-table-features";

import type { BookingRow } from "./schema";

function formatBookingDate(date: string) {
  return format(parseISO(date), "d MMM yyyy");
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }: { status: BookingRow["status"] }) {
  if (status === "confirmed") {
    return (
      <Badge
        className="border-green-700/25 text-green-700 dark:border-green-300/25 dark:text-green-300"
        variant="outline"
      >
        <span className="size-1.5 rounded-full bg-current" />
        Confirmed
      </Badge>
    );
  }

  if (status === "completed") {
    return (
      <Badge className="border-blue-700/25 text-blue-700 dark:border-blue-300/25 dark:text-blue-300" variant="outline">
        <span className="size-1.5 rounded-full bg-current" />
        Completed
      </Badge>
    );
  }

  if (status === "cancelled") {
    return (
      <Badge variant="destructive">
        <span className="size-1.5 rounded-full bg-current" />
        Cancelled
      </Badge>
    );
  }

  return (
    <Badge
      className="border-yellow-700/25 text-yellow-700 dark:border-yellow-300/25 dark:text-yellow-300"
      variant="outline"
    >
      <span className="size-1.5 rounded-full bg-current" />
      Pending
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
    header: "Booking",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="font-medium leading-none">{row.original.id}</div>
        <div className="text-muted-foreground text-xs">{row.original.packageName}</div>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: "Traveler",
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
    header: "Destination",
  },
  {
    accessorKey: "travelers",
    header: () => <div className="w-16">Pax</div>,
    cell: ({ row }) => <div className="w-16 tabular-nums">{row.original.travelers}</div>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, _columnId, value) => {
      if (value === "All") return true;
      return row.original.status === (value as string).toLowerCase();
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-24">Amount</div>,
    cell: ({ row }) => <div className="w-24 tabular-nums">{formatAmount(row.original.amount)}</div>,
  },
  {
    accessorKey: "travelDate",
    header: () => <div className="w-32">Travel date</div>,
    cell: ({ row }) => <div className="w-32 text-muted-foreground">{formatBookingDate(row.original.travelDate)}</div>,
  },
  {
    id: "actions",
    header: () => <div className="flex w-full justify-end">Actions</div>,
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
          <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>View itinerary</DropdownMenuItem>
            <DropdownMenuItem>Contact traveler</DropdownMenuItem>
            <DropdownMenuItem>Copy booking ID</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
