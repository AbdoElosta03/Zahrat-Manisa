"use client";

import { T, V } from "@/i18n/t";
import Link from "next/link";

import { cn } from "cn";
import {
  ArrowUpRight,
  Ban,
  Banknote,
  Check,
  Mail,
  PlaneTakeoff,
  RotateCcw,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/language-provider";
import { getInitials } from "@/lib/utils";

import { airlineStyles, type RefundCase, statusStyles, typeStyles } from "./refunds-data";

function EmptyRefundDetails() {
  return (
    <Card className="grid h-full place-items-center p-4">
      <Empty>
        <EmptyMedia variant="icon">
          <RotateCcw />
        </EmptyMedia>
        <EmptyTitle>
          <T id="refunds.selectARefund" />
        </EmptyTitle>
        <EmptyDescription>
          <T id="refunds.chooseARefundFromTheQueueToReviewPayoutTimelineAndActions" />
        </EmptyDescription>
      </Empty>
    </Card>
  );
}

function HeroPanel({ refundCase }: { refundCase: RefundCase }) {
  const status = statusStyles[refundCase.status];
  const { formatCurrency } = useLanguage();

  return (
    <div className="relative isolate min-h-52 overflow-hidden rounded-t-xl border-b">
      <img
        src="/images/flight-hero-clouds.png"
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-sea/10 via-black/15 to-background/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 via-background/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,black_30%,transparent_100%)]" />

      <div className="flex h-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold shadow-sm",
                airlineStyles[refundCase.airlineCode],
              )}
            >
              {refundCase.airlineCode}
            </div>
            <div>
              <h2 className="text-lg leading-none font-semibold text-white drop-shadow-sm">{refundCase.id}</h2>
              <p className="mt-1 text-sm text-white/85 drop-shadow-sm">
                {refundCase.bookingRef} · PNR {refundCase.pnr}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", status.badge)}>
              <span className="size-1.5 rounded-full bg-current" />
              <V scope="refunds" text={refundCase.status} />
            </Badge>
            <Badge variant="outline" className={cn("gap-1.5 backdrop-blur-sm", typeStyles[refundCase.type])}>
              <V scope="refunds" text={refundCase.type} />
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs text-muted-foreground">
              <T id="refunds.refundAmount" />
            </div>
            <div className="text-3xl font-semibold tracking-tight tabular-nums text-white drop-shadow-sm">
              {formatCurrency(refundCase.amount)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl font-semibold tracking-tight tabular-nums">{refundCase.origin.code}</div>
              <div className="text-xs text-muted-foreground">
                <V scope="refunds" text={refundCase.origin.city} />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-2 px-2">
              <div className="flex w-full items-center gap-2">
                <span className="h-px flex-1 border-t border-dashed border-primary/40" />
                <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <PlaneTakeoff className="size-3.5" />
                </div>
                <span className="h-px flex-1 border-t border-dashed border-primary/40" />
              </div>
              <span className="text-xs text-muted-foreground">{refundCase.flightNumber}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold tracking-tight tabular-nums">{refundCase.destination.code}</div>
              <div className="text-xs text-muted-foreground">
                <V scope="refunds" text={refundCase.destination.city} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ refundCase }: { refundCase: RefundCase }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="mb-3 text-sm font-medium">
          <T id="refunds.travelerAndAssignment" />
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <Avatar className="size-10">
              <AvatarFallback>{getInitials(refundCase.traveler)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{refundCase.traveler}</div>
              <div className="truncate text-xs text-muted-foreground">{t(`refunds.${refundCase.reasonKey}`)}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
              <User className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="refunds.financeOwner" />
              </div>
              <div className="truncate text-sm font-medium">{refundCase.assignedAgent}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">
            <T id="refunds.payoutMethod" />
          </span>
          <span className="font-medium">
            <V scope="refunds" text={refundCase.method} />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">
            <T id="refunds.caseAge" />
          </span>
          <span className="font-medium">{refundCase.age}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/dashboard/bookings">
            <T id="refunds.openBooking" />
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
        {refundCase.linkedCancellation ? (
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/dashboard/cancellations">
              <T id="refunds.openCancellation" />
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function TimelineTab({ refundCase }: { refundCase: RefundCase }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {refundCase.timeline.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
            {index < refundCase.timeline.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
          </div>
          <div className={cn("flex flex-col gap-0.5", index < refundCase.timeline.length - 1 && "pb-5")}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{t(`refunds.${event.labelKey}`)}</span>
              <span className="text-xs text-muted-foreground">· {t(`refunds.${event.timeKey}`)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t(`refunds.${event.descriptionKey}`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RefundDetails({ refundCase }: { refundCase: RefundCase | null }) {
  if (!refundCase) {
    return <EmptyRefundDetails />;
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <HeroPanel refundCase={refundCase} />

      <CardContent className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Banknote className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="refunds.method" />
              </div>
              <div className="truncate text-sm font-medium">
                <V scope="refunds" text={refundCase.method} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <RotateCcw className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">
                <T id="refunds.linkedCancellation" />
              </div>
              <div className="truncate text-sm font-medium">{refundCase.linkedCancellation ?? "—"}</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start" variant="line">
            <TabsTrigger value="overview">
              <T id="refunds.overview" />
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <T id="refunds.timeline" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-5">
            <OverviewTab refundCase={refundCase} />
          </TabsContent>
          <TabsContent value="timeline" className="mt-5">
            <TimelineTab refundCase={refundCase} />
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" type="button">
              <Check data-icon="inline-start" />
              <T id="refunds.approvePayout" />
            </Button>
            <Button variant="outline" className="flex-1" type="button">
              <Ban data-icon="inline-start" />
              <T id="refunds.rejectRefund" />
            </Button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" className="flex-1" type="button">
              <Banknote data-icon="inline-start" />
              <T id="refunds.markProcessing" />
            </Button>
            <Button variant="outline" className="flex-1" type="button">
              <Mail data-icon="inline-start" />
              <T id="refunds.notifyTraveler" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
