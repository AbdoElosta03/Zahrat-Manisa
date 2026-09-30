import type { Metadata } from "next";

import { BookingConversionCard } from "./_components/booking-conversion-card";
import { BookingStatusCard } from "./_components/booking-status-card";
import { FinancialActivityCard } from "./_components/financial-activity-card";
import { KpiGrid } from "./_components/kpi-grid";
import { RecentBookingsCard } from "./_components/recent-bookings-card";
import { RevenueTrendChart } from "./_components/revenue-trend-chart";
import { TopDestinations } from "./_components/top-destinations";
import { TravelerHeroCard } from "./_components/traveler-hero-card";
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
      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <KpiGrid />
        </div>
        <TravelerHeroCard />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-4">
        <div className="xl:col-span-2">
          <RevenueTrendChart />
        </div>
        <BookingStatusCard />
        <TopDestinations />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-2">
        <BookingConversionCard />
        <FinancialActivityCard />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-2">
        <UpcomingDepartures />
        <RecentBookingsCard />
      </div>
    </div>
  );
}
