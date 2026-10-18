import { T } from "@/i18n/t";
import { Download, ListFilter } from "lucide-react";
import type { Metadata } from "next";

import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";

import { FeaturedRevenueCard } from "./_components/featured-revenue-card";
import { FinanceStatCards } from "./_components/finance-stat-cards";
import { PaymentStatusRadial } from "./_components/payment-status-radial";
import { RecentRefundsCard } from "./_components/recent-refunds-card";
import { RecentTransactionsCard } from "./_components/recent-transactions-card";
import { RevenueExpensesChart } from "./_components/revenue-expenses-chart";
import { UpcomingPaymentsCard } from "./_components/upcoming-payments-card";

export const metadata: Metadata = {
  title: "Finance | Zahrat Manisa Travel Dashboard",
  description: "Monitor revenue, expenses, payments and financial performance for the Zahrat Manisa travel agency.",
  alternates: {
    canonical: "/dashboard/finance",
  },
};

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-3xl tracking-tight"><T id="finance.finance" /></h1>
          <p className="text-muted-foreground text-sm">
            <T id="finance.monitorRevenueExpensesPaymentsAndFinancialPerformance" />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker />
          <Button variant="outline" size="sm">
            <ListFilter data-icon="inline-start" />
            <T id="finance.filter" />
          </Button>
          <Button variant="outline" size="sm">
            <Download data-icon="inline-start" />
            <T id="finance.export" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 lg:grid-cols-2">
        <FeaturedRevenueCard />
        <FinanceStatCards />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueExpensesChart />
        </div>
        <PaymentStatusRadial />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 xl:grid-cols-3">
        <RecentTransactionsCard />
        <UpcomingPaymentsCard />
        <RecentRefundsCard />
      </div>
    </div>
  );
}
