import type { Metadata } from "next";

import { MetricCards } from "./_components/metric-cards";
import { RecentBookingsTable } from "./_components/recent-bookings-table/table";
import { RevenueTrendChart } from "./_components/revenue-trend-chart";
import { TopDestinations } from "./_components/top-destinations";
import { UpcomingDepartures } from "./_components/upcoming-departures";

export const metadata: Metadata = {
  title: "Zahrat Manisa Travel Dashboard",
  description: "Manage bookings, revenue, destinations, and upcoming departures for the Zahrat Manisa travel agency.",
  alternates: {
    canonical: "/dashboard/default",
  },
};

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <MetricCards />
      <RevenueTrendChart />
      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2">
        <TopDestinations />
        <UpcomingDepartures />
      </div>
      <RecentBookingsTable />
    </div>
  );
}
