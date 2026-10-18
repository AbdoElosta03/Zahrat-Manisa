import { T, V } from "@/i18n/t";
import type { ComponentType } from "react";

import { cn } from "cn";
import { AlertTriangle, Clock3, RotateCcw, Send } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { CancellationRequest } from "./cancellations-data";

type FocusStat = {
  id: string;
  label: string;
  value: number;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

function buildFocusStats(requests: CancellationRequest[]): FocusStat[] {
  const pendingReview = requests.filter((item) => item.status === "In review" || item.status === "Requested").length;
  const awaitingAirline = requests.filter((item) => item.status === "Sent to airline").length;
  const urgentDepartures = requests.filter((item) => item.urgency === "Urgent").length;
  const linkedRefunds = requests.filter(
    (item) => item.refundStatus === "Linked to refunds" || item.refundStatus === "Pending",
  ).length;

  return [
    {
      id: "pending",
      label: "Needs review",
      value: pendingReview,
      helper: "requests waiting for operations",
      icon: Clock3,
      accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      id: "airline",
      label: "Awaiting airline",
      value: awaitingAirline,
      helper: "void requests in progress",
      icon: Send,
      accent: "bg-brand-sea/10 text-brand-sea",
    },
    {
      id: "urgent",
      label: "Departures at risk",
      value: urgentDepartures,
      helper: "urgent cases before departure",
      icon: AlertTriangle,
      accent: "bg-destructive/10 text-destructive",
    },
    {
      id: "refunds",
      label: "Refund follow-up",
      value: linkedRefunds,
      helper: "linked or pending with finance",
      icon: RotateCcw,
      accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];
}

export function CancellationKpiCards({ requests }: { requests: CancellationRequest[] }) {
  const stats = buildFocusStats(requests);

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-4!">
        <CardTitle>
          <T id="cancellations.operationsSnapshot" />
        </CardTitle>
        <CardDescription>
          <T id="cancellations.liveCountsFromTheCancellationQueueMock" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex items-start gap-3 rounded-xl border p-3">
                <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl", stat.accent)}>
                  <Icon className="size-5" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-2xl leading-none font-semibold tabular-nums">{stat.value}</span>
                  <span className="text-sm font-medium">
                    <V scope="cancellations" text={stat.label} />
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <V scope="cancellations" text={stat.helper} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
