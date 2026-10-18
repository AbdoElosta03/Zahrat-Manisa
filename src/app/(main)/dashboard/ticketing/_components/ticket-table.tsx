"use client";

import { T, V } from "@/i18n/t";
import * as React from "react";

import { cn } from "cn";
import { ChevronRight, RotateCcw, Search, Ticket as TicketIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

import { airlineStyles, statusStyles, type Ticket, type TicketFilter, ticketFilters } from "./ticketing-data";

const PAGE_SIZE = 5;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

type TicketTableProps = {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketId: string) => void;
};

export function TicketTable({ tickets, selectedTicketId, onSelectTicket }: TicketTableProps) {
  const { t } = useLanguage();
  const [tab, setTab] = React.useState<TicketFilter>("all");
  const [query, setQuery] = React.useState("");
  const [airline, setAirline] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const airlines = React.useMemo(() => Array.from(new Set(tickets.map((ticket) => ticket.airline))).sort(), [tickets]);

  const counts = React.useMemo(
    () =>
      ticketFilters.reduce(
        (acc, filter) => {
          acc[filter] =
            filter === "all"
              ? tickets.length
              : tickets.filter((ticket) => ticket.status.toLowerCase() === filter).length;
          return acc;
        },
        {} as Record<TicketFilter, number>,
      ),
    [tickets],
  );

  const filtered = React.useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesTab = tab === "all" || ticket.status.toLowerCase() === tab;
      const matchesAirline = airline === "all" || ticket.airline === airline;
      const haystack =
        `${ticket.id} ${ticket.pnr} ${ticket.passenger.name} ${ticket.flightNumber} ${ticket.origin.code} ${ticket.destination.code}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesTab && matchesAirline && matchesQuery;
    });
  }, [tickets, tab, airline, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetFilters() {
    setTab("all");
    setQuery("");
    setAirline("all");
    setPage(1);
  }

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-col gap-4 border-b py-4!">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as TicketFilter);
            setPage(1);
          }}
        >
          <TabsList className="w-full flex-wrap justify-start" variant="line">
            {ticketFilters.map((filter) => (
              <TabsTrigger key={filter} className="text-xs capitalize" value={filter}>
                <V scope="ticketing" text={filter === "all" ? "All" : filter[0].toUpperCase() + filter.slice(1)} /> ({counts[filter]})
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
              aria-label={t("common.searchTickets")}
              placeholder={t("common.searchTickets")}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select
            value={airline}
            onValueChange={(value) => {
              setAirline(value);
              setPage(1);
            }}
          >
            <SelectTrigger size="sm" className="w-full sm:w-44">
              <SelectValue placeholder={t("common.airline")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"><T id="ticketing.allAirlines" /></SelectItem>
              {airlines.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" className="sm:ml-auto" onClick={resetFilters}>
            <RotateCcw data-icon="inline-start" />
            <T id="ticketing.reset" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {paginated.length === 0 ? (
          <div className="p-8">
            <Empty>
              <EmptyMedia variant="icon">
                <TicketIcon />
              </EmptyMedia>
              <EmptyTitle><T id="ticketing.noTicketsFound" /></EmptyTitle>
              <EmptyDescription><T id="ticketing.tryAdjustingYourSearchOrFilters" /></EmptyDescription>
            </Empty>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox aria-label="Select all tickets" />
                  </TableHead>
                  <TableHead><T id="ticketing.ticket" /></TableHead>
                  <TableHead><T id="ticketing.passenger" /></TableHead>
                  <TableHead><T id="ticketing.route" /></TableHead>
                  <TableHead><T id="ticketing.date" /></TableHead>
                  <TableHead className="text-right"><T id="ticketing.amount" /></TableHead>
                  <TableHead><T id="ticketing.status" /></TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((ticket) => {
                  const status = statusStyles[ticket.status];
                  const active = ticket.id === selectedTicketId;

                  return (
                    <TableRow
                      key={ticket.id}
                      data-state={active ? "selected" : undefined}
                      className="cursor-pointer"
                      onClick={() => onSelectTicket(ticket.id)}
                    >
                      <TableCell onClick={(event) => event.stopPropagation()}>
                        <Checkbox aria-label={`Select ticket ${ticket.id}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-lg text-xs font-semibold",
                              airlineStyles[ticket.airlineCode],
                            )}
                          >
                            {ticket.airlineCode}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{ticket.id}</div>
                            <div className="truncate text-xs text-muted-foreground"><T id="ticketing.pnr3" /> {ticket.pnr}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7">
                            <AvatarFallback className="text-[10px]">{initials(ticket.passenger.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{ticket.passenger.name}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              {t("ticketing.passengerCount", { count: ticket.passenger.paxCount })}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium tabular-nums">
                          {ticket.origin.code} → {ticket.destination.code}
                        </div>
                        <div className="text-xs text-muted-foreground">{ticket.flightNumber}</div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap text-muted-foreground">{ticket.date}</TableCell>
                      <TableCell className="text-right text-sm font-medium tabular-nums">${ticket.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1.5 text-xs", status.badge)}>
                          <span className="size-1.5 rounded-full bg-current" />
                          <V scope="ticketing" text={ticket.status} />
                        </Badge>
                      </TableCell>
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
            <T id="ticketing.showing" /> {(currentPage - 1) * PAGE_SIZE + 1} <T id="ticketing.to" /> {Math.min(currentPage * PAGE_SIZE, filtered.length)} <T id="ticketing.of" />{" "}
            {filtered.length} <T id="ticketing.tickets" />
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
