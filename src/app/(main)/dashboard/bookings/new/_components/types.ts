export type ExistingTraveler = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  country: string;
  previousBookings: number;
};

export type TripStatus = "open" | "filling-fast" | "full";

export type TripOption = {
  id: string;
  name: string;
  destination: string;
  image: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  availableSeats: number;
  price: number;
  guide: string;
  status: TripStatus;
};

export type PassengerType = "adult" | "child" | "infant";
export type DocumentStatus = "verified" | "pending" | "missing";

export type Passenger = {
  id: string;
  name: string;
  initials: string;
  type: PassengerType;
  age: number;
  documentStatus: DocumentStatus;
  isPrimary?: boolean;
};

export type PaymentMethod = "cash" | "bank-transfer" | "card" | "other";
export type PaymentStatus = "paid" | "partial" | "unpaid";

export type BookingDraft = {
  traveler: ExistingTraveler | null;
  trip: TripOption | null;
  passengers: Passenger[];
  discount: number;
  taxesFees: number;
  paidAmount: number;
  paymentMethod: PaymentMethod;
};

export const STEP_KEYS = ["traveler", "trip", "passengers", "payment", "review", "confirmation"] as const;
export type StepKey = (typeof STEP_KEYS)[number];

export const STEPS: { key: StepKey; label: string }[] = [
  { key: "traveler", label: "Traveler" },
  { key: "trip", label: "Trip" },
  { key: "passengers", label: "Passengers" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
  { key: "confirmation", label: "Create Booking" },
];
