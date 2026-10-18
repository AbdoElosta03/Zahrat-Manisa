import { cn } from "cn";
import {
  ArrowUpDown,
  ChevronDown,
  CircleDashed,
  Copy,
  EllipsisVertical,
  FileText,
  KeyRound,
  Plus,
  RefreshCw,
  Settings,
  Webhook,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { IntegrationGroup, IntegrationHealth, IntegrationRow } from "./integrations-data";

const healthStyles: Record<IntegrationHealth, string> = {
  Connected: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Degraded: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Disconnected: "bg-destructive/10 text-destructive",
};

const envStyles: Record<IntegrationRow["environment"], string> = {
  Production: "bg-brand-sea/10 text-brand-sea",
  Sandbox: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Disabled: "border-border bg-muted text-muted-foreground",
};

export function IntegrationGroups({ groups }: { groups: IntegrationGroup[] }) {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <IntegrationGroupPanel key={group.id} group={group} />
      ))}
    </div>
  );
}

function IntegrationGroupPanel({ group }: { group: IntegrationGroup }) {
  return (
    <Collapsible
      defaultOpen
      className="flex flex-col overflow-hidden rounded-xl border bg-card py-3 text-card-foreground data-[state=open]:gap-3 data-[state=open]:pb-0"
    >
      <div className="flex flex-col gap-2 px-4 sm:flex-row sm:items-center">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="group -ms-2 h-auto w-full justify-start gap-2 px-2 py-1 hover:bg-transparent aria-expanded:bg-transparent sm:flex-1"
          >
            <ChevronDown className="group-data-[state=open]:rotate-180" />
            <div className="flex min-w-0 flex-col gap-0.5 text-start sm:flex-row sm:items-baseline sm:gap-2">
              <span className="shrink-0 font-medium leading-none">{group.category}</span>
              <span className="min-w-0 truncate text-sm text-muted-foreground">{group.subtitle}</span>
            </div>
          </Button>
        </CollapsibleTrigger>
        <div className="flex w-full items-center justify-between gap-2 sm:ms-auto sm:w-auto sm:justify-end">
          <Button variant="ghost" size="sm" type="button">
            <Plus data-icon="inline-start" />
            Add connector
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" type="button">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <RefreshCw />
                  Sync all
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText />
                  View logs
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Category settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy />
                Export status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CollapsibleContent>
        {group.rows.length > 0 ? <IntegrationsTable rows={group.rows} /> : <EmptyGroupState />}
      </CollapsibleContent>
    </Collapsible>
  );
}

function IntegrationsTable({ rows }: { rows: IntegrationRow[] }) {
  return (
    <div className="overflow-x-auto border-t [scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1">
      <Table className="min-w-[1200px] **:data-[slot=table-cell]:px-5 **:data-[slot=table-head]:px-5">
        <TableHeader className="bg-muted/50 [&_tr]:border-y">
          <TableRow>
            <TableHead className="font-medium">
              <span className="inline-flex items-center gap-1">
                Connector <ArrowUpDown className="size-4" />
              </span>
            </TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Health</TableHead>
            <TableHead>Latency</TableHead>
            <TableHead>Last sync</TableHead>
            <TableHead>Auth</TableHead>
            <TableHead>Webhooks</TableHead>
            <TableHead>Region</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium">{row.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{row.vendor}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("rounded-sm px-1.5 py-0.5", envStyles[row.environment])}>
                  {row.environment}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("gap-1.5 rounded-sm px-1.5 py-0.5", healthStyles[row.health])}>
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      row.health === "Connected" && "bg-emerald-500",
                      row.health === "Degraded" && "bg-amber-500",
                      row.health === "Disconnected" && "bg-destructive",
                    )}
                  />
                  {row.health}
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums text-muted-foreground">{row.latency}</TableCell>
              <TableCell className="text-muted-foreground">{row.lastSync}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <KeyRound className="size-4 shrink-0" />
                  {row.auth}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-sm px-1.5 py-0.5",
                    row.webhook === "Active" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    row.webhook === "Paused" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                    row.webhook === "None" && "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {row.webhook}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{row.region}</TableCell>
              <TableCell className="text-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" type="button" className="-me-2">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <RefreshCw />
                        Test connection
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <KeyRound />
                        Rotate secret
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Webhook />
                        Webhook settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText />
                      Open runbook
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyGroupState() {
  return (
    <div className="flex min-h-24 items-center justify-center border-t bg-muted/50 p-4">
      <div className="flex items-center gap-2">
        <CircleDashed className="size-4" />
        <p className="text-sm font-medium">No connectors in this category</p>
      </div>
    </div>
  );
}
