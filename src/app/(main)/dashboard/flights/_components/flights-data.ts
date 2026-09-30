export type FlightStatus = "On Time" | "Delayed" | "Cancelled" | "Boarding";

export type Flight = {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: { code: string; city: string };
  destination: { code: string; city: string };
  departure: string;
  arrival: string;
  date: string;
  duration: string;
  gate: string;
  terminal: string;
  availableSeats: number;
  totalSeats: number;
  status: FlightStatus;
  aircraft: string;
  passengers: number;
  lastUpdate: string;
};

export const flights: Flight[] = [
  { id: "TK204", flightNumber: "TK204", airline: "Turkish Airlines", airlineCode: "TK", origin: { code: "IST", city: "Istanbul" }, destination: { code: "TIP", city: "Tripoli" }, departure: "08:30", arrival: "11:45", date: "Today, Mar 18", duration: "3h 15m", gate: "B12", terminal: "1", availableSeats: 42, totalSeats: 180, status: "On Time", aircraft: "Airbus A321neo", passengers: 138, lastUpdate: "Updated 8 min ago" },
  { id: "PC612", flightNumber: "PC612", airline: "Pegasus Airlines", airlineCode: "PC", origin: { code: "SAW", city: "Istanbul" }, destination: { code: "BEY", city: "Beirut" }, departure: "09:10", arrival: "10:55", date: "Today, Mar 18", duration: "1h 45m", gate: "C04", terminal: "2", availableSeats: 18, totalSeats: 189, status: "Boarding", aircraft: "Boeing 737-800", passengers: 171, lastUpdate: "Boarding started 12 min ago" },
  { id: "MS735", flightNumber: "MS735", airline: "EgyptAir", airlineCode: "MS", origin: { code: "CAI", city: "Cairo" }, destination: { code: "IST", city: "Istanbul" }, departure: "12:20", arrival: "15:00", date: "Today, Mar 18", duration: "2h 40m", gate: "A08", terminal: "1", availableSeats: 67, totalSeats: 160, status: "Delayed", aircraft: "Airbus A220-300", passengers: 93, lastUpdate: "Delayed 35 min · Crew briefing" },
  { id: "RJ165", flightNumber: "RJ165", airline: "Royal Jordanian", airlineCode: "RJ", origin: { code: "AMM", city: "Amman" }, destination: { code: "IST", city: "Istanbul" }, departure: "14:40", arrival: "17:15", date: "Today, Mar 18", duration: "2h 35m", gate: "B06", terminal: "1", availableSeats: 31, totalSeats: 140, status: "On Time", aircraft: "Embraer E195-E2", passengers: 109, lastUpdate: "Updated 21 min ago" },
  { id: "AT910", flightNumber: "AT910", airline: "Royal Air Maroc", airlineCode: "AT", origin: { code: "CMN", city: "Casablanca" }, destination: { code: "IST", city: "Istanbul" }, departure: "18:05", arrival: "00:05", date: "Tomorrow, Mar 19", duration: "4h 00m", gate: "C18", terminal: "2", availableSeats: 82, totalSeats: 274, status: "Cancelled", aircraft: "Boeing 787-9", passengers: 0, lastUpdate: "Cancelled 2 hours ago" },
];

export const airlineColors: Record<string, string> = { TK: "bg-red-600", PC: "bg-yellow-500", MS: "bg-emerald-600", RJ: "bg-rose-700", AT: "bg-red-700" };
export const statusClasses: Record<FlightStatus, string> = { "On Time": "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", Boarding: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400", Delayed: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400", Cancelled: "border-destructive/20 bg-destructive/10 text-destructive" };

export const flightFilters = ["All Flights", "Departures", "Arrivals", "Delayed", "Cancelled"] as const;
export type FlightFilter = (typeof flightFilters)[number];

export const isFlightStatus = (value: string): value is FlightStatus => ["On Time", "Delayed", "Cancelled", "Boarding"].includes(value);

export const flightData = flights;

export default flightData;
