export type FlightStatus = "On Time" | "Boarding" | "Delayed" | "Scheduled" | "Cancelled";

export type Airport = {
  code: string;
  city: string;
};

export type PassengerClass = "Economy" | "Business" | "First";

export type Passenger = {
  id: string;
  name: string;
  seat: string;
  class: PassengerClass;
  checkedIn: boolean;
};

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export type FlightBooking = {
  id: string;
  traveler: string;
  destination: string;
  pax: number;
  amount: string;
  status: BookingStatus;
};

export type FlightEvent = {
  id: string;
  time: string;
  label: string;
  description: string;
};

export type Flight = {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: Airport;
  destination: Airport;
  departure: string;
  arrival: string;
  date: string;
  duration: string;
  gate: string;
  terminal: string;
  aircraft: string;
  totalSeats: number;
  bookedSeats: number;
  status: FlightStatus;
  passengers: Passenger[];
  bookings: FlightBooking[];
  history: FlightEvent[];
};

export const statusStyles: Record<FlightStatus, { badge: string; dot: string }> = {
  "On Time": {
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Boarding: {
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  Delayed: {
    badge: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  Scheduled: {
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  Cancelled: {
    badge: "border-destructive/20 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};

export const airlineStyles: Record<string, string> = {
  TK: "bg-red-600 text-white",
  LH: "bg-blue-900 text-white",
  EK: "bg-red-700 text-white",
  QR: "bg-purple-900 text-white",
  MS: "bg-blue-700 text-white",
  SV: "bg-emerald-700 text-white",
  RJ: "bg-violet-800 text-white",
  PC: "bg-amber-500 text-amber-950",
};

export function getAvailableSeats(flight: Flight) {
  return flight.totalSeats - flight.bookedSeats;
}

export function getSeatAvailabilityClass(flight: Flight) {
  const ratio = getAvailableSeats(flight) / flight.totalSeats;
  if (ratio < 0.08) return "text-red-600 dark:text-red-400";
  if (ratio < 0.2) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

const firstNames = [
  "Ahmed",
  "Mehmet",
  "Fatima",
  "Elif",
  "Youssef",
  "Layla",
  "Omar",
  "Zeynep",
  "Khaled",
  "Nour",
  "Hassan",
  "Aylin",
  "Karim",
  "Sara",
  "Tariq",
  "Mona",
  "Bilal",
  "Aisha",
  "Emre",
  "Rania",
];

const lastNames = [
  "Al-Sayed",
  "Yilmaz",
  "Haddad",
  "Demir",
  "Farouk",
  "Kaya",
  "Mansour",
  "Celik",
  "Rahman",
  "Aydin",
  "Saleh",
  "Ozturk",
  "Nasser",
  "Arslan",
  "Fahmy",
  "Korkmaz",
];

function travelerName(seed: number, offset: number) {
  const idx = seed * 7 + offset * 13;
  const first = firstNames[idx % firstNames.length];
  const last = lastNames[(idx * 3) % lastNames.length];
  return `${first} ${last}`;
}

function buildPassengers(seed: number, count: number, businessCount: number): Passenger[] {
  return Array.from({ length: count }, (_, i) => {
    const row = 4 + Math.floor(i / 6) + (i < businessCount ? 0 : 3);
    const seatLetter = "ABCDEF"[i % 6];
    return {
      id: `PSG-${seed}-${i}`,
      name: travelerName(seed, i),
      seat: `${row}${seatLetter}`,
      class: i < businessCount ? "Business" : "Economy",
      checkedIn: (seed + i) % 3 !== 0,
    };
  });
}

function buildBookings(seed: number, count: number, destinationCity: string, hasIssue: boolean): FlightBooking[] {
  return Array.from({ length: count }, (_, i) => {
    const statuses: BookingStatus[] = ["Confirmed", "Confirmed", "Confirmed", "Pending"];
    const status = hasIssue && i === count - 1 ? "Cancelled" : statuses[(seed + i) % statuses.length];
    return {
      id: `BK-${2400 + seed * 10 + i}`,
      traveler: travelerName(seed, i + 20),
      destination: destinationCity,
      pax: 1 + ((seed + i) % 3),
      amount: `$${320 + i * 45 + seed * 13}`,
      status,
    };
  });
}

function buildHistory(seed: number, status: FlightStatus, gate: string): FlightEvent[] {
  const base: FlightEvent[] = [
    {
      id: `EV-${seed}-1`,
      time: "6 days ago",
      label: "Schedule confirmed",
      description: "Flight added to the operational schedule.",
    },
    {
      id: `EV-${seed}-2`,
      time: "2 days ago",
      label: "Gate assigned",
      description: `Gate ${gate} assigned for departure.`,
    },
    {
      id: `EV-${seed}-3`,
      time: "3 hours ago",
      label: "Check-in opened",
      description: "Passenger check-in counters opened.",
    },
  ];

  if (status === "Delayed") {
    base.push({
      id: `EV-${seed}-4`,
      time: "35 min ago",
      label: "Delay announced",
      description: "Departure delayed due to crew and ground handling coordination.",
    });
  } else if (status === "Cancelled") {
    base.push({
      id: `EV-${seed}-4`,
      time: "1 hour ago",
      label: "Flight cancelled",
      description: "Flight cancelled due to operational constraints. Rebooking in progress.",
    });
  } else if (status === "Boarding") {
    base.push({
      id: `EV-${seed}-4`,
      time: "10 min ago",
      label: "Boarding started",
      description: "Passengers are now boarding at the assigned gate.",
    });
  } else {
    base.push({
      id: `EV-${seed}-4`,
      time: "15 min ago",
      label: "Status updated",
      description: "Flight tracking confirms departure is proceeding as scheduled.",
    });
  }

  return base;
}

type FlightSeed = Omit<Flight, "passengers" | "bookings" | "history"> & {
  seed: number;
  passengerSample: number;
  businessSample: number;
};

const flightSeeds: FlightSeed[] = [
  {
    seed: 1,
    id: "TK204",
    flightNumber: "TK204",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "TIP", city: "Tripoli" },
    departure: "08:30",
    arrival: "11:45",
    date: "Tue, Sep 3, 2026",
    duration: "3h 15m",
    gate: "B12",
    terminal: "1",
    aircraft: "Airbus A321neo",
    totalSeats: 180,
    bookedSeats: 138,
    status: "On Time",
    passengerSample: 8,
    businessSample: 2,
  },
  {
    seed: 2,
    id: "LH631",
    flightNumber: "LH631",
    airline: "Lufthansa",
    airlineCode: "LH",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "DXB", city: "Dubai" },
    departure: "10:20",
    arrival: "15:10",
    date: "Tue, Sep 3, 2026",
    duration: "4h 50m",
    gate: "C04",
    terminal: "2",
    aircraft: "Airbus A320",
    totalSeats: 160,
    bookedSeats: 145,
    status: "Boarding",
    passengerSample: 8,
    businessSample: 1,
  },
  {
    seed: 3,
    id: "EK107",
    flightNumber: "EK107",
    airline: "Emirates",
    airlineCode: "EK",
    origin: { code: "DXB", city: "Dubai" },
    destination: { code: "IST", city: "Istanbul" },
    departure: "14:15",
    arrival: "18:40",
    date: "Tue, Sep 3, 2026",
    duration: "4h 25m",
    gate: "A21",
    terminal: "3",
    aircraft: "Boeing 777-300ER",
    totalSeats: 200,
    bookedSeats: 192,
    status: "Delayed",
    passengerSample: 8,
    businessSample: 2,
  },
  {
    seed: 4,
    id: "QR532",
    flightNumber: "QR532",
    airline: "Qatar Airways",
    airlineCode: "QR",
    origin: { code: "DOH", city: "Doha" },
    destination: { code: "TIP", city: "Tripoli" },
    departure: "16:40",
    arrival: "19:20",
    date: "Tue, Sep 3, 2026",
    duration: "2h 40m",
    gate: "D09",
    terminal: "1",
    aircraft: "Airbus A350",
    totalSeats: 180,
    bookedSeats: 124,
    status: "On Time",
    passengerSample: 7,
    businessSample: 1,
  },
  {
    seed: 5,
    id: "MS845",
    flightNumber: "MS845",
    airline: "EgyptAir",
    airlineCode: "MS",
    origin: { code: "CAI", city: "Cairo" },
    destination: { code: "TIP", city: "Tripoli" },
    departure: "09:05",
    arrival: "11:30",
    date: "Tue, Sep 3, 2026",
    duration: "2h 25m",
    gate: "A08",
    terminal: "1",
    aircraft: "Airbus A220-300",
    totalSeats: 150,
    bookedSeats: 138,
    status: "On Time",
    passengerSample: 7,
    businessSample: 1,
  },
  {
    seed: 6,
    id: "SV620",
    flightNumber: "SV620",
    airline: "Saudia",
    airlineCode: "SV",
    origin: { code: "JED", city: "Jeddah" },
    destination: { code: "IST", city: "Istanbul" },
    departure: "21:10",
    arrival: "00:50",
    date: "Tue, Sep 3, 2026",
    duration: "3h 40m",
    gate: "B02",
    terminal: "2",
    aircraft: "Boeing 787-9",
    totalSeats: 170,
    bookedSeats: 80,
    status: "Scheduled",
    passengerSample: 6,
    businessSample: 1,
  },
  {
    seed: 7,
    id: "RJ165",
    flightNumber: "RJ165",
    airline: "Royal Jordanian",
    airlineCode: "RJ",
    origin: { code: "AMM", city: "Amman" },
    destination: { code: "IST", city: "Istanbul" },
    departure: "14:40",
    arrival: "17:15",
    date: "Tue, Sep 3, 2026",
    duration: "2h 35m",
    gate: "B06",
    terminal: "1",
    aircraft: "Embraer E195-E2",
    totalSeats: 140,
    bookedSeats: 109,
    status: "On Time",
    passengerSample: 7,
    businessSample: 1,
  },
  {
    seed: 8,
    id: "PC612",
    flightNumber: "PC612",
    airline: "Pegasus Airlines",
    airlineCode: "PC",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "AYT", city: "Antalya" },
    departure: "09:10",
    arrival: "10:20",
    date: "Tue, Sep 3, 2026",
    duration: "1h 10m",
    gate: "C11",
    terminal: "2",
    aircraft: "Boeing 737-800",
    totalSeats: 189,
    bookedSeats: 171,
    status: "Boarding",
    passengerSample: 8,
    businessSample: 0,
  },
  {
    seed: 9,
    id: "TK318",
    flightNumber: "TK318",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "DOH", city: "Doha" },
    departure: "06:15",
    arrival: "10:05",
    date: "Tue, Sep 3, 2026",
    duration: "2h 50m",
    gate: "B15",
    terminal: "1",
    aircraft: "Airbus A321",
    totalSeats: 180,
    bookedSeats: 95,
    status: "On Time",
    passengerSample: 6,
    businessSample: 1,
  },
  {
    seed: 10,
    id: "EK220",
    flightNumber: "EK220",
    airline: "Emirates",
    airlineCode: "EK",
    origin: { code: "DXB", city: "Dubai" },
    destination: { code: "JED", city: "Jeddah" },
    departure: "12:30",
    arrival: "13:50",
    date: "Tue, Sep 3, 2026",
    duration: "1h 20m",
    gate: "A05",
    terminal: "3",
    aircraft: "Boeing 737 MAX",
    totalSeats: 170,
    bookedSeats: 60,
    status: "Scheduled",
    passengerSample: 5,
    businessSample: 0,
  },
  {
    seed: 11,
    id: "MS220",
    flightNumber: "MS220",
    airline: "EgyptAir",
    airlineCode: "MS",
    origin: { code: "CAI", city: "Cairo" },
    destination: { code: "AMM", city: "Amman" },
    departure: "08:00",
    arrival: "09:35",
    date: "Tue, Sep 3, 2026",
    duration: "1h 35m",
    gate: "A03",
    terminal: "1",
    aircraft: "Airbus A220-300",
    totalSeats: 150,
    bookedSeats: 140,
    status: "Delayed",
    passengerSample: 7,
    businessSample: 1,
  },
  {
    seed: 12,
    id: "SV410",
    flightNumber: "SV410",
    airline: "Saudia",
    airlineCode: "SV",
    origin: { code: "JED", city: "Jeddah" },
    destination: { code: "DXB", city: "Dubai" },
    departure: "19:20",
    arrival: "21:45",
    date: "Tue, Sep 3, 2026",
    duration: "1h 25m",
    gate: "—",
    terminal: "2",
    aircraft: "Airbus A320",
    totalSeats: 160,
    bookedSeats: 0,
    status: "Cancelled",
    passengerSample: 0,
    businessSample: 0,
  },
];

export const flights: Flight[] = flightSeeds.map(({ seed, passengerSample, businessSample, ...flight }) => ({
  ...flight,
  passengers: buildPassengers(seed, passengerSample, businessSample),
  bookings: buildBookings(
    seed,
    Math.max(2, Math.min(5, Math.ceil(passengerSample / 1.6))),
    flight.destination.city,
    flight.status === "Delayed" || flight.status === "Cancelled",
  ),
  history: buildHistory(seed, flight.status, flight.gate),
}));

export const flightFilters = ["all", "departures", "arrivals", "delayed"] as const;
export type FlightFilter = (typeof flightFilters)[number];

export const HUB_AIRPORT = "IST";

export default flights;
