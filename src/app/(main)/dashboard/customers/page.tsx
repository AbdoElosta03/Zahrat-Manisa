import type { Metadata } from "next";

import { customers } from "./_components/data";
import { Users } from "./_components/users";

export const metadata: Metadata = {
  title: "Customers | Manisa Travel Admin",
  description: "Manage customer profiles, loyalty value, travel preferences, and mock traveler data.",
  alternates: {
    canonical: "/dashboard/customers",
  },
};

export default function Page() {
  return <Users users={customers} />;
}
