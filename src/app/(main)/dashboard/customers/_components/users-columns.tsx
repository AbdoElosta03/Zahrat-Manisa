"use client";

import { T, V } from "@/i18n/t";
import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { cn } from "cn";
import { ArrowUpRight, MoreHorizontal, Plane, Star } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { getInitials } from "@/lib/utils";

import { statusMeta, type CustomerRow } from "./data";

function StatusBadge({ status }: { status: CustomerRow["status"] }) {
  const meta = statusMeta[status];

  return (
    <Badge className={cn("gap-1.5 border px-2 py-1 font-medium", meta.badgeClass)} variant="outline">
      <span className={cn("size-1.5 rounded-full", meta.dotClass)} />
      <V scope="customers" text={status} />
    </Badge>
  );
}

function CustomerCell({ customer }: { customer: CustomerRow }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg" className="font-medium">
        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
        <AvatarBadge className={customer.status === "VIP" ? "bg-brand-sea" : "bg-muted-foreground"}>
          {customer.status === "VIP" ? <Star /> : null}
        </AvatarBadge>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-foreground">{customer.name}</div>
        <div className="truncate text-sm text-muted-foreground">{customer.email}</div>
      </div>
    </div>
  );
}

function DestinationCell({ customer }: { customer: CustomerRow }) {
  return (
    <div className="grid gap-0.5">
      <span className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium">
        <Plane className="size-3.5 text-brand-sea" />
        <V scope="customers" text={customer.favoriteDestination} />
      </span>
      <span className="text-xs text-muted-foreground"><T id="customers.next" /> {customer.nextTrip}</span>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const usersColumns: ColumnDef<DataTableFeatures, CustomerRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Subscribe
          source={table.atoms.rowSelection}
          selector={() =>
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() && "indeterminate")
          }
        >
          {(checked) => (
            <Checkbox
              aria-label="Select all customers"
              checked={checked}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
          )}
        </Subscribe>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Subscribe source={row.table.atoms.rowSelection} selector={(selection) => Boolean(selection?.[row.id])}>
          {(checked) => (
            <Checkbox
              aria-label={`Select ${row.original.name}`}
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
    id: "search",
    accessorFn: (row) =>
      `${row.name} ${row.email} ${row.phone} ${row.favoriteDestination} ${row.segment} ${row.interest}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: () => <V scope="customers" text="Customer" />,
    cell: ({ row }) => <CustomerCell customer={row.original} />,
  },
  {
    accessorKey: "tier",
    header: () => <V scope="customers" text="Tier / Segment" />,
    filterFn: "equalsString",
    cell: ({ row }) => (
      <div className="grid gap-0.5">
        <span className="whitespace-nowrap text-sm font-medium"><V scope="customers" text={row.original.tier} /></span>
        <span className="text-xs text-muted-foreground"><V scope="customers" text={row.original.segment} /></span>
      </div>
    ),
  },
  {
    accessorKey: "segment",
    header: () => <V scope="customers" text="Segment" />,
    filterFn: "equalsString",
    cell: ({ row }) => <span className="text-sm"><V scope="customers" text={row.original.segment} /></span>,
  },
  {
    accessorKey: "favoriteDestination",
    header: () => <V scope="customers" text="Travel profile" />,
    cell: ({ row }) => <DestinationCell customer={row.original} />,
  },
  {
    accessorKey: "interest",
    header: () => <V scope="customers" text="Interest" />,
    filterFn: "equalsString",
    cell: ({ row }) => <Badge variant="secondary"><V scope="customers" text={row.original.interest} /></Badge>,
  },
  {
    accessorKey: "status",
    header: () => <V scope="customers" text="Status" />,
    filterFn: "equalsString",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "bookings",
    header: () => <V scope="customers" text="Bookings" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.bookings}</span>,
  },
  {
    accessorKey: "totalSpend",
    header: () => <V scope="customers" text="Total spend" />,
    cell: ({ row }) => <span className="font-medium tabular-nums">{formatCurrency(row.original.totalSpend)}</span>,
  },
  {
    accessorKey: "lastTrip",
    header: () => <V scope="customers" text="Last trip" />,
    cell: ({ row }) => <span className="text-sm">{row.original.lastTrip}</span>,
  },
  {
    id: "actions",
    header: () => <div className="text-right"><T id="customers.actions" /></div>,
    cell: ({ row }) => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={`Open actions for ${row.original.name}`}
              className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
              size="icon-sm"
              variant="ghost"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <T id="customers.viewProfile" />
                <ArrowUpRight data-icon="inline-end" />
              </DropdownMenuItem>
              <DropdownMenuItem><T id="customers.createBooking" /></DropdownMenuItem>
              <DropdownMenuItem><T id="customers.sendOffer" /></DropdownMenuItem>
              <DropdownMenuItem><T id="customers.addFollowUp" /></DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive"><T id="customers.markAsAtRisk" /></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
