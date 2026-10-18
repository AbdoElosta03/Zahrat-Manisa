"use client";

import { T, V } from "@/i18n/t";
import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Download, HeartHandshake, Plane, Plus, Search, SlidersHorizontal, Sparkles, UsersRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dataTableFeatures } from "@/lib/data-table-features";
import { getInitials } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-provider";

import { filters, type CustomerRow } from "./data";
import { usersColumns } from "./users-columns";
import { UsersTable } from "./users-table";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function CustomerSummary({ customers }: { customers: CustomerRow[] }) {
  const vipCustomers = customers.filter((customer) => customer.status === "VIP");
  const activeCustomers = customers.filter((customer) => customer.status === "Active" || customer.status === "VIP");
  const totalSpend = customers.reduce((sum, customer) => sum + customer.totalSpend, 0);
  const totalBookings = customers.reduce((sum, customer) => sum + customer.bookings, 0);
  const averageSatisfaction = Math.round(
    customers.reduce((sum, customer) => sum + customer.satisfaction, 0) / customers.length,
  );
  const topCustomer = [...customers].sort((a, b) => b.totalSpend - a.totalSpend)[0];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="relative isolate min-h-56 gap-0 overflow-hidden py-0">
        <img
          src="/images/customers-hero.png"
          alt=""
          crossOrigin="anonymous"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-black/20 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,black_34%,transparent_100%)]" />

        <CardContent className="flex h-full flex-col justify-between gap-8 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Badge variant="outline" className="w-fit gap-1.5 border-white/20 bg-white/10 text-white">
                <Sparkles className="size-3" />
                <T id="customers.travelerLoyalty" />
              </Badge>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white"><T id="customers.customers" /></h2>
              <p className="max-w-lg text-sm text-white/85">
                <T id="customers.trackTravelerValuePreferencesLoyaltyTiersAndUpcomingTripOpportunities" />
              </p>
            </div>

            <AvatarGroup>
              {vipCustomers.slice(0, 3).map((customer) => (
                <Avatar key={customer.id} size="lg">
                  <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                </Avatar>
              ))}
              {vipCustomers.length > 3 ? <AvatarGroupCount>+{vipCustomers.length - 3}</AvatarGroupCount> : null}
            </AvatarGroup>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
              <div className="text-xs text-white/70"><T id="customers.activeTravelers" /></div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{activeCustomers.length}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
              <div className="text-xs text-white/70"><T id="customers.bookings" /></div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{totalBookings}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
              <div className="text-xs text-white/70"><T id="customers.customerValue" /></div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{formatCurrency(totalSpend)}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
              <div className="text-xs text-white/70"><T id="customers.satisfaction" /></div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{averageSatisfaction}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardContent className="flex h-full flex-col gap-5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm text-muted-foreground"><T id="customers.highestValueTraveler" /></div>
              <div className="mt-1 text-xl font-semibold">{topCustomer.name}</div>
            </div>
            <div className="grid size-11 place-items-center rounded-xl bg-brand-sea/10 text-brand-sea">
              <HeartHandshake className="size-5" />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-xl border p-3">
              <div>
                <div className="text-xs text-muted-foreground"><T id="customers.favoriteDestination" /></div>
                <div className="text-sm font-medium"><V scope="customers" text={topCustomer.favoriteDestination} /></div>
              </div>
              <Plane className="size-4 text-brand-sea" />
            </div>
            <div className="flex items-center justify-between rounded-xl border p-3">
              <div>
                <div className="text-xs text-muted-foreground"><T id="customers.lifetimeValue" /></div>
                <div className="text-sm font-medium tabular-nums">{formatCurrency(topCustomer.totalSpend)}</div>
              </div>
              <Badge variant="secondary"><V scope="customers" text={topCustomer.tier} /></Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border p-3">
              <div>
                <div className="text-xs text-muted-foreground"><T id="customers.nextTrip" /></div>
                <div className="text-sm font-medium">{topCustomer.nextTrip}</div>
              </div>
              <Badge variant="outline"><V scope="customers" text={topCustomer.interest} /></Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Users({ users }: { users: CustomerRow[] }) {
  const { t } = useLanguage();
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "totalSpend", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
    segment: false,
  });
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useTable({
    features: dataTableFeatures,
    data: users,
    columns: usersColumns,
    state: {
      rowSelection,
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  const searchQuery = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";
  const tierFilter = (table.getColumn("tier")?.getFilterValue() as string | undefined) ?? filters.tier[0];
  const segmentFilter = (table.getColumn("segment")?.getFilterValue() as string | undefined) ?? filters.segment[0];
  const statusFilter = (table.getColumn("status")?.getFilterValue() as string | undefined) ?? filters.status[0];
  const interestFilter = (table.getColumn("interest")?.getFilterValue() as string | undefined) ?? filters.interest[0];
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  function setColumnSelectFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);
    table.setPageIndex(0);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight"><T id="customers.customers" /></h1>
          <p className="text-sm text-muted-foreground"><T id="customers.manageTravelerProfilesLoyaltyValueAndTripPreferences" /></p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            <T id="customers.export" />
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            <T id="customers.addCustomer" />
          </Button>
        </div>
      </div>

      <CustomerSummary customers={users} />

      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none"><T id="customers.travelerDirectory" /></CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            <T id="customers.searchFilterAndSegmentCustomersByTravelBehaviorAndLoyaltyProfile" />
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-7 w-full md:w-72">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-7"
                placeholder={t("common.searchCustomers")}
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
              <InputGroupAddon align="inline-end">
                <Kbd className="h-4 text-[10px]"><T id="customers.k" /></Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Button variant="outline" size="sm">
              <SlidersHorizontal data-icon="inline-start" />
              <T id="customers.filters" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={tierFilter} onValueChange={(value) => setColumnSelectFilter("tier", value)}>
                <SelectTrigger size="sm">
                  <span className="text-muted-foreground"><T id="customers.tier" /></span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {filters.tier.map((option) => (
                      <SelectItem key={option} value={option}>
                        <V scope="customers" text={option} />
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={segmentFilter} onValueChange={(value) => setColumnSelectFilter("segment", value)}>
                <SelectTrigger size="sm">
                  <span className="text-muted-foreground"><T id="customers.segment" /></span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {filters.segment.map((option) => (
                      <SelectItem key={option} value={option}>
                        <V scope="customers" text={option} />
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => setColumnSelectFilter("status", value)}>
                <SelectTrigger size="sm">
                  <span className="text-muted-foreground"><T id="customers.status" /></span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectGroup>
                    {filters.status.map((option) => (
                      <SelectItem key={option} value={option}>
                        <V scope="customers" text={option} />
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Select value={interestFilter} onValueChange={(value) => setColumnSelectFilter("interest", value)}>
              <SelectTrigger size="sm">
                <span className="text-muted-foreground"><T id="customers.interest" /></span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                <SelectGroup>
                  {filters.interest.map((option) => (
                    <SelectItem key={option} value={option}>
                      <V scope="customers" text={option} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-3 px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersRound className="size-4" />
              <span className="tabular-nums">{selectedCount} <T id="customers.selected" /></span>
            </div>
          </div>

          <UsersTable table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
