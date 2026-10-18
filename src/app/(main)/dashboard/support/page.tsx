import { T, V } from "@/i18n/t";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType } from "react";

import { cn } from "cn";
import {
  ArrowUpRight,
  Clock3,
  Headphones,
  LifeBuoy,
  MessageCircle,
  PhoneCall,
  Plane,
  Plus,
  ShieldCheck,
  TicketCheck,
  TimerReset,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Support | Manisa Travel Admin",
  description: "Manage travel support queues, customer cases, SLA health, and service channels.",
  alternates: {
    canonical: "/dashboard/support",
  },
};

type SupportCase = {
  id: string;
  traveler: string;
  route: string;
  topic: string;
  priority: "Urgent" | "High" | "Normal";
  status: "Open" | "Waiting" | "Escalated" | "Resolved";
  channel: "Chat" | "Phone" | "Email" | "WhatsApp";
  owner: string;
  age: string;
};

type SupportChannel = {
  label: string;
  value: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
};

const supportCases: SupportCase[] = [
  {
    id: "SUP-2481",
    traveler: "Amina Karaman",
    route: "Antalya -> Istanbul",
    topic: "Seat change before departure",
    priority: "High",
    status: "Open",
    channel: "Chat",
    owner: "Nadia",
    age: "12m",
  },
  {
    id: "SUP-2480",
    traveler: "Omar Haddad",
    route: "Tripoli -> Doha",
    topic: "Visa document confirmation",
    priority: "Urgent",
    status: "Escalated",
    channel: "Phone",
    owner: "Can",
    age: "19m",
  },
  {
    id: "SUP-2479",
    traveler: "Sara Benali",
    route: "Paris -> Tunis",
    topic: "Refund timeline update",
    priority: "Normal",
    status: "Waiting",
    channel: "Email",
    owner: "Elif",
    age: "43m",
  },
  {
    id: "SUP-2478",
    traveler: "Leyla Demir",
    route: "Izmir -> Cappadocia",
    topic: "Hotel pickup instructions",
    priority: "Normal",
    status: "Resolved",
    channel: "WhatsApp",
    owner: "Murat",
    age: "1h 08m",
  },
  {
    id: "SUP-2477",
    traveler: "Tarek Mansour",
    route: "Doha -> Istanbul",
    topic: "Missed connection support",
    priority: "Urgent",
    status: "Open",
    channel: "Chat",
    owner: "Rima",
    age: "8m",
  },
];

const supportChannels: SupportChannel[] = [
  {
    label: "Live chat",
    value: "38",
    helper: "active conversations",
    icon: MessageCircle,
    tone: "bg-brand-sea/10 text-brand-sea",
  },
  {
    label: "Phone desk",
    value: "12",
    helper: "calls in queue",
    icon: PhoneCall,
    tone: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Travel desk",
    value: "18",
    helper: "flight-related cases",
    icon: Plane,
    tone: "bg-sky-500/10 text-sky-600",
  },
];

const priorityStyles: Record<SupportCase["priority"], string> = {
  Urgent: "border-destructive/20 bg-destructive/10 text-destructive",
  High: "border-amber-500/20 bg-amber-500/10 text-amber-600",
  Normal: "border-border bg-muted text-muted-foreground",
};

const statusStyles: Record<SupportCase["status"], string> = {
  Open: "border-brand-sea/20 bg-brand-sea/10 text-brand-sea",
  Waiting: "border-amber-500/20 bg-amber-500/10 text-amber-600",
  Escalated: "border-destructive/20 bg-destructive/10 text-destructive",
  Resolved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
};

