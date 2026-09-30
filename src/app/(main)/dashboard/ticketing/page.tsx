import { CalendarDays, Download, Filter, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { Ticketing } from "./_components/ticketing";

export const metadata: Metadata = {
  title: "Ticketing | Zahrat Manisa",
  description: "Manage issued tickets, passengers, fares and ticket status.",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Ticketing</h1>
          <p className="text-sm text-muted-foreground">Manage issued tickets, passengers, fares and ticket status.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <CalendarDays data-icon="inline-start" />
            Tue, Sep 3, 2026
          </Button>
          <Button variant="outline">
            <Filter data-icon="inline-start" />
            Filter
          </Button>
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Export
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            Issue Ticket
          </Button>
        </div>
      </div>

      <Ticketing />
    </div>
  );
}
