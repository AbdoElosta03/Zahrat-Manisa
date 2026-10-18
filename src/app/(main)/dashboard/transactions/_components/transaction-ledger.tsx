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
import { Search } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dataTableFeatures } from "@/lib/data-table-features";
import { useLanguage } from "@/i18n/language-provider";

import { transactionColumns } from "./transaction-columns";
import { transactionFilters, transactionRows } from "./transactions-data";
import { TransactionsTable } from "./transactions-table";

export function TransactionLedger() {
  const { t } = useLanguage();
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "id", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
  });
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useTable({
    features: dataTableFeatures,
    data: transactionRows,
    columns: transactionColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  const searchQuery = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";
  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string | undefined) ?? transactionFilters.status[0];
  const typeFilter = (table.getColumn("type")?.getFilterValue() as string | undefined) ?? transactionFilters.type[0];
  const methodFilter =
    (table.getColumn("method")?.getFilterValue() as string | undefined) ?? transactionFilters.method[0];

  function setColumnSelectFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);
    table.setPageIndex(0);
  }

  return (
    <Card>
      <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle><T id="transactions.transactionLedger" /></CardTitle>
        <CardDescription><T id="transactions.searchAndFilterBookingPaymentsRefundsAndSettlementMovement" /></CardDescription>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <InputGroup className="h-7 w-full md:w-72">
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              className="h-7"
              placeholder={t("common.searchTransactions")}
              value={searchQuery}
              onChange={(event) => {
                table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                table.setPageIndex(0);
              }}
            />
          </InputGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <Select value={statusFilter} onValueChange={(value) => setColumnSelectFilter("status", value)}>
            <SelectTrigger size="sm">
              <span className="text-muted-foreground"><T id="transactions.status" /></span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              <SelectGroup>
                {transactionFilters.status.map((option) => (
                  <SelectItem key={option} value={option}>
                    <V scope="transactions" text={option} />
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value) => setColumnSelectFilter("type", value)}>
            <SelectTrigger size="sm">
              <span className="text-muted-foreground"><T id="transactions.type" /></span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              <SelectGroup>
                {transactionFilters.type.map((option) => (
                  <SelectItem key={option} value={option}>
                    <V scope="transactions" text={option} />
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={(value) => setColumnSelectFilter("method", value)}>
            <SelectTrigger size="sm">
              <span className="text-muted-foreground"><T id="transactions.method" /></span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="start">
              <SelectGroup>
                {transactionFilters.method.map((option) => (
                  <SelectItem key={option} value={option}>
                    <V scope="transactions" text={option} />
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <TransactionsTable table={table} />
      </CardContent>
    </Card>
  );
}