function SupportHero() {
  return (
    <Card className="relative isolate min-h-72 gap-0 overflow-hidden py-0">
      <img
        src="/images/support-hero.png"
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-black/20 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,black_34%,transparent_100%)]" />

      <CardContent className="flex min-h-72 flex-col justify-between gap-8 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex max-w-2xl flex-col gap-3">
            <Badge variant="outline" className="w-fit gap-1.5 border-white/20 bg-white/10 text-white">
              <LifeBuoy />
              <T id="support.travelSupportHub" />
            </Badge>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white"><T id="support.support" /></h1>
              <p className="max-w-xl text-sm text-white/85">
                <T id="support.keepTravelIssuesMovingAcrossChatCallsAndEscalationsBeforeTheyAffectDepartures" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="secondary">
              <Link href="/chat" prefetch={false} target="_blank" rel="noreferrer">
                <T id="support.openChat" />
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button>
              <Plus data-icon="inline-start" />
              <T id="support.newCase" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
            <div className="text-xs text-white/70"><T id="support.openCases" /></div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">86</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
            <div className="text-xs text-white/70"><T id="support.firstResponse" /></div>
            <div className="mt-1 text-2xl font-semibold tabular-nums"><T id="support.2m18s" /></div>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
            <div className="text-xs text-white/70"><T id="support.slaHealth" /></div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">94%</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/25 p-3 text-white shadow-sm backdrop-blur-sm">
            <div className="text-xs text-white/70"><T id="support.departingToday" /></div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">31</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChannelCards() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {supportChannels.map((channel) => {
        const Icon = channel.icon;

        return (
          <Card key={channel.label} className="gap-0 py-0">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl", channel.tone)}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-medium"><V scope="support" text={channel.label} /></div>
                  <div className="text-xs text-muted-foreground"><V scope="support" text={channel.helper} /></div>
                </div>
              </div>
              <div className="text-2xl font-semibold tabular-nums">{channel.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function QueueTable() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-1">
          <CardTitle><T id="support.priorityQueue" /></CardTitle>
          <CardDescription><T id="support.liveTravelCasesThatNeedActionFromSupportAgents" /></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4"><T id="support.case" /></TableHead>
              <TableHead><T id="support.traveler" /></TableHead>
              <TableHead><T id="support.route" /></TableHead>
              <TableHead><T id="support.priority" /></TableHead>
              <TableHead><T id="support.status" /></TableHead>
              <TableHead className="text-right"><T id="support.age" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supportCases.map((supportCase) => (
              <TableRow key={supportCase.id}>
                <TableCell className="px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{supportCase.id}</span>
                    <span className="text-xs text-muted-foreground"><V scope="support" text={supportCase.topic} /></span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>{getInitials(supportCase.traveler)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{supportCase.traveler}</span>
                  </div>
                </TableCell>
                <TableCell><V scope="support" text={supportCase.route} /></TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityStyles[supportCase.priority]}>
                    <V scope="support" text={supportCase.priority} />
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[supportCase.status]}>
                    <V scope="support" text={supportCase.status} />
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{supportCase.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SupportHealth() {
  const agents = ["Nadia Elmasri", "Can Ersoy", "Elif Sahin", "Rima Ozkan", "Murat Aydin"];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle><T id="support.serviceHealth" /></CardTitle>
          <CardDescription><T id="support.coverageAcrossTravelSupportQueues" /></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4 rounded-xl border p-3">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="text-sm font-medium"><T id="support.slaProtected" /></div>
                <div className="text-xs text-muted-foreground"><T id="support.81Of86CasesAreInsideTarget" /></div>
              </div>
            </div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              94%
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground"><T id="support.queueLoad" /></span>
              <span className="font-medium tabular-nums">68%</span>
            </div>
            <Progress value={68} />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium"><T id="support.agentsOnline" /></div>
              <div className="text-xs text-muted-foreground"><T id="support.travelDeskAndRefundsDesk" /></div>
            </div>
            <AvatarGroup>
              {agents.slice(0, 4).map((agent) => (
                <Avatar key={agent}>
                  <AvatarFallback>{getInitials(agent)}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+{agents.length - 4}</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle><T id="support.todaySFocus" /></CardTitle>
          <CardDescription><T id="support.whatSupportShouldResolveBeforePeakDepartures" /></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <TimerReset className="size-4 text-amber-600" />
            <div>
              <div className="text-sm font-medium"><T id="support.rebookDelayedPassengers" /></div>
              <div className="text-xs text-muted-foreground"><T id="support.6HighPriorityCasesTiedToMissedConnections" /></div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <TicketCheck className="size-4 text-brand-sea" />
            <div>
              <div className="text-sm font-medium"><T id="support.confirmTicketChanges" /></div>
              <div className="text-xs text-muted-foreground"><T id="support.12TravelersNeedUpdatedItineraryMessages" /></div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <Clock3 className="size-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium"><T id="support.clearWaitingReplies" /></div>
              <div className="text-xs text-muted-foreground"><T id="support.oldestPendingCustomerReplyIs43Minutes" /></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight"><T id="support.support" /></h1>
          <p className="text-sm text-muted-foreground">
            <T id="support.manageCustomerConversationsDisruptedTripsAndTravelDeskEscalations" />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Headphones data-icon="inline-start" />
            <T id="support.assignAgents" />
          </Button>
          <Button>
            <LifeBuoy data-icon="inline-start" />
            <T id="support.createCase" />
          </Button>
        </div>
      </div>

      <SupportHero />
      <ChannelCards />

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <QueueTable />
        <SupportHealth />
      </div>
    </div>
  );
}
