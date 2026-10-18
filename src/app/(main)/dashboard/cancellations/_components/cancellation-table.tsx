"use client";

import { T, V } from "@/i18n/t";
import * as React from "react";

import { cn } from "cn";
import { ChevronRight, RotateCcw, Search, XCircle } from "lucide-react";

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
  type CancellationFilter,
  type CancellationRequest,
  cancellationFilters,
  refundStatusStyles,
  statusStyles,
  urgencyStyles,
} from "./cancellations-data";

const PAGE_SIZE = 5;

function filterLabel(filter: CancellationFilter): string {
  if (filter === "all") return "All";
  if (filter === "in review") return "In review";
  if (filter === "sent to airline") return "Sent to airline";
  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

function matchesFilter(item: CancellationRequest, tab: CancellationFilter): boolean {
  if (tab === "all") return true;
  return item.status.toLowerCase() === tab;
}

type CancellationTableProps = {
  requests: CancellationRequest[];
  selectedRequestId: string | null;
  onSelectRequest: (requestId: string) => void;
};

export function CancellationTable({ requests, selectedRequestId, onSelectRequest }: CancellationTableProps) {
  const { t } = useLanguage();
  const [tab, setTab] = React.useState<CancellationFilter>("all");
  const [query, setQuery] = React.useState("");
  const [urgency, setUrgency] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const counts = React.useMemo(
    () =>
      cancellationFilters.reduce(
        (acc, filter) => {
          acc[filter] =
            filter === "all" ? requests.length : requests.filter((item) => matchesFilter(item, filter)).length;
          return acc;
        },
        {} as Record<CancellationFilter, number>,
      ),
    [requests],
  );

  const filtered = React.useMemo(() => {
    return requests.filter((item) => {
      const matchesTab = matchesFilter(item, tab);
      const matchesUrgency = urgency === "all" || item.urgency.toLowerCase() === urgency;
      const haystack =
        `${item.id} ${item.bookingRef} ${item.pnr} ${item.traveler} ${item.route} ${item.flightNumber}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesTab && matchesUrgency && matchesQuery;
    });
  }, [requests, tab, urgency, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setTab("all");
    setQuery("");
    setUrgency("all");
    setPage(1);
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-col gap-4 border-b py-4!">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as CancellationFilter);
            setPage(1);
          }}
        >
          <TabsList className="w-full flex-wrap justify-start" variant="line">
            {cancellationFilters.map((filter) => (
              <TabsTrigger key={filter} className="text-xs" value={filter}>
                <V scope="cancellations" text={filterLabel(filter)} /> ({counts[filter]})
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
              aria-label={t("cancellations.searchCancellations")}
              placeholder={t("cancellations.searchCancellations")}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select
            value={urgency}
            onValueChange={(value) => {
              setUrgency(value);
              setPage(1);
            }}
          >
            <SelectTrigger size="sm" className="w-full sm:w-44">
              <SelectValue placeholder={t("cancellations.urgency")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <T id="cancellations.allUrgency" />
              </SelectItem>
              <SelectItem value="urgent">
                <V scope="cancellations" text="Urgent" />
              </SelectItem>
              <SelectItem value="normal">
                <V scope="cancellations" text="Normal" />
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" className="sm:ml-auto" onClick={resetFilters}>
            <RotateCcw data-icon="inline-start" />
            <T id="cancellations.reset" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {paginated.length === 0 ? (
          <div className="p-8">
            <Empty>
              <EmptyMedia variant="icon">
                <XCircle />
              </EmptyMedia>
              <EmptyTitle>
                <T id="cancellations.noRequestsFound" />
              </EmptyTitle>
              <EmptyDescription>
                <T id="cancellations.tryAdjustingYourSearchOrFilters" />
              </EmptyDescription>
            </Empty>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <T id="cancellations.request" />
                  </TableHead>
                  <TableHead>
                    <T id="cancellations.traveler" />
                  </TableHead>
                  <TableHead>
                    <T id="cancellations.route" />
                  </TableHead>
                  <TableHead>
                    <T id="cancellations.departure" />
                  </TableHead>
                  <TableHead>
                    <T id="cancellations.status" />
                  </TableHead>
                  <TableHead>
                    <T id="cancellations.refund" />
                  </TableHead>
                  <TableHead className="text-right">
                    <T id="cancellations.age" />
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((item) => {
                  const status = statusStyles[item.status];
                  const refund = refundStatusStyles[item.refundStatus];
                  const active = item.id === selectedRequestId;

                  return (
                    <TableRow
                      key={item.id}
                      data-state={active ? "selected" : undefined}
                      className="cursor-pointer"
                      onClick={() => onSelectRequest(item.id)}
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
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{item.traveler}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              <V scope="cancellations" text={item.initiator} />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium tabular-nums">
                          {item.origin.code} → {item.destination.code}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.flightNumber}</div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                        {item.departureDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5">
                          <Badge variant="outline" className={cn("w-fit gap-1.5 text-xs", status.badge)}>
                            <span className="size-1.5 rounded-full bg-current" />
                            <V scope="cancellations" text={item.status} />
                          </Badge>
                          {item.urgency === "Urgent" ? (
                            <Badge variant="outline" className={cn("w-fit text-[10px]", urgencyStyles.Urgent)}>
                              <V scope="cancellations" text="Urgent" />
                            </Badge>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1.5 text-xs", refund.badge)}>
                          <V scope="cancellations" text={item.refundStatus} />
                        </Badge>
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
            <T id="cancellations.showing" /> {(currentPage - 1) * PAGE_SIZE + 1} <T id="cancellations.to" />{" "}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} <T id="cancellations.of" /> {filtered.length}{" "}
            <T id="cancellations.requests" />
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
