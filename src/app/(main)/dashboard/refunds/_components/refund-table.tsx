"use client";

import { T, V } from "@/i18n/t";
import * as React from "react";

import { cn } from "cn";
import { ChevronRight, RotateCcw, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/language-provider";
import { getInitials } from "@/lib/utils";

import {
  airlineStyles,
  type RefundCase,
  type RefundFilter,
  refundFilters,
  statusStyles,
  typeStyles,
} from "./refunds-data";

const PAGE_SIZE = 5;

function filterLabel(filter: RefundFilter): string {
  if (filter === "all") return "All";
  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

function matchesFilter(item: RefundCase, tab: RefundFilter): boolean {
  if (tab === "all") return true;
  return item.status.toLowerCase() === tab;
}

type RefundTableProps = {
  cases: RefundCase[];
  selectedRefundId: string | null;
  onSelectRefund: (refundId: string) => void;
};

export function RefundTable({ cases, selectedRefundId, onSelectRefund }: RefundTableProps) {
  const { t, formatCurrency } = useLanguage();
  const [tab, setTab] = React.useState<RefundFilter>("all");
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const counts = React.useMemo(
    () =>
      refundFilters.reduce(
        (acc, filter) => {
          acc[filter] =
            filter === "all" ? cases.length : cases.filter((item) => matchesFilter(item, filter)).length;
          return acc;
        },
        {} as Record<RefundFilter, number>,
      ),
    [cases],
  );

  const filtered = React.useMemo(() => {
    return cases.filter((item) => {
      const matchesTab = matchesFilter(item, tab);
      const matchesType = typeFilter === "all" || item.type.toLowerCase() === typeFilter;
      const haystack =
        `${item.id} ${item.bookingRef} ${item.pnr} ${item.traveler} ${item.route} ${item.flightNumber}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesTab && matchesType && matchesQuery;
    });
  }, [cases, tab, typeFilter, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setTab("all");
    setQuery("");
    setTypeFilter("all");
    setPage(1);
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-col gap-4 border-b py-4!">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as RefundFilter);
            setPage(1);
          }}
        >
          <TabsList className="w-full flex-wrap justify-start" variant="line">
            {refundFilters.map((filter) => (
              <TabsTrigger key={filter} className="text-xs" value={filter}>
                <V scope="refunds" text={filterLabel(filter)} /> ({counts[filter]})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <InputGroup className="h-9 sm:max-w-sm">
            <InputGroupInput
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              aria-label={t("refunds.searchRefunds")}
              placeholder={t("refunds.searchRefunds")}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger size="sm" className="w-full sm:w-44">
              <SelectValue placeholder={t("refunds.refundType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <T id="refunds.allTypes" />
              </SelectItem>
              <SelectItem value="full">
                <V scope="refunds" text="Full" />
              </SelectItem>
              <SelectItem value="partial">
                <V scope="refunds" text="Partial" />
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" className="sm:ml-auto" onClick={resetFilters}>
            <RotateCcw data-icon="inline-start" />
            <T id="refunds.reset" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {paginated.length === 0 ? (
          <div className="p-8">
            <Empty>
              <EmptyMedia variant="icon">
                <RotateCcw />
              </EmptyMedia>
              <EmptyTitle>
                <T id="refunds.noRefundsFound" />
              </EmptyTitle>
              <EmptyDescription>
                <T id="refunds.tryAdjustingYourSearchOrFilters" />
              </EmptyDescription>
            </Empty>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <T id="refunds.refund" />
                  </TableHead>
                  <TableHead>
                    <T id="refunds.traveler" />
                  </TableHead>
                  <TableHead className="text-right">
                    <T id="refunds.amount" />
                  </TableHead>
                  <TableHead>
                    <T id="refunds.type" />
                  </TableHead>
                  <TableHead>
                    <T id="refunds.status" />
                  </TableHead>
                  <TableHead>
                    <T id="refunds.method" />
                  </TableHead>
                  <TableHead className="text-right">
                    <T id="refunds.age" />
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((item) => {
                  const status = statusStyles[item.status];
                  const active = item.id === selectedRefundId;

                  return (
                    <TableRow
                      key={item.id}
                      data-state={active ? "selected" : undefined}
                      className="cursor-pointer"
                      onClick={() => onSelectRefund(item.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-lg text-xs font-semibold",
                              airlineStyles[item.airlineCode],
                            )}
                          >
                            {item.airlineCode}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{item.id}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              {item.bookingRef} · PNR {item.pnr}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7">
                            <AvatarFallback className="text-[10px]">{getInitials(item.traveler)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate text-sm font-medium">{item.traveler}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium tabular-nums">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs", typeStyles[item.type])}>
                          <V scope="refunds" text={item.type} />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1.5 text-xs", status.badge)}>
                          <span className="size-1.5 rounded-full bg-current" />
                          <V scope="refunds" text={item.status} />
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <V scope="refunds" text={item.method} />
                      </TableCell>
                      <TableCell className="text-right text-sm tabular-nums text-muted-foreground">{item.age}</TableCell>
                      <TableCell>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {filtered.length > 0 && (
        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground">
            <T id="refunds.showing" /> {(currentPage - 1) * PAGE_SIZE + 1} <T id="refunds.to" />{" "}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} <T id="refunds.of" /> {filtered.length}{" "}
            <T id="refunds.queueItems" />
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((prev) => Math.max(1, prev - 1));
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#"
                    isActive={number === currentPage}
                    onClick={(event) => {
                      event.preventDefault();
                      setPage(number);
                    }}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((prev) => Math.min(pageCount, prev + 1));
                  }}
                  className={currentPage === pageCount ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
}
