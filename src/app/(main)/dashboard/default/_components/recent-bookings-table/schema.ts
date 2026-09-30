export const bookingFilters = ["All", "Confirmed", "Pending", "Completed", "Cancelled"] as const;

export type BookingFilter = (typeof bookingFilters)[number];

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type BookingRow = {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  destination: string;
  packageName: string;
  travelDate: string;
  bookingDate: string;
  travelers: number;
  amount: number;
  status: BookingStatus;
};
