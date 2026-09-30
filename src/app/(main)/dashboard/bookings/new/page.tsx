import type { Metadata } from "next";

import { NewBookingFlow } from "./_components/new-booking-flow";

export const metadata: Metadata = {
  title: "New Booking | Zahrat Manisa",
  description: "Create a new travel booking for a customer.",
};

export default function NewBookingPage() {
  return (
    <div className="@container/main flex flex-col gap-6 p-4 md:p-6">
      <NewBookingFlow />
    </div>
  );
}
