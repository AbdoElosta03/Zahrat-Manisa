import Image from "next/image";

import { format, parseISO } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import departuresData from "./departures-data.json";

type Departure = {
  id: string;
  packageName: string;
  destination: string;
  image: string;
  departureDate: string;
  returnDate: string;
  seatsTotal: number;
  seatsBooked: number;
  guide: string;
};

const departures = departuresData as Departure[];

function formatDateRange(start: string, end: string) {
  return `${format(parseISO(start), "d MMM")} – ${format(parseISO(end), "d MMM")}`;
}

export function UpcomingDepartures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Upcoming Departures</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {departures.length} scheduled trips
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View calendar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {departures.map((departure) => {
          const seatsLeft = departure.seatsTotal - departure.seatsBooked;
          const isFull = seatsLeft === 0;
          const isAlmostFull = !isFull && seatsLeft <= 3;

          return (
            <div key={departure.id} className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={departure.image || "/placeholder.svg"}
                  alt={departure.destination}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-medium text-sm leading-none">{departure.packageName}</span>
                <span className="truncate text-muted-foreground text-xs">{departure.destination}</span>
                <span className="text-muted-foreground text-xs">
                  {formatDateRange(departure.departureDate, departure.returnDate)} · {departure.guide}
                </span>
              </div>
              <Badge
                variant={isFull ? "secondary" : "outline"}
                className={
                  isAlmostFull
                    ? "border-yellow-700/25 text-yellow-700 dark:border-yellow-300/25 dark:text-yellow-300"
                    : undefined
                }
              >
                {isFull ? "Full" : `${seatsLeft} left`}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
