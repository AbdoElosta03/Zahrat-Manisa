export type CancellationStatus =
  | "Requested"
  | "In review"
  | "Sent to airline"
  | "Cancelled"
  | "Rejected"
  | "Closed";

export type RefundLinkStatus = "None" | "Pending" | "Linked to refunds" | "Completed";

export type CancellationInitiator = "Customer" | "Support" | "Admin" | "Airline";

export type CancellationUrgency = "Urgent" | "Normal";

export type Airport = {
  code: string;
  city: string;
};

export type CancellationEvent = {
  id: string;
  time: string;
  label: string;
  description: string;
};

export type CancellationRequest = {
  id: string;
  bookingRef: string;
  pnr: string;
  traveler: string;
  route: string;
  origin: Airport;
  destination: Airport;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureDate: string;
  departureTime: string;
  requestDate: string;
  initiator: CancellationInitiator;
  reason: string;
  status: CancellationStatus;
  refundStatus: RefundLinkStatus;
  assignedAgent: string;
  age: string;
  urgency: CancellationUrgency;
  fareDisplay: string;
  timeline: CancellationEvent[];
};

export type CancellationFilter =
  | "all"
  | "requested"
  | "in review"
  | "sent to airline"
  | "cancelled"
  | "rejected"
  | "closed";

export const cancellationFilters: CancellationFilter[] = [
  "all",
  "requested",
  "in review",
  "sent to airline",
  "cancelled",
  "rejected",
  "closed",
];

