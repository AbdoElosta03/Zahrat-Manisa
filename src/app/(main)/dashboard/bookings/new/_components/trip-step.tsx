"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

import { format, parseISO } from "date-fns";
import { Check, MapPin, Search, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { TripOption } from "./types";

const statusConfig: Record<TripOption["status"], { label: string; className: string }> = {
  open: { label: "Open", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  "filling-fast": { label: "Filling fast", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  full: { label: "Full", className: "bg-red-500/10 text-red-600 dark:text-red-400" },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

export function TripStep({
  trips,
  selected,
  onSelect,
}: {
  trips: TripOption[];
  selected: TripOption | null;
  onSelect: (trip: TripOption) => void;
}) {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("all");

  const destinations = useMemo(() => Array.from(new Set(trips.map((trip) => trip.destination))), [trips]);

  const filtered = trips.filter((trip) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 || trip.name.toLowerCase().includes(query) || trip.destination.toLowerCase().includes(query);
    const matchesDestination = destination === "all" || trip.destination === destination;
    return matchesSearch && matchesDestination;
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Choose a trip</h2>
        <p className="text-muted-foreground text-sm">Pick the package this booking is for.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search trips or destinations..."
            className="pl-8"
          />
        </div>
        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All destinations</SelectItem>
            {destinations.map((dest) => (
              <SelectItem key={dest} value={dest}>
                {dest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((trip) => {
          const isSelected = selected?.id === trip.id;
          const isFull = trip.status === "full";
          const status = statusConfig[trip.status];

          return (
            <button
              key={trip.id}
              type="button"
              disabled={isFull}
              onClick={() => onSelect(trip)}
              className="text-left disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Card
                className={`gap-0 overflow-hidden py-0 transition-colors ${isSelected ? "border-primary ring-1 ring-primary" : "hover:border-foreground/20"}`}
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.destination}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 320px, 100vw"
                  />
                  <Badge className={`absolute top-2 right-2 ${status.className}`}>{status.label}</Badge>
                  {isSelected ? (
                    <span className="absolute top-2 left-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3.5" />
                    </span>
                  ) : null}
                </div>
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-sm leading-tight">{trip.name}</span>
                    <span className="shrink-0 font-semibold text-sm tabular-nums">{formatCurrency(trip.price)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <MapPin className="size-3" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground text-xs">
                    <span>
                      {format(parseISO(trip.departureDate), "d MMM")} –{" "}
                      {format(parseISO(trip.returnDate), "d MMM yyyy")} &middot; {trip.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      {trip.availableSeats} left
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">Guide: {trip.guide}</span>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
