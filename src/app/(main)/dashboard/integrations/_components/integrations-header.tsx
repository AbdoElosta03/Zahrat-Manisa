import { Activity, Cable, Plug, RefreshCw, Search, Settings, Webhook } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

import { integrationSummary } from "./integrations-data";

export function IntegrationsHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl sm:leading-none">
              Integrations
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor airline, payment, and messaging connectors — credentials, sync health, and webhook delivery.
            </p>
          </div>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <span className="whitespace-nowrap text-sm text-muted-foreground">Last health check: 45s ago</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm" type="button">
                <RefreshCw />
              </Button>
              <Button variant="outline" size="icon-sm" type="button">
                <Settings />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Plug />
            {integrationSummary.total} Connectors
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            {integrationSummary.connected} Connected
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <span className="size-2 rounded-full bg-amber-500" />
            {integrationSummary.degraded} Degraded
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Webhook />
            {integrationSummary.webhooksActive} Active webhooks
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Activity />
            99.2% Sync success (24h)
          </Badge>
        </div>
      </div>

      <InputGroup className="max-w-xl">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search connector, vendor, or region..." />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘ K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" type="button">
          <Cable data-icon="inline-start" />
          Add connector
        </Button>
        <Button variant="outline" size="sm" type="button">
          Rotate credentials
        </Button>
        <Button variant="outline" size="sm" type="button">
          View webhook logs
        </Button>
      </div>
    </div>
  );
}
