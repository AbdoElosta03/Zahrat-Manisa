export type RefundStatus = "Pending" | "Approved" | "Processing" | "Completed" | "Failed" | "Rejected";

export type RefundType = "Full" | "Partial";

export type RefundMethod = "Original card" | "Bank transfer" | "Wallet";

export type Airport = {
  code: string;
  city: string;
};

export type RefundEvent = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  timeKey: string;
};

export type RefundCase = {
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
  amount: number;
  type: RefundType;
  status: RefundStatus;
  method: RefundMethod;
  reasonKey: string;
  linkedCancellation: string | null;
  assignedAgent: string;
  age: string;
  timeline: RefundEvent[];
};

export type RefundFilter = "all" | "pending" | "approved" | "processing" | "completed" | "failed" | "rejected";

export const refundFilters: RefundFilter[] = [
  "all",
  "pending",
  "approved",
  "processing",
  "completed",
  "failed",
  "rejected",
];

export const statusStyles: Record<RefundStatus, { badge: string }> = {
  Pending: { badge: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Approved: { badge: "border-brand-sea/20 bg-brand-sea/10 text-brand-sea" },
  Processing: { badge: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  Completed: { badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Failed: { badge: "border-destructive/20 bg-destructive/10 text-destructive" },
  Rejected: { badge: "border-border bg-muted text-muted-foreground" },
};

export const typeStyles: Record<RefundType, string> = {
  Full: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Partial: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export const airlineStyles: Record<string, string> = {
  TK: "bg-red-600 text-white",
  LH: "bg-blue-900 text-white",
  EK: "bg-red-700 text-white",
  QR: "bg-purple-900 text-white",
  MS: "bg-blue-700 text-white",
  PC: "bg-amber-500 text-amber-950",
};

function buildTimeline(status: RefundStatus, id: string): RefundEvent[] {
  const base: RefundEvent[] = [
    {
      id: `${id}-1`,
      timeKey: "time2HoursAgo",
      labelKey: "eventRefundRequested",
      descriptionKey: "descRefundRequested",
    },
    {
      id: `${id}-2`,
      timeKey: "time1HourAgo",
      labelKey: "eventFinanceReview",
      descriptionKey: "descFinanceReview",
    },
  ];

  if (status === "Approved" || status === "Processing" || status === "Completed" || status === "Failed") {
    base.push({
      id: `${id}-3`,
      timeKey: "time45MinAgo",
      labelKey: "eventRefundApproved",
      descriptionKey: "descRefundApproved",
    });
  }

  if (status === "Processing" || status === "Completed" || status === "Failed") {
    base.push({
      id: `${id}-4`,
      timeKey: "time20MinAgo",
      labelKey: "eventPayoutProcessing",
      descriptionKey: "descPayoutProcessing",
    });
  }

  if (status === "Completed") {
    base.push({
      id: `${id}-5`,
      timeKey: "time8MinAgo",
      labelKey: "eventRefundCompleted",
      descriptionKey: "descRefundCompleted",
    });
  }

  if (status === "Failed") {
    base.push({
      id: `${id}-4`,
      timeKey: "time30MinAgo",
      labelKey: "eventPayoutFailed",
      descriptionKey: "descPayoutFailed",
    });
  }

  if (status === "Rejected") {
    base.push({
      id: `${id}-3`,
      timeKey: "time30MinAgo",
      labelKey: "eventRefundRejected",
      descriptionKey: "descRefundRejected",
    });
  }

  return base;
}

export const refundCases: RefundCase[] = [
  {
    id: "REF-2088",
    bookingRef: "BKG-78291",
    pnr: "M7K2P9",
    traveler: "Amina Karaman",
    route: "Antalya → Istanbul",
    origin: { code: "AYT", city: "Antalya" },
    destination: { code: "IST", city: "Istanbul" },
    flightNumber: "PC 2184",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    amount: 420,
    type: "Partial",
    status: "Pending",
    method: "Original card",
    reasonKey: "reasonScheduleChange",
    linkedCancellation: "CAN-1042",
    assignedAgent: "Elif Sahin",
    age: "2h 14m",
    timeline: buildTimeline("Pending", "REF-2088"),
  },
  {
    id: "REF-2087",
    bookingRef: "BKG-78104",
    pnr: "QR8H3L",
    traveler: "Omar Haddad",
    route: "Tripoli → Doha",
    origin: { code: "TIP", city: "Tripoli" },
    destination: { code: "DOH", city: "Doha" },
    flightNumber: "QR 402",
    airline: "Qatar Airways",
    airlineCode: "QR",
    amount: 890,
    type: "Full",
    status: "Processing",
    method: "Bank transfer",
    reasonKey: "reasonMedical",
    linkedCancellation: "CAN-1041",
    assignedAgent: "Can Ersoy",
    age: "5h 02m",
    timeline: buildTimeline("Processing", "REF-2087"),
  },
  {
    id: "REF-2086",
    bookingRef: "BKG-77988",
    pnr: "TK5N1W",
    traveler: "Sara Benali",
    route: "Paris → Tunis",
    origin: { code: "CDG", city: "Paris" },
    destination: { code: "TUN", city: "Tunis" },
    flightNumber: "TK 1834",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    amount: 612,
    type: "Full",
    status: "Completed",
    method: "Original card",
    reasonKey: "reasonDuplicateBooking",
    linkedCancellation: "CAN-1040",
    assignedAgent: "Nadia Elmasri",
    age: "1d 3h",
    timeline: buildTimeline("Completed", "REF-2086"),
  },
  {
    id: "REF-2085",
    bookingRef: "BKG-77812",
    pnr: "LH2C9M",
    traveler: "Leyla Demir",
    route: "Izmir → Frankfurt",
    origin: { code: "ADB", city: "Izmir" },
    destination: { code: "FRA", city: "Frankfurt" },
    flightNumber: "LH 1302",
    airline: "Lufthansa",
    airlineCode: "LH",
    amount: 1180,
    type: "Partial",
    status: "Approved",
    method: "Wallet",
    reasonKey: "reasonOperationalRebook",
    linkedCancellation: "CAN-1039",
    assignedAgent: "Murat Aydin",
    age: "38m",
    timeline: buildTimeline("Approved", "REF-2085"),
  },
  {
    id: "REF-2084",
    bookingRef: "BKG-77655",
    pnr: "EK7P4R",
    traveler: "Tarek Mansour",
    route: "Doha → Istanbul",
    origin: { code: "DOH", city: "Doha" },
    destination: { code: "IST", city: "Istanbul" },
    flightNumber: "EK 121",
    airline: "Emirates",
    airlineCode: "EK",
    amount: 0,
    type: "Full",
    status: "Rejected",
    method: "Original card",
    reasonKey: "reasonNonRefundable",
    linkedCancellation: "CAN-1038",
    assignedAgent: "Rima Ozkan",
    age: "2d 6h",
    timeline: buildTimeline("Rejected", "REF-2084"),
  },
  {
    id: "REF-2083",
    bookingRef: "BKG-77501",
    pnr: "MS3K8T",
    traveler: "Youssef Alami",
    route: "Cairo → Antalya",
    origin: { code: "CAI", city: "Cairo" },
    destination: { code: "AYT", city: "Antalya" },
    flightNumber: "MS 758",
    airline: "EgyptAir",
    airlineCode: "MS",
    amount: 540,
    type: "Full",
    status: "Failed",
    method: "Bank transfer",
    reasonKey: "reasonCarrierCancellation",
    linkedCancellation: "CAN-1037",
    assignedAgent: "Nadia Elmasri",
    age: "3d 1h",
    timeline: buildTimeline("Failed", "REF-2083"),
  },
  {
    id: "REF-2082",
    bookingRef: "BKG-77444",
    pnr: "PC9M2K",
    traveler: "Hana Souissi",
    route: "Istanbul → Antalya",
    origin: { code: "SAW", city: "Istanbul" },
    destination: { code: "AYT", city: "Antalya" },
    flightNumber: "PC 2001",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    amount: 275,
    type: "Partial",
    status: "Pending",
    method: "Original card",
    reasonKey: "reasonFamilyEmergency",
    linkedCancellation: "CAN-1036",
    assignedAgent: "Can Ersoy",
    age: "4h 11m",
    timeline: buildTimeline("Pending", "REF-2082"),
  },
];
