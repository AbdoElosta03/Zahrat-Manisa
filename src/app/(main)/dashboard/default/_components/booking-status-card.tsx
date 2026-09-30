"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import bookingStatusData from "./booking-status-data.json";

type StatusItem = {
  status: string;
  label: string;
  count: number;
  color: string;
};

const statusData = bookingStatusData as StatusItem[];

const chartConfig = statusData.reduce<ChartConfig>((config, item) => {
  config[item.status] = { label: item.label, color: item.color };
  return config;
}, {}) satisfies ChartConfig;

const chartData = statusData.map((item) => ({ ...item, fill: item.color }));
const total = statusData.reduce((sum, item) => sum + item.count, 0);

export function BookingStatusCard() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">Booking Status</CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {total.toLocaleString()} bookings
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-36">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="status" />} />
            <Pie
              cornerRadius={5}
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={48}
              outerRadius={68}
              paddingAngle={3}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (!(viewBox && "cx" in viewBox && "cy" in viewBox)) {
                    return null;
                  }

                  return (
                    <text dominantBaseline="middle" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                      <tspan className="fill-muted-foreground text-[10px]" x={viewBox.cx} y={(viewBox.cy ?? 0) - 8}>
                        Confirmed
                      </tspan>
                      <tspan
                        className="fill-foreground font-medium text-lg tabular-nums"
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 12}
                      >
                        {Math.round((statusData[0].count / total) * 100)}%
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex w-full flex-col gap-2.5">
          {statusData.map((item) => (
            <div key={item.status} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              <span className="font-medium tabular-nums">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
