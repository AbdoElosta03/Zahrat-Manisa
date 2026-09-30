export type BookingStatus = "confirmed" | "pending" | "cancelled";
export type PaymentStatus = "paid" | "partial" | "unpaid";
export type CalendarEventType = "departure" | "return";

export type Traveler = {
  name: string;
  initials: string;
};

export type Booking = {
  id: string;
  tripName: string;
  destination: string;
  image: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  travelers: Traveler[];
  travelersCount: number;
  adults: number;
  children: number;
  seatsTotal: number;
  seatsBooked: number;
  amount: number;
  paidAmount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  bookingDate: string;
};

export type CalendarEvent = {
  booking: Booking;
  date: string;
  type: CalendarEventType;
};
