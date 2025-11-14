"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const description = "An interactive area chart";

// const dummyEnrollmentData = [
//   {
//     date: "2025-06-01",
//     enrollments: 30,
//   },
//   {
//     date: "2025-06-02",
//     enrollments: 40,
//   },
//   {
//     date: "2025-06-03",
//     enrollments: 20,
//   },
//   {
//     date: "2025-06-04",
//     enrollments: 25,
//   },
//   {
//     date: "2025-06-05",
//     enrollments: 15,
//   },
//   {
//     date: "2025-06-06",
//     enrollments: 35,
//   },
//   {
//     date: "2025-06-07",
//     enrollments: 14,
//   },
//   {
//     date: "2025-06-05",
//     enrollments: 50,
//   },
//   {
//     date: "2025-07-05",
//     enrollments: 20,
//   },
//   {
//     date: "2025-07-06",
//     enrollments: 25,
//   },
//   {
//     date: "2025-07-07",
//     enrollments: 35,
//   },
//   {
//     date: "2025-07-08",
//     enrollments: 15,
//   },
//   {
//     date: "2025-07-09",
//     enrollments: 45,
//   },
//   {
//     date: "2025-08-09",
//     enrollments: 55,
//   },
//   {
//     date: "2025-08-10",
//     enrollments: 50,
//   },
//   {
//     date: "2025-08-11",
//     enrollments: 40,
//   },
//   {
//     date: "2025-08-12",
//     enrollments: 28,
//   },
//   {
//     date: "2025-08-13",
//     enrollments: 38,
//   },
//   {
//     date: "2025-08-14",
//     enrollments: 18,
//   },
//   {
//     date: "2025-08-15",
//     enrollments: 48,
//   },
//   {
//     date: "2025-08-16",
//     enrollments: 12,
//   },
//   {
//     date: "2025-08-17",
//     enrollments: 22,
//   },
//   {
//     date: "2025-08-18",
//     enrollments: 27,
//   },
//   {
//     date: "2025-08-19",
//     enrollments: 20,
//   },
// ];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}
export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    []
  );
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days:{totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days:{totalEnrollmentsNumber}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
