export type TicketStatus = "Issued" | "Pending" | "Cancelled" | "Refunded" | "Reissued";

export type Airport = {
  code: string;
  city: string;
};

export type TicketEvent = {
  id: string;
  time: string;
  label: string;
  description: string;
};

export type Ticket = {
  id: string;
  pnr: string;
  passenger: {
    name: string;
    passport: string;
    nationality: string;
    paxCount: number;
  };
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: Airport;
  destination: Airport;
  date: string;
  departure: string;
  arrival: string;
  duration: string;
  aircraft: string;
  gate: string;
  terminal: string;
  seat: string;
  cabinClass: "Economy" | "Business" | "First";
  fare: number;
  taxes: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  status: TicketStatus;
  history: TicketEvent[];
};

export const statusStyles: Record<TicketStatus, { badge: string }> = {
  Issued: { badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Pending: { badge: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  Cancelled: { badge: "border-destructive/20 bg-destructive/10 text-destructive" },
  Refunded: { badge: "border-border bg-muted text-muted-foreground" },
  Reissued: { badge: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
};

export const airlineStyles: Record<string, string> = {
  TK: "bg-red-600 text-white",
  LH: "bg-blue-900 text-white",
  EK: "bg-red-700 text-white",
  QR: "bg-purple-900 text-white",
  MS: "bg-blue-700 text-white",
  SV: "bg-emerald-700 text-white",
  PC: "bg-amber-500 text-amber-950",
  FZ: "bg-rose-600 text-white",
};

function buildHistory(status: TicketStatus, pnr: string): TicketEvent[] {
  const base: TicketEvent[] = [
    {
      id: `${pnr}-1`,
      time: "6 days ago",
      label: "Ticket issued",
      description: "E-ticket generated and PNR confirmed with the airline.",
    },
    {
      id: `${pnr}-2`,
      time: "5 days ago",
      label: "Payment captured",
      description: "Full fare and taxes collected from the traveler.",
    },
  ];

  if (status === "Reissued") {
    base.push({
      id: `${pnr}-3`,
      time: "1 day ago",
      label: "Ticket reissued",
      description: "Schedule change accepted and the ticket was reissued.",
    });
  } else if (status === "Cancelled") {
    base.push({
      id: `${pnr}-3`,
      time: "1 day ago",
      label: "Ticket cancelled",
      description: "Booking cancelled by the traveler ahead of departure.",
    });
  } else if (status === "Refunded") {
    base.push(
      {
        id: `${pnr}-3`,
        time: "2 days ago",
        label: "Cancellation requested",
        description: "Traveler requested cancellation and refund.",
      },
      {
        id: `${pnr}-4`,
        time: "1 day ago",
        label: "Refund processed",
        description: "Refund issued back to the original payment method.",
      },
    );
  } else if (status === "Pending") {
    base.push({
      id: `${pnr}-3`,
      time: "3 hours ago",
      label: "Awaiting confirmation",
      description: "Ticket is pending airline confirmation and seat lock.",
    });
  } else {
    base.push({
      id: `${pnr}-3`,
      time: "12 hours ago",
      label: "Check-in reminder sent",
      description: "Online check-in reminder emailed to the traveler.",
    });
  }

  return base;
}

type TicketSeed = Omit<Ticket, "history" | "amount">;

const ticketSeeds: TicketSeed[] = [
  {
    id: "TK-458921",
    pnr: "AB72KD",
    passenger: { name: "Ahmed Ali", passport: "LY1234567", nationality: "Libyan", paxCount: 1 },
    flightNumber: "TK204",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "TIP", city: "Tripoli" },
    date: "Sep 3, 2026",
    departure: "08:30",
    arrival: "11:45",
    duration: "3h 15m",
    aircraft: "Airbus A321neo",
    gate: "B12",
    terminal: "1",
    seat: "14A",
    cabinClass: "Economy",
    fare: 350,
    taxes: 70,
    paymentMethod: "Credit Card **** 4242",
    paymentDate: "Aug 28, 2026, 14:25",
    paymentStatus: "Paid",
    status: "Issued",
  },
  {
    id: "LH-782345",
    pnr: "X9K2PL",
    passenger: { name: "Fatima Omar", passport: "TN2231098", nationality: "Tunisian", paxCount: 2 },
    flightNumber: "LH631",
    airline: "Lufthansa",
    airlineCode: "LH",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "DXB", city: "Dubai" },
    date: "Sep 3, 2026",
    departure: "10:20",
    arrival: "15:10",
    duration: "4h 50m",
    aircraft: "Airbus A320",
    gate: "C04",
    terminal: "2",
    seat: "22C",
    cabinClass: "Economy",
    fare: 680,
    taxes: 100,
    paymentMethod: "Credit Card **** 1187",
    paymentDate: "Aug 27, 2026, 09:10",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: "EK-991827",
    pnr: "M4Z8QN",
    passenger: { name: "Mohamed Saleh", passport: "EG5509812", nationality: "Egyptian", paxCount: 1 },
    flightNumber: "EK107",
    airline: "Emirates",
    airlineCode: "EK",
    origin: { code: "DXB", city: "Dubai" },
    destination: { code: "IST", city: "Istanbul" },
    date: "Sep 3, 2026",
    departure: "14:15",
    arrival: "18:40",
    duration: "4h 25m",
    aircraft: "Boeing 777-300ER",
    gate: "A21",
    terminal: "3",
    seat: "31F",
    cabinClass: "Economy",
    fare: 430,
    taxes: 80,
    paymentMethod: "Credit Card **** 7745",
    paymentDate: "Aug 20, 2026, 18:40",
    paymentStatus: "Refunded",
    status: "Cancelled",
  },
  {
    id: "QR-334455",
    pnr: "K7L3MD",
    passenger: { name: "Aisha Khaled", passport: "LY8890234", nationality: "Libyan", paxCount: 3 },
    flightNumber: "QR532",
    airline: "Qatar Airways",
    airlineCode: "QR",
    origin: { code: "DOH", city: "Doha" },
    destination: { code: "TIP", city: "Tripoli" },
    date: "Sep 3, 2026",
    departure: "16:40",
    arrival: "19:20",
    duration: "2h 40m",
    aircraft: "Airbus A350",
    gate: "D09",
    terminal: "1",
    seat: "8B",
    cabinClass: "Business",
    fare: 1050,
    taxes: 150,
    paymentMethod: "Credit Card **** 9013",
    paymentDate: "Aug 30, 2026, 11:05",
    paymentStatus: "Paid",
    status: "Issued",
  },
  {
    id: "MS-667788",
    pnr: "P1N9BZ",
    passenger: { name: "Omar Al-Faraj", passport: "LY4471203", nationality: "Libyan", paxCount: 1 },
    flightNumber: "MS845",
    airline: "EgyptAir",
    airlineCode: "MS",
    origin: { code: "CAI", city: "Cairo" },
    destination: { code: "TIP", city: "Tripoli" },
    date: "Sep 4, 2026",
    departure: "11:10",
    arrival: "13:50",
    duration: "2h 25m",
    aircraft: "Airbus A220-300",
    gate: "A08",
    terminal: "1",
    seat: "19D",
    cabinClass: "Economy",
    fare: 270,
    taxes: 50,
    paymentMethod: "Credit Card **** 3320",
    paymentDate: "Aug 29, 2026, 08:15",
    paymentStatus: "Paid",
    status: "Issued",
  },
  {
    id: "SV-123456",
    pnr: "D8Y4RT",
    passenger: { name: "Noura Ibrahim", passport: "SA7743021", nationality: "Saudi", paxCount: 2 },
    flightNumber: "SV620",
    airline: "Saudia",
    airlineCode: "SV",
    origin: { code: "JED", city: "Jeddah" },
    destination: { code: "IST", city: "Istanbul" },
    date: "Sep 4, 2026",
    departure: "21:10",
    arrival: "01:30",
    duration: "3h 40m",
    aircraft: "Boeing 787-9",
    gate: "B02",
    terminal: "2",
    seat: "26A",
    cabinClass: "Economy",
    fare: 590,
    taxes: 90,
    paymentMethod: "Credit Card **** 5502",
    paymentDate: "Aug 26, 2026, 20:40",
    paymentStatus: "Paid",
    status: "Reissued",
  },
  {
    id: "PC-998877",
    pnr: "H2J6KP",
    passenger: { name: "Yousef Ahmed", passport: "LY3302198", nationality: "Libyan", paxCount: 1 },
    flightNumber: "PC272",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "TIP", city: "Tripoli" },
    date: "Sep 4, 2026",
    departure: "12:30",
    arrival: "15:45",
    duration: "3h 15m",
    aircraft: "Boeing 737-800",
    gate: "C11",
    terminal: "2",
    seat: "11C",
    cabinClass: "Economy",
    fare: 250,
    taxes: 40,
    paymentMethod: "Credit Card **** 6614",
    paymentDate: "Aug 31, 2026, 16:20",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: "FZ-554433",
    pnr: "Z3V8NM",
    passenger: { name: "Layla Hassan", passport: "AE2201873", nationality: "Emirati", paxCount: 4 },
    flightNumber: "FZ215",
    airline: "flydubai",
    airlineCode: "FZ",
    origin: { code: "DXB", city: "Dubai" },
    destination: { code: "TIP", city: "Tripoli" },
    date: "Sep 4, 2026",
    departure: "09:15",
    arrival: "12:40",
    duration: "3h 25m",
    aircraft: "Boeing 737 MAX 8",
    gate: "B18",
    terminal: "2",
    seat: "17F",
    cabinClass: "Economy",
    fare: 820,
    taxes: 140,
    paymentMethod: "Credit Card **** 2288",
    paymentDate: "Aug 25, 2026, 13:50",
    paymentStatus: "Paid",
    status: "Issued",
  },
];

export const tickets: Ticket[] = ticketSeeds.map((ticket) => ({
  ...ticket,
  amount: ticket.fare + ticket.taxes,
  history: buildHistory(ticket.status, ticket.pnr),
}));

export const ticketFilters = ["all", "issued", "pending", "cancelled", "refunded", "reissued"] as const;
export type TicketFilter = (typeof ticketFilters)[number];

export default tickets;
