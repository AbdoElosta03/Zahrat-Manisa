import type { Metadata } from "next";

import { Flights } from "./_components/flights";

export const metadata: Metadata = {
  title: "Flights | Zahrat Manisa",
  description: "Manage flight schedules, routes, availability and operational status.",
};

export default function Page() {
  return <Flights />;
}