export const statusStyles: Record<CancellationStatus, { badge: string }> = {
  Requested: { badge: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  "In review": { badge: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  "Sent to airline": { badge: "border-brand-sea/20 bg-brand-sea/10 text-brand-sea" },
  Cancelled: { badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Rejected: { badge: "border-destructive/20 bg-destructive/10 text-destructive" },
  Closed: { badge: "border-border bg-muted text-muted-foreground" },
};

export const refundStatusStyles: Record<RefundLinkStatus, { badge: string }> = {
  None: { badge: "border-border bg-muted text-muted-foreground" },
  Pending: { badge: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  "Linked to refunds": { badge: "border-brand-sea/20 bg-brand-sea/10 text-brand-sea" },
  Completed: { badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
};

export const urgencyStyles: Record<CancellationUrgency, string> = {
  Urgent: "border-destructive/20 bg-destructive/10 text-destructive",
  Normal: "border-border bg-muted text-muted-foreground",
};

export const airlineStyles: Record<string, string> = {
  TK: "bg-red-600 text-white",
  LH: "bg-blue-900 text-white",
  EK: "bg-red-700 text-white",
  QR: "bg-purple-900 text-white",
  MS: "bg-blue-700 text-white",
  PC: "bg-amber-500 text-amber-950",
};

function buildTimeline(status: CancellationStatus, id: string): CancellationEvent[] {
  const base: CancellationEvent[] = [
    {
      id: `${id}-1`,
      time: "2 hours ago",
      label: "Cancellation requested",
      description: "travelerSubmittedCancellationRequest",
    },
    {
      id: `${id}-2`,
      time: "1 hour ago",
      label: "Assigned to operations",
      description: "caseRoutedToTravelDesk",
    },
  ];

  if (status === "In review" || status === "Sent to airline" || status === "Cancelled" || status === "Closed") {
    base.push({
      id: `${id}-3`,
      time: "45 minutes ago",
      label: "Under review",
      description: "agentVerifiedBookingDetails",
    });
  }

  if (status === "Sent to airline" || status === "Cancelled" || status === "Closed") {
    base.push({
      id: `${id}-4`,
      time: "20 minutes ago",
      label: "Sent to airline",
      description: "voidRequestSubmittedToGds",
    });
  }

  if (status === "Cancelled" || status === "Closed") {
    base.push({
      id: `${id}-5`,
      time: "8 minutes ago",
      label: "Booking cancelled",
      description: "pnrVoidConfirmed",
    });
  }

  if (status === "Rejected") {
    base.push({
      id: `${id}-3`,
      time: "30 minutes ago",
      label: "Request rejected",
      description: "nonRefundableFareNotice",
    });
  }

  return base;
}

export const cancellationRequests: CancellationRequest[] = [
  {
    id: "CAN-1042",
    bookingRef: "BKG-78291",
    pnr: "M7K2P9",
    traveler: "Amina Karaman",
    route: "Antalya → Istanbul",
    origin: { code: "AYT", city: "Antalya" },
    destination: { code: "IST", city: "Istanbul" },
    flightNumber: "PC 2184",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    departureDate: "Oct 6, 2026",
    departureTime: "14:35",
    requestDate: "Oct 5, 2026",
    initiator: "Customer",
    reason: "Schedule change — cannot travel on selected date",
    status: "In review",
    refundStatus: "Pending",
    assignedAgent: "Nadia Elmasri",
    age: "2h 14m",
    urgency: "Urgent",
    fareDisplay: "Refundable (estimate pending)",
    timeline: buildTimeline("In review", "CAN-1042"),
  },
  {
    id: "CAN-1041",
    bookingRef: "BKG-78104",
    pnr: "QR8H3L",
    traveler: "Omar Haddad",
    route: "Tripoli → Doha",
    origin: { code: "TIP", city: "Tripoli" },
    destination: { code: "DOH", city: "Doha" },
    flightNumber: "QR 402",
    airline: "Qatar Airways",
    airlineCode: "QR",
    departureDate: "Oct 7, 2026",
    departureTime: "09:15",
    requestDate: "Oct 5, 2026",
    initiator: "Support",
    reason: "Medical documentation provided",
    status: "Sent to airline",
    refundStatus: "Linked to refunds",
    assignedAgent: "Can Ersoy",
    age: "5h 02m",
    urgency: "Normal",
    fareDisplay: "Partial refund — airline rules apply",
    timeline: buildTimeline("Sent to airline", "CAN-1041"),
  },
  {
    id: "CAN-1040",
    bookingRef: "BKG-77988",
    pnr: "TK5N1W",
    traveler: "Sara Benali",
    route: "Paris → Tunis",
    origin: { code: "CDG", city: "Paris" },
    destination: { code: "TUN", city: "Tunis" },
    flightNumber: "TK 1834",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    departureDate: "Oct 12, 2026",
    departureTime: "11:40",
    requestDate: "Oct 4, 2026",
    initiator: "Customer",
    reason: "Duplicate booking",
    status: "Cancelled",
    refundStatus: "Completed",
    assignedAgent: "Elif Sahin",
    age: "1d 3h",
    urgency: "Normal",
    fareDisplay: "Full refund initiated",
    timeline: buildTimeline("Cancelled", "CAN-1040"),
  },
  {
    id: "CAN-1039",
    bookingRef: "BKG-77812",
    pnr: "LH2C9M",
    traveler: "Leyla Demir",
    route: "Izmir → Frankfurt",
    origin: { code: "ADB", city: "Izmir" },
    destination: { code: "FRA", city: "Frankfurt" },
    flightNumber: "LH 1302",
    airline: "Lufthansa",
    airlineCode: "LH",
    departureDate: "Oct 5, 2026",
    departureTime: "18:20",
    requestDate: "Oct 5, 2026",
    initiator: "Admin",
    reason: "Operational rebooking — flight retimed",
    status: "Requested",
    refundStatus: "None",
    assignedAgent: "Murat Aydin",
    age: "38m",
    urgency: "Urgent",
    fareDisplay: "Not assessed",
    timeline: buildTimeline("Requested", "CAN-1039"),
  },
  {
    id: "CAN-1038",
    bookingRef: "BKG-77655",
    pnr: "EK7P4R",
    traveler: "Tarek Mansour",
    route: "Doha → Istanbul",
    origin: { code: "DOH", city: "Doha" },
    destination: { code: "IST", city: "Istanbul" },
    flightNumber: "EK 121",
    airline: "Emirates",
    airlineCode: "EK",
    departureDate: "Oct 8, 2026",
    departureTime: "02:10",
    requestDate: "Oct 3, 2026",
    initiator: "Customer",
    reason: "Visa not approved in time",
    status: "Rejected",
    refundStatus: "None",
    assignedAgent: "Rima Ozkan",
    age: "2d 6h",
    urgency: "Normal",
    fareDisplay: "Non-refundable fare",
    timeline: buildTimeline("Rejected", "CAN-1038"),
  },
  {
    id: "CAN-1037",
    bookingRef: "BKG-77501",
    pnr: "MS3K8T",
    traveler: "Youssef Alami",
    route: "Cairo → Antalya",
    origin: { code: "CAI", city: "Cairo" },
    destination: { code: "AYT", city: "Antalya" },
    flightNumber: "MS 758",
    airline: "EgyptAir",
    airlineCode: "MS",
    departureDate: "Oct 9, 2026",
    departureTime: "16:05",
    requestDate: "Oct 2, 2026",
    initiator: "Airline",
    reason: "Schedule cancellation by carrier",
    status: "Closed",
    refundStatus: "Completed",
    assignedAgent: "Nadia Elmasri",
    age: "3d 1h",
    urgency: "Normal",
    fareDisplay: "Auto-refund per carrier policy",
    timeline: buildTimeline("Closed", "CAN-1037"),
  },
  {
    id: "CAN-1036",
    bookingRef: "BKG-77444",
    pnr: "PC9M2K",
    traveler: "Hana Souissi",
    route: "Istanbul → Antalya",
    origin: { code: "SAW", city: "Istanbul" },
    destination: { code: "AYT", city: "Antalya" },
    flightNumber: "PC 2001",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    departureDate: "Oct 6, 2026",
    departureTime: "07:50",
    requestDate: "Oct 5, 2026",
    initiator: "Customer",
    reason: "Family emergency",
    status: "Requested",
    refundStatus: "None",
    assignedAgent: "Can Ersoy",
    age: "4h 11m",
    urgency: "Urgent",
    fareDisplay: "Not assessed",
    timeline: buildTimeline("Requested", "CAN-1036"),
  },
];
