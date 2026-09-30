import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import destinationsData from "./destinations-data.json";

type Destination = {
  id: string;
  city: string;
  country: string;
  image: string;
  bookings: number;
  revenue: number;
  share: number;
};

const destinations = destinationsData as Destination[];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TopDestinations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Top Destinations</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {destinations.length} active packages
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {destinations.map((destination) => (
          <div key={destination.id} className="flex items-center gap-3">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={`${destination.city}, ${destination.country}`}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate font-medium text-sm leading-none">{destination.city}</span>
                <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
                  {formatCurrency(destination.revenue)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={destination.share} className="h-1.5" />
                <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{destination.bookings}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
