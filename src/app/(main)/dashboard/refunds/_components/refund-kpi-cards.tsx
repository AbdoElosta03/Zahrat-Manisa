import { T, V } from "@/i18n/t";
import type { ComponentType } from "react";

import { cn } from "cn";
import { AlertTriangle, Banknote, CheckCircle2, Clock3 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { RefundCase } from "./refunds-data";

type FocusStat = {
  id: string;
  label: string;
  value: number;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

function buildFocusStats(cases: RefundCase[]): FocusStat[] {
  const pendingApproval = cases.filter((item) => item.status === "Pending" || item.status === "Approved").length;
  const processing = cases.filter((item) => item.status === "Processing").length;
  const completed = cases.filter((item) => item.status === "Completed").length;
  const exceptions = cases.filter((item) => item.status === "Failed" || item.status === "Rejected").length;

  return [
    {
      id: "pending",
      label: "Awaiting payout",
      value: pendingApproval,
      helper: "approved or pending finance action",
      icon: Clock3,
      accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      id: "processing",
      label: "Processing",
      value: processing,
      helper: "gateway or bank in progress",
      icon: Banknote,
      accent: "bg-brand-sea/10 text-brand-sea",
    },
    {
      id: "completed",
      label: "Completed",
      value: completed,
      helper: "funds returned to traveler",
      icon: CheckCircle2,
      accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "exceptions",
      label: "Exceptions",
      value: exceptions,
      helper: "failed or rejected payouts",
      icon: AlertTriangle,
      accent: "bg-destructive/10 text-destructive",
    },
  ];
}

export function RefundKpiCards({ cases }: { cases: RefundCase[] }) {
  const stats = buildFocusStats(cases);

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-4!">
        <CardTitle>
          <T id="refunds.operationsSnapshot" />
        </CardTitle>
        <CardDescription>
          <T id="refunds.liveCountsFromTheRefundQueueMock" />
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
                    <V scope="refunds" text={stat.label} />
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <V scope="refunds" text={stat.helper} />
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
